import React, { useState } from 'react';
import {
  DoughConfig,
  DoughResult,
  Unit,
  FermentationTechnique,
  BakeType,
  RecipeStyle,
  UnitSystem,
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
  results: DoughResult;
  config: DoughConfig;
  unit: Unit;
  unitSystem: UnitSystem;
  onUnitChange: (unit: Unit) => void;
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
        ? 'mt-4 rounded-lg bg-lime-50 p-4 dark:bg-lime-500/10'
        : 'border-b border-slate-200 py-4 dark:border-slate-700'
    }`}
  >
    <div className="flex items-center pr-4">
      <span className="mr-4 flex-shrink-0 text-lime-500 dark:text-lime-400">
        {icon}
      </span>
      <div>
        <div className="flex items-center gap-2">
          <span
            className={`font-medium ${
              isTotal
                ? 'text-lg font-bold text-slate-900 dark:text-white'
                : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            {label}
          </span>
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
        </div>
        {note && (
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {note}
          </p>
        )}
      </div>
    </div>
    <span
      className={`flex-shrink-0 text-right font-semibold ${
        isTotal
          ? 'text-2xl font-bold text-slate-900 dark:text-white'
          : 'text-lg text-slate-800 dark:text-slate-100'
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
  const renderSteps = (stepKeys: string[]) => (
    <ol className="list-inside list-decimal space-y-3 pl-1 text-slate-600 dark:text-slate-300">
      {stepKeys.map((key, index) => (
        <li
          key={index}
          className="prose prose-sm dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: t(key) }}
        />
      ))}
    </ol>
  );

  let stepsContent;

  switch (config.recipeStyle) {
    case RecipeStyle.BAGUETTE:
      stepsContent = renderSteps([
        'results.steps.baguette.step1',
        'results.steps.baguette.step2',
        'results.steps.baguette.step3',
        'results.steps.baguette.step4',
        'results.steps.baguette.step5',
        'results.steps.baguette.step6',
        'results.steps.baguette.step7',
      ]);
      break;
    case RecipeStyle.CIABATTA:
      stepsContent = renderSteps([
        'results.steps.ciabatta.step1',
        'results.steps.ciabatta.step2',
        'results.steps.ciabatta.step3',
        'results.steps.ciabatta.step4',
        'results.steps.ciabatta.step5',
        'results.steps.ciabatta.step6',
      ]);
      break;
    default:
      // Fallback to generic direct/indirect methods
      if (config.fermentationTechnique === FermentationTechnique.DIRECT) {
        stepsContent = renderSteps([
          'results.steps.direct.step1',
          'results.steps.direct.step2',
          'results.steps.direct.step3',
          'results.steps.direct.step4',
          'results.steps.direct.step5',
          'results.steps.direct.step6',
        ]);
      } else {
        stepsContent = (
          <>
            <div>
              <h4 className="mb-2 font-semibold text-slate-800 dark:text-slate-100">
                {t('results.preferment_title', {
                  technique: t(
                    `form.${config.fermentationTechnique.toLowerCase()}`,
                  ),
                })}
              </h4>
              {renderSteps([
                'results.steps.indirect.preferment.step1',
                'results.steps.indirect.preferment.step2',
              ])}
            </div>
            <div className="mt-6">
              <h4 className="mb-2 font-semibold text-slate-800 dark:text-slate-100">
                {t('results.final_dough_title')}
              </h4>
              {renderSteps([
                'results.steps.indirect.finalDough.step1',
                'results.steps.indirect.finalDough.step2',
                'results.steps.indirect.finalDough.step3',
                'results.steps.indirect.finalDough.step4',
              ])}
            </div>
          </>
        );
      }
  }

  return (
    <div className="mt-10">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-lime-500 dark:text-lime-400">
          <RecipeIcon className="h-6 w-6" />
        </span>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          {t('results.steps.title')}
        </h3>
      </div>
      <div className="space-y-6">{stepsContent}</div>
    </div>
  );
};

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  config,
  unit,
  onUnitChange,
  unitSystem,
}) => {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);
  const GRAMS_TO_OUNCES = 0.035274;

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
      `results.ingredients.${ingredient}`
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
      alert('Could not copy recipe link to clipboard.');
    }
  };

  const handleExportPDF = () => {
    const { jsPDF } = window.jspdf;
    const html2canvas = window.html2canvas;

    const contentToExport = document.getElementById('recipe-card');

    if (!contentToExport || !jsPDF || !html2canvas) {
      console.error(
        'PDF generation failed: A required library or element is missing.',
      );
      alert(
        'Sorry, there was an error exporting the PDF. Please try again later.',
      );
      return;
    }

    const elementBgColor =
      window.getComputedStyle(contentToExport).backgroundColor;

    html2canvas(contentToExport, {
      scale: 2,
      backgroundColor: elementBgColor,
      ignoreElements: (element: Element) =>
        element.classList.contains('no-print'),
    }).then((canvas: any) => {
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
    });
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
      <h3 className="mb-2 border-b-2 border-lime-500 pb-2 text-xl font-bold text-slate-800 dark:border-lime-400 dark:text-slate-100">
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
            tooltip={getConversionTooltip('flour')}
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
            tooltip={getConversionTooltip('water')}
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
            tooltip={getConversionTooltip('salt')}
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
            tooltip={getConversionTooltip('oil')}
          />
        )}
        {ingredients.yeast !== undefined && (
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
            tooltip={getConversionTooltip('yeast')}
          />
        )}
      </div>
    </div>
  );

  const summaryText = t(
    config.bakeType === BakeType.PIZZA
      ? 'results.summary_pizza'
      : 'results.summary_bread',
    {
      count: `<span class="font-bold text-lime-600 dark:text-lime-400">${config.numPizzas}</span>`,
      weight: `<span class="font-bold text-lime-600 dark:text-lime-400">${config.doughBallWeight}</span>`,
    },
  );

  const units: { id: Unit; label: string }[] = [
    { id: 'g', label: t('results.grams') },
    { id: 'oz', label: t('results.ounces') },
    { id: 'volume', label: t('results.cups') },
  ];

  return (
    <div
      id="recipe-card"
      className="h-full rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 transition-colors duration-300 dark:border dark:border-slate-700/50 dark:bg-slate-800 dark:ring-0 sm:p-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1"></div> {/* Left Spacer */}
        <h2 className="flex-shrink-0 text-center text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          {t('results.title')}
        </h2>
        <div className="no-print flex flex-1 justify-end space-x-2">
          <button
            onClick={handleShare}
            aria-label={t('results.share_recipe_aria')}
            className={`relative rounded-full p-2 text-slate-500 transition-all hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:text-slate-400 dark:hover:bg-slate-700 dark:focus:ring-offset-slate-800 ${
              isCopied ? 'bg-lime-100 dark:bg-lime-500/10' : ''
            }`}
          >
            {isCopied ? (
              <CheckIcon className="h-6 w-6 text-lime-600 dark:text-lime-400" />
            ) : (
              <ShareIcon className="h-6 w-6" />
            )}
          </button>
          <button
            onClick={handleExportPDF}
            aria-label={t('results.export_pdf_aria')}
            className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:text-slate-400 dark:hover:bg-slate-700 dark:focus:ring-offset-slate-800"
          >
            <DownloadIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="my-8 mx-auto max-w-xs">
        <div
          className="flex w-full items-center justify-center rounded-full bg-slate-100 p-1 dark:bg-slate-700"
          role="group"
        >
          {units.map((unitOption) => (
            <button
              key={unitOption.id}
              type="button"
              onClick={() => onUnitChange(unitOption.id)}
              aria-pressed={unit === unitOption.id}
              className={`w-1/3 rounded-full py-2 px-3 text-sm font-semibold transition-all duration-300 focus:z-10 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${
                unit === unitOption.id
                  ? 'bg-white text-lime-600 shadow-sm dark:bg-slate-900'
                  : 'bg-transparent text-slate-600 hover:bg-slate-200/50 dark:text-slate-300 dark:hover:bg-slate-600/50'
              }`}
            >
              {unitOption.label}
            </button>
          ))}
        </div>
      </div>

      {config.fermentationTechnique !== FermentationTechnique.DIRECT &&
        results.preferment &&
        renderRecipeSection(
          t('results.preferment_title', {
            technique: t(`form.${config.fermentationTechnique.toLowerCase()}`),
          }),
          {
            flour: results.preferment.flour,
            water: results.preferment.water,
            yeast: results.preferment.yeast,
          },
        )}

      {config.fermentationTechnique !== FermentationTechnique.DIRECT &&
      results.finalDough &&
      results.preferment ? (
        <div className="mb-6">
          <h3 className="mb-2 border-b-2 border-lime-500 pb-2 text-xl font-bold text-slate-800 dark:border-lime-400 dark:text-slate-100">
            {t('results.final_dough_title')}
          </h3>
          <div className="space-y-1">
            <ResultRow
              icon={<PrefermentIcon />}
              label={t('results.preferment_label', {
                technique: t(
                  `form.${config.fermentationTechnique.toLowerCase()}`,
                ),
              })}
              value={formatWeight(
                results.preferment.flour +
                  results.preferment.water +
                  results.preferment.yeast,
                { g: 0, oz: 1 },
              )}
              note={t('results.notes.preferment')}
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
            tooltip={getConversionTooltip('flour')}
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
            note={t('results.notes.water')}
            tooltip={getConversionTooltip('water')}
          />
          <ResultRow
            icon={<SaltIcon />}
            label={`${t('results.salt')} (${config.salt.toFixed(1)}%)`}
            value={
              unit === 'volume'
                ? gramsToVolume('salt', results.totalSalt, volumeUnits, unitSystem)
                : formatWeight(results.totalSalt, { g: 2, oz: 3 })
            }
            note={t('results.notes.salt')}
            tooltip={getConversionTooltip('salt')}
          />
          <ResultRow
            icon={<OilIcon />}
            label={`${t('results.oil')} (${config.oil.toFixed(1)}%)`}
            value={
              unit === 'volume'
                ? gramsToVolume('oil', results.totalOil, volumeUnits, unitSystem)
                : formatWeight(results.totalOil, { g: 2, oz: 3 })
            }
            note={t('results.notes.oil')}
            tooltip={getConversionTooltip('oil')}
          />
          <ResultRow
            icon={<YeastIcon />}
            label={t('results.yeast')}
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
            note={t('results.notes.yeast')}
            tooltip={getConversionTooltip('yeast')}
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
      />

      <RecipeSteps config={config} t={t} />

      {config.notes && config.notes.trim() !== '' && (
        <div className="mt-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-lime-500 dark:text-lime-400">
              <PencilIcon className="h-6 w-6" />
            </span>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {t('results.notes_title')}
            </h3>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none rounded-lg bg-slate-50 p-4 text-slate-700 dark:bg-slate-700/50 dark:text-slate-300">
            <p className="whitespace-pre-wrap">{config.notes}</p>
          </div>
        </div>
      )}

      <div className="mt-10 rounded-lg border-2 border-dashed border-lime-300 bg-lime-50 p-4 text-center dark:border-lime-500/50 dark:bg-lime-500/10">
        <p
          className="font-semibold text-slate-800 dark:text-slate-100"
          dangerouslySetInnerHTML={{
            __html: summaryText,
          }}
        />
      </div>
    </div>
  );
};

export default ResultsDisplay;
