import React from 'react';
import { useTranslation } from '../i18n';
import { BookOpenIcon, LightBulbIcon, RecipeIcon } from './IconComponents';
import { PRO_RECIPES } from '../constants';
import { ProRecipe } from '../types';

interface TipsAndTechniquesPageProps {
  onLoadRecipe: (config: ProRecipe['config']) => void;
}

const TipSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="mt-12">
    <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-slate-800 dark:text-slate-100">
      <LightBulbIcon className="h-6 w-6 text-lime-500" />
      <span>{title}</span>
    </h2>
    <div className="prose prose-lg max-w-none text-slate-600 dark:prose-invert dark:text-slate-300">
      {children}
    </div>
  </div>
);

const TipsAndTechniquesPage: React.FC<TipsAndTechniquesPageProps> = ({
  onLoadRecipe,
}) => {
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

        {/* Pro Recipes Section */}
        <div className="mt-12">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-slate-800 dark:text-slate-100">
                <RecipeIcon className="h-6 w-6 text-lime-500" />
                <span>{t('tips_page.pro_recipes_title')}</span>
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {PRO_RECIPES.map(recipe => (
                    <div key={recipe.nameKey} className="flex flex-col rounded-lg bg-slate-50 p-4 dark:bg-slate-700/50">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100">{t(recipe.nameKey)}</h3>
                        <p className="mt-1 flex-grow text-sm text-slate-600 dark:text-slate-400">{t(recipe.descriptionKey)}</p>
                        <button 
                            onClick={() => onLoadRecipe(recipe.config)}
                            className="mt-4 self-start rounded-md bg-lime-500 py-1.5 px-3 text-sm font-semibold text-white shadow-sm hover:bg-lime-600"
                        >
                            {t('tips_page.load_recipe_button')}
                        </button>
                    </div>
                ))}
            </div>
        </div>


        {/* Technique Guides Section */}
        <TipSection title={t('tips_page.hydration_title')}>
          <p>{t('tips_page.hydration_p1')}</p>
          <p>{t('tips_page.hydration_p2')}</p>
        </TipSection>

        <TipSection title={t('tips_page.fermentation_title')}>
          <p>{t('tips_page.fermentation_p1')}</p>
          <p>{t('tips_page.fermentation_p2')}</p>
        </TipSection>

        <TipSection title={t('tips_page.salt_title')}>
          <p>{t('tips_page.salt_p1')}</p>
        </TipSection>
      </div>
    </div>
  );
};

export default TipsAndTechniquesPage;