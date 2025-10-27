import React from 'react';
import {
  DoughConfig,
  YeastType,
  RecipeStyle,
  FermentationTechnique,
  BakeType,
  UnitSystem,
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
import {
  BakeTypeIcon,
  RecipeIcon,
  ParametersIcon,
  FermentationIcon,
  SettingsIcon,
  PencilIcon,
  InfoIcon,
} from './IconComponents';

interface CalculatorFormProps {
  config: DoughConfig;
  onConfigChange: (newConfig: Partial<DoughConfig>) => void;
  onBakeTypeChange: (bakeType: BakeType) => void;
  onStyleChange: (style: RecipeStyle) => void;
  onReset: () => void;
  unitSystem: UnitSystem;
  onUnitSystemChange: (system: UnitSystem) => void;
}

const FormSection: React.FC<{
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  tooltip?: string;
}> = ({ title, children, icon, tooltip }) => (
  <div className="relative rounded-xl border border-slate-200 p-6 pt-8 dark:border-slate-700/50">
    <h3 className="absolute -top-3.5 left-4 flex items-center gap-2 bg-white px-2 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:bg-slate-800 dark:text-slate-400">
      <span className="text-lime-500">{icon}</span>
      <span>{title}</span>
      {tooltip && (
        <div className="group relative flex items-center">
          <InfoIcon className="h-4 w-4 cursor-help text-slate-400" />
          <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-72 -translate-x-1/2 rounded-md bg-slate-800 p-2 text-xs text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 dark:bg-slate-700">
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
    </h3>
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
  unitSystem,
  onUnitSystemChange,
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
    <div className="space-y-8 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 transition-colors duration-300 dark:border dark:border-slate-700/50 dark:bg-slate-800 dark:ring-0 sm:p-8">
      <FormSection
        title={t('form.bake_type')}
        icon={<BakeTypeIcon className="h-5 w-5" />}
      >
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

      <FormSection
        title={t('form.recipe_style')}
        icon={<RecipeIcon className="h-5 w-5" />}
        tooltip={styleTooltip}
      >
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

      <FormSection
        title={t('form.core_parameters')}
        icon={<ParametersIcon className="h-5 w-5" />}
      >
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

      <FormSection
        title={t('form.fermentation')}
        icon={<FermentationIcon className="h-5 w-5" />}
      >
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
                <InfoIcon className="h-4 w-4 cursor-help text-slate-400" />
                <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 rounded-md bg-slate-800 p-2 text-xs text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 dark:bg-slate-700">
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

      <FormSection
        title={t('form.settings')}
        icon={<SettingsIcon className="h-5 w-5" />}
        tooltip={t('form.unit_system_tooltip')}
      >
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('form.unit_system')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <ChoiceButton
                active={unitSystem === UnitSystem.US_CUSTOMARY}
                onClick={() => onUnitSystemChange(UnitSystem.US_CUSTOMARY)}
              >
                {t('form.us_customary')}
              </ChoiceButton>
              <ChoiceButton
                active={unitSystem === UnitSystem.METRIC}
                onClick={() => onUnitSystemChange(UnitSystem.METRIC)}
              >
                {t('form.metric')}
              </ChoiceButton>
            </div>
          </div>
        </div>
      </FormSection>

      <FormSection
        title={t('form.recipe_notes')}
        icon={<PencilIcon className="h-5 w-5" />}
      >
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
          className="w-full rounded-lg bg-slate-200 py-3 px-4 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 dark:focus:ring-offset-slate-800"
          aria-label={t('form.reset_aria')}
        >
          {t('form.reset')}
        </button>
      </div>
    </div>
  );
};

export default CalculatorForm;
