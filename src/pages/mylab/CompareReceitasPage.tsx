
import React, { useState, useEffect } from 'react';
import { Page, Batch, DoughConfig, FermentationTechnique } from '../../types';
import { useUser } from '../../contexts/UserProvider';
import { useTranslation } from '../../i18n';
import { FLOURS } from '../../flours-constants';
import { CalculatorIcon, ExclamationCircleIcon } from '../../components/IconComponents';
import ProFeatureLock from '../../components/ui/ProFeatureLock';

interface CompareReceitasPageProps {
  onNavigate: (page: Page, params?: string) => void;
  onLoadAndNavigate: (config: Partial<DoughConfig>) => void;
}

const DetailRow: React.FC<{ label: string; value: string | number | undefined }> = ({ label, value }) => (
    <div className="py-3 border-b border-neutral-200 dark:border-neutral-700">
        <dt className="text-sm text-neutral-500 dark:text-neutral-400">{label}</dt>
        <dd className="mt-1 font-semibold text-neutral-800 dark:text-neutral-100">{value || 'N/A'}</dd>
    </div>
);

const RecipeDetailColumn: React.FC<{ batch: Batch; onLoad: () => void; t: (key: string, options?: any) => string }> = ({ batch, onLoad, t }) => {
    const { doughConfig, doughResult } = batch;
    const flour = FLOURS.find(f => f.id === doughConfig.flourId);

    return (
        <div className="rounded-xl border border-neutral-200 bg-white dark:bg-neutral-800 p-6 shadow-sm flex flex-col">
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">{batch.name}</h3>
                <dl>
                    <DetailRow label="Style" value={t(`form.${doughConfig.recipeStyle.toLowerCase()}`, { defaultValue: doughConfig.recipeStyle })} />
                    <DetailRow label="Hydration" value={`${doughConfig.hydration}%`} />
                    <DetailRow label="Flour" value={flour?.name} />
                    <DetailRow label="Yeast" value={`${doughConfig.yeastPercentage}% (${t(`form.yeast_${doughConfig.yeastType.toLowerCase()}`)})`} />
                    <DetailRow label="Preferment" value={doughConfig.fermentationTechnique === FermentationTechnique.DIRECT ? 'None' : doughConfig.fermentationTechnique} />
                    <DetailRow label="Total Time" value={batch.bulkTimeHours || batch.proofTimeHours ? `${(batch.bulkTimeHours || 0) + (batch.proofTimeHours || 0)}h` : 'N/A'} />
                    <div className="py-3">
                        <dt className="text-sm text-neutral-500 dark:text-neutral-400">Process (summary)</dt>
                        <dd className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap truncate h-20">{batch.notes || 'No notes.'}</dd>
                    </div>
                </dl>
            </div>
            <button
                onClick={onLoad}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-lime-500 py-2.5 px-4 font-semibold text-white shadow-sm hover:bg-lime-600"
            >
                <CalculatorIcon className="h-5 w-5" />
                Use Recipe in Calculator
            </button>
        </div>
    );
};


const CompareReceitasPage: React.FC<CompareReceitasPageProps> = ({ onNavigate, onLoadAndNavigate }) => {
    const { batches } = useUser();
    const { t } = useTranslation();
    const [batchA, setBatchA] = useState<Batch | null>(null);
    const [batchB, setBatchB] = useState<Batch | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            // FIX: Parse params from hash for HashRouter
            const hash = window.location.hash;
            const queryString = hash.includes('?') ? hash.split('?')[1] : '';
            const params = new URLSearchParams(queryString);
            
            const idA = params.get('idA');
            const idB = params.get('idB');

            if (!idA || !idB) {
                // If no IDs, we just show the empty state or selection screen placeholder
                // For now, let's pretend we are loading just to show the Pro Lock on the container
                setIsLoading(false); 
                return;
            }

            const foundA = batches.find(b => b.id === idA);
            const foundB = batches.find(b => b.id === idB);

            if (!foundA || !foundB) {
                setError('Could not load one of the recipes for comparison.');
                setIsLoading(false);
                return;
            }

            setBatchA(foundA);
            setBatchB(foundB);
        } catch (e) {
            setError('An error occurred while processing the request.');
        } finally {
            setIsLoading(false);
        }
    }, [batches]);
    
    // Mock data for visualization behind lock if no batches selected
    const mockBatch = batches[0] || null;

    return (
        <div className="animate-[fadeIn_0.5s_ease-in-out]">
             <div className="mb-8">
                <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">Compare Recipes</h1>
                <p className="mt-1 text-sm text-neutral-500">See side-by-side differences between two recipes.</p>
            </div>

            <ProFeatureLock 
                origin='mylab' 
                featureName="Recipe Comparison Tool" 
                description="See beyond the surface. Unlock advanced dough science with Pro to compare recipes side-by-side."
                className="min-h-[25rem] flex items-center justify-center"
            >
                 {error ? (
                    <div className="text-center p-8 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 filter blur-sm pointer-events-none select-none opacity-60">
                         <ExclamationCircleIcon className="mx-auto h-10 w-10 text-red-500" />
                        <h2 className="mt-4 text-xl font-semibold text-red-800 dark:text-red-200">Comparison Error</h2>
                        <p className="mt-2 text-red-700 dark:text-red-300">{error}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 filter blur-sm pointer-events-none select-none opacity-60">
                        {mockBatch ? (
                            <>
                                <RecipeDetailColumn batch={mockBatch} onLoad={() => {}} t={t} />
                                <RecipeDetailColumn batch={mockBatch} onLoad={() => {}} t={t} />
                            </>
                        ) : (
                            <div className="col-span-2 text-center p-12 border-2 border-dashed border-slate-300 rounded-xl">
                                <p className="text-slate-500">Select recipes to compare</p>
                            </div>
                        )}
                    </div>
                )}
            </ProFeatureLock>
        </div>
    );
};

export default CompareReceitasPage;
