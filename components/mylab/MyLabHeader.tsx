import React from 'react';
// FIX: Corrected the import path for the useUser hook.
import { useUser } from '../../contexts/UserProvider';
import { Page } from '../../types';
// FIX: Add missing import
import { CalculatorIcon } from '../IconComponents';

interface MyLabHeaderProps {
  onNavigate: (page: Page) => void;
}

const MyLabHeader: React.FC<MyLabHeaderProps> = ({ onNavigate }) => {
  const { user } = useUser();

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800 sm:p-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Meu Lab
          </h1>
          <p className="mt-1 text-slate-600 dark:text-slate-300">
            Seu laboratório pessoal de massas. Anote, compare, entenda e evolua.
          </p>
        </div>
        <button
          onClick={() => onNavigate('calculator')}
          className="inline-flex flex-shrink-0 items-center gap-2 rounded-lg bg-lime-500 py-2.5 px-5 text-base font-semibold text-white shadow-md transition-all hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
        >
          <CalculatorIcon className="h-5 w-5" />
          <span>Criar Nova Massa</span>
        </button>
      </div>
    </div>
  );
};

export default MyLabHeader;