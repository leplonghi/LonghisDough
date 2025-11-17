
import React from 'react';
import { WaterIcon, CheckCircleIcon, FermentationIcon, BatchesIcon } from '../IconComponents';

const SummaryCard: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700">
      {icon}
    </div>
    <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
    <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
  </div>
);

const InsightsSummary: React.FC = () => {
  return (
    <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Performance Geral</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <SummaryCard
                icon={<WaterIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />}
                label="Média de Hidratação"
                value="68.2%"
            />
            <SummaryCard
                icon={<CheckCircleIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />}
                label="Taxa de Sucesso"
                value="92%"
            />
            <SummaryCard
                icon={<FermentationIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />}
                label="Fermentação Média"
                value="48h"
            />
            <SummaryCard
                icon={<BatchesIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />}
                label="Fornadas (30d)"
                value="12"
            />
        </div>
    </div>
  );
};

export default InsightsSummary;
