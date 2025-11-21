import React from 'react';
import { DoughConfig, FermentationTechnique } from '@/types';
import ChoiceButton from '@/components/ui/ChoiceButton';
import FormSection from '@/components/calculator/AccordionSection';
import SliderInput from '@/components/ui/SliderInput';
import { FermentationIcon } from '@/components/ui/Icons';

interface FermentationSectionProps {
  config: DoughConfig;
  onConfigChange: (newConfig: Partial<DoughConfig>) => void;
  isAnySourdough: boolean;
  isBasic: boolean;
  errors: any;
}

const FermentationSection: React.FC<FermentationSectionProps> = ({
  config,
  onConfigChange,
  isAnySourdough,
  isBasic,
  errors,
}) => {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onConfigChange({ [name]: Number(value) });
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
            <ChoiceButton
              active={config.fermentationTechnique === FermentationTechnique.POOLISH}
              onClick={() =>
                onConfigChange({ fermentationTechnique: FermentationTechnique.POOLISH })
              }
            >
              Poolish
            </ChoiceButton>
            <ChoiceButton
              active={config.fermentationTechnique === FermentationTechnique.BIGA}
              onClick={() =>
                onConfigChange({ fermentationTechnique: FermentationTechnique.BIGA })
              }
            >
              Biga
            </ChoiceButton>
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