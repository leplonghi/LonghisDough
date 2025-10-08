import React from 'react';
import {
  DoughConfig,
  YeastType,
  RecipeStyle,
  FermentationTechnique,
} from '../types';
import { YEAST_OPTIONS } from '../constants';
import SliderInput from './SliderInput';

interface CalculatorFormProps {
  config: DoughConfig;
  onConfigChange: (newConfig: Partial<DoughConfig>) => void;
  onStyleChange: (style: RecipeStyle) => void;
  onReset: () => void;
}

const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div>
    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
      {title}
    </h3>
    <div className="space-y-6">{children}</div>
  </div>
);

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
  onConfigChange,
  onStyleChange,
  onReset,
}) => {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onConfigChange({ [e.target.name]: Number(e.target.value) });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onConfigChange({ [e.target.name]: e.target.value as YeastType });
  };

  const handleTechniqueChange = (technique: FermentationTechnique) => {
    onConfigChange({ fermentationTechnique: technique });
  };

  return (
    <div className="space-y-8 rounded-2xl bg-white p-6 shadow-lg transition-colors duration-300 dark:bg-slate-800 sm:p-8">
      <FormSection title="Recipe Style">
        <div className="grid grid-cols-3 gap-3">
          <ChoiceButton
            active={config.recipeStyle === RecipeStyle.NAPOLETANA}
            onClick={() => onStyleChange(RecipeStyle.NAPOLETANA)}
          >
            Napoletana
          </ChoiceButton>
          <ChoiceButton
            active={config.recipeStyle === RecipeStyle.NY}
            onClick={() => onStyleChange(RecipeStyle.NY)}
          >
            New York
          </ChoiceButton>
          <ChoiceButton
            active={config.recipeStyle === RecipeStyle.ROMANA}
            onClick={() => onStyleChange(RecipeStyle.ROMANA)}
          >
            Romana
          </ChoiceButton>
        </div>
      </FormSection>

      <FormSection title="Core Parameters">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="numPizzas"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Number of Pizzas
            </label>
            <input
              type="number"
              id="numPizzas"
              name="numPizzas"
              value={config.numPizzas}
              onChange={handleNumberChange}
              min="1"
              className="w-full rounded-lg border-slate-300 bg-slate-50 p-2 text-slate-900 focus:border-lime-500 focus:ring-lime-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Enter the total number of dough balls you want to make.
            </p>
          </div>
          <div>
            <label
              htmlFor="doughBallWeight"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Weight per Pizza (g)
            </label>
            <input
              type="number"
              id="doughBallWeight"
              name="doughBallWeight"
              value={config.doughBallWeight}
              onChange={handleNumberChange}
              min="100"
              step="10"
              className="w-full rounded-lg border-slate-300 bg-slate-50 p-2 text-slate-900 focus:border-lime-500 focus:ring-lime-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Typical range: 250g-300g for Neapolitan style.
            </p>
          </div>
        </div>
        <SliderInput
          label="Hydration"
          name="hydration"
          value={config.hydration}
          onChange={handleNumberChange}
          min={50}
          max={100}
          step={1}
          unit="%"
          tooltip="The amount of water relative to flour. Higher hydration leads to a softer, airier crumb but can be harder to handle."
        />
      </FormSection>

      <FormSection title="Fermentation">
        <div className="grid grid-cols-3 gap-3">
          <ChoiceButton
            active={config.fermentationTechnique === FermentationTechnique.DIRECT}
            onClick={() => handleTechniqueChange(FermentationTechnique.DIRECT)}
          >
            Direct
          </ChoiceButton>
          <ChoiceButton
            active={
              config.fermentationTechnique === FermentationTechnique.POOLISH
            }
            onClick={() => handleTechniqueChange(FermentationTechnique.POOLISH)}
          >
            Poolish
          </ChoiceButton>
          <ChoiceButton
            active={config.fermentationTechnique === FermentationTechnique.BIGA}
            onClick={() => handleTechniqueChange(FermentationTechnique.BIGA)}
          >
            Biga
          </ChoiceButton>
        </div>

        {config.fermentationTechnique !== FermentationTechnique.DIRECT && (
          <SliderInput
            label="Preferment Flour"
            name="prefermentFlourPercentage"
            value={config.prefermentFlourPercentage}
            onChange={handleNumberChange}
            min={10}
            max={100}
            step={5}
            unit="%"
            tooltip="The percentage of total flour used in the preferment. Higher percentages develop more flavor but reduce fermentation time."
          />
        )}

        <div className="grid grid-cols-1 items-end gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="yeastType"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Yeast Type
            </label>
            <select
              id="yeastType"
              name="yeastType"
              value={config.yeastType}
              onChange={handleSelectChange}
              className="w-full rounded-lg border-slate-300 bg-slate-50 p-2 text-slate-900 focus:border-lime-500 focus:ring-lime-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
            >
              {YEAST_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <SliderInput
              label="Yeast"
              name="yeastPercentage"
              value={config.yeastPercentage}
              onChange={handleNumberChange}
              min={0}
              max={3}
              step={0.1}
              unit="%"
              tooltip="Controls the speed of fermentation. Adjust based on your desired proofing time and ambient temperature."
            />
          </div>
        </div>
      </FormSection>

      <div>
        <button
          type="button"
          onClick={onReset}
          className="mt-4 w-full rounded-lg bg-slate-200 py-2 px-4 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 dark:focus:ring-offset-slate-800"
          aria-label="Reset form to default values"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default CalculatorForm;
