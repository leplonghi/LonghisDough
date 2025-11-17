import React from 'react';
// FIX: Corrected the import path for the useUser hook.
import { useUser } from '../../contexts/UserProvider';
import { getSortedSavedConfigs } from '../../logic/mylabSelectors';
import { DoughConfig, Page, Batch } from '../../types';
import { useTranslation } from '../../i18n';
// FIX: Add missing imports
import { DocumentDuplicateIcon, ListBulletIcon } from '../IconComponents';

interface MyLabRecentBatchesCardProps {
  onLoadAndNavigate: (config: DoughConfig) => void;
  onNavigate: (page: Page, params?: string) => void;
}

const BatchItem: React.FC<{ batch: Batch; onLoad: () => void; onDetails: () => void; t: (key: string, options?: any) => string }> = ({ batch, onLoad, onDetails, t }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    };

    return (
        <div className="flex items-center gap-3 py-3 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
            <div className="flex-grow">
                <p className="font-semibold text-slate-800 dark:text-slate-100">{batch.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t(`form.${batch.doughConfig.recipeStyle.toLowerCase()}`, {defaultValue: batch.doughConfig.recipeStyle})} &bull; {batch.doughConfig.hydration}% &bull; {formatDate(batch.createdAt)}
                </p>
            </div>
            <div className="flex-shrink-0 flex gap-2">
                <button
                    onClick={onLoad}
                    title="Refazer Fornada"
                    className="rounded-md p-2 text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-600 dark:hover:text-slate-200"
                >
                    <DocumentDuplicateIcon className="h-5 w-5" />
                </button>
                 <button
                    onClick={onDetails}
                    className="rounded-md bg-slate-200 py-1 px-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500"
                >
                    Detalhes
                </button>
            </div>
        </div>
    );
}

const MyLabRecentBatchesCard: React.FC<MyLabRecentBatchesCardProps> = ({ onLoadAndNavigate, onNavigate }) => {
  const { batches } = useUser();
  const { t } = useTranslation();

  const recentBatches = getSortedSavedConfigs(batches).slice(0, 5);

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800">
      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
        <ListBulletIcon className="h-6 w-6 text-lime-500" />
        Fornadas Recentes
      </h2>
      {recentBatches.length > 0 ? (
        <div>
          {recentBatches.map(batch => (
            <BatchItem 
                key={batch.id} 
                batch={batch}
                onLoad={() => onLoadAndNavigate(batch.doughConfig)}
                onDetails={() => onNavigate('batch', batch.id)}
                t={t}
            />
          ))}
           <button
            onClick={() => onNavigate('lab')}
            className="mt-4 w-full rounded-md py-2 px-4 text-sm font-semibold text-lime-600 transition-colors hover:bg-lime-50 dark:text-lime-400 dark:hover:bg-lime-500/10"
          >
            Ver todas as fornadas
          </button>
        </div>
      ) : (
         <div className="flex h-40 items-center justify-center rounded-md border-2 border-dashed border-slate-300 dark:border-slate-600 mt-4">
          <p className="text-center text-slate-500 dark:text-slate-400">
            Suas fornadas recentes aparecerão aqui.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyLabRecentBatchesCard;