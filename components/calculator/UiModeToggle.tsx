import React from 'react';
import { useTranslation } from '../../i18n';
import { LockClosedIcon } from '../IconComponents';

interface UiModeToggleProps {
  mode: 'basic' | 'advanced';
  onModeChange: (mode: 'basic' | 'advanced') => void;
  hasProAccess: boolean;
  onOpenPaywall: () => void;
}

const UiModeToggle: React.FC<UiModeToggleProps> = ({ mode, onModeChange, hasProAccess, onOpenPaywall }) => {
  const { t } = useTranslation();
  const isAdvanced = mode === 'advanced';

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasProAccess && !isAdvanced) {
      // User is trying to switch TO advanced but is not pro
      e.preventDefault();
      onOpenPaywall();
      return;
    }
    onModeChange(e.target.checked ? 'advanced' : 'basic');
  };

  return (
    <div className="flex items-center justify-center">
        <label className="inline-flex items-center justify-center gap-4 cursor-pointer p-2 relative select-none">
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
            <div className="flex items-center gap-1">
                 <span className={`font-semibold transition-colors text-sm ${isAdvanced ? 'text-slate-800' : 'text-slate-500'} ${!hasProAccess ? 'blur-[2px] opacity-70' : ''}`}>
                    {t('mode_toggle.advanced')}
                </span>
                {!hasProAccess && <LockClosedIcon className="h-3 w-3 text-slate-400" />}
            </div>
            
            {!hasProAccess && !isAdvanced && (
                 <div 
                    className="absolute right-0 top-0 bottom-0 w-1/2 z-10" 
                    onClick={(e) => { e.preventDefault(); onOpenPaywall(); }}
                    title={t('pro.locked_tooltip')}
                 />
            )}
        </label>
    </div>
  );
};

export default UiModeToggle;