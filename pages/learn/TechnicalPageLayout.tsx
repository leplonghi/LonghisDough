import React from 'react';
import { BookOpenIcon } from '../../components/IconComponents';

interface TechnicalPageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  showReferencesSection?: boolean;
}

const TechnicalPageLayout: React.FC<TechnicalPageLayoutProps> = ({ title, subtitle, children, showReferencesSection = false }) => {
  return (
    <div className="mx-auto max-w-4xl animate-[fadeIn_0.5s_ease-in-out]">
      <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 sm:p-10">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
          {subtitle && (
            <p className="mt-4 text-lg text-slate-600">
              {subtitle}
            </p>
          )}
        </div>

        <div className="prose mt-8 max-w-none text-slate-600">
          {children}
        </div>

        {showReferencesSection && (
          <div className="mt-12 border-t border-slate-200 pt-8">
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">
                <BookOpenIcon className="h-6 w-6 text-lime-500" />
                <span>Referências Técnicas</span>
            </h2>
            <p className="mt-4 text-sm text-slate-500 italic">
                As referências técnicas desta página serão inseridas aqui com base em fontes reais e verificáveis (AVPN, King Arthur Baking, Serious Eats, literatura científica etc.). Nenhum dado será inventado.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicalPageLayout;