import React from 'react';
import {
  DoughConfig,
  YeastType,
  RecipeStyle,
  FermentationTechnique,
  BakeType,
} from '../types';
import {
  YEAST_OPTIONS,
  DOUGH_WEIGHT_RANGES,
  PIZZA_STYLES,
  BREAD_STYLES,
  RECIPE_STYLE_PRESETS,
} from '../constants';
import SliderInput from './SliderInput';
import { useTranslation } from '../i18n';
import AdSenseBlock from './AdSenseBlock';

interface CalculatorFormProps {
  config: DoughConfig;
  onConfigChange: (newConfig: Partial<DoughConfig>) => void;
  onBakeTypeChange: (bakeType: BakeType) => void;
  onStyleChange: (style: RecipeStyle) => void;
  onReset: () => void;
}

const FormSection: React.FC<{
  title: string;
  children: React.ReactNode;
  tooltip?: string;
}> = ({ title, children, tooltip }) => (
  <div>
    <div className="mb-3 flex items-center gap-2">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
        {title}
      </h3>
      {tooltip && (
        <div className="group relative flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 cursor-help text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-72 -translate-x-1/2 rounded-md bg-slate-800 p-2 text-xs text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 dark:bg-slate-700 dark:text-slate-200">
            {tooltip}
            <svg
              className="absolute left-0 top-full h-2 w-full text-slate-800 dark:text-slate-700"
              x="0px"
              y="0px"
              viewBox="0 0 255 255"
              xmlSpace="preserve"
            >
              <polygon
                className="fill-current"
                points="0,0 127.5,127.5 255,0"
              />
            </svg>
          </span>
        </div>
      )}
    </div>
    <div className="space-y-6">{children}</div>
  </div>
);

const ChoiceButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}> = ({ active, onClick, children, className = '' }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full rounded-lg px-4 py-2 text-center text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${
      active
        ? 'bg-lime-500 text-white font-semibold shadow-md'
        : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
    } ${className}`}
  >
    {children}
  </button>
);

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  config,
  onConfigChange,
  onBakeTypeChange,
  onStyleChange,
  onReset,
}) => {
  const { t } = useTranslation();

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onConfigChange({ [e.target.name]: Number(e.target.value) });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onConfigChange({ [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onConfigChange({ [e.target.name]: e.target.value as YeastType });
  };

  const handleTechniqueChange = (technique: FermentationTechnique) => {
    onConfigChange({ fermentationTechnique: technique });
  };

  const weightNote = React.useMemo(() => {
    const styleKey = `form.${config.recipeStyle.toLowerCase()}`;
    const styleName = t(styleKey);
    const range = DOUGH_WEIGHT_RANGES[config.recipeStyle];
    return t('form.weight_per_unit_note', { style: styleName, range });
  }, [config.recipeStyle, t]);

  const styleTooltip = React.useMemo(() => {
    const preset = RECIPE_STYLE_PRESETS[config.recipeStyle];
    if (preset?.description) {
      return t(preset.description);
    }
    return undefined;
  }, [config.recipeStyle, t]);

  const recipeStylesToShow =
    config.bakeType === BakeType.PIZZA ? PIZZA_STYLES : BREAD_STYLES;

  return (
    <div className="space-y-8 rounded-2xl bg-white p-6 shadow-lg transition-colors duration-300 dark:border dark:border-slate-700 dark:bg-slate-800 sm:p-8">
      <FormSection title={t('form.bake_type')}>
        <div className="grid grid-cols-2 gap-3">
          <ChoiceButton
            active={config.bakeType === BakeType.PIZZA}
            onClick={() => onBakeTypeChange(BakeType.PIZZA)}
          >
            {t('form.pizzas')}
          </ChoiceButton>
          <ChoiceButton
            active={config.bakeType === BakeType.BREAD}
            onClick={() => onBakeTypeChange(BakeType.BREAD)}
          >
            {t('form.breads')}
          </ChoiceButton>
        </div>
      </FormSection>

      <FormSection title={t('form.recipe_style')} tooltip={styleTooltip}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {recipeStylesToShow.map((style) => (
            <ChoiceButton
              key={style}
              active={config.recipeStyle === style}
              onClick={() => onStyleChange(style)}
            >
              {t(`form.${style.toLowerCase()}`)}
            </ChoiceButton>
          ))}
        </div>
      </FormSection>

      <FormSection title={t('form.core_parameters')}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="numPizzas"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              {config.bakeType === BakeType.PIZZA
                ? t('form.num_pizzas')
                : t('form.num_loaves')}
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
              {t('form.num_units_note')}
            </p>
          </div>
          <div>
            <label
              htmlFor="doughBallWeight"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              {config.bakeType === BakeType.PIZZA
                ? t('form.weight_per_pizza')
                : t('form.weight_per_loaf')}
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
              {weightNote}
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
        <SliderInput
          label={t('form.scale')}
          name="scale"
          value={config.scale}
          onChange={handleNumberChange}
          min={0.25}
          max={4}
          step={0.05}
          unit="x"
          tooltip={t('form.scale_tooltip')}
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
            <div className="mb-1 flex items-center gap-2">
              <label
                htmlFor="yeastType"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                {t('form.yeast_type')}
              </label>
              <div className="group relative flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 cursor-help text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 rounded-md bg-slate-800 p-2 text-xs text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 dark:bg-slate-700 dark:text-slate-200">
                  {t('form.yeast_type_tooltip')}
                  <svg
                    className="absolute left-0 top-full h-2 w-full text-slate-800 dark:text-slate-700"
                    x="0px"
                    y="0px"
                    viewBox="0 0 255 255"
                    xmlSpace="preserve"
                  >
                    <polygon
                      className="fill-current"
                      points="0,0 127.5,127.5 255,0"
                    />
                  </svg>
                </span>
              </div>
            </div>
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

      <FormSection title={t('form.recipe_notes')}>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          value={config.notes || ''}
          onChange={handleTextareaChange}
          placeholder={t('form.notes_placeholder')}
          className="w-full rounded-lg border-slate-300 bg-slate-50 p-2 text-slate-900 focus:border-lime-500 focus:ring-lime-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
        />
      </FormSection>

      <AdSenseBlock />

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