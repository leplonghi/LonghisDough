import React from 'react';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, lastUpdated, children }) => {
  return (
    <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800 sm:p-10">
      <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{title}</h1>
        {lastUpdated && (
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Última atualização: {lastUpdated}</p>
        )}
      </div>
      <div className="prose dark:prose-invert mt-6 max-w-none text-slate-600 dark:text-slate-300">
        {children}
      </div>
      <div className="mt-10 border-t border-slate-200 dark:border-slate-700 pt-6">
        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
            Este documento será preenchido com conteúdo jurídico real, validado e baseado em modelos e legislações aplicáveis. Nenhuma cláusula será inserida sem referência ou validação adequada.
        </p>
      </div>
    </div>
  );
};

export default LegalPageLayout;
