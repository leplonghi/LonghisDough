import React from 'react';
import { CommunityBatch, Page } from '../types';
import { useTranslation } from '../i18n';
import { StarIcon, FireIcon } from './IconComponents';

interface CommunityBatchCardProps {
  batch: CommunityBatch;
  onNavigate: (page: Page) => void;
}

const CommunityBatchCard: React.FC<CommunityBatchCardProps> = ({ batch, onNavigate }) => {
    const { t } = useTranslation();

    return (
        <button
            onClick={() => onNavigate(`community/${batch.id}`)}
            className="h-full text-left flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-md transition-all hover:shadow-xl hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800"
        >
            <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Por {batch.ownerDisplayName}
                </p>
                <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                    {batch.title}
                </h3>
                {batch.styleId && (
                     <p className="mt-1 text-sm font-semibold text-lime-600 dark:text-lime-400">
                        {t(`form.${batch.styleId.toLowerCase()}`, { defaultValue: batch.styleId })}
                    </p>
                )}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center gap-1.5">
                    <FireIcon className="h-4 w-4 text-slate-400"/>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{batch.hydrationPercentage}%</span>
                </div>
                {batch.ratingAverage && (
                     <div className="flex items-center gap-1">
                        <StarIcon className="h-4 w-4 text-yellow-400"/>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{batch.ratingAverage.toFixed(1)}</span>
                    </div>
                )}
            </div>
        </button>
    );
};

export default CommunityBatchCard;