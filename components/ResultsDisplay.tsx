import React, { useState, forwardRef } from 'react';
import {
  DoughConfig,
  DoughResult,
  Unit,
  FermentationTechnique,
  BakeType,
  RecipeStyle,
  UnitSystem,
  YeastType,
  FlourDefinition,
  Oven,
  CalculationMode,
} from '../types';
import {
  FlourIcon,
  WaterIcon,
  SaltIcon,
  OilIcon,
  YeastIcon,
  WeightIcon,
  DownloadIcon,
  PrefermentIcon,
  RecipeIcon,
  PencilIcon,
  ShareIcon,
  CheckIcon,
  InfoIcon,
  LockClosedIcon,
  SpinnerIcon,
  PizzaSliceIcon,
  BatchesIcon,
} from './IconComponents';
import { gramsToVolume, INGREDIENT_DENSITIES } from '../helpers';
import { useTranslation } from '../i18n';


// Inform TypeScript that these libraries are available on the window object
declare global {
  interface Window {
    jspdf: any;
    html2canvas: any;
  }
}

interface ResultsDisplayProps {
  results: DoughResult | null;
  config: DoughConfig;
  unit: Unit;
  unitSystem: UnitSystem;
  onUnitChange: (unit: Unit) => void;
  hasProAccess: boolean;
  onOpenPaywall: () => void;
  onConfigChange: (newConfig: Partial<DoughConfig>) => void;
  onStartBatch: () => void;
  selectedFlour?: FlourDefinition;
  calculatorMode: 'basic' | 'advanced';
  calculationMode: CalculationMode;
  saveButtonRef?: React.Ref<HTMLButtonElement>;
  onboardingStep?: number;
}

const ResultRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  note?: string;
  isTotal?: boolean;
  tooltip?: string;
}> = ({ icon, label, value, note, isTotal = false, tooltip }) => (
  <div
    className={`flex items-center justify-between ${
      isTotal
        ? 'mt-4 rounded-lg bg-lime-50 p-3 sm:p-4'
        : 'border-b border-slate-200 py-3 sm:py-4'
    }`}
  >
    <div className="flex items-center pr-4">
      <span className="mr-3 flex-shrink-0 text-lime-500 sm:mr-4">
        {icon}
      </span>
      <div>
        <div className="flex items-center gap-2">
          <span
            className={`font-medium ${
              isTotal
                ? 'text-lg font-bold text-slate-900'
                : 'text-slate-700'
            }`}
          >
            {label}
          </span>
          {tooltip && (
            <div className="group relative flex items-center">
              <InfoIcon className="h-4 w-4 cursor-help text-slate-400" />
              <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-72 -translate-x-1/2 rounded-md bg-slate-800 p-2 text-xs text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                {tooltip}
                <svg
                  className="absolute left-0 top-full h-2 w-full text-slate-800"
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
        {note && (
          <p className="mt-0.5 text-xs text-slate-500">
            {note}
          </p>
        )}
      </div>
    </div>
    <span
      className={`flex-shrink-0 text-right font-semibold ${
        isTotal
          ? 'text-xl font-bold text-slate-900 sm:text-2xl'
          : 'text-base text-slate-800 sm:text-lg'
      }`}
    >
      {value}
    </span>
  </div>
);

const RecipeSteps: React.FC<{
  config: DoughConfig;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
}> = ({ config, t }) => {
  
  const getStepKeyPrefix = (style: RecipeStyle): string => {
    const base = 'results.steps';
    switch (style) {
      case RecipeStyle.NEAPOLITAN:
        return `${base}.neapolitan`;
      case RecipeStyle.PAN_PIZZA:
      case RecipeStyle.DETROIT:
      case RecipeStyle.SICILIAN:
      case RecipeStyle.SICILIANA:
      case RecipeStyle.CHICAGO:
      case RecipeStyle.CHICAGO_DEEP_DISH:
      case RecipeStyle.GRANDMA_STYLE:
        return `${base}.pan_pizza`;
      case RecipeStyle.FOCACCIA:
        return `${base}.focaccia`;
      case RecipeStyle.CIABATTA:
      case RecipeStyle.COUNTRY_LOAF:
      case RecipeStyle.BAGUETTE:
        return `${base}.high_hydration_bread`;
      default:
        return `${base}.generic`;
    }
  }

  const renderStepList = (primaryPrefix: string, fallbackPrefix: string) => {
    const steps = [];
    for (let i = 1; i <= 12; i++) { // Check up to 12 steps
        let key = `${primaryPrefix}.step${i}`;
        let text = t(key, { defaultValue: '' });
        
        // If style-specific step not found, try the generic fallback
        if (!text) {
            key = `${fallbackPrefix}.step${i}`;
            text = t(key, { defaultValue: '' });
        }
        
        if (text) {
            steps.push(<li key={key} dangerouslySetInnerHTML={{ __html: text }}/>);
        } else {
            break; // Stop when no more steps are found
        }
    }
    return <ol className="list-inside list-decimal space-y-4 pl-1 text-slate-600">{steps}</ol>;
  };
  
  const stylePrefix = getStepKeyPrefix(config.recipeStyle);
  const methodSuffix = config.fermentationTechnique === FermentationTechnique.DIRECT ? '_direct' : '_indirect';
  
  const primaryPrefix = stylePrefix + methodSuffix;
  const fallbackPrefix = 'results.steps.generic' + methodSuffix;

  const isIndirect = config.fermentationTechnique !== FermentationTechnique.DIRECT;

  return (
    <div className="mt-10">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-lime-500">
          <RecipeIcon className="h-6 w-6" />
        </span>
        <h3 className="text-xl font-bold text-slate-800">
          {t('results.steps.title')}
        </h3>
      </div>
      <div className="space-y-6">
        {isIndirect ? (
             <>
                <div>
                  <h4 className="mb-2 font-semibold text-slate-800">
                    {t('results.preferment_title', {
                      technique: t(`form.${config.fermentationTechnique.toLowerCase()}`),
                    })}
                  </h4>
                   {renderStepList(`${primaryPrefix}.preferment`, `${fallbackPrefix}.preferment`)}
                </div>
                <div className="mt-6">
                  <h4 className="mb-2 font-semibold text-slate-800">
                    {t('results.final_dough_title')}
                  </h4>
                  {renderStepList(`${primaryPrefix}.final_dough`, `${fallbackPrefix}.final_dough`)}
                </div>
             </>
        ) : (
            renderStepList(primaryPrefix, fallbackPrefix)
        )}
      </div>
    </div>
  );
};

const ErrorMessage: React.FC<{
  t: (key: string) => string;
}> = ({ t }) => (
  <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-red-300 bg-red-50 p-8 text-center">
    <div className="rounded-full bg-red-100 p-3">
      <InfoIcon className="h-8 w-8 text-red-500" />
    </div>
    <h3 className="mt-4 text-xl font-bold text-red-700">
      {t('results.errors.title')}
    </h3>
    <p className="mt-2 text-red-600">
      {t('results.errors.message')}
    </p>
  </div>
);

const ResultsDisplay = forwardRef<HTMLDivElement, ResultsDisplayProps>(({
  results,
  config,
  unit,
  onUnitChange,
  unitSystem,
  hasProAccess,
  onOpenPaywall,
  onConfigChange,
  onStartBatch,
  calculatorMode,
  calculationMode,
  saveButtonRef,
  onboardingStep,
}, ref) => {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const GRAMS_TO_OUNCES = 0.035274;
  const isSourdough = [YeastType.SOURDOUGH_STARTER, YeastType.USER_LEVAIN].includes(config.yeastType);

  const volumeUnits = {
    cups: t('units.cups'),
    tbsp: t('units.tbsp'),
    tsp: t('units.tsp'),
  };

  const getConversionTooltip = (
    ingredient: keyof typeof INGREDIENT_DENSITIES,
  ): string => {
    const density = INGREDIENT_DENSITIES[ingredient];
    const grams = unitSystem === UnitSystem.METRIC ? density.metric : density.us;
    const ingredientName = t(
      `results.ingredients.${ingredient}`,
    ) as string;
    const systemName =
      unitSystem === UnitSystem.METRIC
        ? t('form.metric')
        : t('form.us_customary');

    return t('results.conversion_tooltip', {
      grams: grams.toFixed(0),
      ingredient: ingredientName,
      system: systemName,
    });
  };

  const formatWeight = (
    valueInGrams: number,
    precision: { g: number; oz: number },
  ) => {
    if (unit === 'oz') {
      const valueInOunces = valueInGrams * GRAMS_TO_OUNCES;
      return `${valueInOunces.toFixed(precision.oz)} ${t('units.oz')}`;
    }
    return `${valueInGrams.toFixed(precision.g)} ${t('units.g')}`;
  };

  const handleShare = () => {
    if (!hasProAccess) {
      onOpenPaywall();
      return;
    }
    try {
      const configString = JSON.stringify(config);
      const encodedConfig = btoa(configString);
      const url = new URL(window.location.href);
      url.search = new URLSearchParams({ recipe: encodedConfig }).toString();

      navigator.clipboard.writeText(url.toString()).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
      });
    } catch (error) {
      console.error('Failed to share recipe:', error);
      alert(t('results.share_error'));
    }
  };

  const handleExportPDF = () => {
    if (!hasProAccess) {
      onOpenPaywall();
      return;
    }
    if (isExportingPDF) return;

    setIsExportingPDF(true);

    setTimeout(() => {
        const { jsPDF } = window.jspdf;
        const html2canvas = window.html2canvas;
    
        const contentToExport = document.getElementById('recipe-card');
    
        if (!contentToExport || !jsPDF || !html2canvas) {
          console.error(t('results.pdf_error_console'));
          alert(t('results.pdf_error_alert'));
          setIsExportingPDF(false);
          return;
        }
    
        const elementBgColor = window.getComputedStyle(contentToExport).backgroundColor;
    
        html2canvas(contentToExport, {
          scale: 2,
          backgroundColor: elementBgColor,
          ignoreElements: (element: Element) => element.classList.contains('no-print'),
        }).then((canvas: HTMLCanvasElement) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4',
          });
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const canvasAspectRatio = canvas.width / canvas.height;
          const margin = 40;
    
          let imgFinalWidth = pdfWidth - margin * 2;
          let imgFinalHeight = imgFinalWidth / canvasAspectRatio;
    
          if (imgFinalHeight > pdfHeight - margin * 2) {
            imgFinalHeight = pdfHeight - margin * 2;
            imgFinalWidth = imgFinalHeight * canvasAspectRatio;
          }
    
          const xPos = (pdfWidth - imgFinalWidth) / 2;
          const yPos = (pdfHeight - imgFinalHeight) / 2;
    
          const today = new Date();
          const dateString = today.toISOString().split('T')[0];
          const fileName = `DoughLabPro-Recipe-${dateString}.pdf`;
    
          pdf.addImage(imgData, 'PNG', xPos, yPos, imgFinalWidth, imgFinalHeight);
          pdf.save(fileName);
        }).catch((error) => {
            console.error(t('results.pdf_error_console'), error);
            alert(t('results.pdf_error_alert'));
        }).finally(() => {
            setIsExportingPDF(false);
        });
    }, 50);
  };
  
  const renderRecipeSection = (
    title: string,
    ingredients: {
      flour?: number;
      water?: number;
      salt?: number;
      oil?: number;
      yeast?: number;
    },
  ) => (
    <div className="mb-6">
      <h3 className="mb-2 border-b-2 border-lime-500 pb-2 text-xl font-bold text-slate-800">
        {title}
      </h3>
      <div className="space-y-1">
        {ingredients.flour !== undefined && (
          <ResultRow
            icon={<FlourIcon />}
            label={t('results.flour')}
            value={
              unit === 'volume'
                ? gramsToVolume(
                    'flour',
                    ingredients.flour,
                    volumeUnits,
                    unitSystem,
                  )
                : formatWeight(ingredients.flour, { g: 0, oz: 1 })
            }
            note={t('results.notes.flour')}
            tooltip={calculatorMode === 'advanced' ? getConversionTooltip('flour') : undefined}
          />
        )}
        {ingredients.water !== undefined && (
          <ResultRow
            icon={<WaterIcon />}
            label={t('results.water')}
            value={
              unit === 'volume'
                ? gramsToVolume(
                    'water',
                    ingredients.water,
                    volumeUnits,
                    unitSystem,
                  )
                : formatWeight(ingredients.water, { g: 0, oz: 1 })
            }
            note={t('results.notes.water')}
            tooltip={calculatorMode === 'advanced' ? getConversionTooltip('water') : undefined}
          />
        )}
        {ingredients.salt !== undefined && (
          <ResultRow
            icon={<SaltIcon />}
            label={`${t('results.salt')} (${config.salt.toFixed(1)}%)`}
            value={
              unit === 'volume'
                ? gramsToVolume('salt', ingredients.salt, volumeUnits, unitSystem)
                : formatWeight(ingredients.salt, { g: 2, oz: 3 })
            }
            note={t('results.notes.salt')}
            tooltip={calculatorMode === 'advanced' ? getConversionTooltip('salt') : undefined}
          />
        )}
        {ingredients.oil !== undefined && (
          <ResultRow
            icon={<OilIcon />}
            label={`${t('results.oil')} (${config.oil.toFixed(1)}%)`}
            value={
              unit === 'volume'
                ? gramsToVolume('oil', ingredients.oil, volumeUnits, unitSystem)
                : formatWeight(ingredients.oil, { g: 2, oz: 3 })
            }
            note={t('results.notes.oil')}
            tooltip={calculatorMode === 'advanced' ? getConversionTooltip('oil') : undefined}
          />
        )}
        {ingredients.yeast !== undefined && ingredients.yeast > 0.001 && (
          <ResultRow
            icon={<YeastIcon />}
            label={t('results.yeast')}
            value={
              unit === 'volume'
                ? gramsToVolume(
                    'yeast',
                    ingredients.yeast,
                    volumeUnits,
                    unitSystem,
                  )
                : formatWeight(ingredients.yeast, { g: 2, oz: 3 })
            }
            note={t('results.notes.yeast')}
            tooltip={calculatorMode === 'advanced' ? getConversionTooltip('yeast') : undefined}
          />
        )}
      </div>
    </div>
  );

  const summaryText = t(
    config.bakeType === BakeType.PIZZAS
      ? 'results.summary_pizza'
      : 'results.summary_bread',
    {
      count: `<span class="font-bold text-lime-600">${config.numPizzas}</span>`,
      weight: `<span class="font-bold text-lime-600">${config.doughBallWeight}</span>`,
    },
  );

  const units: { id: Unit; label: string }[] = [
    { id: 'g', label: t('results.grams') },
    { id: 'oz', label: t('results.ounces') },
    { id: 'volume', label: t('results.cups') },
  ];
  
  const containerClasses = "h-full rounded-2xl bg-white p-4 shadow-lg ring-1 ring-slate-200/50 transition-colors duration-300 sm:p-8";

  if (!results) {
    return (
       <div id="recipe-card" className={containerClasses} ref={ref}>
         <ErrorMessage t={t} />
       </div>
    );
  }

  const estimatedUnits = Math.round(results.totalDough / config.doughBallWeight);
  
  const prefermentTitle = isSourdough
    ? t('results.levain_details')
    : t('results.preferment_title', {
        technique: t(`form.${config.fermentationTechnique.toLowerCase()}`),
      });

  return (
    <div
      id="recipe-card"
      className={containerClasses}
      ref={ref}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1"></div> {/* Left Spacer */}
        <h2 className="flex-shrink-0 text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          {t('results.title')}
        </h2>
        <div className="no-print flex flex-1 justify-end space-x-2">
          <button
            onClick={handleShare}
            aria-label={t('results.share_recipe_aria')}
            title={!hasProAccess ? t('pro.locked_tooltip') : ''}
            className={`relative rounded-full p-2 text-slate-500 transition-all hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 ${
              isCopied ? 'bg-lime-100' : ''
            }`}
          >
            {isCopied ? (
              <CheckIcon className="h-6 w-6 text-lime-600" />
            ) : hasProAccess ? (
              <ShareIcon className="h-6 w-6" />
            ) : (
              <LockClosedIcon className="h-6 w-6" />
            )}
          </button>
          <button
            onClick={handleExportPDF}
            disabled={isExportingPDF}
            aria-label={isExportingPDF ? t('results.exporting_pdf_aria') : t('results.export_pdf_aria')}
            title={!hasProAccess ? t('pro.locked_tooltip') : ''}
            className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {hasProAccess ? (
                isExportingPDF ? (
                    <SpinnerIcon className="h-6 w-6 animate-spin" />
                ) : (
                    <DownloadIcon className="h-6 w-6" />
                )
            ) : (
              <LockClosedIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {calculatorMode === 'advanced' && (
        <div className="mx-auto mt-8 mb-6 max-w-xs text-center">
          <div className="flex items-center justify-center gap-2">
            <div
            className="flex w-full items-center justify-center rounded-full bg-slate-100 p-1"
            role="group"
            >
            {units.map((unitOption) => (
                <button
                key={unitOption.id}
                type="button"
                onClick={() => onUnitChange(unitOption.id)}
                aria-pressed={unit === unitOption.id}
                className={`w-1/3 rounded-full py-2 px-3 text-sm font-semibold transition-all duration-300 focus:z-10 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 ${
                    unit === unitOption.id
                    ? 'bg-white text-lime-600 shadow-sm'
                    : 'bg-transparent text-slate-600 hover:bg-slate-200/50'
                }`}
                >
                {unitOption.label}
                </button>
            ))}
            </div>
            <InfoIcon className="h-4 w-4 cursor-help text-slate-400" />
          </div>
            <p className="mt-3 text-xs uppercase tracking-wider text-slate-500">
            {t('results.unit_system_display', {
                system: t(
                unitSystem === UnitSystem.METRIC
                    ? 'form.metric'
                    : 'form.us_customary',
                ),
            })}
            </p>
        </div>
      )}

      {calculatorMode === 'advanced' && (results.preferment || isSourdough) && results.preferment &&
        renderRecipeSection(
          prefermentTitle,
          {
            flour: results.preferment.flour,
            water: results.preferment.water,
            yeast: results.preferment.yeast,
          },
        )}

      {calculatorMode === 'advanced' && (results.preferment || isSourdough) &&
      results.finalDough &&
      results.preferment ? (
        <div className="mb-6">
          <h3 className="mb-2 border-b-2 border-lime-500 pb-2 text-xl font-bold text-slate-800">
            {t('results.final_dough_title')}
          </h3>
          <div className="space-y-1">
            <ResultRow
              icon={<PrefermentIcon />}
              label={prefermentTitle}
              value={formatWeight(
                results.preferment.flour +
                  results.preferment.water +
                  results.preferment.yeast,
                { g: 0, oz: 1 },
              )}
              note={isSourdough ? t('results.notes.starter') : t('results.notes.preferment')}
            />
            {results.finalDough.flour > 0.1 && (
              <ResultRow
                icon={<FlourIcon />}
                label={t('results.flour')}
                value={
                  unit === 'volume'
                    ? gramsToVolume(
                        'flour',
                        results.finalDough.flour,
                        volumeUnits,
                        unitSystem,
                      )
                    : formatWeight(results.finalDough.flour, { g: 0, oz: 1 })
                }
                tooltip={getConversionTooltip('flour')}
              />
            )}
            {results.finalDough.water > 0.1 && (
              <ResultRow
                icon={<WaterIcon />}
                label={t('results.water')}
                value={
                  unit === 'volume'
                    ? gramsToVolume(
                        'water',
                        results.finalDough.water,
                        volumeUnits,
                        unitSystem,
                      )
                    : formatWeight(results.finalDough.water, { g: 0, oz: 1 })
                }
                tooltip={getConversionTooltip('water')}
              />
            )}
            <ResultRow
              icon={<SaltIcon />}
              label={`${t('results.salt')} (${config.salt.toFixed(1)}%)`}
              value={
                unit === 'volume'
                  ? gramsToVolume(
                      'salt',
                      results.finalDough.salt,
                      volumeUnits,
                      unitSystem,
                    )
                  : formatWeight(results.finalDough.salt, { g: 2, oz: 3 })
              }
              note={t('results.notes.salt')}
              tooltip={getConversionTooltip('salt')}
            />
            {results.finalDough.oil > 0.1 && (
              <ResultRow
                icon={<OilIcon />}
                label={`${t('results.oil')} (${config.oil.toFixed(1)}%)`}
                value={
                  unit === 'volume'
                    ? gramsToVolume(
                        'oil',
                        results.finalDough.oil,
                        volumeUnits,
                        unitSystem,
                      )
                    : formatWeight(results.finalDough.oil, { g: 2, oz: 3 })
                }
                note={t('results.notes.oil')}
                tooltip={getConversionTooltip('oil')}
              />
            )}
            {results.finalDough.yeast > 0.01 && (
              <ResultRow
                icon={<YeastIcon />}
                label={t('results.yeast')}
                value={
                  unit === 'volume'
                    ? gramsToVolume(
                        'yeast',
                        results.finalDough.yeast,
                        volumeUnits,
                        unitSystem,
                      )
                    : formatWeight(results.finalDough.yeast, { g: 2, oz: 3 })
                }
                tooltip={getConversionTooltip('yeast')}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-1">
          <ResultRow
            icon={<FlourIcon />}
            label={t('results.flour')}
            value={
              unit === 'volume'
                ? gramsToVolume(
                    'flour',
                    results.totalFlour,
                    volumeUnits,
                    unitSystem,
                  )
                : formatWeight(results.totalFlour, { g: 0, oz: 1 })
            }
            note={t('results.notes.flour')}
            tooltip={calculatorMode === 'advanced' ? getConversionTooltip('flour') : undefined}
          />
          <ResultRow
            icon={<WaterIcon />}
            label={t('results.water')}
            value={
              unit === 'volume'
                ? gramsToVolume(
                    'water',
                    results.totalWater,
                    volumeUnits,
                    unitSystem,
                  )
                : formatWeight(results.totalWater, { g: 0, oz: 1 })
            }
            note={t('results.notes.water', {hydration: config.hydration})}
            tooltip={calculatorMode === 'advanced' ? getConversionTooltip('water') : undefined}
          />
          <ResultRow
            icon={<SaltIcon />}
            label={`${t('results.salt')} (${config.salt.toFixed(1)}%)`}
            value={
              unit === 'volume'
                ? gramsToVolume('salt', results.totalSalt, volumeUnits, unitSystem)
                : formatWeight(results.totalSalt, { g: 2, oz: 3 })
            }
            note={t('results.notes.salt', {salt: config.salt.toFixed(1)})}
            tooltip={calculatorMode === 'advanced' ? getConversionTooltip('salt') : undefined}
          />
          <ResultRow
            icon={<OilIcon />}
            label={`${t('results.oil')} (${config.oil.toFixed(1)}%)`}
            value={
              unit === 'volume'
                ? gramsToVolume('oil', results.totalOil, volumeUnits, unitSystem)
                : formatWeight(results.totalOil, { g: 2, oz: 3 })
            }
            note={t('results.notes.oil', {oil: config.oil.toFixed(1)})}
            tooltip={calculatorMode === 'advanced' ? getConversionTooltip('oil') : undefined}
          />
          <ResultRow
            icon={<YeastIcon />}
            label={isSourdough ? t('results.total_levain') : t('results.yeast')}
            value={
              unit === 'volume'
                ? gramsToVolume(
                    'yeast',
                    results.totalYeast,
                    volumeUnits,
                    unitSystem,
                  )
                : formatWeight(results.totalYeast, { g: 2, oz: 3 })
            }
            note={isSourdough ? t('results.notes.starter') : t('results.notes.yeast')}
            tooltip={calculatorMode === 'advanced' ? getConversionTooltip('yeast') : undefined}
          />
        </div>
      )}

      <ResultRow
        icon={<WeightIcon />}
        label={t('results.total_dough')}
        value={
          unit === 'volume'
            ? `${results.totalDough.toFixed(0)} ${t('units.g')}`
            : formatWeight(results.totalDough, { g: 0, oz: 1 })
        }
        isTotal={true}
        tooltip={t('form.tooltips.start_batch')}
      />
      
      {calculationMode === 'flour' && results && (
        <div className="mt-4 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-4">
          <h4 className="font-semibold text-center text-slate-800">
            {t('results.yield.title')}
          </h4>
          <div className="mt-2 grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-xl font-bold text-lime-600">
                {estimatedUnits}
              </p>
              <p className="text-xs text-slate-500">
                {config.bakeType === BakeType.PIZZAS ? t('results.yield.units') : t('results.yield.loaves')}
              </p>
            </div>
            <div>
              <p className="text-xl font-bold text-lime-600">
                ~{Math.round(results.totalDough / estimatedUnits)}g
              </p>
              <p className="text-xs text-slate-500">
                {t('results.yield.weight_per_unit')}
              </p>
            </div>
          </div>
        </div>
      )}

      {calculatorMode === 'advanced' && (
        <>
            <RecipeSteps config={config} t={t} />
            {config.notes && config.notes.trim() !== '' && (
                <div className="mt-10">
                <div className="mb-4 flex items-center gap-3">
                    <span className="text-lime-500">
                    <PencilIcon className="h-6 w-6" />
                    </span>
                    <h3 className="text-xl font-bold text-slate-800">
                    {t('results.notes_title')}
                    </h3>
                </div>
                <div className="prose prose-sm max-w-none rounded-lg bg-slate-50 p-4 text-slate-700">
                    <p className="whitespace-pre-wrap">{config.notes}</p>
                </div>
                </div>
            )}
        </>
      )}

      {calculationMode === 'mass' && (
          <div className="mt-10 rounded-lg border-2 border-dashed border-lime-300 bg-lime-50 p-4 text-center">
            <p
              className="font-semibold text-slate-800"
              dangerouslySetInnerHTML={{
                __html: summaryText,
              }}
            />
          </div>
      )}

      <div className="mt-8 no-print">
        <button
          onClick={onStartBatch}
          ref={saveButtonRef}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-lime-500 py-3 px-4 text-base font-semibold text-white shadow-md transition-all hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
        >
          <BatchesIcon className="h-5 w-5" />
          <span>{t('footer.start_batch')}</span>
        </button>
      </div>
    </div>
  );
});

export default ResultsDisplay;