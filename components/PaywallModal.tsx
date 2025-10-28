import React, { useState } from 'react';
import { useTranslation } from '../i18n';
import {
  CloseIcon,
  StarIcon,
  SaveIcon,
  DownloadIcon,
  ShieldCheckIcon,
  ScaleIcon,
  BookOpenIcon,
  CheckCircleIcon,
} from './IconComponents';
import { useEntitlements } from '../entitlements';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToPlans?: () => void;
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
  onNavigateToPlans,
}) => {
  const { t } = useTranslation();
  const {
    grantProAccess,
    grant24hPass,
    isPassOnCooldown,
    cooldownHoursRemaining,
  } = useEntitlements();
  const [showSuccess, setShowSuccess] = useState<string | null>(null);

  const handleGrant = (type: 'pro' | 'pass') => {
    if (type === 'pro') {
      grantProAccess();
      setShowSuccess(t('paywall.success_title_pro'));
    } else {
      grant24hPass();
      setShowSuccess(t('paywall.success_title_pass'));
    }

    setTimeout(() => {
      onClose();
      // Reset state for next time modal opens
      setTimeout(() => setShowSuccess(null), 300);
    }, 2500);
  };

  const handleClose = () => {
    if (showSuccess) return;
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="paywall-title"
    >
      <div
        className="relative mx-4 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl dark:border dark:border-slate-700 dark:bg-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 rounded-full p-1 text-slate-500 hover:bg-slate-200 disabled:opacity-50 dark:text-slate-400 dark:hover:bg-slate-700"
          aria-label={t('load_modal.close_aria')}
          disabled={!!showSuccess}
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        <div
          className={`transition-opacity duration-300 ${
            showSuccess ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="p-6 sm:p-8">
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
                icon={
                  <SaveIcon className="h-6 w-6 text-lime-600 dark:text-lime-400" />
                }
                title={t('paywall.feature_save')}
                description={t('paywall.feature_save_desc')}
              />
              <Feature
                icon={
                  <BookOpenIcon className="h-6 w-6 text-lime-600 dark:text-lime-400" />
                }
                title={t('paywall.feature_pro_recipes')}
                description={t('paywall.feature_pro_recipes_desc')}
              />
              <Feature
                icon={
                  <ShieldCheckIcon className="h-6 w-6 text-lime-600 dark:text-lime-400" />
                }
                title={t('paywall.feature_ads')}
                description={t('paywall.feature_ads_desc')}
              />
            </div>

            <div className="mt-8">
              <button
                onClick={() => handleGrant('pro')}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-lime-500 py-3 px-4 text-base font-semibold text-white shadow-md transition-all hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              >
                <StarIcon className="h-5 w-5" />
                <span>{t('paywall.cta_button')}</span>
              </button>

              <div className="my-4 flex items-center">
                <div className="flex-grow border-t border-slate-300 dark:border-slate-600"></div>
                <span className="mx-4 flex-shrink text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                  OR
                </span>
                <div className="flex-grow border-t border-slate-300 dark:border-slate-600"></div>
              </div>

              <button
                onClick={() => handleGrant('pass')}
                disabled={isPassOnCooldown}
                className="w-full rounded-lg bg-slate-200 py-3 px-4 text-base font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 dark:focus:ring-offset-slate-800 dark:disabled:bg-slate-700/50 dark:disabled:text-slate-500"
              >
                {isPassOnCooldown
                  ? t('paywall.pass_cooldown_message', {
                      hours: cooldownHoursRemaining,
                    })
                  : t('paywall.cta_pass_button')}
              </button>

              {onNavigateToPlans && (
                <div className="mt-4 text-center">
                  <button
                    onClick={onNavigateToPlans}
                    className="text-sm font-medium text-lime-600 hover:underline dark:text-lime-400"
                  >
                    {t('paywall.restore_purchase')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {showSuccess && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white p-8 text-center dark:bg-slate-800 animate-[fadeIn_0.3s_ease-out]">
            <CheckCircleIcon className="mx-auto h-16 w-16 text-lime-500" />
            <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
              {showSuccess}
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              {t('paywall.success_message')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaywallModal;
