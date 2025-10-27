import React from 'react';
import { useTranslation } from '../i18n';
import {
  CloseIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ScaleIcon,
  PencilIcon,
  SaveIcon,
  ShareIcon,
  BookOpenIcon,
} from './IconComponents';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const Feature: React.FC<{ icon: React.ReactNode; text: string }> = ({
  icon,
  text,
}) => (
  <li className="flex items-center gap-3">
    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-600 dark:bg-lime-500/10 dark:text-lime-400">
      {icon}
    </span>
    <span className="text-slate-700 dark:text-slate-300">{text}</span>
  </li>
);

const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="paywall-title"
    >
      <div
        className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-slate-700 dark:bg-slate-800 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
            aria-label={t('load_modal.close_aria')}
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="text-center">
          <SparklesIcon className="mx-auto h-12 w-12 text-lime-500" />
          <h2
            id="paywall-title"
            className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            {t('pro.title')}
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            {t('pro.subtitle')}
          </p>
        </div>

        <ul className="mt-8 space-y-4">
          <Feature
            icon={<ShieldCheckIcon className="h-5 w-5" />}
            text={t('pro.feature_ads')}
          />
          <Feature
            icon={<ScaleIcon className="h-5 w-5" />}
            text={t('pro.feature_scale')}
          />
          <Feature
            icon={<PencilIcon className="h-5 w-5" />}
            text={t('pro.feature_notes')}
          />
          <Feature
            icon={<SaveIcon className="h-5 w-5" />}
            text={t('pro.feature_save_load')}
          />
          <Feature
            icon={<ShareIcon className="h-5 w-5" />}
            text={t('pro.feature_export')}
          />
          <Feature
            icon={<BookOpenIcon className="h-5 w-5" />}
            text={t('pro.feature_pro_recipes')}
          />
        </ul>

        <div className="mt-8">
          <button
            onClick={onSuccess}
            className="w-full rounded-lg bg-lime-500 py-3 px-4 text-base font-semibold text-white shadow-md transition-all hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
          >
            {t('pro.buy_button', { price: '$9.99' })}
          </button>
          <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
            {t('pro.buy_note')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaywallModal;
