
import React from 'react';
import { useTranslation } from '../i18n';
import { useEntitlements } from '../entitlements';
import {
  CloseIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ScaleIcon,
  PencilIcon,
  DownloadIcon,
  ShareIcon,
  SaveIcon,
  BookOpenIcon,
} from './IconComponents';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProFeature: React.FC<{
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ icon, children }) => (
  <li className="flex items-start">
    <span className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-lime-500">
      {icon}
    </span>
    <span className="text-slate-600 dark:text-slate-300">{children}</span>
  </li>
);

const PaywallModal: React.FC<PaywallModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { grantProAccess } = useEntitlements();

  if (!isOpen) return null;

  const handlePurchase = () => {
    grantProAccess();
    onClose();
  };

  const handleRestore = () => {
    // In this web simulation, "restoring" is the same as purchasing.
    // It grants the pro access if it was lost (e.g., cleared cache).
    alert(t('pro.restore_success'));
    grantProAccess();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="paywall-title"
    >
      <div
        className="relative mx-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-slate-700 dark:bg-slate-800 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1 text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
          aria-label={t('load_modal.close_aria')}
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-lime-100 dark:bg-lime-500/10">
            <SparklesIcon className="h-7 w-7 text-lime-600 dark:text-lime-400" />
          </div>
          <h2
            id="paywall-title"
            className="mt-4 text-2xl font-bold text-slate-900 dark:text-white"
          >
            {t('pro.title')}
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            {t('pro.subtitle')}
          </p>
        </div>

        <div className="my-8">
          <ul className="space-y-4">
            <ProFeature icon={<BookOpenIcon />}>
              {t('pro.feature_recipes')}
            </ProFeature>
            <ProFeature icon={<ShieldCheckIcon />}>
              {t('pro.feature_ads')}
            </ProFeature>
            <ProFeature icon={<ScaleIcon />}>{t('pro.feature_scale')}</ProFeature>
            <ProFeature icon={<PencilIcon />}>{t('pro.feature_notes')}</ProFeature>
            <ProFeature icon={<DownloadIcon />}>
              {t('pro.feature_export')}
            </ProFeature>
            <ProFeature icon={<ShareIcon />}>{t('pro.feature_share')}</ProFeature>
            <ProFeature icon={<SaveIcon />}>{t('pro.feature_save')}</ProFeature>
          </ul>
        </div>

        <div className="space-y-3">
          <button
            onClick={handlePurchase}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-lime-500 py-3 px-4 text-base font-semibold text-white shadow-sm transition-all hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
          >
            <SparklesIcon className="h-5 w-5" />
            <span>{t('pro.buy_button')}</span>
          </button>
          <button
            onClick={onClose}
            className="w-full rounded-lg py-3 px-4 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:ring-offset-slate-800"
          >
            {t('pro.continue_free')}
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={handleRestore}
            className="text-xs text-slate-500 underline hover:text-slate-700 dark:hover:text-slate-300"
          >
            {t('pro.restore_purchase')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaywallModal;
