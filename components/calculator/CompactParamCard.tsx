import React from 'react';

interface CompactParamCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  unit?: string;
  colorClass: string;
}

const CompactParamCard: React.FC<CompactParamCardProps> = ({ icon, label, value, unit = '%', colorClass }) => (
  <div className="flex flex-row items-center justify-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm transition-all hover:bg-white hover:shadow-md">
    <div className={`flex-shrink-0 rounded-full p-1.5 ${colorClass} bg-opacity-15`}>
      {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: `h-4 w-4 ${colorClass.replace('bg-', 'text-')}` })}
    </div>
    <div className="flex flex-col items-start leading-tight">
       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{label}</span>
       <span className="text-base font-bold text-slate-800">
        {value}<span className="text-xs font-medium text-slate-500 ml-0.5">{unit}</span>
       </span>
    </div>
  </div>
);

export default CompactParamCard;