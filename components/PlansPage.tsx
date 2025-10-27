import React from 'react';
import { useTranslation } from '../i18n';
import { CheckIcon, CloseIcon, StarIcon } from './IconComponents';

interface PlansPageProps {
    onGrantAccess: () => void;
}

const FeatureRow: React.FC<{
  label: string;
  free: boolean;
  pro: boolean;
}> = ({ label, free, pro }) => {
  const iconClasses = 'h-6 w-6';
  return (
    <tr className="border-b border-slate-200 dark:border-slate-700">
      <td className="py-4 pr-4 font-medium text-slate-700 dark:text-slate-300">
        {label}
      </td>
      <td className="py-4 text-center">
        {free ? (
          <CheckIcon className={`${iconClasses} mx-auto text-lime-500`} />
        ) : (
          <CloseIcon className={`${iconClasses} mx-auto text-slate-400`} />
        )}
      </td>
      <td className="py-4 text-center">
        {pro ? (
          <CheckIcon className={`${iconClasses} mx-auto text-lime-500`} />
        ) : (
          <CloseIcon className={`${iconClasses} mx-auto text-slate-400`} />
        )}
      </td>
    </tr>
  );
};

const PlansPage: React.FC<PlansPageProps> = ({ onGrantAccess }) => {
  const { t } = useTranslation();
  
  const features = [
      { key: 'plans_page.feature_calculator', free: true, pro: true },
      { key: 'plans_page.feature_styles', free: true, pro: true },
      { key: 'plans_page.feature_units', free: true, pro: true },
      { key: 'plans_page.feature_ads', free: true, pro: false },
      { key: 'plans_page.feature_save_load', free: false, pro: true },
      { key: 'plans_page.feature_export', free: false, pro: true },
      { key: 'plans_page.feature_scaling', free: false, pro: true },
      { key: 'plans_page.feature_pro_recipes', free: false, pro: true },
  ];

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800 sm:p-10">
        <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t('plans_page.title')}
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {t('plans_page.subtitle')}
            </p>
        </div>

        <div className="mt-10 overflow-x-auto">
            <table className="min-w-full table-auto">
            <thead>
                <tr className="border-b border-slate-300 dark:border-slate-600">
                <th className="py-3 pr-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t('plans_page.feature')}</th>
                <th className="w-28 py-3 text-center text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t('plans_page.free_tier')}</th>
                <th className="w-28 rounded-t-lg bg-lime-50 py-3 text-center text-sm font-bold uppercase tracking-wider text-lime-700 dark:bg-lime-500/10 dark:text-lime-300">{t('plans_page.pro_tier')}</th>
                </tr>
            </thead>
            <tbody>
                {features.map(f => <FeatureRow key={f.key} label={t(f.key)} free={f.free} pro={f.pro} />)}
            </tbody>
            </table>
        </div>

        <div className="mt-10 text-center">
            <button
                onClick={onGrantAccess}
                className="inline-flex items-center gap-2 rounded-lg bg-lime-500 py-3 px-8 text-base font-semibold text-white shadow-md transition-all hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            >
                <StarIcon className="h-5 w-5" />
                <span>{t('plans_page.upgrade_button')} (Demo)</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;
