
import React from 'react';
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
  
  const features = [
      { label: 'Dough Calculator', free: true, pro: true },
      { label: 'Style Presets', free: true, pro: true },
      { label: 'Unit Conversion', free: true, pro: true },
      { label: 'Save Unlimited Bakes', free: false, pro: true },
      { label: 'Export PDF/JSON', free: false, pro: true },
      { label: 'Batch Scaling', free: false, pro: true },
      { label: 'Pro Recipes & Techniques', free: false, pro: true },
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
            DoughLab Pro
            </h1>
            <p className="mt-4 text-lg text-slate-600">
            Take your baking to the next level with advanced tools and knowledge.
            </p>
        </div>

        <div className="mt-10 overflow-x-auto">
            <table className="min-w-full table-auto">
            <thead>
                <tr className="border-b-2 border-slate-300">
                <th className="py-3 pr-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-500">Feature</th>
                <th className="py-3 text-center text-sm font-semibold uppercase tracking-wider text-slate-500">Free</th>
                <th className="rounded-t-lg bg-lime-50 py-3 text-center text-sm font-bold uppercase tracking-wider text-lime-700">Pro</th>
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
                <span>Upgrade to Pro (Demo)</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;
