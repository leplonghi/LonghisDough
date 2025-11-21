
import React from 'react';
import { DoughConfig, FermentationTechnique } from '@/types';
import ChoiceButton from '@/components/ui/ChoiceButton';
import FormSection from '@/components/calculator/AccordionSection';
import SliderInput from '@/components/ui/SliderInput';
import { FermentationIcon, LockClosedIcon, InfoIcon } from '@/components/ui/Icons';

interface FermentationSectionProps {
  config: DoughConfig;
  onConfigChange: (newConfig: Partial<DoughConfig>) => void;
  isAnySourdough: boolean;
  isBasic: boolean;
  errors: any;
  hasProAccess: boolean;
  onOpenPaywall: () => void;
  allowedTechniques: FermentationTechnique[];
}

const FermentationSection: React.FC<FermentationSectionProps> = ({
  config,
  onConfigChange,
  isAnySourdough,
  isBasic,
  errors,
  hasProAccess,
  onOpenPaywall,
  allowedTechniques,
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

  const isAllowed = (tech: FermentationTechnique) => allowedTechniques.includes(tech);

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
            
            <div className="relative group" onClick={isAllowed(FermentationTechnique.POOLISH) ? handleLockedClick : undefined}>
                <ChoiceButton
                    active={config.fermentationTechnique === FermentationTechnique.POOLISH}
                    onClick={() =>
                        hasProAccess && isAllowed(FermentationTechnique.POOLISH) && onConfigChange({ fermentationTechnique: FermentationTechnique.POOLISH })
                    }
                    className={!hasProAccess || !isAllowed(FermentationTechnique.POOLISH) ? "opacity-60 cursor-not-allowed pointer-events-none" : ""}
                >
                    Poolish
                </ChoiceButton>
                {!hasProAccess && isAllowed(FermentationTechnique.POOLISH) && (
                    <div className="absolute -top-2 -right-2 bg-lime-500 text-white text-[10px] font-bold px-1.5 rounded-full shadow-sm z-10 flex items-center gap-0.5">
                        <LockClosedIcon className="h-2.5 w-2.5" /> PRO
                    </div>
                )}
                {!isAllowed(FermentationTechnique.POOLISH) && (
                     <div className="absolute -top-2 -right-2 bg-slate-500 text-white text-[10px] font-bold px-1.5 rounded-full shadow-sm z-10 flex items-center gap-0.5" title="Not compatible with selected style">
                        <InfoIcon className="h-2.5 w-2.5" /> N/A
                    </div>
                )}
            </div>

            <div className="relative group" onClick={isAllowed(FermentationTechnique.BIGA) ? handleLockedClick : undefined}>
                <ChoiceButton
                    active={config.fermentationTechnique === FermentationTechnique.BIGA}
                    onClick={() =>
                        hasProAccess && isAllowed(FermentationTechnique.BIGA) && onConfigChange({ fermentationTechnique: FermentationTechnique.BIGA })
                    }
                    className={!hasProAccess || !isAllowed(FermentationTechnique.BIGA) ? "opacity-60 cursor-not-allowed pointer-events-none" : ""}
                >
                    Biga
                </ChoiceButton>
                 {!hasProAccess && isAllowed(FermentationTechnique.BIGA) && (
                    <div className="absolute -top-2 -right-2 bg-lime-500 text-white text-[10px] font-bold px-1.5 rounded-full shadow-sm z-10 flex items-center gap-0.5">
                        <LockClosedIcon className="h-2.5 w-2.5" /> PRO
                    </div>
                )}
                {!isAllowed(FermentationTechnique.BIGA) && (
                     <div className="absolute -top-2 -right-2 bg-slate-500 text-white text-[10px] font-bold px-1.5 rounded-full shadow-sm z-10 flex items-center gap-0.5" title="Not compatible with selected style">
                        <InfoIcon className="h-2.5 w-2.5" /> N/A
                    </div>
                )}
            </div>
          </div>
          
          {!allowedTechniques.includes(FermentationTechnique.POOLISH) && !allowedTechniques.includes(FermentationTechnique.BIGA) && (
              <p className="text-xs text-center text-slate-500 mt-2 italic">
                  Preferments (Poolish/Biga) are not typically used for this style (e.g. Pastry/Cookies).
              </p>
          )}

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
