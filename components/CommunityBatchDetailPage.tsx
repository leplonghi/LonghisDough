import React, { useState, useEffect } from 'react';
import { CommunityBatch, DoughConfig, Page } from '../types';
import { getCommunityBatchById } from '../data/communityStore';
import { useTranslation } from '../i18n';
import { DocumentDuplicateIcon } from './IconComponents';

interface CommunityBatchDetailPageProps {
  batchId: string | null;
  onLoadAndNavigate: (config: DoughConfig) => void;
  onNavigate: (page: Page) => void;
}

const DetailRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div>
        <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</dt>
        <dd className="mt-1 font-semibold text-slate-900 dark:text-white">{value}</dd>
    </div>
);

const CommunityBatchDetailPage: React.FC<CommunityBatchDetailPageProps> = ({ batchId, onLoadAndNavigate, onNavigate }) => {
    const { t } = useTranslation();
    const [batch, setBatch] = useState<CommunityBatch | null>(null);

    useEffect(() => {
        if (batchId) {
            const foundBatch = getCommunityBatchById(batchId);
            setBatch(foundBatch || null);
        }
    }, [batchId]);

    if (!batch) {
        return (
            <div className="text-center p-8">
                <h2 className="text-xl font-bold">Fornada da Comunidade não encontrada</h2>
                <p className="mt-2">Esta fornada não existe ou foi removida.</p>
                <button onClick={() => onNavigate('community')} className="mt-4 rounded-md bg-lime-500 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600">
                    Voltar para a Comunidade
                </button>
            </div>
        );
    }
    
    const { baseConfig } = batch;

    return (
        <div className="mx-auto max-w-4xl animate-[fadeIn_0.5s_ease-in-out]">
            <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800 sm:p-10">
                 <div className="mb-6 border-b border-slate-200 pb-6 dark:border-slate-700">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        {batch.title}
                    </h1>
                     <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Por {batch.ownerDisplayName} em {new Date(batch.createdAt).toLocaleDateString()}
                     </p>
                </div>
                
                {batch.description && (
                    <div className="prose dark:prose-invert max-w-none mb-8">
                        <p>{batch.description}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Parâmetros da Receita</h3>
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-6">
                            <DetailRow label="Estilo" value={t(`form.${baseConfig.recipeStyle.toLowerCase()}`, {defaultValue: baseConfig.recipeStyle})} />
                            <DetailRow label="Unidades" value={`${baseConfig.numPizzas} @ ${baseConfig.doughBallWeight}g`} />
                            <DetailRow label="Hidratação" value={`${baseConfig.hydration}%`} />
                            <DetailRow label="Sal" value={`${baseConfig.salt}%`} />
                            <DetailRow label="Óleo/Azeite" value={`${baseConfig.oil}%`} />
                            {baseConfig.sugar ? <DetailRow label="Açúcar" value={`${baseConfig.sugar}%`} /> : null}
                            <DetailRow label="Fermento" value={`${baseConfig.yeastPercentage}% (${t(`form.yeast_${baseConfig.yeastType.toLowerCase()}`)})`} />
                        </dl>
                    </div>
                     <div className="space-y-6">
                         <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Ambiente & Processo</h3>
                         <dl className="grid grid-cols-2 gap-x-4 gap-y-6">
                             <DetailRow label="Temp. Ambiente" value={t(`form.temp_${baseConfig.ambientTemperature.toLowerCase()}`)} />
                         </dl>
                    </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-700">
                    <button onClick={() => onNavigate('community')} className="text-sm font-medium text-lime-600 hover:underline dark:text-lime-400">
                        &larr; Voltar para a Comunidade
                    </button>
                    <button onClick={() => onLoadAndNavigate(baseConfig)} className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-lime-500 py-3 px-6 text-base font-semibold text-white shadow-md transition-all hover:bg-lime-600">
                        <DocumentDuplicateIcon className="h-5 w-5" />
                        Clonar para Calculadora
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommunityBatchDetailPage;