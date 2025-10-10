import React from 'react';
import { WeightIcon, SaveIcon, FolderIcon } from './IconComponents';
import { Unit } from '../types';
import { useTranslation } from '../i18n';

interface FixedFooterProps {
  totalDough: number;
  unit: Unit;
  onSave: (name: string) => void;
  onLoad: () => void;
}

const FixedFooter: React.FC<FixedFooterProps> = ({
  totalDough,
  unit,
  onSave,
  onLoad,
}) => {
  const { t } = useTranslation();
  const GRAMS_TO_OUNCES = 0.035274;

  const displayValue = unit === 'oz' ? totalDough * GRAMS_TO_OUNCES : totalDough;
  // In the footer, if cups are selected for ingredients, show the total weight in grams.
  const displayUnit = t(`units.${unit === 'cups' ? 'g' : unit}`);

  const handleSaveClick = () => {
    const name = prompt(t('form.prompt_config_name'));
    if (name && name.trim()) {
      onSave(name.trim());
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-slate-200 bg-white/80 p-3 backdrop-blur-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Left: Total Dough */}
        <div className="hidden items-center text-slate-700 dark:text-slate-200 sm:flex">
          <WeightIcon />
          <span className="ml-2 font-medium">{t('footer.total_dough')}</span>
          <span className="ml-1 font-bold text-slate-900 dark:text-white">
            {displayValue.toFixed(0)}
            {displayUnit}
          </span>
        </div>

        {/* Center: Copyright - hidden on small/medium screens */}
        <div className="hidden flex-1 text-center text-xs text-slate-500 dark:text-slate-400 lg:block">
          &copy; {new Date().getFullYear()} DoughLabPro.{' '}
          {t('footer.pizza_making')}
        </div>

        {/* Right: Actions */}
        <div className="flex w-full items-center justify-around space-x-2 sm:w-auto sm:justify-end">
          <button
            onClick={handleSaveClick}
            aria-label={t('footer.save_recipe')}
            className="flex h-12 w-1/2 flex-col items-center justify-center rounded-lg font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 sm:h-auto sm:w-auto sm:flex-row sm:gap-2 sm:rounded-md sm:bg-lime-500 sm:py-2 sm:px-4 sm:font-semibold sm:text-white sm:shadow-sm sm:hover:bg-lime-600"
          >
            <SaveIcon className="h-5 w-5" />
            <span className="text-xs sm:text-sm">{t('footer.save_recipe')}</span>
          </button>
          <button
            onClick={onLoad}
            aria-label={t('footer.saved_recipes')}
            className="flex h-12 w-1/2 flex-col items-center justify-center rounded-lg font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 sm:h-auto sm:w-auto sm:flex-row sm:gap-2 sm:rounded-md sm:bg-slate-500 sm:py-2 sm:px-4 sm:font-semibold sm:text-white sm:shadow-sm sm:hover:bg-slate-600"
          >
            <FolderIcon className="h-5 w-5" />
            <span className="text-xs sm:text-sm">
              {t('footer.saved_recipes')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FixedFooter;