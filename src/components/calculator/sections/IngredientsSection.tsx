
import React from 'react';
import {
  DoughConfig,
  IngredientConfig,
  YeastType,
  Levain,
  DoughStyleDefinition,
} from '@/types';
import { YEAST_OPTIONS } from '@/constants';
import SliderInput from '@/components/ui/SliderInput';
import IngredientTableEditor from '@/components/calculator/IngredientTableEditor';
import {
  CubeIcon,
  WaterIcon,
  SaltIcon,
  OilIcon,
  WrenchScrewdriverIcon,
  LockClosedIcon,
} from '@/components/ui/Icons';
import { timeSince } from '@/helpers';

interface IngredientsSectionProps {
  config: DoughConfig;
  errors: any;
  onConfigChange: (newConfig: Partial<DoughConfig>) => void;
  onYeastTypeChange: (yeastType: YeastType) => void;
  calculatorMode: 'basic' | 'advanced';
  levains: Levain[];
  selectedLevain: Levain | null;
  getSelectClasses: () => string;
  onCalculatorModeChange: (mode: 'basic' | 'advanced') => void;
  hasProAccess: boolean;
  onOpenPaywall: () => void;
  activeStyle?: DoughStyleDefinition;
}

const CompactParamCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number;
  unit?: string;
  colorClass: string;
}> = ({ icon, label, value, unit = '%', colorClass }) => (
  <div className="flex flex-row items-center justify-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm transition-all hover:bg-white hover:shadow-md">
    <div className={`flex-shrink-0 rounded-full p-1.5 ${colorClass} bg-opacity-15`}>
      {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: `h-4 w-4 ${colorClass.replace('bg-', 'text-')}` })}
    </div>
    <div className="flex flex-col items-start leading-tight">
       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{label}</span>
       <span className="text-base font-bold text-slate-800">
        {value}<span className="text-xs font-medium text-slate-500 ml-0.5">{unit}</span>
       </span>
    </div>
  </div>
);

const IngredientsSection: React.FC<IngredientsSectionProps> = ({
  config,
  errors,
  onConfigChange,
  onYeastTypeChange,
  calculatorMode,
  levains,
  selectedLevain,
  getSelectClasses,
  onCalculatorModeChange,
  hasProAccess,
  onOpenPaywall,
  activeStyle,
}) => {
  const isBasic = calculatorMode === 'basic';
  const isAnySourdough = [YeastType.SOURDOUGH_STARTER, YeastType.USER_LEVAIN].includes(config.yeastType);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === '' ? 0 : Number(value);
    if (!isNaN(numValue)) {
      onConfigChange({ [name]: numValue });
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'yeastType') {
      onYeastTypeChange(value as YeastType);
    } else {
      onConfigChange({ [name]: value });
    }
  };

  const handleIngredientsUpdate = (newIngredients: IngredientConfig[]) => {
      onConfigChange({ ingredients: newIngredients });
  };
  
  // Helper to get ranges safely
  const getRange = (key: 'hydration' | 'salt' | 'oil' | 'sugar') => {
      if (!activeStyle || !activeStyle.technicalProfile) return undefined;
      // @ts-ignore - technicalProfile keys match
      return activeStyle.technicalProfile[key];
  }

  return (
    <div className="space-y-6">
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
                <SliderInput 
                    label="Hydration" 
                    name="hydration" 
                    value={config.hydration} 
                    onChange={handleNumberChange} 
                    min={0} max={120} step={1} unit="%" 
                    tooltip="Water-to-flour ratio." 
                    hasError={!!errors.hydration} 
                    recommendedMin={getRange('hydration')?.[0]}
                    recommendedMax={getRange('hydration')?.[1]}
                />
                <SliderInput 
                    label="Salt" 
                    name="salt" 
                    value={config.salt} 
                    onChange={handleNumberChange} 
                    min={0} max={5} step={0.1} unit="%" 
                    tooltip="Flavor and gluten strengthener." 
                    hasError={!!errors.salt} 
                    recommendedMin={getRange('salt')?.[0]}
                    recommendedMax={getRange('salt')?.[1]}
                />
                <SliderInput 
                    label="Oil/Fat" 
                    name="oil" 
                    value={config.oil} 
                    onChange={handleNumberChange} 
                    min={0} max={100} step={0.5} unit="%" 
                    tooltip="Softness and crust browning." 
                    hasError={!!errors.oil} 
                    recommendedMin={getRange('oil')?.[0]}
                    recommendedMax={getRange('oil')?.[1]}
                />
                <SliderInput 
                    label="Sugar" 
                    name="sugar" 
                    value={config.sugar || 0} 
                    onChange={handleNumberChange} 
                    min={0} max={100} step={0.5} unit="%" 
                    tooltip="Yeast food and browning." 
                    hasError={!!errors.sugar} 
                    recommendedMin={getRange('sugar')?.[0]}
                    recommendedMax={getRange('sugar')?.[1]}
                />
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
                <div className="relative">
                    <div className={!hasProAccess ? "opacity-40 pointer-events-none select-none filter blur-[1px]" : ""}>
                        <IngredientTableEditor 
                            ingredients={config.ingredients}
                            onChange={handleIngredientsUpdate}
                        />
                    </div>
                    {!hasProAccess && (
                       <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl">
                           <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-200 text-center max-w-xs mx-auto transform transition-transform hover:scale-105 cursor-pointer" onClick={onOpenPaywall}>
                              <div className="flex justify-center mb-3 text-lime-600">
                                  <LockClosedIcon className="h-8 w-8" />
                              </div>
                              <h4 className="font-bold text-slate-900 text-lg">Blend flours like a master</h4>
                              <p className="text-xs text-slate-500 mt-2 mb-4">Advanced ingredient management is available on Pro.</p>
                              <span className="inline-flex items-center gap-1 rounded-full bg-lime-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                                Unlock Pro
                              </span>
                           </div>
                       </div>
                    )}
                </div>
           )}
    </div>
  );
};

export default IngredientsSection;
