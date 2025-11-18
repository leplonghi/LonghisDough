import React, { useState } from 'react';
import { useTranslation } from '../i18n';
import {
  CloseIcon,
  StarIcon,
  SaveIcon,
  DownloadIcon,
  ShieldCheckIcon,
  BookOpenIcon,
  CheckCircleIcon,
} from './IconComponents';
import { useUser } from '../contexts/UserProvider';

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
    <div className="flex-shrink-0 rounded-full bg-lime-100 p-2">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-slate-800">
        {title}
      </h4>
      <p className="text-sm text-slate-600">
        {description}
      </p>
    </div>
  </div>
);

export const PaywallModal: React.FC<PaywallModalProps> = ({
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
  } = useUser();
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
        className="relative mx-4 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 rounded-full p-1 text-slate-500 hover:bg-slate-200 disabled:opacity-50"
          aria-label={t('modals.close')}
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
                className="mt-4 text-2xl font-bold text-slate-900"
              >
                {t('paywall.title')}
              </h2>
              <p className="mt-2 text-slate-600">
                {t('paywall.subtitle')}
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <Feature
                icon={
                  <SaveIcon className="h-6 w-6 text-lime-600" />
                }
                title={t('paywall.feature_save')}
                description={t('paywall.feature_save_desc')}
              />
              <Feature
                icon={
                  <BookOpenIcon className="h-6 w-6 text-lime-600" />
                }
                title={t('paywall.feature_pro_recipes')}
                description={t('paywall.feature_pro_recipes_desc')}
              />
            </div>

            <div className="mt-8">
              <button
                onClick={() => handleGrant('pro')}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-lime-500 py-3 px-4 text-base font-semibold text-white shadow-md transition-all hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
              >
                <StarIcon className="h-5 w-5" />
                <span>{t('paywall.cta_button')}</span>
              </button>

              <div className="my-4 flex items-center">
                <div className="flex-grow border-t border-slate-300"></div>
                <span className="mx-4 flex-shrink text-xs font-semibold uppercase text-slate-500">
                  {t('paywall.or_divider')}
                </span>
                <div className="flex-grow border-t border-slate-300"></div>
              </div>

              <button
                onClick={() => handleGrant('pass')}
                disabled={isPassOnCooldown}
                className="w-full rounded-lg bg-slate-200 py-3 px-4 text-base font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-300 disabled:cursor-not-allowed disabled:bg-slate-300/50"
              >
                {isPassOnCooldown
                  ? t('paywall.cooldown_button', {
                      hours: cooldownHoursRemaining,
                    })
                  : t('paywall.pass_button')}
              </button>
            </div>
          </div>
        </div>

        {/* Success State Overlay */}
        {showSuccess && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white p-8 text-center animate-[fadeIn_0.3s_ease-out]">
            <CheckCircleIcon className="h-16 w-16 text-lime-500" />
            <h3 className="mt-4 text-2xl font-bold text-slate-900">
              {showSuccess}
            </h3>
            <p className="mt-2 text-slate-600">
              {t('paywall.success_subtitle')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
