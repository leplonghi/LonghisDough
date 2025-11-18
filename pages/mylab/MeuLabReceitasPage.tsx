
import React, { useState } from 'react';
import { Page } from '../../types';
import MyLabLayout from './MyLabLayout';
import { UploadIcon } from '../../components/IconComponents';
import ImportReceitaModal from '../../components/mylab/ImportReceitaModal';

const MeuLabReceitasPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  return (
    <MyLabLayout activePage="mylab/receitas" onNavigate={onNavigate}>
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">My Recipes</h1>
                 <p className="mt-1 text-sm text-neutral-500">
                    Your collection of saved recipes and presets.
                </p>
            </div>
            <button 
                onClick={() => setIsImportModalOpen(true)}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-white py-2 px-4 font-semibold text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50"
            >
                <UploadIcon className="h-5 w-5" />
                Import Recipe
            </button>
        </div>
         <div className="flex h-64 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm text-center">
            <p className="text-neutral-500">
                Coming soon: Manage your saved recipe presets for quick use in the calculator.
            </p>
        </div>
        <ImportReceitaModal 
            isOpen={isImportModalOpen}
            onClose={() => setIsImportModalOpen(false)}
        />
    </MyLabLayout>
  );
};

export default MeuLabReceitasPage;
