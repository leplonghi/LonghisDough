import React from 'react';
import { DoughConfig, BakeType, DoughStylePreset } from '@/types';
import ChoiceButton from '@/components/ui/ChoiceButton';
import FormSection from '@/components/calculator/AccordionSection';
import { RecipeIcon } from '@/components/ui/Icons';

interface StyleSectionProps {
  config: DoughConfig;
  onBakeTypeChange: (type: BakeType) => void;
  onStyleChange: (id: string) => void;
  recipeStylesToShow: DoughStylePreset[];
  isBasic: boolean;
  currentPreset?: DoughStylePreset;
  onResetPreset: () => void;
}

const StyleSection: React.FC<StyleSectionProps> = ({
  config,
  onBakeTypeChange,
  onStyleChange,
  recipeStylesToShow,
  isBasic,
  currentPreset,
  onResetPreset,
}) => {
  return (
    <FormSection
      title="Dough Style"
      description="Start by choosing the result you're aiming for."
      icon={<RecipeIcon className="h-6 w-6" />}
    >
      <div className="grid grid-cols-3 gap-3">
        <ChoiceButton
          active={config.bakeType === BakeType.PIZZAS}
          onClick={() => onBakeTypeChange(BakeType.PIZZAS)}
        >
          Pizzas
        </ChoiceButton>
        <ChoiceButton
          active={config.bakeType === BakeType.BREADS_SAVORY}
          onClick={() => onBakeTypeChange(BakeType.BREADS_SAVORY)}
        >
          Breads
        </ChoiceButton>
        <ChoiceButton
          active={config.bakeType === BakeType.SWEETS_PASTRY}
          onClick={() => onBakeTypeChange(BakeType.SWEETS_PASTRY)}
        >
          Pastry
        </ChoiceButton>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {recipeStylesToShow.map((preset) => (
          <ChoiceButton
            key={preset.id}
            active={config.stylePresetId === preset.id}
            onClick={() => onStyleChange(preset.id)}
          >
            {preset.name}
          </ChoiceButton>
        ))}
      </div>
      {isBasic && currentPreset && (
        <div className="pt-4 mt-4 border-t border-slate-200">
          <button
            onClick={onResetPreset}
            className="w-full text-sm font-semibold text-lime-600 hover:underline"
          >
            Reset to "{currentPreset.name}" recommended values
          </button>
        </div>
      )}
    </FormSection>
  );
};

export default StyleSection;