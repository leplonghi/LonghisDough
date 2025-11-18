
import React from 'react';
import { Page } from '../../types';
import MyLabLayout from './MyLabLayout';

const MeuLabDiarioSensorialPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
    return (
        <MyLabLayout activePage="mylab/diario-sensorial" onNavigate={onNavigate}>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Sensory Journal</h1>
                    <p className="mt-1 text-sm text-neutral-500">Your timeline to log aroma, texture, and taste notes for each bake.</p>
                </div>
            </div>
             <div className="flex h-64 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm text-center">
                <p className="text-neutral-500">
                    Coming soon: Your sensory journal for logging detailed tasting notes on aroma, texture, and flavor for every bake.
                </p>
            </div>
        </MyLabLayout>
    );
};

export default MeuLabDiarioSensorialPage;
