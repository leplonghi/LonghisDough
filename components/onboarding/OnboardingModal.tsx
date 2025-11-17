import React from 'react';
import { useTranslation } from '../../i18n';
import { DoughLabLogoIcon, SparklesIcon } from '../IconComponents';

interface OnboardingModalProps {
  onStart: () => void;
  onSkip: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ onStart, onSkip }) => {
  const { t } = useTranslation();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm animate-[fadeIn_0.5s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      <div className="relative mx-4 w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-xl dark:border dark:border-slate-700 dark:bg-slate-800 sm:p-12">
        <DoughLabLogoIcon className="mx-auto h-16 w-auto text-lime-500" />
        <h1
          id="onboarding-title"
          className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          {t('onboarding.welcome_title')}
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          {t('onboarding.welcome_subtitle')}
        </p>

        <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={onSkip}
            className="rounded-lg py-3 px-6 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            {t('onboarding.skip_tour')}
          </button>
          <button
            onClick={onStart}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-lime-500 py-3 px-6 text-base font-semibold text-white shadow-md transition-all hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
          >
            <SparklesIcon className="h-5 w-5" />
            <span>{t('onboarding.start_tour')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
