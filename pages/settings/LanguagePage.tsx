
import React from 'react';
import SettingsPageLayout from './SettingsPageLayout';
import { useTranslation } from '../../i18n';
import { ChevronDownIcon } from '../../components/IconComponents';

const LanguagePage: React.FC = () => {
    const { t } = useTranslation();

  return (
    <SettingsPageLayout title="Idioma">
        <p>Escolha o seu idioma de preferência. Esta funcionalidade é apenas visual no momento.</p>
         <div className="not-prose mt-6">
            <label htmlFor="language-select" className="block text-sm font-medium text-slate-700">
                Idioma Selecionado
            </label>
            <div className="relative mt-1">
                <select
                id="language-select"
                disabled // Non-functional as requested
                className="w-full appearance-none rounded-lg border-slate-300 bg-slate-50 p-3 text-slate-900 focus:border-lime-500 focus:ring-lime-500 disabled:opacity-70"
                >
                <option>Português</option>
                <option>English</option>
                <option>Español</option>
                </select>
                <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
            </div>
        </div>
    </SettingsPageLayout>
  );
};

export default LanguagePage;