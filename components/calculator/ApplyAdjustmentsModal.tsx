
import React from 'react';
import { AdjustmentChange } from '@/logic/applySmartAdjustments';
import { CloseIcon, SparklesIcon } from '@/components/ui/Icons';
import { FLOURS } from '@/flours-constants';
import { DOUGH_STYLE_PRESETS } from '@/constants';


interface ApplyAdjustmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  changes: AdjustmentChange[];
}

const formatValue = (key: string, value: any): string => {
    if (key === 'flourId') {
        return FLOURS.find(f => f.id === value)?.name || String(value);
    }
    if (key === 'recipeStyle') {
        return DOUGH_STYLE_PRESETS.find(p => p.recipeStyle === value)?.name || String(value);
    }
    if (typeof value === 'number') {
        if (['hydration', 'salt', 'oil', 'sugar', 'yeastPercentage'].includes(key)) {
            return `${value.toFixed(1)}%`;
        }
        return String(value);
    }
    return String(value);
}

const ApplyAdjustmentsModal: React.FC<ApplyAdjustmentsModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  changes,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
            <div>
                 <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <SparklesIcon className="h-6 w-6 text-lime-500" />
                    Apply Suggestions
                </h2>
                <p className="text-sm text-slate-500 mt-1">Confirm the suggested changes.</p>
            </div>
          <button onClick={onClose} className="-mt-2 -mr-2 rounded-full p-1 text-slate-500 hover:bg-slate-200">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-6 space-y-3 pr-2 max-h-60 overflow-y-auto">
          {changes.map((change) => (
            <div key={change.key} className="flex items-center justify-between rounded-lg bg-slate-100 p-3">
              <span className="font-semibold text-slate-700">{change.label}</span>
              <div className="flex items-center gap-2 font-medium text-right">
                <span className="text-slate-500 line-through">{formatValue(change.key, change.from)}</span>
                <span className="text-xl text-slate-400">→</span>
                <span className="font-bold text-lime-600">{formatValue(change.key, change.to)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-4 border-t border-slate-200 pt-6">
          <button type="button" onClick={onClose} className="rounded-md py-2 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-100">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} className="rounded-md bg-lime-500 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600">
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyAdjustmentsModal;
