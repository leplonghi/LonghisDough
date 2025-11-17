import React from 'react';
import {
  WeightIcon,
  SaveIcon,
  BatchesIcon,
  StarIcon,
} from './IconComponents';
import { Unit } from '../types';
import { useTranslation } from '../i18n';
import { useUser } from '../contexts/UserProvider';

interface MobileSummaryBarProps {
  totalDough: number;
  unit: Unit;
  onStartBatch: () => void;
}

const MobileSummaryBar: React.FC<MobileSummaryBarProps> = ({
  totalDough,
  unit,
  onStartBatch,
}) => {
  const { t } = useTranslation();
  const { hasProAccess } = useUser();
  const GRAMS_TO_OUNCES = 0.035274;

  const displayValue =
    unit === 'oz' ? totalDough * GRAMS_TO_OUNCES : totalDough;
  const displayUnit = t(`units.${unit === 'volume' ? 'g' : unit}`);

  const handleSaveClick = () => {
    onStartBatch();
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

        
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSaveClick}
              aria-label={t('footer.start_batch')}
              className="flex h-10 items-center justify-center rounded-lg bg-lime-500 px-4 font-semibold text-white shadow-sm transition-colors hover:bg-lime-600"
            >
              <BatchesIcon className="h-5 w-5 mr-2" />
              {t('footer.start_batch')}
            </button>
          </div>
        
      </div>
    </div>
  );
};

export default MobileSummaryBar;