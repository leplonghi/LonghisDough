
import React from 'react';
import { useTranslation } from '@/i18n';
import { FlourIcon, StarIcon } from '@/components/ui/Icons';
import { FLOURS } from '@/flours-constants';
import { useUser } from '@/contexts/UserProvider';
import { Page } from '@/types';

interface FloursPageProps {
  onNavigate: (page: Page) => void;
}

const FloursPage: React.FC<FloursPageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { preferredFlourId, setPreferredFlour } = useUser();

  return (
    <div className="mx-auto max-w-4xl animate-[fadeIn_0.5s_ease-in-out]">
      <button 
        onClick={() => window.history.back()} 
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
      >
        &larr; Back
      </button>

      <div className="text-center">
        <FlourIcon className="mx-auto h-12 w-12 text-lime-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {t('flours_page.title')}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
          {t('flours_page.subtitle')}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {FLOURS.map((flour) => {
          const isPreferred = preferredFlourId === flour.id;
          return (
            <div
              key={flour.id}
              className={`rounded-xl border bg-white shadow-md transition-all dark:bg-slate-800 ${
                isPreferred
                  ? 'border-lime-500 ring-2 ring-lime-500/50'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {flour.name}
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-lime-600 dark:text-lime-400 capitalize">
                        {flour.category.replace('_', ' ')}
                        </p>
                    </div>
                    {isPreferred && (
                        <div className="flex items-center gap-1 rounded-full bg-lime-100 px-2 py-1 text-xs font-bold text-lime-700 dark:bg-lime-500/10 dark:text-lime-300">
                            <StarIcon className="h-4 w-4" />
                            <span>{t('flours_page.default')}</span>
                        </div>
                    )}
                </div>

                <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                  {flour.notes}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  {flour.hydrationHint && (
                     <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {flour.hydrationHint.min}% - {flour.hydrationHint.max}%
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                        {t('flours_page.hydration_rec')}
                        </div>
                    </div>
                  )}
                  {flour.strengthW && (
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        W {flour.strengthW}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {t('flours_page.strength')}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="rounded-b-xl border-t border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
                <button
                  onClick={() => setPreferredFlour(flour.id)}
                  disabled={isPreferred}
                  className="w-full rounded-md bg-lime-500 py-2 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-lime-600 disabled:cursor-not-allowed disabled:bg-slate-300 dark:disabled:bg-slate-600"
                >
                  {isPreferred ? t('flours_page.default') : t('flours_page.set_default')}
                </button>
              </div>
            </div>
          );
        })}
      </div>
       <div className="mt-8 text-center">
            <button
                onClick={() => onNavigate('calculator')}
                className="text-sm font-medium text-lime-600 hover:underline dark:text-lime-400"
            >
                {t('flours_page.back_to_calculator')}
            </button>
        </div>
    </div>
  );
};

export default FloursPage;
