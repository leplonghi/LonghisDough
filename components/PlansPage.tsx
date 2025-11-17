import React from 'react';
import { useTranslation } from '../i18n';
import { CheckIcon, CloseIcon, StarIcon } from './IconComponents';

interface PlansPageProps {
    onGrantAccess: () => void;
    onNavigateHome: () => void;
}

const FeatureRow: React.FC<{
  label: string;
  free: React.ReactNode;
  pro: React.ReactNode;
}> = ({ label, free, pro }) => (
    <tr className="border-b border-slate-200 last:border-b-0 dark:border-slate-700">
      <td className="py-4 pr-4 font-medium text-slate-700 dark:text-slate-300">
        {label}
      </td>
      <td className="w-28 py-4 text-center">
        {free}
      </td>
      <td className="w-28 py-4 text-center">
        {pro}
      </td>
    </tr>
  );

const PlansPage: React.FC<PlansPageProps> = ({ onGrantAccess }) => {
  const { t } = useTranslation();
  
  const features = [
      { key: 'plans.feature_calculator', free: true, pro: true },
      { key: 'plans.feature_styles', free: true, pro: true },
      { key: 'plans.feature_units', free: true, pro: true },
      { key: 'plans.feature_save_load', free: false, pro: true },
      { key: 'plans.feature_export', free: false, pro: true },
      { key: 'plans.feature_scaling', free: false, pro: true },
      { key: 'plans.feature_pro_recipes', free: false, pro: true },
  ];

  const renderCheck = (value: boolean, text?: string) => {
      if (text) {
          return <span className="text-sm text-slate-500 dark:text-slate-400">{text}</span>
      }
      return value ? <CheckIcon className="mx-auto h-6 w-6 text-lime-500" /> : <CloseIcon className="mx-auto h-6 w-6 text-slate-400" />;
  }

  return (
    <div className="mx-auto max-w-4xl animate-[fadeIn_0.5s_ease-in-out]">
      <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800 sm:p-10">
        <div className="text-center">
            <StarIcon className="mx-auto h-12 w-12 text-lime-500" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t('plans.title')}
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {t('plans.subtitle')}
            </p>
        </div>

        <div className="mt-10 overflow-x-auto">
            <table className="min-w-full table-auto">
            <thead>
                <tr className="border-b-2 border-slate-300 dark:border-slate-600">
                <th className="py-3 pr-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t('plans.feature')}</th>
                <th className="py-3 text-center text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t('plans.free_tier')}</th>
                <th className="rounded-t-lg bg-lime-50 py-3 text-center text-sm font-bold uppercase tracking-wider text-lime-700 dark:bg-lime-500/10 dark:text-lime-300">{t('plans.pro_tier')}</th>
                </tr>
            </thead>
            <tbody>
                {features.map(f => (
                    <FeatureRow 
                        key={f.key} 
                        label={t(f.key)} 
                        free={renderCheck(f.free)} 
                        pro={renderCheck(f.pro)} 
                    />
                ))}
            </tbody>
            </table>
        </div>

        <div className="mt-10 text-center">
            <button
                onClick={onGrantAccess}
                className="inline-flex items-center gap-2 rounded-lg bg-lime-500 py-3 px-8 text-base font-semibold text-white shadow-md transition-all hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            >
                <StarIcon className="h-5 w-5" />
                <span>{t('plans.upgrade_button')} (Demo)</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;