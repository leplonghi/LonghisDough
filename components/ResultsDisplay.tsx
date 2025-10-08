import React from 'react';
import { DoughConfig, DoughResult, Unit, FermentationTechnique } from '../types';
import {
  FlourIcon,
  WaterIcon,
  SaltIcon,
  OilIcon,
  YeastIcon,
  WeightIcon,
  DownloadIcon,
} from './IconComponents';

interface ResultsDisplayProps {
  results: DoughResult;
  config: DoughConfig;
  unit: Unit;
  onUnitChange: (unit: Unit) => void;
}

const ResultRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  note?: string;
  isTotal?: boolean;
}> = ({ icon, label, value, note, isTotal = false }) => (
  <div
    className={`flex items-center justify-between ${
      isTotal
        ? 'mt-4 rounded-lg bg-lime-50 p-4 dark:bg-lime-500/10'
        : 'border-b border-slate-200 py-3 dark:border-slate-700'
    }`}
  >
    <div className="flex items-center pr-4">
      <span className="mr-4 flex-shrink-0 text-lime-500 dark:text-lime-400">
        {icon}
      </span>
      <div>
        <span
          className={`font-medium ${
            isTotal
              ? 'font-bold text-slate-900 dark:text-white'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          {label}
        </span>
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
          ? 'text-xl font-bold text-slate-900 dark:text-white'
          : 'text-slate-800 dark:text-slate-100'
      }`}
    >
      {value}
    </span>
  </div>
);

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  config,
  unit,
  onUnitChange,
}) => {
  const GRAMS_TO_OUNCES = 0.035274;

  const formatValue = (
    valueInGrams: number,
    precision: { g: number; oz: number },
  ) => {
    if (unit === 'oz') {
      const valueInOunces = valueInGrams * GRAMS_TO_OUNCES;
      return valueInOunces.toFixed(precision.oz);
    }
    return valueInGrams.toFixed(precision.g);
  };

  const handleExportPDF = () => {
    const { jsPDF } = window as any;
    const html2canvas = window as any;

    const contentToExport = document.getElementById('recipe-card');

    if (!contentToExport || !jsPDF || !html2canvas) {
      console.error(
        'PDF generation failed: A required library or element is missing.',
      );
      return;
    }

    html2canvas(contentToExport, {
      scale: 2,
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
      const dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD
      const fileName = `Longhis-Pizza-Recipe-${dateString}.pdf`;

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
      <h3 className="mb-2 border-b-2 border-lime-500 pb-1 text-lg font-bold text-slate-800 dark:border-lime-400 dark:text-slate-100">
        {title}
      </h3>
      <div className="space-y-1">
        {ingredients.flour !== undefined && (
          <ResultRow
            icon={<FlourIcon />}
            label="Flour"
            value={`${formatValue(ingredients.flour, { g: 0, oz: 1 })} ${unit}`}
            note="The foundation of your dough. '00' flour is traditional for Neapolitan."
          />
        )}
        {ingredients.water !== undefined && (
          <ResultRow
            icon={<WaterIcon />}
            label="Water"
            value={`${formatValue(ingredients.water, { g: 0, oz: 1 })} ${unit}`}
            note="Controls dough consistency. Use cold water for long fermentation."
          />
        )}
        {ingredients.salt !== undefined && (
          <ResultRow
            icon={<SaltIcon />}
            label={`Salt (${config.salt.toFixed(1)}%)`}
            value={`${formatValue(ingredients.salt, { g: 2, oz: 3 })} ${unit}`}
            note="Strengthens gluten and adds flavor. Add away from yeast."
          />
        )}
        {ingredients.oil !== undefined && (
          <ResultRow
            icon={<OilIcon />}
            label={`Oil (${config.oil.toFixed(1)}%)`}
            value={`${formatValue(ingredients.oil, { g: 2, oz: 3 })} ${unit}`}
            note="Adds flavor and softness. Omitted in traditional Neapolitan."
          />
        )}
        {ingredients.yeast !== undefined && (
          <ResultRow
            icon={<YeastIcon />}
            label="Yeast"
            value={`${formatValue(ingredients.yeast, { g: 2, oz: 3 })} ${unit}`}
            note="ADY may need activation. IDY can be mixed in directly."
          />
        )}
      </div>
    </div>
  );

  return (
    <div
      id="recipe-card"
      className="h-full rounded-2xl bg-white p-4 shadow-lg transition-colors duration-300 dark:border dark:border-slate-700 dark:bg-slate-800 sm:p-6 lg:p-8"
    >
      <div className="flex items-center justify-between">
        <div className="h-8 w-8"></div> {/* Spacer */}
        <h2 className="text-center text-2xl font-bold text-slate-900 dark:text-white">
          Your Recipe
        </h2>
        <button
          onClick={handleExportPDF}
          aria-label="Export recipe to PDF"
          className="no-print rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:text-slate-400 dark:hover:bg-slate-700 dark:focus:ring-offset-slate-800"
        >
          <DownloadIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="my-6 flex justify-center">
        <div className="inline-flex rounded-lg shadow-sm" role="group">
          <button
            type="button"
            onClick={() => onUnitChange('g')}
            aria-pressed={unit === 'g'}
            className={`rounded-l-lg px-4 py-2 text-sm font-medium transition-all focus:z-10 focus:ring-2 focus:ring-lime-500 ${
              unit === 'g'
                ? 'bg-lime-500 text-white font-semibold shadow-md'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200'
            }`}
          >
            Grams (g)
          </button>
          <button
            type="button"
            onClick={() => onUnitChange('oz')}
            aria-pressed={unit === 'oz'}
            className={`rounded-r-lg px-4 py-2 text-sm font-medium transition-all focus:z-10 focus:ring-2 focus:ring-lime-500 ${
              unit === 'oz'
                ? 'bg-lime-500 text-white font-semibold shadow-md'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200'
            }`}
          >
            Ounces (oz)
          </button>
        </div>
      </div>

      {config.fermentationTechnique !== FermentationTechnique.DIRECT &&
        results.preferment &&
        renderRecipeSection(`Preferment (${config.fermentationTechnique})`, {
          flour: results.preferment.flour,
          water: results.preferment.water,
          yeast: results.preferment.yeast,
        })}

      {config.fermentationTechnique !== FermentationTechnique.DIRECT &&
      results.finalDough ? (
        renderRecipeSection('Final Dough', results.finalDough)
      ) : (
        <div className="space-y-1">
          <ResultRow
            icon={<FlourIcon />}
            label="Flour"
            value={`${formatValue(results.totalFlour, { g: 0, oz: 1 })} ${unit}`}
            note="The foundation of your dough. '00' flour is traditional for Neapolitan."
          />
          <ResultRow
            icon={<WaterIcon />}
            label="Water"
            value={`${formatValue(results.totalWater, { g: 0, oz: 1 })} ${unit}`}
            note="Controls dough consistency. Use cold water for long fermentation."
          />
          <ResultRow
            icon={<SaltIcon />}
            label={`Salt (${config.salt.toFixed(1)}%)`}
            value={`${formatValue(results.totalSalt, { g: 2, oz: 3 })} ${unit}`}
            note="Strengthens gluten and adds flavor. Add away from yeast."
          />
          <ResultRow
            icon={<OilIcon />}
            label={`Oil (${config.oil.toFixed(1)}%)`}
            value={`${formatValue(results.totalOil, { g: 2, oz: 3 })} ${unit}`}
            note="Adds flavor and softness. Omitted in traditional Neapolitan."
          />
          <ResultRow
            icon={<YeastIcon />}
            label="Yeast"
            value={`${formatValue(results.totalYeast, { g: 2, oz: 3 })} ${unit}`}
            note="ADY may need activation. IDY can be mixed in directly."
          />
        </div>
      )}

      <ResultRow
        icon={<WeightIcon />}
        label="Total Dough"
        value={`${formatValue(results.totalDough, { g: 0, oz: 1 })} ${unit}`}
        isTotal={true}
      />

      <div className="mt-6 rounded-lg bg-slate-100 p-4 text-center dark:bg-slate-700/50">
        <p className="font-semibold text-slate-800 dark:text-slate-100">
          <span className="font-bold text-lime-600 dark:text-lime-400">
            {config.numPizzas}
          </span>{' '}
          dough ball{config.numPizzas > 1 ? 's' : ''} at{' '}
          <span className="font-bold text-lime-600 dark:text-lime-400">
            {config.doughBallWeight}g
          </span>{' '}
          each
        </p>
      </div>
    </div>
  );
};

export default ResultsDisplay;