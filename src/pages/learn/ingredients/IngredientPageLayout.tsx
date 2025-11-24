
import React from 'react';
import { BookOpenIcon } from '../../../components/IconComponents';

interface IngredientPageLayoutProps {
  title: string;
  description?: string;
  category?: string;
  children: React.ReactNode;
}

const IngredientPageLayout: React.FC<IngredientPageLayoutProps> = ({ title, description, category, children }) => {
  return (
    <div className="mx-auto max-w-4xl animate-[fadeIn_0.5s_ease-in-out]">
      <button 
        onClick={() => window.history.back()} 
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
      >
        &larr; Back
      </button>
      <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 sm:p-10 dark:bg-slate-800 dark:ring-slate-700">
        <div className="text-center sm:text-left border-b border-slate-200 pb-6 dark:border-slate-700">
            {category && <p className="text-sm font-semibold text-lime-600 mb-1 dark:text-lime-400">{category}</p>}
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{title}</h1>
            {description && (
                <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">
                {description}
                </p>
            )}
        </div>

        <div className="mt-2">
          {children}
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-700">
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-100">
                <BookOpenIcon className="h-6 w-6 text-lime-500" />
                <span>Technical References</span>
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-400">
                <li>Modernist Pizza – processed toppings</li>
                <li>Serious Eats – toppings and prep</li>
                <li>Ooni Learn – pre-cooked toppings</li>
                <li>Wikipedia – preservation processes</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default IngredientPageLayout;
