import React from 'react';
import { useTranslation } from '../i18n';
import { CloseIcon, BookOpenIcon } from './IconComponents';
import { PRO_RECIPES } from '../constants';
import { ProRecipe } from '../types';

interface ProRecipesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadRecipe: (config: ProRecipe['config']) => void;
}

const ProRecipesModal: React.FC<ProRecipesModalProps> = ({
  isOpen,
  onClose,
  onLoadRecipe,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pro-recipes-title"
    >
      <div
        className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2
            id="pro-recipes-title"
            className="flex items-center gap-2 text-xl font-bold text-slate-900"
          >
            <BookOpenIcon className="h-6 w-6 text-lime-500" />
            <span>{t('pro_recipes.modal_title')}</span>
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-500 hover:bg-slate-200"
            aria-label={t('load_modal.close_aria')}
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-4 max-h-80 space-y-2 overflow-y-auto pr-2">
          {PRO_RECIPES.map((recipe) => (
            <button
              key={recipe.nameKey}
              onClick={() => onLoadRecipe(recipe.config)}
              className="w-full rounded-lg bg-slate-50 p-3 text-left transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-lime-500"
            >
              <span className="font-medium text-slate-800">
                {t(recipe.nameKey)}
              </span>
              <p className="mt-1 text-sm text-slate-500">
                {t(recipe.descriptionKey)}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProRecipesModal;
