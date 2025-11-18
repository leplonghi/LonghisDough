import React from 'react';
import { WaterIcon, CheckCircleIcon, FermentationIcon, BatchesIcon } from '../IconComponents';

const SummaryCard: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
      {icon}
    </div>
    <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
    <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
  </div>
);

const InsightsSummary: React.FC = () => {
  return (
    <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">General Performance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <SummaryCard
                icon={<WaterIcon className="h-6 w-6 text-slate-500" />}
                label="Avg. Hydration"
                value="68.2%"
            />
            <SummaryCard
                icon={<CheckCircleIcon className="h-6 w-6 text-slate-500" />}
                label="Success Rate"
                value="92%"
            />
            <SummaryCard
                icon={<FermentationIcon className="h-6 w-6 text-slate-500" />}
                label="Avg. Fermentation"
                value="48h"
            />
            <SummaryCard
                icon={<BatchesIcon className="h-6 w-6 text-slate-500" />}
                label="Bakes (30d)"
                value="12"
            />
        </div>
    </div>
  );
};

export default InsightsSummary;