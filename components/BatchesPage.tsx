import React from 'react';
import { useTranslation } from '@/i18n';
import {
  BatchesIcon,
  CalculatorIcon,
  StarIcon,
  SolidStarIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  PizzaSliceIcon,
  RecipeIcon,
} from '@/components/ui/Icons';
import { DoughConfig, Page, Batch, BakeType } from '@/types';
import { useUser } from '@/contexts/UserProvider';

interface LabPageProps {
  onLoadAndNavigate: (config: DoughConfig) => void;
  onNavigate: (page: Page, params?: string) => void;
  onCreateDraftBatch: () => void;
}

const LabPage: React.FC<LabPageProps> = ({
  onLoadAndNavigate,
  onNavigate,
  onCreateDraftBatch,
}) => {
  const { t } = useTranslation();
  const { batches, deleteBatch, updateBatch } = useUser();

  const onToggleFavorite = (id: string) => {
    const batch = batches.find((b) => b.id === id);
    if (batch) {
      updateBatch({ ...batch, isFavorite: !batch.isFavorite });
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const sortedBatches = [...batches].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  if (sortedBatches.length === 0) {
    return (
      <div className="mx-auto max-w-4xl animate-[fadeIn_0.5s_ease-in-out] text-center">
        <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800 sm:p-10">
          <BatchesIcon className="mx-auto h-12 w-12 text-lime-500" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t('diary_page.empty_title')}
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {t('diary_page.empty_subtitle')}
          </p>
          <button
            onClick={() => onNavigate('calculator')}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-lime-500 py-3 px-6 text-base font-semibold text-white shadow-md transition-all hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
          >
            <CalculatorIcon className="h-5 w-5" />
            <span>{t('diary_page.create_first')}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl animate-[fadeIn_0.5s_ease-in-out]">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row sm:text-left">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t('diary_page.title')}
            </h1>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
            {t('diary_page.subtitle')}
            </p>
        </div>
        <button
            onClick={onCreateDraftBatch}
            className="inline-flex items-center gap-2 rounded-lg bg-lime-500 py-2 px-4 text-base font-semibold text-white shadow-md transition-all hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
        >
            <BatchesIcon className="h-5 w-5"/>
            <span>{t('diary_page.new_batch')}</span>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedBatches.map((batch) => (
          <div
            key={batch.id}
            className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-md transition-all hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex-grow p-6">
              <div className="flex items-start justify-between">
                <h3 className="pr-2 text-lg font-bold text-slate-900 dark:text-white">
                  {batch.name}
                </h3>
                <button
                  onClick={() => onToggleFavorite(batch.id)}
                  className={`-mt-2 -mr-2 flex-shrink-0 rounded-full p-2 transition-colors hover:bg-yellow-100 dark:hover:bg-yellow-500/10 ${
                    batch.isFavorite
                      ? 'text-yellow-400'
                      : 'text-slate-400'
                  }`}
                  aria-label={`Mark ${batch.name} as favorite`}
                >
                  {batch.isFavorite ? (
                    <SolidStarIcon className="h-5 w-5" />
                  ) : (
                    <StarIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-lime-600 dark:text-lime-400">
                {batch.doughConfig.bakeType === BakeType.PIZZAS ? (
                  <PizzaSliceIcon className="h-4 w-4" />
                ) : (
                  <RecipeIcon className="h-4 w-4" />
                )}
                <span>
                  {t(`form.${batch.doughConfig.recipeStyle.toLowerCase()}`, {defaultValue: batch.doughConfig.recipeStyle})}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                {formatDate(batch.createdAt)}
              </p>
              <div className="mt-4 flex items-center gap-4 text-sm">
                <div className="text-center">
                  <p className="font-bold text-slate-800 dark:text-slate-100">
                    {batch.doughConfig.hydration}%
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t('diary_page.card.hydration')}
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-slate-800 dark:text-slate-100">
                    {batch.doughConfig.doughBallWeight}g
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t('diary_page.card.weight')}
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-slate-800 dark:text-slate-100">
                    {batch.doughConfig.numPizzas}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t('diary_page.card.units')}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 rounded-b-xl border-t border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
              <button
                onClick={() => onLoadAndNavigate(batch.doughConfig)}
                title={t('diary_page.card.redo')}
                className="rounded-md p-2 text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
              >
                <DocumentDuplicateIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => deleteBatch(batch.id)}
                className="rounded-md p-2 text-sm font-semibold text-slate-500 transition-colors hover:bg-red-100 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-500/10 dark:hover:text-red-400">
                <TrashIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => onNavigate(`batch/${batch.id}`)}
                className="rounded-md bg-lime-500 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600"
              >
                {t('diary_page.card.open')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabPage;