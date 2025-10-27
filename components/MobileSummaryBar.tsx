import React from 'react';
import { WeightIcon, SaveIcon, FolderIcon, LockClosedIcon } from './IconComponents';
import { Unit } from '../types';
import { useTranslation } from '../i18n';

interface MobileSummaryBarProps {
  totalDough: number;
  unit: Unit;
  onSave: (name: string) => void;
  onLoad: () => void;
  hasProAccess: boolean;
}

const MobileSummaryBar: React.FC<MobileSummaryBarProps> = ({
  totalDough,
  unit,
  onSave,
  onLoad,
  hasProAccess,
}) => {
  const { t } = useTranslation();
  const GRAMS_TO_OUNCES = 0.035274;

  const displayValue = unit === 'oz' ? totalDough * GRAMS_TO_OUNCES : totalDough;
  const displayUnit = t(`units.${unit === 'volume' ? 'g' : unit}`);

  const handleSaveClick = () => {
    if (!hasProAccess) {
        onSave(''); // Let the parent handler trigger the paywall
        return;
    }
    const name = prompt(t('form.prompt_config_name'));
    if (name && name.trim()) {
      onSave(name.trim());
    }
  };

  return (
    <div className="fixed bottom-4 inset-x-4 z-10 sm:hidden">
      <div className="mx-auto flex h-16 w-full items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 p-2 shadow-xl backdrop-blur-sm transition-colors duration-300 dark:border-slate-700/80 dark:bg-slate-800/80">
        <div className="flex items-center pl-2 text-slate-700 dark:text-slate-200">
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

        <div className="flex items-center space-x-2">
          <button
            onClick={onLoad}
            aria-label={t('footer.saved_recipes')}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-200 font-semibold text-slate-700 transition-colors hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          >
            {hasProAccess ? <FolderIcon className="h-6 w-6" /> : <LockClosedIcon className="h-6 w-6" />}
          </button>
          <button
            onClick={handleSaveClick}
            aria-label={t('footer.save_recipe')}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-500 font-semibold text-white shadow-sm transition-colors hover:bg-lime-600"
          >
             {hasProAccess ? <SaveIcon className="h-6 w-6" /> : <LockClosedIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileSummaryBar;
