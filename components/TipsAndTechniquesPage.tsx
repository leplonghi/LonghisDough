import React from 'react';
import { useTranslation } from '../i18n';
import { BookOpenIcon, LightBulbIcon } from './IconComponents';
import { PRO_RECIPES } from '../constants';
import { ProRecipe } from '../types';

interface TipsAndTechniquesPageProps {
  onLoadRecipe: (config: ProRecipe['config']) => void;
}

const TipCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800">
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-100 dark:bg-lime-500/10">
        <LightBulbIcon className="h-5 w-5 text-lime-600 dark:text-lime-400" />
      </span>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
        {title}
      </h3>
    </div>
    <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: children as string }} />
  </div>
);

const ProRecipeCard: React.FC<{ recipe: ProRecipe, onLoad: () => void }> = ({ recipe, onLoad }) => {
    const { t } = useTranslation();
    return (
        <div className="flex h-full flex-col rounded-xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 dark:border dark:border-slate-700/50 dark:bg-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t(recipe.nameKey)}</h3>
            <p className="mt-2 flex-grow text-sm text-slate-600 dark:text-slate-300">{t(recipe.descriptionKey)}</p>
            <button 
                onClick={onLoad}
                className="mt-4 w-full rounded-lg bg-lime-500 py-2 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            >
                {t('tips_page.load_recipe_button')}
            </button>
        </div>
    );
};


const TipsAndTechniquesPage: React.FC<TipsAndTechniquesPageProps> = ({
  onLoadRecipe,
}) => {
  const { t } = useTranslation();

  const tips = [
    { titleKey: 'tips_page.bakers_percentage_title', contentKey: 'tips_page.bakers_percentage_content' },
    { titleKey: 'tips_page.fermentation_title', contentKey: 'tips_page.fermentation_content' },
    { titleKey: 'tips_page.kneading_title', contentKey: 'tips_page.kneading_content' },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {t('tips_page.title')}
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          {t('tips_page.subtitle')}
        </p>
      </div>

      <div className="mt-12 space-y-10">
        <div id="pro-recipes">
             <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-lime-100 dark:bg-lime-500/10">
                    <BookOpenIcon className="h-6 w-6 text-lime-600 dark:text-lime-400" />
                </span>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {t('tips_page.pro_recipes_cta_title')}
                    </h2>
                    <p className="mt-1 text-slate-600 dark:text-slate-300">
                        {t('tips_page.pro_recipes_cta_description')}
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {PRO_RECIPES.map(recipe => (
                    <ProRecipeCard key={recipe.nameKey} recipe={recipe} onLoad={() => onLoadRecipe(recipe.config)} />
                ))}
            </div>
        </div>
        
        <div id="tips">
            {tips.map((tip, index) => (
                <div key={index} className="[&:not(:first-child)]:mt-8">
                    <TipCard title={t(tip.titleKey)}>
                        {t(tip.contentKey)}
                    </TipCard>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TipsAndTechniquesPage;
