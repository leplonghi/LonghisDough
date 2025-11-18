import React from 'react';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, lastUpdated, children }) => {
  return (
    <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 sm:p-10 animate-[fadeIn_0.5s_ease-in-out]">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
        {lastUpdated && (
            <p className="mt-2 text-sm text-slate-500">Last updated: {lastUpdated}</p>
        )}
      </div>
      <div className="prose mt-6 max-w-none text-slate-600">
        {children}
      </div>
      <div className="mt-10 border-t border-slate-200 pt-6">
        <p className="text-xs text-slate-500 italic">
            This document is provided for informational purposes. While we strive for accuracy, this is an indie project and these terms may not cover all legal jurisdictions.
        </p>
      </div>
    </div>
  );
};

export default LegalPageLayout;