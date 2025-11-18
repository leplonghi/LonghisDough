
import React from 'react';
import { Page } from '../../types';
import MyLabLayout from './MyLabLayout';

const MeuLabFarinhasPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  return (
    <MyLabLayout activePage="mylab/farinhas" onNavigate={onNavigate}>
        <div className="mb-6 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">My Flours</h1>
                <p className="mt-1 text-sm text-neutral-500">Your personal library of flours, with notes on performance and hydration.</p>
            </div>
            <button className="rounded-lg bg-lime-500 py-2 px-4 font-semibold text-white shadow-sm hover:bg-lime-600">
                Add Flour
            </button>
        </div>
         <div className="flex h-64 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm text-center">
            <p className="text-neutral-500">
                Coming soon: Your personal flour library, tracking performance and hydration characteristics.
            </p>
        </div>
    </MyLabLayout>
  );
};

export default MeuLabFarinhasPage;
