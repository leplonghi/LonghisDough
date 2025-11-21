import React from 'react';
import { UnitSystem } from '../types';
import { CloseIcon, SettingsIcon } from './IconComponents';
import ChoiceButton from './ui/ChoiceButton';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  unitSystem: UnitSystem;
  onUnitSystemChange: (system: UnitSystem) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  unitSystem,
  onUnitSystemChange,
}) => {

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
    >
      <div
        className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2
            id="settings-modal-title"
            className="flex items-center gap-2 text-xl font-bold text-slate-900"
          >
            <SettingsIcon className="h-6 w-6 text-lime-500" />
            <span>Settings</span>
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-500 hover:bg-slate-200"
            aria-label="Close"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Unit System (Volume)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <ChoiceButton
                active={unitSystem === UnitSystem.US_CUSTOMARY}
                onClick={() => onUnitSystemChange(UnitSystem.US_CUSTOMARY)}
              >
                US Customary
              </ChoiceButton>
              <ChoiceButton
                active={unitSystem === UnitSystem.METRIC}
                onClick={() => onUnitSystemChange(UnitSystem.METRIC)}
              >
                Metric
              </ChoiceButton>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Affects the conversion from grams to cups/spoons. The metric system (1 cup = 250ml) differs from the US customary system (1 cup = ~236ml).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;