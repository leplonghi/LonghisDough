import React from 'react';
import { Page } from '../../types';
import MyLabLayout from './MyLabLayout';

const MeuLabMassasPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
    return (
        <MyLabLayout activePage="mylab/massas" onNavigate={onNavigate}>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">My Doughs</h1>
                    <p className="mt-1 text-sm text-neutral-500">An area to save and manage your base dough recipes.</p>
                </div>
                 <button className="rounded-lg bg-lime-500 py-2 px-4 font-semibold text-white shadow-sm hover:bg-lime-600">
                    Add New Dough
                </button>
            </div>
            <div className="flex h-64 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm text-center">
                <p className="text-neutral-500">
                    Coming soon: An area to save and manage your base dough recipes.
                </p>
            </div>
        </MyLabLayout>
    );
};

export default MeuLabMassasPage;