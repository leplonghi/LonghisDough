import React, { ReactNode } from 'react';
import { Page } from '../../types';
import { BeakerIcon, BookOpenIcon, ChartBarIcon, ClockIcon, DocumentDuplicateIcon, FlourIcon, SparklesIcon, FlaskIcon } from '../../components/IconComponents';

interface MyLabLayoutProps {
  children: ReactNode;
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const MyLabLayout: React.FC<MyLabLayoutProps> = ({ children, activePage, onNavigate }) => {
  const navItems = [
    { page: 'mylab' as Page, label: 'Visão Geral', icon: <ChartBarIcon className="h-5 w-5" /> },
    { page: 'mylab/fornadas' as Page, label: 'Minhas Fornadas', icon: <BeakerIcon className="h-5 w-5" /> },
    { page: 'mylab/levain' as Page, label: 'Levain Pet', icon: <SparklesIcon className="h-5 w-5" /> },
    { page: 'mylab/objetivos' as Page, label: 'Meus Objetivos', icon: <SparklesIcon className="h-5 w-5" /> },
    { page: 'mylab/consistency' as Page, label: 'Consistency Mode', icon: <FlaskIcon className="h-5 w-5" /> },
    { page: 'mylab/massas' as Page, label: 'Minhas Massas', icon: <DocumentDuplicateIcon className="h-5 w-5" />, isComingSoon: true },
    { page: 'mylab/farinhas' as Page, label: 'Minhas Farinhas', icon: <FlourIcon className="h-5 w-5" />, isComingSoon: true },
    { page: 'mylab/diario-sensorial' as Page, label: 'Diário Sensorial', icon: <BookOpenIcon className="h-5 w-5" />, isComingSoon: true },
    { page: 'mylab/comparacoes' as Page, label: 'Comparações', icon: <SparklesIcon className="h-5 w-5" />, isComingSoon: true },
    { page: 'mylab/insights' as Page, label: 'Insights', icon: <ChartBarIcon className="h-5 w-5" />, isComingSoon: true },
    { page: 'mylab/timeline' as Page, label: 'Linha do Tempo', icon: <ClockIcon className="h-5 w-5" />, isComingSoon: true },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
      <aside className="md:col-span-1 lg:col-span-1">
        {/* Sidebar for Desktop */}
        <nav className="hidden md:sticky md:top-24 md:block space-y-2">
          {navItems.map(item => (
            <button
              key={item.page}
              onClick={() => !item.isComingSoon && onNavigate(item.page)}
              disabled={item.isComingSoon}
              className={`flex w-full items-center justify-between gap-3 rounded-lg p-3 text-sm font-semibold transition-colors ${
                activePage === item.page
                  ? 'bg-neutral-100 text-neutral-900'
                  : 'text-neutral-600 hover:bg-neutral-100'
              } ${item.isComingSoon ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="truncate">{item.label}</span>
              </div>
              {item.isComingSoon && <span className="text-xs font-bold text-sky-500 bg-sky-100 px-1.5 py-0.5 rounded-full">Em Breve</span>}
            </button>
          ))}
        </nav>
        {/* Tabs for Mobile */}
        <div className="md:hidden">
            <div className="border-b border-neutral-200">
                <nav className="-mb-px flex space-x-4 overflow-x-auto" aria-label="Tabs">
                    {navItems.map(item => (
                        <button
                            key={item.page}
                            onClick={() => !item.isComingSoon && onNavigate(item.page)}
                            disabled={item.isComingSoon}
                            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-1.5 ${
                                activePage === item.page
                                ? 'border-lime-500 text-lime-600'
                                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                            } ${item.isComingSoon ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {item.label}
                            {item.isComingSoon && <span className="text-xs text-sky-500">(Em Breve)</span>}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
      </aside>
      <main className="md:col-span-3 lg:col-span-4">
        {children}
      </main>
    </div>
  );
};

export default MyLabLayout;