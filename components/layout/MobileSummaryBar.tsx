
import React from 'react';
import {
  WeightIcon,
  BatchesIcon,
} from '@/components/ui/Icons';
import { Unit } from '@/types';

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
  const GRAMS_TO_OUNCES = 0.035274;

  const displayValue =
    unit === 'oz' ? totalDough * GRAMS_TO_OUNCES : totalDough;
  const displayUnit = unit === 'volume' ? 'g' : unit;

  const handleSaveClick = () => {
    onStartBatch();
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-10 border-t border-slate-200/80 bg-white/80 backdrop-blur-sm transition-colors duration-300 sm:hidden">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center text-slate-700">
          <WeightIcon className="h-5 w-5 text-slate-500" />
          <div className="ml-2">
            <div className="text-xs font-medium text-slate-500">
              Total Dough
            </div>
            <div className="font-bold text-slate-900">
              {displayValue.toFixed(0)}
              {displayUnit}
            </div>
          </div>
        </div>

        
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSaveClick}
              aria-label="Save Bake"
              className="flex h-10 items-center justify-center rounded-lg bg-lime-500 px-4 font-semibold text-white shadow-sm transition-colors hover:bg-lime-600"
            >
              <BatchesIcon className="h-5 w-5 mr-2" />
              Save Bake
            </button>
          </div>
        
      </div>
    </div>
  );
};

export default MobileSummaryBar;
