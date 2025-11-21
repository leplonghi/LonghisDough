
import React from 'react';
import {
  DoughConfig,
  YeastType,
  BakeType,
  FormErrors,
  CalculationMode,
  Levain,
} from '../types';
import { CloseIcon, SparklesIcon } from './IconComponents';

import PresetLoaderSection from './calculator/sections/PresetLoaderSection';
import StyleSection from './calculator/sections/StyleSection';
import QuantitySection from './calculator/sections/QuantitySection';
import FermentationSection from './calculator/sections/FermentationSection';
import IngredientsSection from './calculator/sections/IngredientsSection';
import EnvironmentSection from './calculator/sections/EnvironmentSection';
import NotesSection from './calculator/sections/NotesSection';
import { useTranslation } from '../i18n';

interface CalculatorFormProps {
  config: DoughConfig;
  errors: FormErrors;
  onConfigChange: (newConfig: Partial<DoughConfig>) => void;
  onBakeTypeChange: (bakeType: BakeType) => void;
  onStyleChange: (presetId: string) => void;
  onYeastTypeChange: (yeastType: YeastType) => void;
  onResetCalculatorConfig: () => void; // Corrected prop name
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
  onResetCalculatorConfig, // Corrected prop name
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
  const { t } = useTranslation();
  const isBasic = calculatorMode === 'basic';
  
  // This state variable is not used after the refactoring, so it can be removed.
  // const [presetRefreshTrigger, setPresetRefreshTrigger] = useState(0);

  return (
    <div className="space-y-6">
        <div className="text-center">
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${isBasic ? 'bg-sky-100 text-sky-800' : 'bg-lime-100 text-lime-800'}`}>
            {isBasic ? t('mode_toggle.basic_tag') : t('mode_toggle.advanced_tag')}
            </span>
        </div>

      {config.baseStyleName && (
        <div className="flex items-center justify-between rounded-lg bg-lime-50 p-3 text-sm text-lime-800 border border-lime-200 shadow-sm">
           <div className="flex items-center gap-2">
              <SparklesIcon className="h-5 w-5 text-lime-600" />
              <span>{t('form.base_style', { defaultValue: 'Base Style' })}: <strong>{config.baseStyleName}</strong></span>
           </div>
           <button 
             onClick={() => onConfigChange({ baseStyleName: undefined })} 
             className="rounded-full p-1 hover:bg-lime-200 transition-colors"
             title={t('form.clear_style_button', { defaultValue: 'Clear style' })}
           >
              <CloseIcon className="h-4 w-4" />
           </button>
        </div>
      )}
      
      {!isBasic && (
        <PresetLoaderSection onConfigChange={onConfigChange} />
      )}

      <StyleSection 
          config={config} 
          onBakeTypeChange={onBakeTypeChange} 
          onStyleChange={onStyleChange} 
          isBasic={isBasic} 
      />

      <FermentationSection 
          config={config} 
          onConfigChange={onConfigChange} 
          isBasic={isBasic} 
          errors={errors} 
      />

      <QuantitySection 
          config={config} 
          calculationMode={calculationMode} 
          onCalculationModeChange={onCalculationModeChange} 
          onConfigChange={onConfigChange} 
          errors={errors} 
          inputRefs={inputRefs} 
      />

      <IngredientsSection 
          config={config} 
          onConfigChange={onConfigChange} 
          onYeastTypeChange={onYeastTypeChange}
          onCalculatorModeChange={onCalculatorModeChange}
          isBasic={isBasic}
          errors={errors}
          levains={levains}
          selectedLevain={selectedLevain}
      />

      {!isBasic && (
        <EnvironmentSection 
            config={config} 
            onConfigChange={onConfigChange} 
            errors={errors} 
        />
      )}

      {!isBasic && (
        <NotesSection 
            config={config} 
            onConfigChange={onConfigChange} 
            hasProAccess={hasProAccess} 
            onOpenPaywall={onOpenPaywall}
            refreshPresets={() => { /* setPresetRefreshTrigger(prev => prev + 1) - removed */ }} 
        />
      )}

      <div>
        <button type="button" onClick={onResetCalculatorConfig} className="w-full rounded-lg bg-slate-200 py-3 px-4 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2">
          {t('form.reset')}
        </button>
      </div>
    </div>
  );
};

export default CalculatorForm;