import React from 'react';
import { DoughConfig, CalculationMode, BakeType } from '@/types';
import ChoiceButton from '@/components/ui/ChoiceButton';
import FormSection from '@/components/calculator/AccordionSection';
import { ParametersIcon } from '@/components/ui/Icons';

interface QuantitySectionProps {
  config: DoughConfig;
  calculationMode: CalculationMode;
  onCalculationModeChange: (mode: CalculationMode) => void;
  onConfigChange: (newConfig: Partial<DoughConfig>) => void;
  errors: any;
  getInputClasses: (hasError: boolean) => string;
  numPizzasRef: React.Ref<HTMLInputElement>;
}

const QuantitySection: React.FC<QuantitySectionProps> = ({
  config,
  calculationMode,
  onCalculationModeChange,
  onConfigChange,
  errors,
  getInputClasses,
  numPizzasRef,
}) => {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === '' ? 0 : Number(value);
    if (!isNaN(numValue)) {
      onConfigChange({ [name]: numValue });
    }
  };

  return (
    <FormSection
      title="Quantity"
      description="Define how many dough balls or the total flour weight."
      icon={<ParametersIcon className="h-6 w-6" />}
    >
      <div className="grid grid-cols-2 gap-3">
        <ChoiceButton
          active={calculationMode === 'mass'}
          onClick={() => onCalculationModeChange('mass')}
        >
          By Total Weight
        </ChoiceButton>
        <ChoiceButton
          active={calculationMode === 'flour'}
          onClick={() => onCalculationModeChange('flour')}
        >
          By Flour Weight
        </ChoiceButton>
      </div>
      {calculationMode === 'mass' ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="numPizzas"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              {config.bakeType === BakeType.PIZZAS
                ? 'Number of Pizzas'
                : 'Number of Loaves'}
            </label>
            <input
              type="number"
              id="numPizzas"
              name="numPizzas"
              value={config.numPizzas || ''}
              onChange={handleNumberChange}
              min="1"
              max="100"
              className={getInputClasses(!!errors.numPizzas)}
              ref={numPizzasRef}
            />
          </div>
          <div>
            <label
              htmlFor="doughBallWeight"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              {config.bakeType === BakeType.PIZZAS
                ? 'Weight per Ball (g)'
                : 'Weight per Loaf (g)'}
            </label>
            <input
              type="number"
              id="doughBallWeight"
              name="doughBallWeight"
              value={config.doughBallWeight || ''}
              onChange={handleNumberChange}
              min="100"
              max="2000"
              step="10"
              className={getInputClasses(!!errors.doughBallWeight)}
            />
          </div>
        </div>
      ) : (
        <div>
          <label
            htmlFor="totalFlour"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Total Flour (g)
          </label>
          <input
            type="number"
            id="totalFlour"
            name="totalFlour"
            value={config.totalFlour || ''}
            onChange={handleNumberChange}
            min="100"
            max="10000"
            step="50"
            className={getInputClasses(!!errors.totalFlour)}
          />
        </div>
      )}
    </FormSection>
  );
};

export default QuantitySection;