
import React, { useState, forwardRef, useEffect } from 'react';
import {
  DoughConfig,
  DoughResult,
  Unit,
  UnitSystem,
  YeastType,
  FlourDefinition,
  CalculationMode,
  FermentationTechnique
} from '../types';
import {
  FlourIcon,
  WaterIcon,
  SaltIcon,
  OilIcon,
  YeastIcon,
  WeightIcon,
  RecipeIcon,
  ShareIcon,
  InfoIcon,
  BatchesIcon,
  CubeIcon,
  ShoppingBagIcon,
  ExternalLinkIcon,
  DownloadIcon,
  DocumentTextIcon,
  LockClosedIcon
} from './IconComponents';
import { gramsToVolume, INGREDIENT_DENSITIES, GRAMS_TO_OUNCES } from '../helpers'; // Import GRAMS_TO_OUNCES
import { useTranslation } from '../i18n';
import { useToast } from './ToastProvider';
import { getAffiliateSuggestionsForConfig, AffiliateSuggestion } from '../logic/affiliateSuggestions';
import { useUser } from '../contexts/UserProvider';
import { generateRecipeSteps } from '../logic/recipeStepsGenerator';
import RecipeTimeline from './RecipeTimeline';
import { isFreeUser } from '../lib/permissions'; // Use permissions for consistency
import { AffiliateBlock } from './AffiliateBlock';
import { ProBadge } from './ProBadge'; // Import ProBadge component

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
  onUnitChange: (unit: Unit) => void;
  unitSystem: UnitSystem;
  onConfigChange: (newConfig: Partial<DoughConfig>) => void;
  onStartBatch: () => void;
  selectedFlour?: FlourDefinition;
  calculatorMode: 'basic' | 'advanced';
  calculationMode: CalculationMode;
  saveButtonRef?: React.Ref<HTMLButtonElement>;
  onboardingStep?: number;
  hasProAccess: boolean; // Added hasProAccess
  onOpenPaywall: (origin?: string) => void; // Added onOpenPaywall
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

const SuggestionsBlock: React.FC<{ config: DoughConfig; t: (key: string, replacements?: { [key: string]: string | number | undefined }) => string; }> = ({ config, t }) => {
  const [suggestions, setSuggestions] = useState<AffiliateSuggestion[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const s = getAffiliateSuggestionsForConfig(config);
    setSuggestions(s);
  }, [config]);

  // Only show suggestions to Free users
  if (!user || !isFreeUser(user)) return null;
  if (suggestions.length === 0) return null;

  return (
    <div className="mt-8 border-t border-slate-200 pt-6">
      <h4 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
        <ShoppingBagIcon className="h-4 w-4" />
        {t('results.technical_suggestions', { defaultValue: 'Technical Suggestions' })}
      </h4>
      <div className="space-y-3">
        {suggestions.map((sug) => (
          <div key={sug.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div>
              <p className="font-semibold text-slate-800 text-sm">{sug.title}</p>
              <p className="text-xs text-slate-600 mt-1">{sug.description}</p>
            </div>
            <a
              href={sug.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center justify-center gap-1 rounded-md bg-white border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-lime-600 transition-colors"
            >
              {t('common.view_in_shop', { defaultValue: 'View in Shop' })} <ExternalLinkIcon className="h-3 w-3" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};


export const ResultsDisplay = forwardRef<HTMLDivElement, ResultsDisplayProps>(({
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
  const { addToast } = useToast();
  // Removed GRAMS_TO_OUNCES as it's now imported from helpers.ts

  const volumeUnits = {
    cups: t('units.cups'),
    tbsp: t('units.tbsp'),
    tsp: t('units.tsp'),
  };
  
  const recipeSteps = React.useMemo(() => generateRecipeSteps(config), [config]);

  const getConversionTooltip = (
    ingredient: keyof typeof INGREDIENT_DENSITIES,
  ): string => {
    const density = INGREDIENT_DENSITIES[ingredient];
    const grams = unitSystem === UnitSystem.METRIC ? density.metric : density.us;
    const systemName = unitSystem === UnitSystem.METRIC ? t('form.metric') : t('form.us_customary');

    return t('results.conversion_tooltip', { ingredient: t(`results.ingredients.${ingredient}`), system: systemName, grams: grams.toFixed(0) });
  };

  const formatWeight = (
    valueInGrams: number,
    precision: { g: number; oz: number } = { g: 1, oz: 2 },
  ) => {
    if (unit === 'oz') {
      const valueInOunces = valueInGrams * GRAMS_TO_OUNCES;
      return `${valueInOunces.toFixed(precision.oz)} ${t('units.oz')}`;
    }
    if (unit === 'volume') {
        return `${valueInGrams.toFixed(precision.g)} ${t('units.g')}`;
    }
    return `${valueInGrams.toFixed(precision.g)} ${t('units.g')}`;
  };

  const formatVolume = (ingredient: keyof typeof INGREDIENT_DENSITIES, grams: number) => {
      if (unit !== 'volume') return null;
      return gramsToVolume(ingredient, grams, volumeUnits, unitSystem);
  };

  const handleShare = async () => {
    if (!hasProAccess) {
      onOpenPaywall('calculator');
      return;
    }
    try {
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        addToast({message: t('info.share_success_link'), type: "success"}); 
    } catch (e) {
        addToast({message: t('results.share_error'), type: "error"});
    }
  };

  const handleExportPDF = () => {
    if (!hasProAccess) {
        onOpenPaywall('calculator');
        return;
    }
    // Implementation for PDF export would go here
    addToast({message: t('info.exporting_pdf'), type: "info"}); 
  };

  const handleExportJSON = () => {
     if (!hasProAccess) {
        onOpenPaywall('calculator');
        return;
    }
     // Implementation for JSON export
     addToast({message: t('info.exporting_json'), type: "info"}); 
  };

  if (!results) {
      return null;
  }

  const ingredients = results.finalDough || results;
  const flourWeight = 'flour' in ingredients ? ingredients.flour : ingredients.totalFlour;
  const waterWeight = 'water' in ingredients ? ingredients.water : ingredients.totalWater;
  const saltWeight = 'salt' in ingredients ? ingredients.salt : ingredients.totalSalt;
  const oilWeight = 'oil' in ingredients ? ingredients.oil : ingredients.totalOil;
  const sugarWeight = 'sugar' in ingredients ? ingredients.sugar : ingredients.totalSugar;
  const yeastWeight = 'yeast' in ingredients ? ingredients.yeast : ingredients.totalYeast;

  const yeastLabel = [YeastType.SOURDOUGH_STARTER, YeastType.USER_LEVAIN].includes(config.yeastType)
    ? t('results.notes.starter')
    : t('results.notes.yeast');

  return (
    <div ref={ref} className="rounded-2xl bg-white shadow-xl ring-1 ring-slate-200/60">
      <div className="border-b border-slate-100 p-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {t('results.title')}
            </h2>
            {config.numPizzas > 0 && (
                <p className="mt-1 text-sm text-slate-500">
                 {config.bakeType === 'BREADS_SAVORY' 
                    ? t('results.summary_bread', { count: config.numPizzas, weight: config.doughBallWeight })
                    : t('results.summary_pizza', { count: config.numPizzas, weight: config.doughBallWeight })
                 }
                </p>
            )}
          </div>
          
          <div className="flex items-center gap-2 rounded-lg bg-slate-100 p-1">
            {(['g', 'oz', 'volume'] as Unit[]).map((u) => (
              <button
                key={u}
                onClick={() => onUnitChange(u)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                  unit === u
                    ? 'bg-white text-lime-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t(`units.${u}`)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex gap-2">
            <button 
                onClick={handleExportPDF} 
                className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-50 px-2 py-1 rounded border border-slate-200"
                title={hasProAccess ? t('results.export_pdf_title') : t('results.export_pdf_pro_tooltip')}
            >
                {hasProAccess ? <DownloadIcon className="h-3 w-3" /> : <LockClosedIcon className="h-3 w-3 text-slate-400" />}
                {t('results.export_pdf_label')} {!hasProAccess && `(${t('common.locked_short')})`}
            </button>
            <button 
                onClick={handleExportJSON} 
                className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-50 px-2 py-1 rounded border border-slate-200"
                title={hasProAccess ? t('results.export_json_title') : t('results.export_json_pro_tooltip')}
            >
                {hasProAccess ? <DocumentTextIcon className="h-3 w-3" /> : <LockClosedIcon className="h-3 w-3 text-slate-400" />}
                {t('results.export_json_label')} {!hasProAccess && `(${t('common.locked_short')})`}
            </button>
        </div>
      </div>

      <div className="p-6">
        {results.preferment && (
            <div className="mb-6 rounded-lg bg-amber-50 p-4 border border-amber-100">
                <h3 className="text-sm font-bold uppercase tracking-wide text-amber-800 mb-3">
                    {t('results.preferment_title', { technique: t(`form.${config.fermentationTechnique.toLowerCase()}`) })}
                </h3>
                <ResultRow
                    icon={<FlourIcon className="h-5 w-5" />}
                    label={t('results.flour')}
                    value={unit === 'volume' ? formatVolume('flour', results.preferment.flour) || '' : formatWeight(results.preferment.flour)}
                    note={unit === 'volume' ? formatWeight(results.preferment.flour) : undefined}
                />
                <ResultRow
                    icon={<WaterIcon className="h-5 w-5" />}
                    label={t('results.water')}
                    value={unit === 'volume' ? formatVolume('water', results.preferment.water) || '' : formatWeight(results.preferment.water)}
                    note={unit === 'volume' ? formatWeight(results.preferment.water) : undefined}
                />
                {results.preferment.yeast > 0 && (
                    <ResultRow
                        icon={<YeastIcon className="h-5 w-5" />}
                        label={t('results.yeast')}
                        value={unit === 'volume' ? formatVolume('yeast', results.preferment.yeast) || '' : formatWeight(results.preferment.yeast, { g: 2, oz: 3 })}
                        note={unit === 'volume' ? formatWeight(results.preferment.yeast, { g: 2, oz: 3 }) : undefined}
                    />
                )}
            </div>
        )}

        <div className="space-y-1">
           {results.preferment && <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-2 mt-4">{t('results.final_dough_title')}</h3>}
           
          <ResultRow
            icon={<FlourIcon className="h-6 w-6" />}
            label={t('results.flour')}
            value={unit === 'volume' ? formatVolume('flour', flourWeight) || '' : formatWeight(flourWeight)}
            note={unit === 'volume' ? formatWeight(flourWeight) : t('results.notes.flour')}
            tooltip={unit === 'volume' ? getConversionTooltip('flour') : undefined}
          />

          <ResultRow
            icon={<WaterIcon className="h-6 w-6" />}
            label={t('results.water')}
            value={unit === 'volume' ? formatVolume('water', waterWeight) || '' : formatWeight(waterWeight)}
            note={unit === 'volume' ? formatWeight(waterWeight) : t('results.notes.water', { hydration: config.hydration })}
            tooltip={unit === 'volume' ? getConversionTooltip('water') : undefined}
          />

          <ResultRow
            icon={<SaltIcon className="h-6 w-6" />}
            label={t('results.salt')}
            value={unit === 'volume' ? formatVolume('salt', saltWeight) || '' : formatWeight(saltWeight, { g: 1, oz: 2 })}
            note={unit === 'volume' ? formatWeight(saltWeight, { g: 1, oz: 2 }) : t('results.notes.salt', { salt: config.salt })}
            tooltip={unit === 'volume' ? getConversionTooltip('salt') : undefined}
          />

          {oilWeight > 0 && (
            <ResultRow
              icon={<OilIcon className="h-6 w-6" />}
              label={t('results.oil')}
              value={unit === 'volume' ? formatVolume('oil', oilWeight) || '' : formatWeight(oilWeight, { g: 1, oz: 2 })}
              note={unit === 'volume' ? formatWeight(oilWeight, { g: 1, oz: 2 }) : t('results.notes.oil', { oil: config.oil })}
              tooltip={unit === 'volume' ? getConversionTooltip('oil') : undefined}
            />
          )}

          {sugarWeight > 0 && (
            <ResultRow
              icon={<CubeIcon className="h-6 w-6" />}
              label={t('results.sugar')}
              value={unit === 'volume' ? formatVolume('sugar', sugarWeight) || '' : formatWeight(sugarWeight, { g: 1, oz: 2 })}
              note={unit === 'volume' ? formatWeight(sugarWeight, { g: 1, oz: 3 }) : undefined}
              tooltip={unit === 'volume' ? getConversionTooltip('sugar') : undefined}
            />
          )}

          {yeastWeight > 0 && (
            <ResultRow
              icon={<YeastIcon className="h-6 w-6" />}
              label={yeastLabel}
              value={unit === 'volume' ? formatVolume('yeast', yeastWeight) || '' : formatWeight(yeastWeight, { g: 2, oz: 3 })}
              note={unit === 'volume' ? formatWeight(yeastWeight, { g: 2, oz: 3 }) : undefined}
              tooltip={unit === 'volume' ? getConversionTooltip('yeast') : undefined}
            />
          )}

          <ResultRow
            icon={<WeightIcon className="h-6 w-6" />}
            label={t('results.total_dough')}
            value={formatWeight(results.totalDough, { g: 0, oz: 1 })}
            isTotal
          />
        </div>

        {unit === 'volume' && (
          <p className="mt-4 text-center text-xs text-slate-500">
             {t('results.unit_system_display', { system: unitSystem === UnitSystem.METRIC ? t('form.metric') : t('form.us_customary') })}
          </p>
        )}
        
        <SuggestionsBlock config={config} t={t} />

        <div className="mt-8 grid grid-cols-2 gap-3">
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white py-2.5 px-4 font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          >
            {hasProAccess ? <ShareIcon className="h-5 w-5" /> : <LockClosedIcon className="h-4 w-4 text-slate-400" />}
            {t('common.share_link')}
          </button>
           <button
            onClick={onStartBatch}
            ref={saveButtonRef}
            className="flex items-center justify-center gap-2 rounded-lg bg-lime-500 py-2.5 px-4 font-semibold text-white shadow-sm transition-colors hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
          >
            <BatchesIcon className="h-5 w-5" />
            {t('footer.start_batch')}
          </button>
        </div>
      </div>
      
      <div className="bg-slate-50 p-6 rounded-b-2xl border-t border-slate-200">
        <div className="mb-6 flex items-center gap-3">
          <span className="text-lime-500">
            <RecipeIcon className="h-6 w-6" />
          </span>
          <h3 className="text-xl font-bold text-slate-800">
            {t('results.steps.title')}
          </h3>
        </div>
        <RecipeTimeline steps={recipeSteps} />
      </div>
    </div>
  );
});

ResultsDisplay.displayName = 'ResultsDisplay';
