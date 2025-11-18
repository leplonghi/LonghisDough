import React, { useState } from 'react';
import { useTranslation } from '../../i18n';
// FIX: Add missing icon import
import { BeakerIcon } from '../IconComponents';
import { Page } from '../../types';

interface LevainOnboardingModalProps {
  onComplete: () => void;
  onNavigate: (page: Page, params?: string) => void;
}

const LevainOnboardingModal: React.FC<LevainOnboardingModalProps> = ({ onComplete, onNavigate }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const screens = [
    { title: t('levain_onboarding.screen1_title'), text: t('levain_onboarding.screen1_text'), button: t('levain_onboarding.screen1_button') },
    { title: t('levain_onboarding.screen2_title'), text: t('levain_onboarding.screen2_text'), button: t('levain_onboarding.screen2_button') },
    { title: t('levain_onboarding.screen3_title'), text: t('levain_onboarding.screen3_text'), button: t('levain_onboarding.screen3_button') },
    { title: t('levain_onboarding.screen4_title'), text: t('levain_onboarding.screen4_text'), button: t('levain_onboarding.screen4_button') },
    { title: t('levain_onboarding.screen5_title'), text: t('levain_onboarding.screen5_text'), button: t('levain_onboarding.screen5_button') },
  ];

  const currentScreen = screens[step - 1];

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(s => s + 1);
    } else {
      onComplete();
      onNavigate('mylab/levain');
    }
  };
  
  const handleSkip = () => {
    onComplete();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm animate-[fadeIn_0.5s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="levain-onboarding-title"
    >
      <div className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <BeakerIcon className="mx-auto h-12 w-auto text-lime-500" />
        <h1
          id="levain-onboarding-title"
          className="mt-6 text-2xl font-bold tracking-tight text-slate-900"
        >
          {currentScreen.title}
        </h1>
        <p className="mt-4 text-slate-600">
          {currentScreen.text}
        </p>

        <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
                <div key={i} className={`h-2 w-2 rounded-full transition-colors ${i + 1 === step ? 'bg-lime-500' : 'bg-slate-300'}`}></div>
            ))}
        </div>

        <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={handleSkip}
            className="rounded-lg py-3 px-6 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100"
          >
            {t('common.skip')}
          </button>
          <button
            onClick={handleNext}
            className="inline-flex items-center justify-center rounded-lg bg-lime-500 py-3 px-6 text-base font-semibold text-white shadow-md transition-all hover:bg-lime-600"
          >
            {currentScreen.button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevainOnboardingModal;
