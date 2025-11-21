
import React from 'react';
import { useTranslation } from '@/i18n';

interface UiModeToggleProps {
  mode: 'basic' | 'advanced';
  onModeChange: (mode: 'basic' | 'advanced') => void;
}

const UiModeToggle: React.FC<UiModeToggleProps> = ({ mode, onModeChange }) => {
  const { t } = useTranslation();
  const isAdvanced = mode === 'advanced';

  const handleToggle = () => {
    onModeChange(isAdvanced ? 'basic' : 'advanced');
  };

  return (
    <div className="flex items-center justify-center">
        <label className="inline-flex items-center justify-center gap-4 cursor-pointer p-2">
            <span className={`font-semibold transition-colors text-sm ${!isAdvanced ? 'text-slate-800' : 'text-slate-500'}`}>
                {t('mode_toggle.basic')}
            </span>
            <div className="relative">
                <input
                type="checkbox"
                checked={isAdvanced}
                onChange={handleToggle}
                className="sr-only peer"
                />
                <div className="peer h-6 w-11 rounded-full bg-slate-300 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-lime-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lime-300"></div>
            </div>
            <span className={`font-semibold transition-colors text-sm ${isAdvanced ? 'text-slate-800' : 'text-slate-500'}`}>
                {t('mode_toggle.advanced')}
            </span>
        </label>
    </div>
  );
};

export default UiModeToggle;
