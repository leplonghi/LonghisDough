
import React from 'react';
import { CheckIcon, CloseIcon, StarIcon } from './IconComponents';
import { useTranslation } from '../i18n'; // Import useTranslation

interface PlansPageProps {
    onGrantAccess: () => void;
    onNavigateHome: () => void;
}

const FeatureRow: React.FC<{
  label: string;
  free: React.ReactNode;
  pro: React.ReactNode;
}> = ({ label, free, pro }) => (
    <tr className="border-b border-slate-200 last:border-b-0">
      <td className="py-4 pr-4 font-medium text-slate-700">
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
  const { t } = useTranslation(); // Initialize useTranslation
  
  const features = [
      { label: t('plans.feature_dough_calculator', { defaultValue: 'Dough Calculator' }), free: true, pro: true },
      { label: t('plans.feature_style_presets', { defaultValue: 'Style Presets' }), free: true, pro: true },
      { label: t('plans.feature_unit_conversion', { defaultValue: 'Unit Conversion' }), free: true, pro: true },
      { label: t('plans.feature_save_unlimited_bakes', { defaultValue: 'Save Unlimited Bakes' }), free: false, pro: true },
      { label: t('plans.feature_export_pdf_json', { defaultValue: 'Export PDF/JSON' }), free: false, pro: true },
      { label: t('plans.feature_batch_scaling', { defaultValue: 'Batch Scaling' }), free: false, pro: true },
      { label: t('plans.feature_pro_recipes_techniques', { defaultValue: 'Pro Recipes & Techniques' }), free: false, pro: true },
  ];

  const renderCheck = (value: boolean, text?: string) => {
      if (text) {
          return <span className="text-sm text-slate-500">{text}</span>
      }
      return value ? <CheckIcon className="mx-auto h-6 w-6 text-lime-500" /> : <CloseIcon className="mx-auto h-6 w-6 text-slate-400" />;
  }

  return (
    <div className="mx-auto max-w-4xl animate-[fadeIn_0.5s_ease-in-out]">
      <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 sm:p-10">
        <div className="text-center">
            <StarIcon className="mx-auto h-12 w-12 text-lime-500" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t('plans.title', { defaultValue: 'DoughLabPro Plans' })}
            </h1>
            <p className="mt-4 text-lg text-slate-600">
            {t('plans.subtitle', { defaultValue: 'Choose the best plan for your baking journey.' })}
            </p>
        </div>

        <div className="mt-10 overflow-x-auto">
            <table className="min-w-full table-auto">
            <thead>
                <tr className="border-b-2 border-slate-300">
                <th className="py-3 pr-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-500">{t('plans.table_header_feature', { defaultValue: 'Feature' })}</th>
                <th className="py-3 text-center text-sm font-semibold uppercase tracking-wider text-slate-500">{t('plans.table_header_free', { defaultValue: 'Free' })}</th>
                <th className="rounded-t-lg bg-lime-50 py-3 text-center text-sm font-bold uppercase tracking-wider text-lime-700">{t('plans.table_header_pro', { defaultValue: 'Pro' })}</th>
                </tr>
            </thead>
            <tbody>
                {features.map((f, index) => (
                    <FeatureRow 
                        key={index} 
                        label={f.label} 
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
                className="inline-flex items-center gap-2 rounded-lg bg-lime-500 py-3 px-8 text-base font-semibold text-white shadow-md transition-all hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
            >
                <StarIcon className="h-5 w-5" />
                <span>{t('plans.upgrade_button', { defaultValue: 'Upgrade to Pro' })}</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;