
import React from 'react';
import { WeightIcon, SaveIcon, FolderIcon } from './IconComponents';
import { Unit } from '../types';
import { useTranslation } from '../i18n';

interface MobileSummaryBarProps {
  totalDough: number;
  unit: Unit;
  onSave: (name: string) => void;
  onLoad: () => void;
}

const MobileSummaryBar: React.FC<MobileSummaryBarProps> = ({
  totalDough,
  unit,
  onSave,
  onLoad,
}) => {
  const { t } = useTranslation();
  const GRAMS_TO_OUNCES = 0.035274;

  const displayValue = unit === 'oz' ? totalDough * GRAMS_TO_OUNCES : totalDough;
  // In the footer, if volume is selected for ingredients, show the total weight in grams.
  const displayUnit = t(`units.${unit === 'volume' ? 'g' : unit}`);

  const handleSaveClick = () => {
    const name = prompt(t('form.prompt_config_name'));
    if (name && name.trim()) {
      onSave(name.trim());
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 p-4 sm:p-0">
      <div className="mx-auto flex h-16 w-full max-w-md items-center justify-between rounded-xl border border-slate-200/80 bg-white/80 p-3 shadow-lg backdrop-blur-sm transition-colors duration-300 dark:border-slate-700/80 dark:bg-slate-800/80 sm:max-w-none sm:rounded-none sm:border-x-0 sm:border-b-0 sm:shadow-none">
        {/* Left: Total Dough */}
        <div className="flex items-center text-slate-700 dark:text-slate-200">
          <WeightIcon className="h-5 w-5 text-slate-500 dark:text-slate-400" />
          <div className="ml-2">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {t('footer.total_dough')}
            </div>
            <div className="font-bold text-slate-900 dark:text-white">
              {displayValue.toFixed(0)}
              {displayUnit}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onLoad}
            aria-label={t('footer.saved_recipes')}
            className="flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-200 px-4 font-semibold text-slate-700 transition-colors hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          >
            <FolderIcon className="h-5 w-5" />
            <span className="hidden text-sm sm:inline">
              {t('footer.saved_recipes')}
            </span>
          </button>
          <button
            onClick={handleSaveClick}
            aria-label={t('footer.save_recipe')}
            className="flex h-11 items-center justify-center gap-2 rounded-lg bg-lime-500 px-4 font-semibold text-white shadow-sm transition-colors hover:bg-lime-600"
          >
            <SaveIcon className="h-5 w-5" />
            <span className="hidden text-sm sm:inline">
              {t('footer.save_recipe')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileSummaryBar;
