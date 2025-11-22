
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

  // If the style only allows Chemical or No Ferment, we simplify the UI
  const isChemicalOrNoFermentOnly = allowedTechniques.length === 1 && 
    (allowedTechniques[0] === FermentationTechnique.CHEMICAL || allowedTechniques[0] === FermentationTechnique.NO_FERMENT);

  if (isChemicalOrNoFermentOnly) {
      return (
        <FormSection
            title="Leavening"
            description="Leavening method for this style."
            icon={<FermentationIcon className="h-6 w-6" />}
        >
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center">
                <p className="text-sm font-medium text-slate-700">
                    {allowedTechniques[0] === FermentationTechnique.CHEMICAL ? 'Chemical Leavening (Baking Powder/Soda)' : 'No Fermentation / Physical Leavening'}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                    This style does not use yeast fermentation.
                </p>
            </div>
        </FormSection>
      );
  }

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
            <div className="relative group">
                <ChoiceButton
                    active={config.fermentationTechnique === FermentationTechnique.DIRECT}
                    onClick={() => isAllowed(FermentationTechnique.DIRECT) && onConfigChange({ fermentationTechnique: FermentationTechnique.DIRECT })}
                    className={!isAllowed(FermentationTechnique.DIRECT) ? "opacity-50 cursor-not-allowed" : ""}
                >
                    Direct
                </ChoiceButton>
                 {!isAllowed(FermentationTechnique.DIRECT) && (
                     <div className="absolute -top-2 -right-2 bg-slate-500 text-white text-[10px] font-bold px-1.5 rounded-full shadow-sm z-10 flex items-center gap-0.5" title="Not applicable for this style">
                        <InfoIcon className="h-2.5 w-2.5" /> N/A
                    </div>
                )}
            </div>
            
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
                  Preferments (Poolish/Biga) are not typically used for this style.
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
