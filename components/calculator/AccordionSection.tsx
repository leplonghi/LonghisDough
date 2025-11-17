

import React from 'react';

interface FormSectionProps {
  title: React.ReactNode;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, description, icon, children }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white transition-all duration-300 dark:border-slate-700/50 dark:bg-slate-800">
      <div className="flex w-full items-start gap-4 p-4 text-left sm:p-5">
        <span className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-lime-100 text-lime-600 dark:bg-lime-900/50 dark:text-lime-400">
          {icon}
        </span>
        <div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
      </div>
      <div className="space-y-6 border-t border-slate-200 p-4 pt-5 dark:border-slate-700/50 sm:p-6">
        {children}
      </div>
    </div>
  );
};

export default FormSection;
