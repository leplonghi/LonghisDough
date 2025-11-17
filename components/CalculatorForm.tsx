



import React, { useMemo, useState, useEffect } from 'react';
import {
  DoughConfig,
  YeastType,
  RecipeStyle,
  FermentationTechnique,
  BakeType,
  FormErrors,
  AmbientTemperature,
  CalculationMode,
  Levain,
} from '../types';
import {
  YEAST_OPTIONS,
  DOUGH_STYLE_PRESETS,
  AMBIENT_TEMPERATURE_OPTIONS,
} from '../constants';
import * as customPresets from '../logic/customPresets';
import { FLOURS } from '../flours-constants';
import SliderInput from './SliderInput';
import { useTranslation } from '../i18n';
import {
  RecipeIcon,
  ParametersIcon,
  FermentationIcon,
  PencilIcon,
  FlourIcon,
  FireIcon,
  BookmarkSquareIcon,
  LockClosedIcon,
  TrashIcon,
} from './IconComponents';
import FormSection from './calculator/AccordionSection';
import { useToast } from './ToastProvider';
import { hoursBetween } from '../helpers';

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
  hasProAccess: boolean;
  onOpenPaywall: () => void;
  levains: Levain[];
  selectedLevain: Levain | null;
  inputRefs: {
    numPizzas: React.Ref<HTMLInputElement>;
  };
}

const ChoiceButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full rounded-lg px-4 py-2 text-center text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${
      active
        ? 'bg-lime-500 text-white font-semibold shadow-md'
        : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
    }`}
  >
    {children}
  </button>
);

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
  hasProAccess,
  onOpenPaywall,
  levains,
  selectedLevain,
  inputRefs,
}) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const isBasic = calculatorMode === 'basic';
  
  // State for presets
  const [presets, setPresets] = useState<{ name: string }[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<string>('');

  const refreshPresets = () => {
    const presetList = customPresets.listCustomPresets();
    setPresets(presetList);
    if (presetList.length > 0) {
        if (!presetList.some(p => p.name === selectedPreset)) {
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
    const name = prompt(t('prompts.preset_name_title'));
    if (name && name.trim()) {
      customPresets.saveCustomPreset(name, config);
      addToast(t('info.preset_saved', { name }), 'success');
      refreshPresets();
      setSelectedPreset(name);
    }
  };

  const handleLoadPreset = () => {
    if (!selectedPreset) return;
    const loadedConfig = customPresets.loadCustomPreset(selectedPreset);
    if (loadedConfig) {
      onConfigChange(loadedConfig);
      addToast(t('info.preset_loaded', { name: selectedPreset }), 'info');
    }
  };

  const handleDeletePreset = () => {
    if (!selectedPreset) return;
    if (window.confirm(t('confirmations.delete_preset', { name: selectedPreset }))) {
      customPresets.deleteCustomPreset(selectedPreset);
      addToast(t('info.preset_deleted', { name: selectedPreset }), 'info');
      const newList = customPresets.listCustomPresets();
      setPresets(newList);
      setSelectedPreset(newList[0]?.name || '');
    }
  };


  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === '' ? 0 : Number(value);
    if (!isNaN(numValue)) {
      onConfigChange({ [name]: numValue });
    }
  };
  
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onConfigChange({ [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'yeastType') {
      onYeastTypeChange(value as YeastType);
    } else {
      onConfigChange({ [name]: value });
    }
  };
  
  const handleResetPreset = () => {
    if (config.stylePresetId) {
      onStyleChange(config.stylePresetId);
    }
  };

  const recipeStylesToShow = DOUGH_STYLE_PRESETS.filter((p) => {
    if (config.bakeType === BakeType.PIZZA) return p.type === 'pizza';
    return ['bread', 'focaccia', 'other'].includes(p.type);
  });
  
  const currentPreset = useMemo(() => 
    DOUGH_STYLE_PRESETS.find(p => p.id === config.stylePresetId),
  [config.stylePresetId]);

  const getInputClasses = (hasError: boolean) => `w-full rounded-lg bg-slate-50 p-2 text-slate-900 dark:bg-slate-700 dark:text-slate-100 border ${hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500' : 'border-slate-300 focus:border-lime-500 focus:ring-lime-500 dark:border-slate-600'}`;
  const getSelectClasses = () => "w-full rounded-lg border-slate-300 bg-slate-50 p-2 text-slate-900 focus:border-lime-500 focus:ring-lime-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100";

  const isAnySourdough = [YeastType.SOURDOUGH_STARTER, YeastType.USER_LEVAIN].includes(config.yeastType);

  return (
    <div className="space-y-6">
        <div className="text-center">
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${isBasic ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300' : 'bg-lime-100 text-lime-800 dark:bg-lime-900/50 dark:text-lime-300'}`}>
            {isBasic ? t('mode_toggle.basic_tag') : t('mode_toggle.advanced_tag')}
            </span>
        </div>
      
      {!isBasic && (
        <FormSection title={t('form.sections.tools.title')} description={t('form.sections.tools.description')} icon={<BookmarkSquareIcon className="h-6 w-6" />}>
           <div className="space-y-4">
                <div className="flex gap-2">
                    <select
                        value={selectedPreset}
                        onChange={(e) => setSelectedPreset(e.target.value)}
                        disabled={presets.length === 0}
                        className={getSelectClasses()}
                        aria-label={t('form.select_preset_aria')}
                    >
                        {presets.length === 0 ? (
                            <option>{t('form.no_presets')}</option>
                        ) : (
                            presets.map(p => <option key={p.name} value={p.name}>{p.name}</option>)
                        )}
                    </select>
                    <button
                        onClick={handleDeletePreset}
                        disabled={!selectedPreset}
                        className="flex-shrink-0 rounded-lg p-2 text-red-500 transition-colors hover:bg-red-100 dark:hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                        title={t('form.delete_preset')}
                    >
                        <TrashIcon className="h-5 w-5" />
                    </button>
                </div>
                <button
                    onClick={handleLoadPreset}
                    disabled={!selectedPreset}
                    className="w-full rounded-md bg-slate-200 py-2 px-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {t('form.load_preset')}
                </button>
            </div>
        </FormSection>
      )}

      <FormSection title={t('form.sections.style.title')} description={t('form.sections.style.description')} icon={<RecipeIcon className="h-6 w-6" />}>
          <div className="grid grid-cols-2 gap-3">
              <ChoiceButton active={config.bakeType === BakeType.PIZZA} onClick={() => onBakeTypeChange(BakeType.PIZZA)}>{t('form.pizzas')}</ChoiceButton>
              <ChoiceButton active={config.bakeType === BakeType.BREAD} onClick={() => onBakeTypeChange(BakeType.BREAD)}>{t('form.breads')}</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {recipeStylesToShow.map((preset) => (
                  <ChoiceButton key={preset.id} active={config.stylePresetId === preset.id} onClick={() => onStyleChange(preset.id)}>{preset.name}</ChoiceButton>
              ))}
          </div>
           {isBasic && currentPreset && (
             <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                    onClick={handleResetPreset}
                    className="w-full text-sm font-semibold text-lime-600 hover:underline dark:text-lime-400"
                >
                    {t('form.reset_preset_button', { name: currentPreset.name })}
                </button>
             </div>
           )}
      </FormSection>

      <FormSection title={t('form.sections.fermentation.title')} description={t('form.sections.fermentation.description')} icon={<FermentationIcon className="h-6 w-6" />}>
           {isAnySourdough ? (
             <p className="text-center text-sm text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 p-3 rounded-lg">{t('form.sourdough_as_preferment')}</p>
           ) : (
            <>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <ChoiceButton active={config.fermentationTechnique === FermentationTechnique.DIRECT} onClick={() => onConfigChange({ fermentationTechnique: FermentationTechnique.DIRECT })}>{t('form.direct')}</ChoiceButton>
                  <ChoiceButton active={config.fermentationTechnique === FermentationTechnique.POOLISH} onClick={() => onConfigChange({ fermentationTechnique: FermentationTechnique.POOLISH })}>{t('form.poolish')}</ChoiceButton>
                  <ChoiceButton active={config.fermentationTechnique === FermentationTechnique.BIGA} onClick={() => onConfigChange({ fermentationTechnique: FermentationTechnique.BIGA })}>{t('form.biga')}</ChoiceButton>
                </div>
                {(config.fermentationTechnique !== FermentationTechnique.DIRECT) && (
                 <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                     <SliderInput label={t('form.preferment_flour')} name="prefermentFlourPercentage" value={config.prefermentFlourPercentage} onChange={handleNumberChange} min={isBasic ? (config.fermentationTechnique === FermentationTechnique.BIGA ? 30 : 20) : 0} max={isBasic ? (config.fermentationTechnique === FermentationTechnique.BIGA ? 60 : 50) : 100} step={5} unit="%" tooltip={t('form.preferment_flour_tooltip')} hasError={!!errors.prefermentFlourPercentage} />
                 </div>
               )}
            </>
           )}
       </FormSection>

      <FormSection title={t('form.sections.production.title')} description={t('form.sections.production.description')} icon={<ParametersIcon className="h-6 w-6" />}>
          <div className="grid grid-cols-2 gap-3">
              <ChoiceButton active={calculationMode === 'mass'} onClick={() => onCalculationModeChange('mass')}>{t('form.calc_mode_mass')}</ChoiceButton>
              <ChoiceButton active={calculationMode === 'flour'} onClick={() => onCalculationModeChange('flour')}>{t('form.calc_mode_flour')}</ChoiceButton>
          </div>
          {calculationMode === 'mass' ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="numPizzas" className="mb-1 block text-sm font-medium">{config.bakeType === BakeType.PIZZA ? t('form.num_pizzas') : t('form.num_loaves')}</label>
                    <input type="number" id="numPizzas" name="numPizzas" value={config.numPizzas || ''} onChange={handleNumberChange} min="1" max="100" className={getInputClasses(!!errors.numPizzas)} ref={inputRefs.numPizzas} />
                </div>
                <div>
                    <label htmlFor="doughBallWeight" className="mb-1 block text-sm font-medium">{config.bakeType === BakeType.PIZZA ? t('form.weight_per_pizza') : t('form.weight_per_loaf')}</label>
                    <input type="number" id="doughBallWeight" name="doughBallWeight" value={config.doughBallWeight || ''} onChange={handleNumberChange} min="100" max="2000" step="10" className={getInputClasses(!!errors.doughBallWeight)} />
                </div>
            </div>
          ) : (
            <div>
                <label htmlFor="totalFlour" className="mb-1 block text-sm font-medium">{t('form.total_flour')}</label>
                <input type="number" id="totalFlour" name="totalFlour" value={config.totalFlour || ''} onChange={handleNumberChange} min="100" max="10000" step="50" className={getInputClasses(!!errors.totalFlour)} />
            </div>
          )}
      </FormSection>

      <FormSection title={t('form.sections.ingredients.title')} description={t('form.sections.ingredients.description')} icon={<FlourIcon className="h-6 w-6" />}>
          <SliderInput label={t('form.hydration')} name="hydration" value={config.hydration} onChange={handleNumberChange} min={isBasic ? 50 : 0} max={100} step={1} unit="%" tooltip={t('form.hydration_tooltip')} hasError={!!errors.hydration} disabled={isBasic} disabledTooltip={t('form.advanced_mode_tooltip')} presetValue={currentPreset?.defaultHydration} />
          <SliderInput label={t('results.salt')} name="salt" value={config.salt} onChange={handleNumberChange} min={0} max={isBasic ? 4 : 5} step={0.1} unit="%" tooltip={t('form.salt_tooltip')} hasError={!!errors.salt} disabled={isBasic} disabledTooltip={t('form.advanced_mode_tooltip')} presetValue={currentPreset?.defaultSalt} />
          <SliderInput label={t('results.oil')} name="oil" value={config.oil} onChange={handleNumberChange} min={0} max={isBasic ? 10 : 20} step={0.5} unit="%" tooltip={t('form.oil_tooltip')} hasError={!!errors.oil} disabled={isBasic} disabledTooltip={t('form.advanced_mode_tooltip')} presetValue={currentPreset?.defaultOil} />
          <SliderInput label={t('form.sugar')} name="sugar" value={config.sugar || 0} onChange={handleNumberChange} min={0} max={isBasic ? 10 : 20} step={0.5} unit="%" tooltip={t('form.sugar_tooltip')} hasError={!!errors.sugar} disabled={isBasic} disabledTooltip={t('form.advanced_mode_tooltip')} presetValue={currentPreset?.defaultSugar} />
           <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
             <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="yeastType" className="mb-1 block text-sm font-medium">{t('form.yeast_type')}</label>
                    <select id="yeastType" name="yeastType" value={config.yeastType} onChange={handleSelectChange} className={getSelectClasses()}>
                        {YEAST_OPTIONS.map((opt) => (<option key={opt.value} value={opt.value}>{t(opt.labelKey)}</option>))}
                    </select>
                </div>
                <SliderInput label={isAnySourdough ? t('form.levain') : t('form.yeast')} name="yeastPercentage" value={config.yeastPercentage} onChange={handleNumberChange} min={0} max={isAnySourdough ? (isBasic ? 30 : 200) : (isBasic ? 2 : 5)} step={isAnySourdough ? 1 : 0.1} unit="%" tooltip={t('form.yeast_tooltip')} hasError={!!errors.yeastPercentage} />
            </div>
             {config.yeastType === YeastType.USER_LEVAIN && (
                <div className="mt-4">
                  {levains.length > 0 ? (
                    <>
                      <label htmlFor="levainId" className="mb-1 block text-sm font-medium">{t('form.select_levain')}</label>
                      <select id="levainId" name="levainId" value={config.levainId || ''} onChange={handleSelectChange} className={getSelectClasses()}>
                          {levains.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                      </select>
                      {selectedLevain && (
                        <div className="mt-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 p-3 text-sm">
                          <p><span className="font-semibold">{t('form.using_levain')}:</span> {selectedLevain.name}</p>
                          <p><span className="font-semibold">{t('form.levain_hydration')}:</span> {selectedLevain.hydration}%</p>
                          <p><span className="font-semibold">{t('form.levain_fed')}:</span> {hoursBetween(new Date().toISOString(), selectedLevain.lastFeeding).toFixed(1)} {t('form.levain_hours_ago')}</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center text-sm text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 p-3 rounded-lg">
                      <p>{t('form.no_levain_found')} <a href="#/mylab/levain" className="font-semibold text-lime-600 hover:underline dark:text-lime-400">{t('form.create_one_link')}</a></p>
                    </div>
                  )}
                </div>
             )}
           </div>
      </FormSection>

      {!isBasic && (
        <FormSection title={t('form.sections.conditionals.title')} description={t('form.sections.conditionals.description')} icon={<FireIcon className="h-6 w-6" />}>
            <div className="space-y-6">
              <div>
                  <label htmlFor="flourId" className="mb-1 block text-sm font-medium">{t('form.flour_type')}</label>
                  <select id="flourId" name="flourId" value={config.flourId} onChange={handleSelectChange} className={getSelectClasses()}>
                      {FLOURS.map((opt) => (<option key={opt.id} value={opt.id}>{opt.name}</option>))}
                  </select>
              </div>
              <div>
                  <label htmlFor="ambientTemperature" className="mb-1 block text-sm font-medium">{t('form.ambient_temperature')}</label>
                  <select id="ambientTemperature" name="ambientTemperature" value={config.ambientTemperature} onChange={handleSelectChange} className={getSelectClasses()}>
                      {AMBIENT_TEMPERATURE_OPTIONS.map((opt) => (<option key={opt.value} value={opt.value}>{t(opt.labelKey)}</option>))}
                  </select>
              </div>
              <SliderInput
                label={t('form.baking_temp')}
                name="bakingTempC"
                value={config.bakingTempC}
                onChange={handleNumberChange}
                min={150}
                max={500}
                step={5}
                unit="°C"
                tooltip={t('form.baking_temp_tooltip')}
                hasError={!!errors.bakingTempC}
              />
            </div>
        </FormSection>
      )}

      {!isBasic && (
        <>
            <FormSection title={t('form.sections.notes.title')} description={t('form.sections.notes.description')} icon={<PencilIcon className="h-6 w-6" />}>
                <div className="relative">
                <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={config.notes || ''}
                    onChange={handleTextareaChange}
                    placeholder={hasProAccess ? t('batch_detail.notes_placeholder') : t('pro.locked_tooltip')}
                    className="w-full rounded-lg border-slate-300 bg-slate-50 p-2 text-slate-900 focus:border-lime-500 focus:ring-lime-500 disabled:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:disabled:bg-slate-700/50"
                    disabled={!hasProAccess}
                />
                {!hasProAccess && (
                    <div
                    className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-lg bg-white/50 backdrop-blur-sm dark:bg-slate-800/50"
                    onClick={onOpenPaywall}
                    title={t('pro.locked_tooltip')}
                    >
                    <div className="flex items-center gap-2 rounded-full bg-lime-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                        <LockClosedIcon className="h-4 w-4" />
                        {t('pro.go_pro_header')}
                    </div>
                    </div>
                )}
                </div>
            </FormSection>

            <FormSection title={t('form.sections.save_preset.title')} description={t('form.sections.save_preset.description')} icon={<BookmarkSquareIcon className="h-6 w-6" />}>
                 <button
                    onClick={handleSavePreset}
                    className="w-full flex items-center justify-center gap-2 rounded-md bg-lime-500 py-2 px-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-lime-600"
                >
                    {t('form.save_preset')}
                </button>
            </FormSection>
        </>
      )}

      <div>
        <button type="button" onClick={onReset} className="w-full rounded-lg bg-slate-200 py-3 px-4 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 dark:focus:ring-offset-slate-800">
          {t('form.reset')}
        </button>
      </div>
    </div>
  );
};

export default CalculatorForm;