
import React from 'react';
import { useTranslation } from '@/i18n';
import { UnitSystem } from '@/types';

const ChoiceButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full rounded-lg px-4 py-2 text-center text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${
      active
        ? 'bg-lime-500 text-white font-semibold shadow-md'
        : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
    }`}
  >
    {children}
  </button>
);

const SettingsPage: React.FC = () => {
    const { t } = useTranslation();
    const [unitSystem, setUnitSystem] = React.useState<UnitSystem>(UnitSystem.METRIC);

    return (
        <div className="mx-auto max-w-2xl animate-[fadeIn_0.5s_ease-in-out]">
            <button 
              onClick={() => window.history.back()} 
              className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
            >
              &larr; Back
            </button>

            <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800 sm:p-10">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">General Settings</h1>
                
                <div className="space-y-6">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        {t('form.unit_system')}
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                        <ChoiceButton
                            active={unitSystem === UnitSystem.US_CUSTOMARY}
                            onClick={() => setUnitSystem(UnitSystem.US_CUSTOMARY)}
                        >
                            {t('form.us_customary')}
                        </ChoiceButton>
                        <ChoiceButton
                            active={unitSystem === UnitSystem.METRIC}
                            onClick={() => setUnitSystem(UnitSystem.METRIC)}
                        >
                            {t('form.metric')}
                        </ChoiceButton>
                        </div>
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        {t('form.unit_system_tooltip')}
                        </p>
                    </div>
                    
                     <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                        <p className="text-center text-slate-500 dark:text-slate-400">
                            More settings coming soon.
                        </p>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
