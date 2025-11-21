import React from 'react';
import { DoughConfig, CalculationMode, BakeType, FormErrors } from '../../../types';
import FormSection from '../AccordionSection';
import { ParametersIcon } from '../../IconComponents';
import ChoiceButton from '../../ui/ChoiceButton';

interface QuantitySectionProps {
  config: DoughConfig;
  calculationMode: CalculationMode;
  onCalculationModeChange: (mode: CalculationMode) => void;
  onConfigChange: (newConfig: Partial<DoughConfig>) => void;
  errors: FormErrors;
  inputRefs: { numPizzas: React.Ref<HTMLInputElement> };
}

const QuantitySection: React.FC<QuantitySectionProps> = ({ config, calculationMode, onCalculationModeChange, onConfigChange, errors, inputRefs }) => {
    
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === '' ? 0 : Number(value);
    if (!isNaN(numValue)) {
      onConfigChange({ [name]: numValue });
    }
  };

  const getInputClasses = (hasError: boolean) => `w-full rounded-lg bg-slate-50 p-2 text-slate-900 border ${hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-lime-500 focus:ring-lime-500'}`;

  return (
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
  );
};

export default QuantitySection;