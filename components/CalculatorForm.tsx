
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
  IngredientConfig,
} from '../types';
import {
  YEAST_OPTIONS,
  DOUGH_STYLE_PRESETS,
  AMBIENT_TEMPERATURE_OPTIONS,
} from '../constants';
import * as customPresets from '../logic/customPresets';
import { FLOURS } from '../flours-constants';
import SliderInput from './SliderInput';
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
  CloseIcon,
  SparklesIcon,
  WaterIcon,
  SaltIcon,
  OilIcon,
  CubeIcon,
  WrenchScrewdriverIcon,
} from './IconComponents';
import FormSection from './calculator/AccordionSection';
import { useToast } from './ToastProvider';
import { hoursBetween, timeSince } from '../helpers';
import IngredientTableEditor from './calculator/IngredientTableEditor';
import FlourBlendEditor from './calculator/FlourBlendEditor'; // New Import
import { syncIngredientsFromConfig } from '../logic/doughMath';

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

const ChoiceButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full rounded-lg px-4 py-2 text-center text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 ${
      active
        ? 'bg-lime-500 text-white font-semibold shadow-md'
        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
    }`}
  >
    {children}
  </button>
);

const CompactParamCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number;
  unit?: string;
  colorClass: string;
}> = ({ icon, label, value, unit = '%', colorClass }) => (
  <div className="flex flex-row items-center justify-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm transition-all hover:bg-white hover:shadow-md">
    <div className={`flex-shrink-0 rounded-full p-1.5 ${colorClass} bg-opacity-15`}>
      {React.cloneElement(icon as React.ReactElement, { className: `h-4 w-4 ${colorClass.replace('bg-', 'text-')}` })}
    </div>
    <div className="flex flex-col items-start leading-tight">
       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{label}</span>
       <span className="text-base font-bold text-slate-800">
        {value}<span className="text-xs font-medium text-slate-500 ml-0.5">{unit}</span>
       </span>
    </div>
  </div>
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
    } else if (name === 'flourId') {
        // Legacy/Basic handler (replaced by handleFlourChange for ingredients sync)
        onConfigChange({ [name]: value });
    } else {
      onConfigChange({ [name]: value });
    }
  };
  
  const handleFlourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newFlourId = e.target.value;
      const flourDef = FLOURS.find(f => f.id === newFlourId);
      
      const newConfig: Partial<DoughConfig> = { flourId: newFlourId };
      
      if (config.ingredients) {
          const newIngredients = config.ingredients.map(ing => {
              // Update the main flour ingredient
              if (ing.role === 'flour' && ing.id === config.flourId) {
                  return { ...ing, id: newFlourId, name: flourDef?.name || ing.name };
              }
              return ing;
          });
          newConfig.ingredients = newIngredients;
      }
      
      onConfigChange(newConfig);
  };
  
  const handleResetPreset = () => {
    if (config.stylePresetId) {
      onStyleChange(config.stylePresetId);
    }
  };

  const handleIngredientsUpdate = (newIngredients: IngredientConfig[]) => {
      onConfigChange({ ingredients: newIngredients });
  };
  
  const handleFlourBlendUpdate = (newIngredients: IngredientConfig[], mainFlourId: string) => {
      onConfigChange({ 
          ingredients: newIngredients,
          flourId: mainFlourId // Keep the main flour ID in sync for legacy/environment checks
      });
  }

  const recipeStylesToShow = DOUGH_STYLE_PRESETS.filter(p => p.type === config.bakeType);
  
  const currentPreset = useMemo(() => 
    DOUGH_STYLE_PRESETS.find(p => p.id === config.stylePresetId),
  [config.stylePresetId]);

  const getInputClasses = (hasError: boolean) => `w-full rounded-lg bg-slate-50 p-2 text-slate-900 border ${hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-lime-500 focus:ring-lime-500'}`;
  const getSelectClasses = () => "w-full rounded-lg border-slate-300 bg-slate-50 p-2 text-slate-900 focus:border-lime-500 focus:ring-lime-500";

  const isAnySourdough = [YeastType.SOURDOUGH_STARTER, YeastType.USER_LEVAIN].includes(config.yeastType);

  return (
    <div className="space-y-6">
        <div className="text-center">
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${isBasic ? 'bg-sky-100 text-sky-800' : 'bg-lime-100 text-lime-800'}`}>
            {isBasic ? 'Guided Mode' : 'Advanced Mode'}
            </span>
        </div>

      {config.baseStyleName && (
        <div className="flex items-center justify-between rounded-lg bg-lime-50 p-3 text-sm text-lime-800 border border-lime-200 shadow-sm">
           <div className="flex items-center gap-2">
              <SparklesIcon className="h-5 w-5 text-lime-600" />
              <span>Base Style: <strong>{config.baseStyleName}</strong></span>
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
        <FormSection title="Load Custom Preset" description="Start from one of your saved dough formulas." icon={<BookmarkSquareIcon className="h-6 w-6" />}>
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
                            presets.map(p => <option key={p.name} value={p.name}>{p.name}</option>)
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

      <FormSection title="Dough Style" description="Start by choosing the result you're aiming for." icon={<RecipeIcon className="h-6 w-6" />}>
          <div className="grid grid-cols-3 gap-3">
              <ChoiceButton active={config.bakeType === BakeType.PIZZAS} onClick={() => onBakeTypeChange(BakeType.PIZZAS)}>Pizzas</ChoiceButton>
              <ChoiceButton active={config.bakeType === BakeType.BREADS_SAVORY} onClick={() => onBakeTypeChange(BakeType.BREADS_SAVORY)}>Breads</ChoiceButton>
              <ChoiceButton active={config.bakeType === BakeType.SWEETS_PASTRY} onClick={() => onBakeTypeChange(BakeType.SWEETS_PASTRY)}>Pastry</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {recipeStylesToShow.map((preset) => (
                  <ChoiceButton key={preset.id} active={config.stylePresetId === preset.id} onClick={() => onStyleChange(preset.id)}>{preset.name}</ChoiceButton>
              ))}
          </div>
           {isBasic && currentPreset && (
             <div className="pt-4 mt-4 border-t border-slate-200">
                <button
                    onClick={handleResetPreset}
                    className="w-full text-sm font-semibold text-lime-600 hover:underline"
                >
                    Reset to "{currentPreset.name}" recommended values
                </button>
             </div>
           )}
      </FormSection>

      <FormSection title="Fermentation Technique" description="Choose between a direct method or a preferment." icon={<FermentationIcon className="h-6 w-6" />}>
           {isAnySourdough ? (
             <p className="text-center text-sm text-slate-600 bg-slate-100 p-3 rounded-lg">Sourdough Starter acts as the preferment. Biga/Poolish options disabled.</p>
           ) : (
            <>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <ChoiceButton active={config.fermentationTechnique === FermentationTechnique.DIRECT} onClick={() => onConfigChange({ fermentationTechnique: FermentationTechnique.DIRECT })}>Direct</ChoiceButton>
                  <ChoiceButton active={config.fermentationTechnique === FermentationTechnique.POOLISH} onClick={() => onConfigChange({ fermentationTechnique: FermentationTechnique.POOLISH })}>Poolish</ChoiceButton>
                  <ChoiceButton active={config.fermentationTechnique === FermentationTechnique.BIGA} onClick={() => onConfigChange({ fermentationTechnique: FermentationTechnique.BIGA })}>Biga</ChoiceButton>
                </div>
                {(config.fermentationTechnique !== FermentationTechnique.DIRECT) && (
                 <div className="pt-6 border-t border-slate-200">
                     <SliderInput label="% Flour in Preferment" name="prefermentFlourPercentage" value={config.prefermentFlourPercentage} onChange={handleNumberChange} min={isBasic ? (config.fermentationTechnique === FermentationTechnique.BIGA ? 30 : 20) : 0} max={isBasic ? (config.fermentationTechnique === FermentationTechnique.BIGA ? 60 : 50) : 100} step={5} unit="%" tooltip="Percentage of total flour to use in the preferment." hasError={!!errors.prefermentFlourPercentage} />
                 </div>
               )}
            </>
           )}
       </FormSection>

      <FormSection title="Quantity" description="Define how many dough balls or the total flour weight." icon={<ParametersIcon className="h-6 w-6" />}>
          <div className="grid grid-cols-2 gap-3">
              <ChoiceButton active={calculationMode === 'mass'} onClick={() => onCalculationModeChange('mass')}>By Total Weight</ChoiceButton>
              <ChoiceButton active={calculationMode === 'flour'} onClick={() => onCalculationModeChange('flour')}>By Flour Weight</ChoiceButton>
          </div>
          {calculationMode === 'mass' ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="numPizzas" className="mb-1 block text-sm font-medium text-slate-700">{config.bakeType === BakeType.PIZZAS ? "Number of Pizzas" : "Number of Loaves"}</label>
                    <input type="number" id="numPizzas" name="numPizzas" value={config.numPizzas || ''} onChange={handleNumberChange} min="1" max="100" className={getInputClasses(!!errors.numPizzas)} ref={inputRefs.numPizzas} />
                </div>
                <div>
                    <label htmlFor="doughBallWeight" className="mb-1 block text-sm font-medium text-slate-700">{config.bakeType === BakeType.PIZZAS ? "Weight per Ball (g)" : "Weight per Loaf (g)"}</label>
                    <input type="number" id="doughBallWeight" name="doughBallWeight" value={config.doughBallWeight || ''} onChange={handleNumberChange} min="100" max="2000" step="10" className={getInputClasses(!!errors.doughBallWeight)} />
                </div>
            </div>
          ) : (
            <div>
                <label htmlFor="totalFlour" className="mb-1 block text-sm font-medium text-slate-700">Total Flour (g)</label>
                <input type="number" id="totalFlour" name="totalFlour" value={config.totalFlour || ''} onChange={handleNumberChange} min="100" max="10000" step="50" className={getInputClasses(!!errors.totalFlour)} />
            </div>
          )}
      </FormSection>

      <FormSection title="Ingredients" description="Adjust the percentages of each component." icon={<FlourIcon className="h-6 w-6" />}>
        {isBasic && (
            <div className="mb-6">
                <label htmlFor="flourId" className="mb-1 block text-sm font-medium text-slate-700">Flour Type</label>
                <select 
                    id="flourId" 
                    name="flourId" 
                    value={config.flourId} 
                    onChange={handleFlourChange} 
                    className={getSelectClasses()}
                >
                    {FLOURS.map((flour) => (
                        <option key={flour.id} value={flour.id}>
                            {flour.name}
                        </option>
                    ))}
                </select>
            </div>
        )}

        {isBasic ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <CompactParamCard 
                    icon={<WaterIcon />} 
                    label="Hydration" 
                    value={Number(config.hydration.toFixed(1))} 
                    colorClass="text-blue-500 bg-blue-500"
                />
                <CompactParamCard 
                    icon={<SaltIcon />} 
                    label="Salt" 
                    value={Number(config.salt.toFixed(1))} 
                    colorClass="text-slate-500 bg-slate-500"
                />
                 <CompactParamCard 
                    icon={<OilIcon />} 
                    label="Oil" 
                    value={Number(config.oil.toFixed(1))} 
                    colorClass="text-amber-500 bg-amber-500"
                />
                 <CompactParamCard 
                    icon={<CubeIcon />} 
                    label="Sugar" 
                    value={Number((config.sugar || 0).toFixed(1))} 
                    colorClass="text-pink-500 bg-pink-500"
                />
              </div>
              <div className="flex justify-end">
                  <button 
                    onClick={() => onCalculatorModeChange('advanced')}
                    className="flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 hover:underline transition-colors"
                  >
                    <WrenchScrewdriverIcon className="h-3 w-3" />
                    Customize parameters
                  </button>
              </div>
            </div>
        ) : (
            <>
                <SliderInput label="Hydration" name="hydration" value={config.hydration} onChange={handleNumberChange} min={0} max={120} step={1} unit="%" tooltip="Water-to-flour ratio." hasError={!!errors.hydration} />
                <SliderInput label="Salt" name="salt" value={config.salt} onChange={handleNumberChange} min={0} max={5} step={0.1} unit="%" tooltip="Flavor and gluten strengthener." hasError={!!errors.salt} />
                <SliderInput label="Oil/Fat" name="oil" value={config.oil} onChange={handleNumberChange} min={0} max={100} step={0.5} unit="%" tooltip="Softness and crust browning." hasError={!!errors.oil} />
                <SliderInput label="Sugar" name="sugar" value={config.sugar || 0} onChange={handleNumberChange} min={0} max={100} step={0.5} unit="%" tooltip="Yeast food and browning." hasError={!!errors.sugar} />
            </>
        )}

           <div className="pt-6 border-t border-slate-200">
             <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="yeastType" className="mb-1 block text-sm font-medium text-slate-700">Yeast Type</label>
                    <select id="yeastType" name="yeastType" value={config.yeastType} onChange={handleSelectChange} className={getSelectClasses()}>
                        {YEAST_OPTIONS.map((opt) => (<option key={opt.value} value={opt.value}>{opt.labelKey}</option>))}
                    </select>
                </div>
                <SliderInput label={isAnySourdough ? "Starter %" : "Yeast %"} name="yeastPercentage" value={config.yeastPercentage} onChange={handleNumberChange} min={0} max={isAnySourdough ? (isBasic ? 30 : 200) : (isBasic ? 2 : 5)} step={isAnySourdough ? 1 : 0.1} unit="%" tooltip="Percentage relative to flour." hasError={!!errors.yeastPercentage} />
            </div>
             
             {isAnySourdough && (
                <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                  {config.yeastType === YeastType.SOURDOUGH_STARTER && (
                      <div className="flex items-start gap-3">
                         <div className="p-2 bg-white rounded-full shadow-sm text-slate-400">
                             <CubeIcon className="h-5 w-5" />
                         </div>
                         <div>
                             <h4 className="text-sm font-bold text-slate-800">Generic Starter</h4>
                             <p className="text-xs text-slate-600 mt-1">
                                 Assumed Hydration: <strong>100%</strong>.
                             </p>
                             <p className="text-xs text-slate-500 mt-2">
                                 To track your specific starter's hydration and feeding schedule, select <strong>"My Starter"</strong>.
                             </p>
                         </div>
                      </div>
                  )}
                  
                  {config.yeastType === YeastType.USER_LEVAIN && (
                      <>
                        {levains.length > 0 ? (
                            <div className="space-y-3">
                                <div>
                                    <label htmlFor="levainId" className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Selected Levain</label>
                                    <select id="levainId" name="levainId" value={config.levainId || ''} onChange={handleSelectChange} className={getSelectClasses()}>
                                        {levains.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                                    </select>
                                </div>
                                {selectedLevain && (
                                    <div className="bg-white rounded-md border border-slate-200 p-3 shadow-sm grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="block text-xs text-slate-500 uppercase">Hydration</span>
                                            <span className="block text-lg font-bold text-slate-800">{selectedLevain.hydration}%</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs text-slate-500 uppercase">Last Fed</span>
                                            <span className="block text-lg font-bold text-slate-800">{timeSince(selectedLevain.lastFeeding)} ago</span>
                                        </div>
                                        <div className="col-span-2 border-t border-slate-100 pt-2 mt-1">
                                             <span className="block text-xs text-slate-500">Status</span>
                                             <span className={`font-medium ${
                                                selectedLevain.status === 'ativo' ? 'text-green-600' : 
                                                selectedLevain.status === 'precisa_atencao' ? 'text-amber-600' : 'text-slate-600'
                                             }`}>
                                                {selectedLevain.status === 'ativo' ? 'Active' : selectedLevain.status === 'precisa_atencao' ? 'Needs Attention' : 'Resting'}
                                             </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-2">
                                <p className="text-sm text-slate-600 mb-3">No starters found in My Lab.</p>
                                <a href="#/mylab/levain" className="inline-flex items-center justify-center gap-2 rounded-md bg-lime-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-600">
                                    Create Levain
                                </a>
                            </div>
                        )}
                      </>
                  )}
                </div>
             )}
           </div>
           
           {!isBasic && config.ingredients && (
             <>
                <div className="mt-8">
                    <FlourBlendEditor 
                      ingredients={config.ingredients} 
                      mainFlourId={config.flourId} 
                      onChange={handleFlourBlendUpdate} 
                    />
                </div>
                <IngredientTableEditor 
                    ingredients={config.ingredients}
                    onChange={handleIngredientsUpdate}
                    recipeStyle={config.recipeStyle}
                />
             </>
           )}
      </FormSection>

      {!isBasic && (
        <FormSection title="Environmental Conditions" description="Factors that influence fermentation." icon={<FireIcon className="h-6 w-6" />}>
            <div className="space-y-6">
              <div>
                  <label htmlFor="ambientTemperature" className="mb-1 block text-sm font-medium text-slate-700">Room Temperature</label>
                  <select id="ambientTemperature" name="ambientTemperature" value={config.ambientTemperature} onChange={handleSelectChange} className={getSelectClasses()}>
                      {AMBIENT_TEMPERATURE_OPTIONS.map((opt) => (<option key={opt.value} value={opt.value}>{opt.labelKey}</option>))}
                  </select>
              </div>
              <SliderInput
                label="Baking Temperature"
                name="bakingTempC"
                value={config.bakingTempC}
                onChange={handleNumberChange}
                min={150}
                max={500}
                step={5}
                unit="°C"
                tooltip="Target temperature for your oven."
                hasError={!!errors.bakingTempC}
              />
            </div>
        </FormSection>
      )}

      {!isBasic && (
        <>
            <FormSection title="Notes" description="Log observations about this formula." icon={<PencilIcon className="h-6 w-6" />}>
                <div className="relative">
                <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={config.notes || ''}
                    onChange={handleTextareaChange}
                    placeholder={hasProAccess ? "E.g., Fermented for 24h in the fridge..." : "This is a Pro feature."}
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

            <FormSection title="Save Custom Preset" description="Save the current configuration for future use." icon={<BookmarkSquareIcon className="h-6 w-6" />}>
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
        <button type="button" onClick={onReset} className="w-full rounded-lg bg-slate-200 py-3 px-4 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2">
          Reset Fields
        </button>
      </div>
    </div>
  );
};

export default CalculatorForm;
