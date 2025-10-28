
import React from 'react';
import { useTranslation } from '../i18n';
import { BookOpenIcon, LightBulbIcon } from './IconComponents';

const TipSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="mb-8">
    <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-slate-800 dark:text-slate-100">
      <LightBulbIcon className="h-6 w-6 text-lime-500" />
      <span>{title}</span>
    </h2>
    <div className="prose prose-lg max-w-none text-slate-600 dark:prose-invert dark:text-slate-300">
      {children}
    </div>
  </div>
);

const TipsAndTechniquesPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-4xl animate-[fadeIn_0.5s_ease-in-out]">
      <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800 sm:p-10">
        <div className="text-center">
          <BookOpenIcon className="mx-auto h-12 w-12 text-lime-500" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t('tips_page.title')}
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {t('tips_page.subtitle')}
          </p>
        </div>

        <div className="mt-12">
          <TipSection title={t('tips_page.hydration_title')}>
            <p>
              {t('tips_page.hydration_p1')}
            </p>
             <p>
              {t('tips_page.hydration_p2')}
            </p>
          </TipSection>

          <TipSection title={t('tips_page.fermentation_title')}>
            <p>
              {t('tips_page.fermentation_p1')}
            </p>
             <p>
              {t('tips_page.fermentation_p2')}
            </p>
          </TipSection>

           <TipSection title={t('tips_page.salt_title')}>
            <p>
              {t('tips_page.salt_p1')}
            </p>
          </TipSection>
        </div>

      </div>
    </div>
  );
};

export default TipsAndTechniquesPage;
