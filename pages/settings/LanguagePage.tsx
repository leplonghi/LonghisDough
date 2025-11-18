import React from 'react';
import SettingsPageLayout from './SettingsPageLayout';
import { ChevronDownIcon } from '../../components/IconComponents';

const LanguagePage: React.FC = () => {

  return (
    <SettingsPageLayout title="Language">
        <p>DoughLabPro is currently available in English.</p>
         <div className="not-prose mt-6">
            <label htmlFor="language-select" className="block text-sm font-medium text-slate-700">
                Selected Language
            </label>
            <div className="relative mt-1">
                <select
                id="language-select"
                disabled
                className="w-full appearance-none rounded-lg border-slate-300 bg-slate-50 p-3 text-slate-900 focus:border-lime-500 focus:ring-lime-500 disabled:opacity-70"
                >
                <option>English</option>
                </select>
                <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
            </div>
        </div>
    </SettingsPageLayout>
  );
};

export default LanguagePage;