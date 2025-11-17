import React from 'react';
import { AdjustmentChange } from '../../logic/applySmartAdjustments';
import { CloseIcon, SparklesIcon } from '../IconComponents';
import { FLOURS } from '../../flours-constants';
import { DOUGH_STYLE_PRESETS } from '../../constants';


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
        className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-slate-700 dark:bg-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
            <div>
                 <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <SparklesIcon className="h-6 w-6 text-lime-500" />
                    Aplicar Sugestões
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Confirme as alterações sugeridas.</p>
            </div>
          <button onClick={onClose} className="-mt-2 -mr-2 rounded-full p-1 text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-6 space-y-3 pr-2 max-h-60 overflow-y-auto">
          {changes.map((change) => (
            <div key={change.key} className="flex items-center justify-between rounded-lg bg-slate-100 p-3 dark:bg-slate-700/50">
              <span className="font-semibold text-slate-700 dark:text-slate-300">{change.label}</span>
              <div className="flex items-center gap-2 font-medium text-right">
                <span className="text-slate-500 dark:text-slate-400 line-through">{formatValue(change.key, change.from)}</span>
                <span className="text-xl text-slate-400 dark:text-slate-500">→</span>
                <span className="font-bold text-lime-600 dark:text-lime-400">{formatValue(change.key, change.to)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-4 border-t border-slate-200 pt-6 dark:border-slate-700">
          <button type="button" onClick={onClose} className="rounded-md py-2 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700">
            Cancelar
          </button>
          <button type="button" onClick={onConfirm} className="rounded-md bg-lime-500 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600">
            Aplicar Alterações
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyAdjustmentsModal;
