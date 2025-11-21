
import React from 'react';
import { DoughConfig, FermentationTechnique } from '@/types';
import ChoiceButton from '@/components/ui/ChoiceButton';
import FormSection from '@/components/calculator/AccordionSection';
import SliderInput from '@/components/ui/SliderInput';
import { FermentationIcon, LockClosedIcon } from '@/components/ui/Icons';

interface FermentationSectionProps {
  config: DoughConfig;
  onConfigChange: (newConfig: Partial<DoughConfig>) => void;
  isAnySourdough: boolean;
  isBasic: boolean;
  errors: any;
  hasProAccess: boolean;
  onOpenPaywall: () => void;
}

const FermentationSection: React.FC<FermentationSectionProps> = ({
  config,
  onConfigChange,
  isAnySourdough,
  isBasic,
  errors,
  hasProAccess,
  onOpenPaywall,
}) => {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onConfigChange({ [name]: Number(value) });
  };

  const handleLockedClick = () => {
    if (!hasProAccess) {
        onOpenPaywall();
    }
  };

  return (
    <FormSection
      title="Fermentation Technique"
      description="Choose between a direct method or a preferment."
      icon={<FermentationIcon className="h-6 w-6" />}
    >
      {isAnySourdough ? (
        <p className="text-center text-sm text-slate-600 bg-slate-100 p-3 rounded-lg">
          Sourdough Starter acts as the preferment. Biga/Poolish options disabled.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <ChoiceButton
              active={config.fermentationTechnique === FermentationTechnique.DIRECT}
              onClick={() =>
                onConfigChange({ fermentationTechnique: FermentationTechnique.DIRECT })
              }
            >
              Direct
            </ChoiceButton>
            
            <div className="relative" onClick={handleLockedClick}>
                <ChoiceButton
                    active={config.fermentationTechnique === FermentationTechnique.POOLISH}
                    onClick={() =>
                        hasProAccess && onConfigChange({ fermentationTechnique: FermentationTechnique.POOLISH })
                    }
                    className={!hasProAccess ? "opacity-60 cursor-not-allowed pointer-events-none" : ""}
                >
                    Poolish
                </ChoiceButton>
                {!hasProAccess && (
                    <div className="absolute -top-2 -right-2 bg-lime-500 text-white text-[10px] font-bold px-1.5 rounded-full shadow-sm z-10 flex items-center gap-0.5">
                        <LockClosedIcon className="h-2.5 w-2.5" /> PRO
                    </div>
                )}
            </div>

            <div className="relative" onClick={handleLockedClick}>
                <ChoiceButton
                    active={config.fermentationTechnique === FermentationTechnique.BIGA}
                    onClick={() =>
                        hasProAccess && onConfigChange({ fermentationTechnique: FermentationTechnique.BIGA })
                    }
                    className={!hasProAccess ? "opacity-60 cursor-not-allowed pointer-events-none" : ""}
                >
                    Biga
                </ChoiceButton>
                 {!hasProAccess && (
                    <div className="absolute -top-2 -right-2 bg-lime-500 text-white text-[10px] font-bold px-1.5 rounded-full shadow-sm z-10 flex items-center gap-0.5">
                        <LockClosedIcon className="h-2.5 w-2.5" /> PRO
                    </div>
                )}
            </div>
          </div>
          {config.fermentationTechnique !== FermentationTechnique.DIRECT && (
            <div className="pt-6 border-t border-slate-200">
              <SliderInput
                label="% Flour in Preferment"
                name="prefermentFlourPercentage"
                value={config.prefermentFlourPercentage}
                onChange={handleNumberChange}
                min={
                  isBasic
                    ? config.fermentationTechnique === FermentationTechnique.BIGA
                      ? 30
                      : 20
                    : 0
                }
                max={
                  isBasic
                    ? config.fermentationTechnique === FermentationTechnique.BIGA
                      ? 60
                      : 50
                    : 100
                }
                step={5}
                unit="%"
                tooltip="Percentage of total flour to use in the preferment."
                hasError={!!errors.prefermentFlourPercentage}
              />
            </div>
          )}
        </>
      )}
    </FormSection>
  );
};

export default FermentationSection;
