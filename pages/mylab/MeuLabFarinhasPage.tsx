import React from 'react';
import { Page } from '../../types';
import MyLabLayout from './MyLabLayout';

const MeuLabFarinhasPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  return (
    <MyLabLayout activePage="mylab/farinhas" onNavigate={onNavigate}>
        <div className="mb-6 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">Minhas Farinhas</h1>
                <p className="mt-1 text-sm text-neutral-500">Sua biblioteca pessoal de farinhas, com notas sobre performance e hidratação.</p>
            </div>
            <button className="rounded-lg bg-lime-500 py-2 px-4 font-semibold text-white shadow-sm hover:bg-lime-600">
                Adicionar Farinha
            </button>
        </div>
         <div className="flex h-64 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 p-6 shadow-sm text-center">
            <p className="text-neutral-500 dark:text-neutral-400">
                Em breve: Sua biblioteca pessoal de farinhas, com notas sobre performance e hidratação.
            </p>
        </div>
    </MyLabLayout>
  );
};

export default MeuLabFarinhasPage;