

import React, { ReactNode } from 'react';
import { Page } from '@/types';
import { BeakerIcon, BookOpenIcon, ChartBarIcon, ClockIcon, DocumentDuplicateIcon, FlourIcon, SparklesIcon, FlaskIcon } from '@/components/ui/Icons';

interface MyLabLayoutProps {
  children: ReactNode;
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const MyLabLayout: React.FC<MyLabLayoutProps> = ({ children, activePage, onNavigate }) => {
  const navItems = [
    { page: 'mylab' as Page, label: 'Overview', icon: <ChartBarIcon className="h-5 w-5" /> },
    { page: 'mylab/fornadas' as Page, label: 'My Bakes', icon: <BeakerIcon className="h-5 w-5" /> },
    { page: 'mylab/levain' as Page, label: 'Levain Pet', icon: <SparklesIcon className="h-5 w-5" /> },
    { page: 'mylab/objetivos' as Page, label: 'My Goals', icon: <SparklesIcon className="h-5 w-5" /> },
    { page: 'mylab/consistency' as Page, label: 'Consistency Mode', icon: <FlaskIcon className="h-5 w-5" /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
      <aside className="md:col-span-1 lg:col-span-1">
        {/* Sidebar for Desktop */}
        <nav className="hidden md:sticky md:top-24 md:block space-y-2">
          {navItems.map(item => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`flex w-full items-center gap-3 rounded-lg p-3 text-sm font-semibold transition-colors ${
                activePage === item.page
                  ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
                  : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
              }`}
            >
              {item.icon}
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>
        {/* Tabs for Mobile */}
        <div className="md:hidden">
            <div className="border-b border-neutral-200 dark:border-neutral-700">
                <nav className="-mb-px flex space-x-4 overflow-x-auto" aria-label="Tabs">
                    {navItems.map(item => (
                        <button
                            key={item.page}
                            onClick={() => onNavigate(item.page)}
                            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                                activePage === item.page
                                ? 'border-lime-500 text-lime-600 dark:text-lime-400'
                                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-200 dark:hover:border-neutral-600'
                            }`}
                        >
                            {item.label}
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
