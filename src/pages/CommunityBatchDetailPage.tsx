
import React, { useState, useEffect } from 'react';
import { CommunityBatch, DoughConfig, Page } from '@/types';
import { getCommunityBatchById } from '@/data/communityStore';
import { useTranslation } from '@/i18n';
import { DocumentDuplicateIcon } from '@/components/ui/Icons';

interface CommunityBatchDetailPageProps {
  batchId: string | null;
  onLoadAndNavigate: (config: Partial<DoughConfig>) => void;
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
                <h2 className="text-xl font-bold">{t('community_detail.not_found')}</h2>
                <p className="mt-2">{t('community_detail.not_found_desc')}</p>
                <button onClick={() => onNavigate('community')} className="mt-4 rounded-md bg-lime-500 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600">
                    {t('community_detail.back_to_community')}
                </button>
            </div>
        );
    }
    
    const { baseConfig } = batch;

    return (
        <div className="mx-auto max-w-4xl animate-[fadeIn_0.5s_ease-in-out]">
            <button 
              onClick={() => window.history.back()} 
              className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
            >
              &larr; Back
            </button>

            <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800 sm:p-10">
                 <div className="mb-6 border-b border-slate-200 pb-6 dark:border-slate-700">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        {batch.title}
                    </h1>
                     <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        {t('community_detail.by')} {batch.ownerDisplayName} {t('community_detail.on')} {new Date(batch.createdAt).toLocaleDateString()}
                     </p>
                </div>
                
                {batch.description && (
                    <div className="prose dark:prose-invert max-w-none mb-8">
                        <p>{batch.description}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{t('community_detail.recipe_params')}</h3>
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-6">
                            <DetailRow label={t('community_detail.style')} value={t(`form.${baseConfig.recipeStyle.toLowerCase()}`, {defaultValue: baseConfig.recipeStyle})} />
                            <DetailRow label={t('community_detail.units')} value={`${baseConfig.numPizzas} @ ${baseConfig.doughBallWeight}g`} />
                            <DetailRow label={t('community_detail.hydration')} value={`${baseConfig.hydration}%`} />
                            <DetailRow label={t('community_detail.salt')} value={`${baseConfig.salt}%`} />
                            <DetailRow label={t('community_detail.oil')} value={`${baseConfig.oil}%`} />
                            {baseConfig.sugar ? <DetailRow label={t('community_detail.sugar')} value={`${baseConfig.sugar}%`} /> : null}
                            <DetailRow label={t('community_detail.yeast')} value={`${baseConfig.yeastPercentage}% (${t(`form.yeast_${baseConfig.yeastType.toLowerCase()}`)})`} />
                            {batch.bakingTempC && <DetailRow label={t('community_detail.baking_temp')} value={`${batch.bakingTempC}°C`} />}
                        </dl>
                    </div>
                     <div className="space-y-6">
                         <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{t('community_detail.env_process')}</h3>
                         <dl className="grid grid-cols-2 gap-x-4 gap-y-6">
                             <DetailRow label={t('community_detail.ambient_temp')} value={t(`form.temp_${baseConfig.ambientTemperature.toLowerCase()}`)} />
                         </dl>
                    </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-700">
                    <button onClick={() => onNavigate('community')} className="text-sm font-medium text-lime-600 hover:underline dark:text-lime-400">
                        &larr; {t('community_detail.back_to_community')}
                    </button>
                    <button onClick={() => onLoadAndNavigate(baseConfig)} className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-lime-500 py-3 px-6 text-base font-semibold text-white shadow-md transition-all hover:bg-lime-600">
                        <DocumentDuplicateIcon className="h-5 w-5" />
                        {t('community_detail.clone')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommunityBatchDetailPage;
