
import React, { useMemo, useState, useEffect } from 'react';
import {
  DoughConfig,
  YeastType,
  BakeType,
  FormErrors,
  CalculationMode,
  Levain,
} from '@/types';
import { DOUGH_STYLE_PRESETS } from '@/constants';
import * as customPresets from '@/logic/customPresets';
import {
  PencilIcon,
  FlourIcon,
  BookmarkSquareIcon,
  LockClosedIcon,
  TrashIcon,
  CloseIcon,
  SparklesIcon,
} from '@/components/ui/Icons';
import FormSection from '@/components/calculator/AccordionSection';
import { useToast } from '@/components/ToastProvider';
import IngredientsSection from '@/components/calculator/sections/IngredientsSection';
import StyleSection from '@/components/calculator/sections/StyleSection';
import FermentationSection from '@/components/calculator/sections/FermentationSection';
import QuantitySection from '@/components/calculator/sections/QuantitySection';
import EnvironmentSection from '@/components/calculator/sections/EnvironmentSection';
import { getAllowedFermentationTechniques } from '@/data/stylesData';

interface CalculatorFormProps {
  config: DoughConfig;
  errors: FormErrors;
  onConfigChange: (newConfig: Partial<DoughConfig>) => void;
  onBakeTypeChange: (bakeType: BakeType) => void;
  onStyleChange: (presetId: string) => void;
  onYeastTypeChange: (yeastType: YeastType) => void;
  onReset: () => void;
  calculatorMode: 'basic' | 'advanced';
  calculationMode: CalculationMode;
  onCalculationModeChange: (mode: CalculationMode) => void;
  onCalculatorModeChange: (mode: 'basic' | 'advanced') => void;
  hasProAccess: boolean;
  onOpenPaywall: () => void;
  levains: Levain[];
  selectedLevain: Levain | null;
  inputRefs: {
    numPizzas: React.Ref<HTMLInputElement>;
  };
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  config,
  errors,
  onConfigChange,
  onBakeTypeChange,
  onStyleChange,
  onYeastTypeChange,
  onReset,
  calculatorMode,
  calculationMode,
  onCalculationModeChange,
  onCalculatorModeChange,
  hasProAccess,
  onOpenPaywall,
  levains,
  selectedLevain,
  inputRefs,
}) => {
  const { addToast } = useToast();
  const isBasic = calculatorMode === 'basic';

  // State for presets
  const [presets, setPresets] = useState<{ name: string }[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<string>('');

  const refreshPresets = () => {
    const presetList = customPresets.listCustomPresets();
    setPresets(presetList);
    if (presetList.length > 0) {
      if (!presetList.some((p) => p.name === selectedPreset)) {
        setSelectedPreset(presetList[0].name);
      }
    } else {
      setSelectedPreset('');
    }
  };

  useEffect(() => {
    refreshPresets();
  }, []);

  const handleSavePreset = () => {
    const name = prompt('Name your preset:');
    if (name && name.trim()) {
      customPresets.saveCustomPreset(name, config);
      addToast(`Preset "${name}" saved!`, 'success');
      refreshPresets();
      setSelectedPreset(name);
    }
  };

  const handleLoadPreset = () => {
    if (!selectedPreset) return;
    const loadedConfig = customPresets.loadCustomPreset(selectedPreset);
    if (loadedConfig) {
      onConfigChange(loadedConfig);
      addToast(`Preset "${selectedPreset}" loaded.`, 'info');
    }
  };

  const handleDeletePreset = () => {
    if (!selectedPreset) return;
    if (window.confirm(`Are you sure you want to delete preset "${selectedPreset}"?`)) {
      customPresets.deleteCustomPreset(selectedPreset);
      addToast(`Preset "${selectedPreset}" deleted.`, 'info');
      const newList = customPresets.listCustomPresets();
      setPresets(newList);
      setSelectedPreset(newList[0]?.name || '');
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onConfigChange({ [e.target.name]: e.target.value });
  };

  const handleResetPreset = () => {
    if (config.stylePresetId) {
      onStyleChange(config.stylePresetId);
    }
  };

  const recipeStylesToShow = DOUGH_STYLE_PRESETS.filter(
    (p) => p.type === config.bakeType,
  );

  const currentPreset = useMemo(
    () => DOUGH_STYLE_PRESETS.find((p) => p.id === config.stylePresetId),
    [config.stylePresetId],
  );

  const allowedFermentationTechniques = useMemo(() => {
      return getAllowedFermentationTechniques(config.recipeStyle, config.bakeType);
  }, [config.recipeStyle, config.bakeType]);

  const getInputClasses = (hasError: boolean) =>
    `w-full rounded-lg bg-slate-50 p-2 text-slate-900 border ${
      hasError
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
        : 'border-slate-300 focus:border-lime-500 focus:ring-lime-500'
    }`;
  const getSelectClasses = () =>
    'w-full rounded-lg border-slate-300 bg-slate-50 p-2 text-slate-900 focus:border-lime-500 focus:ring-lime-500';

  const isAnySourdough = [
    YeastType.SOURDOUGH_STARTER,
    YeastType.USER_LEVAIN,
  ].includes(config.yeastType);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
            isBasic ? 'bg-sky-100 text-sky-800' : 'bg-lime-100 text-lime-800'
          }`}
        >
          {isBasic ? 'Guided Mode' : 'Advanced Mode'}
        </span>
      </div>

      {config.baseStyleName && (
        <div className="flex items-center justify-between rounded-lg bg-lime-50 p-3 text-sm text-lime-800 border border-lime-200 shadow-sm">
          <div className="flex items-center gap-2">
            <SparklesIcon className="h-5 w-5 text-lime-600" />
            <span>
              Base Style: <strong>{config.baseStyleName}</strong>
            </span>
          </div>
          <button
            onClick={() => onConfigChange({ baseStyleName: undefined })}
            className="rounded-full p-1 hover:bg-lime-200 transition-colors"
            title="Clear style"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
      )}

      {!isBasic && (
        <FormSection
          title="Load Custom Preset"
          description="Start from one of your saved dough formulas."
          icon={<BookmarkSquareIcon className="h-6 w-6" />}
        >
          <div className="space-y-4">
            <div className="flex gap-2">
              <select
                value={selectedPreset}
                onChange={(e) => setSelectedPreset(e.target.value)}
                disabled={presets.length === 0}
                className={getSelectClasses()}
                aria-label="Select saved preset"
              >
                {presets.length === 0 ? (
                  <option>No presets saved</option>
                ) : (
                  presets.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.name}
                    </option>
                  ))
                )}
              </select>
              <button
                onClick={handleDeletePreset}
                disabled={!selectedPreset}
                className="flex-shrink-0 rounded-lg p-2 text-red-500 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                title="Delete Preset"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
            <button
              onClick={handleLoadPreset}
              disabled={!selectedPreset}
              className="w-full rounded-md bg-slate-200 py-2 px-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Load Preset
            </button>
          </div>
        </FormSection>
      )}

      <StyleSection
        config={config}
        onBakeTypeChange={onBakeTypeChange}
        onStyleChange={onStyleChange}
        recipeStylesToShow={recipeStylesToShow}
        isBasic={isBasic}
        currentPreset={currentPreset}
        onResetPreset={handleResetPreset}
      />

      <FermentationSection
        config={config}
        onConfigChange={onConfigChange}
        isAnySourdough={isAnySourdough}
        isBasic={isBasic}
        errors={errors}
        hasProAccess={hasProAccess}
        onOpenPaywall={onOpenPaywall}
        allowedTechniques={allowedFermentationTechniques}
      />

      <QuantitySection
        config={config}
        calculationMode={calculationMode}
        onCalculationModeChange={onCalculationModeChange}
        onConfigChange={onConfigChange}
        errors={errors}
        getInputClasses={getInputClasses}
        numPizzasRef={inputRefs.numPizzas}
      />

      <FormSection
        title="Ingredients"
        description="Adjust the percentages of each component."
        icon={<FlourIcon className="h-6 w-6" />}
      >
        <IngredientsSection
          config={config}
          errors={errors}
          onConfigChange={onConfigChange}
          onYeastTypeChange={onYeastTypeChange}
          calculatorMode={calculatorMode}
          levains={levains}
          selectedLevain={selectedLevain}
          getSelectClasses={getSelectClasses}
          onCalculatorModeChange={onCalculatorModeChange}
          hasProAccess={hasProAccess}
          onOpenPaywall={onOpenPaywall}
        />
      </FormSection>

      {!isBasic && (
        <EnvironmentSection
          config={config}
          onConfigChange={onConfigChange}
          getSelectClasses={getSelectClasses}
          errors={errors}
        />
      )}

      {!isBasic && (
        <>
          <FormSection
            title="Notes"
            description="Log observations about this formula."
            icon={<PencilIcon className="h-6 w-6" />}
          >
            <div className="relative">
              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={config.notes || ''}
                onChange={handleTextareaChange}
                placeholder={
                  hasProAccess
                    ? 'E.g., Fermented for 24h in the fridge...'
                    : 'This is a Pro feature.'
                }
                className="w-full rounded-lg border-slate-300 bg-slate-50 p-2 text-slate-900 focus:border-lime-500 focus:ring-lime-500 disabled:bg-slate-100"
                disabled={!hasProAccess}
              />
              {!hasProAccess && (
                <div
                  className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-lg bg-white/50 backdrop-blur-sm"
                  onClick={onOpenPaywall}
                  title="Pro Feature"
                >
                  <div className="flex items-center gap-2 rounded-full bg-lime-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                    <LockClosedIcon className="h-4 w-4" />
                    Go Pro
                  </div>
                </div>
              )}
            </div>
          </FormSection>

          <FormSection
            title="Save Custom Preset"
            description="Save the current configuration for future use."
            icon={<BookmarkSquareIcon className="h-6 w-6" />}
          >
            <button
              onClick={handleSavePreset}
              className="w-full flex items-center justify-center gap-2 rounded-md bg-lime-500 py-2 px-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-lime-600"
            >
              Save as Custom Style
            </button>
          </FormSection>
        </>
      )}

      <div>
        <button
          type="button"
          onClick={onReset}
          className="w-full rounded-lg bg-slate-200 py-3 px-4 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
        >
          Reset Fields
        </button>
      </div>

      {!hasProAccess && (
        <div className="mt-8 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-center text-white shadow-lg">
          <p className="text-lg font-bold">Stop guessing. Start mastering your dough.</p>
          <p className="mt-1 text-sm text-slate-400">Costs less than 25¢ a day. Cheaper than a coffee.</p>
          <button
            onClick={onOpenPaywall}
            className="mt-4 rounded-full bg-lime-500 px-6 py-2 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-lime-400"
          >
            Upgrade to Pro
          </button>
        </div>
      )}
    </div>
  );
};

export default CalculatorForm;
