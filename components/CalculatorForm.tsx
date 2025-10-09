import React from 'react';
import {
  DoughConfig,
  YeastType,
  RecipeStyle,
  FermentationTechnique,
} from '../types';
import { YEAST_OPTIONS } from '../constants';
import SliderInput from './SliderInput';
import { useTranslation } from '../i18n';

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
  const { t } = useTranslation();

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
    <div className="space-y-8 rounded-2xl bg-white p-6 shadow-lg transition-colors duration-300 dark:border dark:border-slate-700 dark:bg-slate-800 sm:p-8">
      <FormSection title={t('form.recipe_style')}>
        <div className="grid grid-cols-3 gap-3">
          <ChoiceButton
            active={config.recipeStyle === RecipeStyle.NAPOLETANA}
            onClick={() => onStyleChange(RecipeStyle.NAPOLETANA)}
          >
            {t('form.napoletana')}
          </ChoiceButton>
          <ChoiceButton
            active={config.recipeStyle === RecipeStyle.NY}
            onClick={() => onStyleChange(RecipeStyle.NY)}
          >
            {t('form.ny')}
          </ChoiceButton>
          <ChoiceButton
            active={config.recipeStyle === RecipeStyle.ROMANA}
            onClick={() => onStyleChange(RecipeStyle.ROMANA)}
          >
            {t('form.romana')}
          </ChoiceButton>
        </div>
      </FormSection>

      <FormSection title={t('form.core_parameters')}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="numPizzas"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              {t('form.num_pizzas')}
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
              {t('form.num_pizzas_note')}
            </p>
          </div>
          <div>
            <label
              htmlFor="doughBallWeight"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              {t('form.weight_per_pizza')}
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
              {t('form.weight_per_pizza_note')}
            </p>
          </div>
        </div>
        <SliderInput
          label={t('form.hydration')}
          name="hydration"
          value={config.hydration}
          onChange={handleNumberChange}
          min={50}
          max={100}
          step={1}
          unit="%"
          tooltip={t('form.hydration_tooltip')}
        />
      </FormSection>

      <FormSection title={t('form.fermentation')}>
        <div className="grid grid-cols-3 gap-3">
          <ChoiceButton
            active={config.fermentationTechnique === FermentationTechnique.DIRECT}
            onClick={() => handleTechniqueChange(FermentationTechnique.DIRECT)}
          >
            {t('form.direct')}
          </ChoiceButton>
          <ChoiceButton
            active={
              config.fermentationTechnique === FermentationTechnique.POOLISH
            }
            onClick={() => handleTechniqueChange(FermentationTechnique.POOLISH)}
          >
            {t('form.poolish')}
          </ChoiceButton>
          <ChoiceButton
            active={config.fermentationTechnique === FermentationTechnique.BIGA}
            onClick={() => handleTechniqueChange(FermentationTechnique.BIGA)}
          >
            {t('form.biga')}
          </ChoiceButton>
        </div>

        {config.fermentationTechnique !== FermentationTechnique.DIRECT && (
          <SliderInput
            label={t('form.preferment_flour')}
            name="prefermentFlourPercentage"
            value={config.prefermentFlourPercentage}
            onChange={handleNumberChange}
            min={10}
            max={100}
            step={5}
            unit="%"
            tooltip={t('form.preferment_flour_tooltip')}
          />
        )}

        <div className="grid grid-cols-1 items-end gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="yeastType"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              {t('form.yeast_type')}
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
                  {t(opt.labelKey)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <SliderInput
              label={t('form.yeast')}
              name="yeastPercentage"
              value={config.yeastPercentage}
              onChange={handleNumberChange}
              min={0}
              max={3}
              step={0.1}
              unit="%"
              tooltip={t('form.yeast_tooltip')}
            />
          </div>
        </div>
      </FormSection>

      <div>
        <button
          type="button"
          onClick={onReset}
          className="mt-4 w-full rounded-lg bg-slate-200 py-2 px-4 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 dark:focus:ring-offset-slate-800"
          aria-label={t('form.reset_aria')}
        >
          {t('form.reset')}
        </button>
      </div>
    </div>
  );
};

export default CalculatorForm;
