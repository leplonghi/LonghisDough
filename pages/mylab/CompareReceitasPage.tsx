import React, { useState, useEffect } from 'react';
import { Page, Batch, DoughConfig, FermentationTechnique } from '../../types';
import { useUser } from '../../contexts/UserProvider';
import { useTranslation } from '../../i18n';
import { FLOURS } from '../../flours-constants';
import { CalculatorIcon, ExclamationCircleIcon } from '../../components/IconComponents';

interface CompareReceitasPageProps {
  onNavigate: (page: Page, params?: string) => void;
  onLoadAndNavigate: (config: DoughConfig) => void;
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
                    <DetailRow label="Estilo" value={t(`form.${doughConfig.recipeStyle.toLowerCase()}`, { defaultValue: doughConfig.recipeStyle })} />
                    <DetailRow label="Hidratação" value={`${doughConfig.hydration}%`} />
                    <DetailRow label="Farinha" value={flour?.name} />
                    <DetailRow label="Fermento" value={`${doughConfig.yeastPercentage}% (${t(`form.yeast_${doughConfig.yeastType.toLowerCase()}`)})`} />
                    <DetailRow label="Pré-fermento" value={doughConfig.fermentationTechnique === FermentationTechnique.DIRECT ? 'Nenhum' : doughConfig.fermentationTechnique} />
                    <DetailRow label="Tempo Total" value={batch.bulkTimeHours || batch.proofTimeHours ? `${(batch.bulkTimeHours || 0) + (batch.proofTimeHours || 0)}h` : 'N/A'} />
                    <div className="py-3">
                        <dt className="text-sm text-neutral-500 dark:text-neutral-400">Processo (resumo)</dt>
                        <dd className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap truncate h-20">{batch.notes || 'Sem notas.'}</dd>
                    </div>
                </dl>
            </div>
            <button
                onClick={onLoad}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-lime-500 py-2.5 px-4 font-semibold text-white shadow-sm hover:bg-lime-600"
            >
                <CalculatorIcon className="h-5 w-5" />
                Usar Receita na Calculadora
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
                setError('IDs das receitas não encontrados na URL.');
                setIsLoading(false);
                return;
            }

            const foundA = batches.find(b => b.id === idA);
            const foundB = batches.find(b => b.id === idB);

            if (!foundA || !foundB) {
                setError('Não foi possível carregar uma das receitas para comparação.');
                setIsLoading(false);
                return;
            }

            setBatchA(foundA);
            setBatchB(foundB);
        } catch (e) {
            setError('Ocorreu um erro ao processar a requisição.');
        } finally {
            setIsLoading(false);
        }
    }, [batches]);

    if (isLoading) {
        return <div className="text-center p-8">Carregando comparação...</div>;
    }

    if (error) {
        return (
            <div className="text-center p-8 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30">
                 <ExclamationCircleIcon className="mx-auto h-10 w-10 text-red-500" />
                <h2 className="mt-4 text-xl font-semibold text-red-800 dark:text-red-200">Erro na Comparação</h2>
                <p className="mt-2 text-red-700 dark:text-red-300">{error}</p>
                <button onClick={() => onNavigate('mylab/comparacoes')} className="mt-6 text-sm font-semibold text-lime-600 dark:text-lime-400 hover:underline">
                    &larr; Voltar para a seleção
                </button>
            </div>
        );
    }
    
    if (!batchA || !batchB) {
         return null; // Should be covered by error state
    }

    return (
        <div className="animate-[fadeIn_0.5s_ease-in-out]">
             <div className="mb-8">
                <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">Comparar receitas</h1>
                <p className="mt-1 text-sm text-neutral-500">Veja lado a lado as diferenças entre duas receitas.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                <RecipeDetailColumn batch={batchA} onLoad={() => onLoadAndNavigate(batchA.doughConfig)} t={t} />
                <RecipeDetailColumn batch={batchB} onLoad={() => onLoadAndNavigate(batchB.doughConfig)} t={t} />
            </div>

            <div className="mt-8 text-center">
                 <button onClick={() => onNavigate('mylab/comparacoes')} className="text-sm font-semibold text-lime-600 dark:text-lime-400 hover:underline">
                    &larr; Selecionar outras receitas
                </button>
            </div>
        </div>
    );
};

export default CompareReceitasPage;