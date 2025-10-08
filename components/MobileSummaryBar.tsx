import React from 'react';
import { WeightIcon, RecipeIcon } from './IconComponents';
import { Unit } from '../types';

interface MobileSummaryBarProps {
  totalDough: number;
  unit: Unit;
  onShowResults: () => void;
}

const MobileSummaryBar: React.FC<MobileSummaryBarProps> = ({
  totalDough,
  unit,
  onShowResults,
}) => {
  const GRAMS_TO_OUNCES = 0.035274;
  const displayValue = unit === 'oz' ? totalDough * GRAMS_TO_OUNCES : totalDough;
  const displayUnit = unit;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-slate-200 bg-white/80 p-3 backdrop-blur-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/80 lg:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center text-slate-700 dark:text-slate-200">
          <WeightIcon />
          <span className="ml-2 font-medium">Total Dough:</span>
          <span className="ml-1 font-bold text-slate-900 dark:text-white">
            {displayValue.toFixed(0)}
            {displayUnit}
          </span>
        </div>
        <button
          onClick={onShowResults}
          aria-label="Scroll to recipe"
          className="flex items-center rounded-lg bg-lime-500 py-2 px-4 font-semibold text-white shadow-md transition-all hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        >
          <RecipeIcon className="mr-2 h-5 w-5" />
          <span>View Recipe</span>
        </button>
      </div>
    </div>
  );
};

export default MobileSummaryBar;