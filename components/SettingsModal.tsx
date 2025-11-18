import React from 'react';
import { useTranslation } from '../i18n';
import { UnitSystem } from '../types';
import { CloseIcon, SettingsIcon } from './IconComponents';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  unitSystem: UnitSystem;
  onUnitSystemChange: (system: UnitSystem) => void;
}

const ChoiceButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full rounded-lg px-4 py-2 text-center text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 ${
      active
        ? 'bg-lime-500 text-white font-semibold shadow-md'
        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
    }`}
  >
    {children}
  </button>
);

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  unitSystem,
  onUnitSystemChange,
}) => {
  const { t } = useTranslation();

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
            <span>{t('form.settings')}</span>
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-500 hover:bg-slate-200"
            aria-label={t('load_modal.close_aria')}
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              {t('form.unit_system')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <ChoiceButton
                active={unitSystem === UnitSystem.US_CUSTOMARY}
                onClick={() => onUnitSystemChange(UnitSystem.US_CUSTOMARY)}
              >
                {t('form.us_customary')}
              </ChoiceButton>
              <ChoiceButton
                active={unitSystem === UnitSystem.METRIC}
                onClick={() => onUnitSystemChange(UnitSystem.METRIC)}
              >
                {t('form.metric')}
              </ChoiceButton>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {t('form.unit_system_tooltip')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
