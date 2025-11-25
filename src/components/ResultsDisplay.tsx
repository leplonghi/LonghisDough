
import React, { useRef, useMemo } from 'react';
import {
  DoughResult,
  DoughConfig,
  Unit,
  UnitSystem,
  FlourDefinition,
  CalculationMode,
} from '@/types';
import { gramsToVolume } from '@/helpers';
import {
  ShareIcon,
  DownloadIcon,
  BatchesIcon,
  LockClosedIcon,
  BeakerIcon,
} from '@/components/ui/Icons';
import { useToast } from '@/components/ToastProvider';
import { useTranslation } from '@/i18n';
import { exportBatchToPDF } from '@/services/exportService';
import TechnicalMethodPanel from '@/components/calculator/TechnicalMethodPanel';
import { generateTechnicalMethod } from '@/logic/methodGenerator';

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
  hasProAccess: boolean;
  onOpenPaywall: (origin: any) => void;
  saveButtonRef?: React.Ref<HTMLButtonElement>;
  onboardingStep?: number;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  config,
  unit,
  onUnitChange,
  unitSystem,
  onStartBatch,
  hasProAccess,
  onOpenPaywall,
  saveButtonRef,
}) => {
  const { addToast } = useToast();
  const { t } = useTranslation();
  const resultRef = useRef<HTMLDivElement>(null);

  const technicalSteps = useMemo(() => {
      if (!results) return [];
      return generateTechnicalMethod(config, results);
  }, [config, results]);

  if (!results) {
    return (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 text-center h-full flex flex-col items-center justify-center text-slate-500 min-h-[300px]">
            <p className="font-medium">Ready to calculate?</p>
            <p className="text-sm mt-1">Select a style or adjust parameters to see the results.</p>
        </div>
    );
  }

  const displayValue = (grams: number) => {
    if (unit === 'volume') {
      // This is handled per row, passing ingredient name
      return grams.toFixed(0) + 'g'; // Fallback
    }
    if (unit === 'oz') {
      return (grams * 0.035274).toFixed(2) + ' oz';
    }
    return grams.toFixed(1) + 'g';
  };

  const displayIngredient = (
    nameKey: string,
    grams: number,
    ingredientId: string
  ) => {
    if (unit === 'volume') {
      // Map internal IDs to density keys
      let densityKey = ingredientId;
      if (ingredientId === 'base-flour') densityKey = 'flour';
      // Add more mappings if needed
      
      return gramsToVolume(
        densityKey,
        grams,
        { cups: 'cups', tbsp: 'tbsp', tsp: 'tsp' },
        unitSystem
      );
    }
    return displayValue(grams);
  };

  const handleShare = async () => {
    if (!hasProAccess) {
      addToast("Your recipes deserve to be shared — unlock sharing with Pro.", "info");
      onOpenPaywall('calculator');
      return;
    }
    try {
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        addToast(t('results.share_link', {defaultValue: 'Link copied!'}), "success");
    } catch (e) {
        addToast(t('results.share_error'), "error");
    }
  };

  const handleExportPDF = () => {
    if (!hasProAccess) {
        addToast("Export your formulas as beautiful PDFs with Pro.", "info");
        onOpenPaywall('calculator');
        return;
    }
    try {
        const batchMock: any = {
            name: `${config.recipeStyle} Formula`,
            createdAt: new Date().toISOString(),
            doughConfig: config,
            doughResult: results,
            notes: config.notes,
        };
        exportBatchToPDF(batchMock, t);
        addToast(t('results.export_pdf_aria', {defaultValue: 'Exporting PDF...'}), "info");
    } catch (e) {
        console.error(e);
        addToast("Export failed", "error");
    }
  };

  const renderRow = (label: string, grams: number, ingredientId: string, subtext?: string) => (
    <div className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0">
      <div>
        <p className="font-medium text-slate-700">{label}</p>
        {subtext && <p className="text-xs text-slate-600">{subtext}</p>}
      </div>
      <span className="font-mono font-semibold text-slate-900">
        {displayIngredient(label, grams, ingredientId)}
      </span>
    </div>
  );

  return (
    <div ref={resultRef} className="space-y-8">
        <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 animate-[fadeIn_0.3s_ease-out]">
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-slate-900">{t('results.title')}</h2>
                <div className="flex rounded-lg bg-slate-100 p-1">
                <button
                    onClick={() => onUnitChange('g')}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                    unit === 'g' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    g
                </button>
                <button
                    onClick={() => onUnitChange('oz')}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                    unit === 'oz' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    oz
                </button>
                <button
                    onClick={() => onUnitChange('volume')}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                    unit === 'volume' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    Vol
                </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="mb-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-lime-50 p-4 text-center">
                <p className="text-xs font-bold uppercase tracking-wider text-lime-700">{t('results.total_dough')}</p>
                <p className="mt-1 text-2xl font-extrabold text-lime-800">{displayValue(results.totalDough)}</p>
                </div>
                {config.numPizzas > 1 && (
                    <div className="rounded-xl bg-sky-50 p-4 text-center">
                    <p className="text-xs font-bold uppercase tracking-wider text-sky-700">{t('results.single_ball')}</p>
                    <p className="mt-1 text-2xl font-extrabold text-sky-800">{displayValue(results.totalDough / config.numPizzas)}</p>
                    </div>
                )}
            </div>

            {/* Pre-ferment Section */}
            {results.preferment && (
                <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <div className="mb-3 flex items-center gap-2 border-b border-amber-200 pb-2 text-amber-800">
                    <BeakerIcon className="h-5 w-5" />
                    <h3 className="font-bold text-sm uppercase tracking-wide">
                        {t(`form.${config.fermentationTechnique.toLowerCase()}`, { defaultValue: 'Preferment' })}
                    </h3>
                </div>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>{t('results.flour')}</span>
                        <span className="font-mono font-bold">{displayIngredient('Flour', results.preferment.flour, 'flour')}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>{t('results.water')}</span>
                        <span className="font-mono font-bold">{displayIngredient('Water', results.preferment.water, 'water')}</span>
                    </div>
                    {results.preferment.yeast > 0 && (
                        <div className="flex justify-between">
                            <span>{t('results.yeast')}</span>
                            <span className="font-mono font-bold">{displayIngredient('Yeast', results.preferment.yeast, 'yeast')}</span>
                        </div>
                    )}
                </div>
                </div>
            )}

            {/* Final Dough / Main Ingredients */}
            <div className="space-y-1 mb-8">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
                    {results.preferment ? t('results.final_dough_title') : t('results.ingredients_title', {defaultValue: 'Ingredients'})}
                </h3>
                
                {results.finalDough ? (
                    <>
                        {renderRow(t('results.flour'), results.finalDough.flour, 'flour')}
                        {renderRow(t('results.water'), results.finalDough.water, 'water')}
                        {renderRow(t('results.salt'), results.finalDough.salt, 'salt', `${config.salt}%`)}
                        {results.finalDough.yeast > 0 && renderRow(t('results.yeast'), results.finalDough.yeast, 'yeast')}
                        {results.finalDough.oil > 0 && renderRow(t('results.oil'), results.finalDough.oil, 'oil', `${config.oil}%`)}
                        {results.finalDough.sugar > 0 && renderRow(t('results.sugar'), results.finalDough.sugar, 'sugar', `${config.sugar}%`)}
                    </>
                ) : (
                    <>
                        {renderRow(t('results.flour'), results.totalFlour, 'flour')}
                        {renderRow(t('results.water'), results.totalWater, 'water', `${config.hydration}%`)}
                        {renderRow(t('results.salt'), results.totalSalt, 'salt', `${config.salt}%`)}
                        {results.totalYeast > 0 && renderRow(t('results.yeast'), results.totalYeast, 'yeast', `${config.yeastPercentage}%`)}
                        {results.totalOil > 0 && renderRow(t('results.oil'), results.totalOil, 'oil', `${config.oil}%`)}
                        {results.totalSugar > 0 && renderRow(t('results.sugar'), results.totalSugar, 'sugar', `${config.sugar}%`)}
                    </>
                )}
                
                {/* Custom/Other ingredients from Universal model */}
                {results.ingredientWeights?.filter(i => i.role === 'other').map(ing => (
                    renderRow(ing.name, ing.weight, ing.id, `${ing.bakerPercentage}%`)
                ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
                <button
                onClick={onStartBatch}
                ref={saveButtonRef}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-lime-500 py-3.5 text-base font-bold text-white shadow-lg shadow-lime-200 transition-all hover:bg-lime-600 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm"
                >
                <BatchesIcon className="h-5 w-5" />
                {t('diary_page.new_batch')}
                </button>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={handleShare}
                        className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors relative group"
                    >
                        <ShareIcon className="h-4 w-4" />
                        {!hasProAccess && <LockClosedIcon className="absolute top-1 right-1 h-3 w-3 text-slate-300" />}
                        Share
                    </button>
                    <button
                        onClick={handleExportPDF}
                        className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors relative group"
                    >
                        <DownloadIcon className="h-4 w-4" />
                        PDF
                        {!hasProAccess && <LockClosedIcon className="absolute top-1 right-1 h-3 w-3 text-slate-300" />}
                    </button>
                </div>
            </div>
        </div>

        {/* Technical Method Section */}
        <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50">
            <TechnicalMethodPanel steps={technicalSteps} />
            <div className="mt-8 border-t border-slate-100 pt-6 flex justify-center gap-4">
                 <button
                    onClick={handleShare}
                    className="flex items-center gap-2 text-sm font-semibold text-lime-600 hover:text-lime-700 transition-colors"
                >
                    <ShareIcon className="h-4 w-4" /> Share
                </button>
                 <button
                    onClick={handleExportPDF}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
                >
                    <DownloadIcon className="h-4 w-4" /> Download PDF
                </button>
            </div>
        </div>
    </div>
  );
};
