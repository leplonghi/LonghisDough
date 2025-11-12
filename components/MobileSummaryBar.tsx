

import React from 'react';
import {
  WeightIcon,
  SaveIcon,
  FolderIcon,
  StarIcon,
} from './IconComponents';
import { Unit } from '../types';
import { useTranslation } from '../i18n';
import { useUser } from '../App';

interface MobileSummaryBarProps {
  totalDough: number;
  unit: Unit;
  onSave: (name: string) => void;
  onLoad: () => void;
  onNavigateToPlans: () => void;
}

const MobileSummaryBar: React.FC<MobileSummaryBarProps> = ({
  totalDough,
  unit,
  onSave,
  onLoad,
  onNavigateToPlans,
}) => {
  const { t } = useTranslation();
  const { hasProAccess } = useUser();
  const GRAMS_TO_OUNCES = 0.035274;

  const displayValue =
    unit === 'oz' ? totalDough * GRAMS_TO_OUNCES : totalDough;
  const displayUnit = t(`units.${unit === 'volume' ? 'g' : unit}`);

  const handleSaveClick = () => {
    // This check is slightly redundant since the button is only shown to pros,
    // but it's good practice for robustness.
    if (!hasProAccess) {
      onNavigateToPlans();
      return;
    }
    const name = prompt(t('form.prompt_config_name'));
    if (name && name.trim()) {
      onSave(name.trim());
    }
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-10 border-t border-slate-200/80 bg-white/80 backdrop-blur-sm transition-colors duration-300 dark:border-slate-700/80 dark:bg-slate-800/80 sm:hidden">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
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

        {hasProAccess ? (
          <div className="flex items-center space-x-2">
            <button
              onClick={onLoad}
              aria-label={t('footer.saved_recipes')}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 transition-colors hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
            >
              <FolderIcon className="h-6 w-6" />
            </button>
            <button
              onClick={handleSaveClick}
              aria-label={t('footer.save_recipe')}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-500 font-semibold text-white shadow-sm transition-colors hover:bg-lime-600"
            >
              <SaveIcon className="h-6 w-6" />
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={onNavigateToPlans}
              className="flex items-center gap-1.5 rounded-full bg-lime-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-lime-600"
            >
              <StarIcon className="h-4 w-4" />
              <span>{t('footer.upgrade_to_pro')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileSummaryBar;
