

import React, { ReactNode } from 'react';
import { BeakerIcon, BookOpenIcon, ChartBarIcon, ListBulletIcon } from '@/components/ui/Icons';

type LevainDetailTab = 'summary' | 'feedings' | 'profile' | 'insights';

interface LevainLayoutProps {
  children: ReactNode;
  levainName: string;
  activeTab: LevainDetailTab;
  onTabChange: (tab: LevainDetailTab) => void;
}

const LevainLayout: React.FC<LevainLayoutProps> = ({ children, levainName, activeTab, onTabChange }) => {
  const navItems: { id: LevainDetailTab; label: string; icon: React.ReactNode }[] = [
    { id: 'summary', label: 'Summary', icon: <BeakerIcon className="h-5 w-5" /> },
    { id: 'feedings', label: 'Feedings', icon: <ListBulletIcon className="h-5 w-5" /> },
    { id: 'profile', label: 'Profile', icon: <BookOpenIcon className="h-5 w-5" /> },
    { id: 'insights', label: 'Insights', icon: <ChartBarIcon className="h-5 w-5" /> },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8">
        <a href="#/mylab/levain" className="text-lime-600 font-semibold text-sm hover:underline">
            &larr; Back to Levain Pet
        </a>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 mt-2">{levainName}</h1>
      </header>

       {/* Tabs Navigation */}
        <div className="mb-6">
            <div className="border-b border-neutral-200">
                <nav className="-mb-px flex space-x-4 overflow-x-auto" aria-label="Tabs">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={`whitespace-nowrap flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm ${
                                activeTab === item.id
                                ? 'border-lime-500 text-lime-600'
                                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                            }`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>
        </div>

      <main>
        {children}
      </main>
    </div>
  );
};

export default LevainLayout;
