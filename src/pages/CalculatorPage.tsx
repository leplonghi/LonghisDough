import React, { useMemo, useState, useRef } from 'react';
import CalculatorForm from '@/components/CalculatorForm';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import {
  DoughConfig,
  DoughResult,
  BakeType,
  YeastType,
  Unit,
  UnitSystem,
  FormErrors,
  Oven,
  FlourDefinition,
  CalculationMode,
  Levain,
  OnboardingState,
} from '@/types';
import UiModeToggle from '@/components/calculator/UiModeToggle';
import { useUser } from '@/contexts/UserProvider';
import { useTranslation } from '@/i18n';
import { InfoIcon } from '@/components/ui/Icons';
import OnboardingTooltip from '@/components/onboarding/OnboardingTooltip';


interface CalculatorPageProps {
  config: DoughConfig;
  errors: FormErrors;
  onConfigChange: (newConfig: Partial<DoughConfig>) => void;
  onBakeTypeChange: (bakeType: BakeType) => void;
  onStyleChange: (presetId: string) => void;
  onYeastTypeChange: (yeastType: YeastType) => void;
  onReset: () => void;
  results: DoughResult | null;
  unit: Unit;
  onUnitChange: (unit: Unit) => void;
  unitSystem: UnitSystem;
  onStartBatch: () => void;
  defaultOven?: Oven;
  selectedFlour?: FlourDefinition;
  calculationMode: CalculationMode;
  onCalculationModeChange: (mode: CalculationMode) => void;
  calculatorMode: 'basic' | 'advanced';
  onCalculatorModeChange: (mode: 'basic' | 'advanced') => void;
  hasProAccess: boolean;
  onOpenPaywall: () => void;
  onboardingState?: OnboardingState;
  onOnboardingNextStep?: () => void;
  onOnboardingBackStep?: () => void;
}

const CalculatorPage: React.FC<CalculatorPageProps> = (props) => {
  const { t } = useTranslation();
  const { levains } = useUser();

  // Refs for onboarding targets
  const formRef = useRef<HTMLDivElement>(null);
  const numPizzasRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const saveButtonRef = useRef<HTMLButtonElement>(null);

  const selectedLevain = useMemo(() => {
    if (props.config.yeastType === YeastType.USER_LEVAIN) {
      return levains.find(l => l.id === props.config.levainId) || levains.find(l=>l.isDefault) || levains[0];
    }
    return null;
  }, [props.config.yeastType, props.config.levainId, levains]);
  
  const renderOnboardingTooltip = () => {
      if (!props.onboardingState?.isActive) return null;

      const steps = [
          { ref: formRef, title: t('onboarding.step1_title'), desc: t('onboarding.step1_desc') },
          { ref: numPizzasRef, title: t('onboarding.step2_title'), desc: t('onboarding.step2_desc') },
          { ref: resultsRef, title: t('onboarding.step3_title'), desc: t('onboarding.step3_desc') },
          { ref: saveButtonRef, title: t('onboarding.step4_title'), desc: t('onboarding.step4_desc') }
      ];

      const currentStepIndex = props.onboardingState.step - 1;
      if (currentStepIndex < 0 || currentStepIndex >= steps.length || !props.onOnboardingNextStep || !props.onOnboardingBackStep) return null;

      const { ref, title, desc } = steps[currentStepIndex];

      return (
          <OnboardingTooltip
              targetElement={ref.current}
              step={props.onboardingState.step}
              totalSteps={6} // Total steps across all pages
              title={title}
              description={desc}
              onNext={props.onOnboardingNextStep}
              onBack={props.onOnboardingBackStep}
              onFinish={() => {}} // Finish is handled on the last page
          />
      );
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
        <div className="lg:sticky lg:top-24 space-y-6" ref={formRef}>
          <div className="flex items-center justify-center gap-2">
            <UiModeToggle mode={props.calculatorMode} onModeChange={props.onCalculatorModeChange} />
            <div className="group relative">
                <InfoIcon className="h-4 w-4 cursor-help text-slate-400" />
                <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-72 -translate-x-1/2 rounded-md bg-slate-800 p-3 text-xs text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                    <p dangerouslySetInnerHTML={{ __html: t('form.tooltips.ui_mode') }} />
                </div>
            </div>
          </div>
          <CalculatorForm
            {...props}
            levains={levains}
            selectedLevain={selectedLevain}
            inputRefs={{numPizzas: numPizzasRef}}
          />
        </div>
        <div ref={resultsRef}>
          <ResultsDisplay
            results={props.results}
            config={props.config}
            unit={props.unit}
            onUnitChange={props.onUnitChange}
            unitSystem={props.unitSystem}
            onConfigChange={props.onConfigChange}
            onStartBatch={props.onStartBatch}
            selectedFlour={props.selectedFlour}
            calculatorMode={props.calculatorMode}
            calculationMode={props.calculationMode} 
            hasProAccess={props.hasProAccess} 
            onOpenPaywall={props.onOpenPaywall}
            saveButtonRef={saveButtonRef}
            onboardingStep={props.onboardingState?.step}
          />
        </div>
      </div>
      {props.onboardingState && renderOnboardingTooltip()}
    </>
  );
};

export default CalculatorPage;