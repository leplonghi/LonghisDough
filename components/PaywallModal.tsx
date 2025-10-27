
import React from 'react';
import { useTranslation } from '../i18n';
import {
  CloseIcon,
  StarIcon,
  SaveIcon,
  DownloadIcon,
  FolderIcon,
  ShieldCheckIcon,
  ScaleIcon,
  BookOpenIcon,
} from './IconComponents';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGrantAccess: () => void;
}

const Feature: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 rounded-full bg-lime-100 p-2 dark:bg-lime-500/10">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-slate-800 dark:text-slate-100">
        {title}
      </h4>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </div>
  </div>
);

const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  onGrantAccess,
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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1 text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
          aria-label={t('load_modal.close_aria')}
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        <div className="text-center">
          <StarIcon className="mx-auto h-12 w-12 text-lime-500" />
          <h2
            id="paywall-title"
            className="mt-4 text-2xl font-bold text-slate-900 dark:text-white"
          >
            {t('paywall.title')}
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            {t('paywall.subtitle')}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <Feature
            icon={<FolderIcon className="h-6 w-6 text-lime-600 dark:text-lime-400" />}
            title={t('paywall.feature_save')}
            description={t('paywall.feature_save_desc')}
          />
          <Feature
            icon={<DownloadIcon className="h-6 w-6 text-lime-600 dark:text-lime-400" />}
            title={t('paywall.feature_export')}
            description={t('paywall.feature_export_desc')}
          />
          <Feature
            icon={<ScaleIcon className="h-6 w-6 text-lime-600 dark:text-lime-400" />}
            title={t('paywall.feature_scale')}
            description={t('paywall.feature_scale_desc')}
          />
           <Feature
            icon={<BookOpenIcon className="h-6 w-6 text-lime-600 dark:text-lime-400" />}
            title={t('paywall.feature_pro_recipes')}
            description={t('paywall.feature_pro_recipes_desc')}
          />
          <Feature
            icon={<ShieldCheckIcon className="h-6 w-6 text-lime-600 dark:text-lime-400" />}
            title={t('paywall.feature_ads')}
            description={t('paywall.feature_ads_desc')}
          />
        </div>

        <div className="mt-8">
          <button
            onClick={onGrantAccess}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-lime-500 py-3 px-4 text-base font-semibold text-white shadow-md transition-all hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
          >
            <StarIcon className="h-5 w-5" />
            <span>{t('paywall.cta_button')}</span>
          </button>
          <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
            {t('paywall.disclaimer')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaywallModal;
