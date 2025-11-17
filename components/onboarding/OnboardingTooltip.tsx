import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useTranslation } from '../../i18n';

interface OnboardingTooltipProps {
  targetElement: HTMLElement | null;
  step: number;
  totalSteps: number;
  title: string;
  description: string;
  onNext: () => void;
  onBack: () => void;
  onFinish: () => void;
}

const OnboardingTooltip: React.FC<OnboardingTooltipProps> = ({
  targetElement,
  step,
  totalSteps,
  title,
  description,
  onNext,
  onBack,
  onFinish,
}) => {
  const { t } = useTranslation();
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

  useLayoutEffect(() => {
    if (targetElement) {
      targetElement.style.position = 'relative';
      targetElement.style.zIndex = '100';

      const rect = targetElement.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });

      return () => {
        targetElement.style.position = '';
        targetElement.style.zIndex = '';
      };
    }
  }, [targetElement]);

  if (!targetElement) return null;

  const tooltipTop = position.top + position.height + 16;
  const tooltipLeft = position.left + position.width / 2;
  const isLastStep = step === totalSteps;

  return (
    <div className="fixed inset-0 z-50 animate-[fadeIn_0.3s_ease-out]">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm"
        style={{
          clipPath: `path('M0 0 H${window.innerWidth} V${window.innerHeight} H0Z M${position.left - 8} ${position.top - 8} V${position.top + position.height + 8} H${position.left + position.width + 8} V${position.top - 8} Z')`
        }}
      ></div>

      {/* Tooltip */}
      <div
        className="absolute w-80 max-w-[calc(100vw-2rem)] rounded-lg bg-white p-5 shadow-2xl dark:bg-slate-800"
        style={{
          top: `${tooltipTop}px`,
          left: `${tooltipLeft}px`,
          transform: 'translateX(-50%)',
        }}
      >
        <p className="text-xs font-bold uppercase tracking-wider text-lime-600 dark:text-lime-400">
          Passo {step} de {totalSteps}
        </p>
        <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{description}</p>
        <div className="mt-5 flex items-center justify-between">
          <button
            onClick={onBack}
            disabled={step === 1}
            className="text-sm font-semibold text-slate-500 hover:text-slate-700 disabled:opacity-50 dark:text-slate-400 dark:hover:text-slate-200"
          >
            {t('onboarding.back')}
          </button>
          <button
            onClick={isLastStep ? onFinish : onNext}
            className="rounded-lg bg-lime-500 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600"
          >
            {isLastStep ? t('onboarding.finish') : t('onboarding.next')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTooltip;
