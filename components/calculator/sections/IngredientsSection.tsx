import React, { useMemo } from 'react';
import { DoughConfig, YeastType, FormErrors, Levain, IngredientConfig } from '../../../types';
import FormSection from '../AccordionSection';
import { FlourIcon, WaterIcon, SaltIcon, OilIcon, CubeIcon, WrenchScrewdriverIcon, CubeIcon as GenericCubeIcon } from '../../IconComponents';
import SliderInput from '../../SliderInput';
import CompactParamCard from '../CompactParamCard';
import { FLOURS } from '../../../flours-constants';
import { YEAST_OPTIONS } from '../../../constants';
import FlourBlendEditor from '../FlourBlendEditor';
import IngredientTableEditor from '../IngredientTableEditor';
import { timeSince } from '../../../helpers';

interface IngredientsSectionProps { 
    config: DoughConfig; 
    onConfigChange: (newConfig: Partial<DoughConfig>) => void; 
    onYeastTypeChange: (type: YeastType) => void; 
    onCalculatorModeChange: (mode: 'basic' | 'advanced') => void; 
    isBasic: boolean; 
    errors: FormErrors; 
    levains: Levain[]; 
    selectedLevain: Levain | null; 
}

const IngredientsSection: React.FC<IngredientsSectionProps> = ({ 
    config, 
    onConfigChange, 
    onYeastTypeChange,
    onCalculatorModeChange,
    isBasic, 
    errors,
    levains,
    selectedLevain
}) => {
    
  const isAnySourdough = [YeastType.SOURDOUGH_STARTER, YeastType.USER_LEVAIN].includes(config.yeastType);
  const getSelectClasses = () => "w-full rounded-lg border-slate-300 bg-slate-50 p-2 text-slate-900 focus:border-lime-500 focus:ring-lime-500";

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === '' ? 0 : Number(value);
    if (!isNaN(numValue)) {
      // FIX: The onConfigChange function expects a single object argument of type Partial<DoughConfig>.
      // The current call site `{ [name]: numValue } as Partial<DoughConfig>` already provides this.
      onConfigChange({ [name]: numValue } as Partial<DoughConfig>);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'yeastType') {
      onYeastTypeChange(value as YeastType);
    } else if (name === 'flourId') {
        // FIX: The onConfigChange function expects a single object argument of type Partial<DoughConfig>.
        // The current call site `{ [name]: value } as Partial<DoughConfig>` already provides this.
        onConfigChange({ [name]: value } as Partial<DoughConfig>);
    } else {
      // FIX: The onConfigChange function expects a single object argument of type Partial<DoughConfig>.
      // The current call site `{ [name]: value } as Partial<DoughConfig>` already provides this.
      onConfigChange({ [name]: value } as Partial<DoughConfig>);
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
      
      // FIX: The onConfigChange function expects a single object argument of type Partial<DoughConfig>.
      // The current call site `newConfig` already provides this.
      onConfigChange(newConfig);
  };

  const handleIngredientsUpdate = (newIngredients: IngredientConfig[]) => {
      // FIX: The onConfigChange function expects a single object argument of type Partial<DoughConfig>.
      // The current call site `{ ingredients: newIngredients }` already provides this.
      onConfigChange({ ingredients: newIngredients });
  };
  
  const handleFlourBlendUpdate = (newIngredients: IngredientConfig[], mainFlourId: string) => {
      // FIX: The onConfigChange function expects a single object argument of type Partial<DoughConfig>.
      // The current call site `{ ingredients: newIngredients, flourId: mainFlourId }` already provides this.
      onConfigChange({ 
          ingredients: newIngredients,
          flourId: mainFlourId 
      });
  }

  return (
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
                    value={Number((config.hydration || 0).toFixed(1))} 
                    colorClass="text-blue-500 bg-blue-500"
                />
                <CompactParamCard 
                    icon={<SaltIcon />} 
                    label="Salt" 
                    value={Number((config.salt || 0).toFixed(1))} 
                    colorClass="text-slate-500 bg-slate-500"
                />
                 <CompactParamCard 
                    icon={<OilIcon />} 
                    label="Oil" 
                    value={Number((config.oil || 0).toFixed(1))} 
                    colorClass="text-amber-500 bg-amber-500"
                />
                 <CompactParamCard 
                    icon={<GenericCubeIcon />} 
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
                             <GenericCubeIcon className="h-5 w-5" />
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
  );
};

export default IngredientsSection;