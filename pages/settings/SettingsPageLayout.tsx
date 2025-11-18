
import React from 'react';

interface SettingsPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const SettingsPageLayout: React.FC<SettingsPageLayoutProps> = ({ title, children }) => {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 sm:p-10">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
      </div>
      <div className="mt-6 text-slate-600">
        {children}
      </div>
    </div>
  );
};

export default SettingsPageLayout;