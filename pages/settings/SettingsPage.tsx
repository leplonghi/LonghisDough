import React from 'react';
import { useTranslation } from '../../i18n';
import { UnitSystem } from '../../types';
import ChoiceButton from '../../components/ui/ChoiceButton';

const SettingsPage: React.FC = () => {
    const { t } = useTranslation();
    const [unitSystem, setUnitSystem] = React.useState<UnitSystem>(UnitSystem.METRIC);

    return (
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800 sm:p-10">
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
    );
};

export default SettingsPage;