import React, { useState } from 'react';
import { Page, Batch } from '../../types';
import MyLabLayout from './MyLabLayout';
import { useUser } from '../../contexts/UserProvider';
import { useTranslation } from '../../i18n';
import { SparklesIcon } from '../../components/IconComponents';

const MeuLabComparacoesPage: React.FC<{ onNavigate: (page: Page, params?: string) => void }> = ({ onNavigate }) => {
    const { batches } = useUser();
    const { t } = useTranslation();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleSelect = (id: string) => {
        setSelectedIds(prev => {
            if (prev.includes(id)) {
                return prev.filter(selectedId => selectedId !== id);
            }
            if (prev.length < 2) {
                return [...prev, id];
            }
            // If 2 are already selected, replace the first one
            return [prev[1], id];
        });
    };

    const handleCompare = () => {
        if (selectedIds.length !== 2) return;
        // The navigate function in App.tsx only handles the hash part.
        // We construct the full hash with query params manually.
        window.location.hash = `/mylab/receitas/comparar?idA=${selectedIds[0]}&idB=${selectedIds[1]}`;
    };

    return (
        <MyLabLayout activePage="mylab/comparacoes" onNavigate={onNavigate}>
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Comparações</h1>
                    <p className="mt-1 text-sm text-neutral-500">Selecione duas fornadas para comparar suas receitas lado a lado.</p>
                </div>
                <button
                    onClick={handleCompare}
                    disabled={selectedIds.length !== 2}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-lime-500 py-2 px-4 font-semibold text-white shadow-sm hover:bg-lime-600 disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                    <SparklesIcon className="h-5 w-5"/>
                    Comparar ({selectedIds.length}/2)
                </button>
            </div>
            
            {batches.length > 0 ? (
                <div className="space-y-3">
                    {batches.map(batch => {
                        const isSelected = selectedIds.includes(batch.id);
                        return (
                            <label key={batch.id} className={`flex items-center gap-4 rounded-lg p-4 border transition-colors cursor-pointer ${isSelected ? 'bg-lime-50 border-lime-300' : 'bg-white border-neutral-200 hover:bg-neutral-50'}`}>
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => handleSelect(batch.id)}
                                    className="h-5 w-5 rounded border-neutral-300 text-lime-600 focus:ring-lime-500"
                                />
                                <div className="flex-grow">
                                    <p className="font-medium text-neutral-800">{batch.name}</p>
                                    <p className="text-xs text-neutral-500">
                                        {t(`form.${batch.doughConfig.recipeStyle.toLowerCase()}`, { defaultValue: batch.doughConfig.recipeStyle })} &bull; {new Date(batch.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </label>
                        );
                    })}
                </div>
            ) : (
                <div className="flex h-64 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm text-center">
                    <p className="text-neutral-500">
                        Você precisa ter pelo menos duas fornadas salvas para poder comparar.
                    </p>
                </div>
            )}
        </MyLabLayout>
    );
};

export default MeuLabComparacoesPage;