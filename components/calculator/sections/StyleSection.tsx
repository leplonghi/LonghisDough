import React, { useMemo } from 'react';
import { DoughConfig, BakeType, DoughStylePreset } from '../../../types';
import FormSection from '../AccordionSection';
import { RecipeIcon } from '../../IconComponents';
import ChoiceButton from '../../ui/ChoiceButton';
import { DOUGH_STYLE_PRESETS } from '../../../constants';

interface StyleSectionProps {
  config: DoughConfig;
  onBakeTypeChange: (bakeType: BakeType) => void;
  onStyleChange: (presetId: string) => void;
  isBasic: boolean;
}

const StyleSection: React.FC<StyleSectionProps> = ({ config, onBakeTypeChange, onStyleChange, isBasic }) => {
    
  const recipeStylesToShow = DOUGH_STYLE_PRESETS.filter(p => p.type === config.bakeType);
  const currentPreset = useMemo(() => 
      DOUGH_STYLE_PRESETS.find(p => p.id === config.stylePresetId),
  [config.stylePresetId]);

  const handleResetPreset = () => {
    if (config.stylePresetId) {
      onStyleChange(config.stylePresetId);
    }
  };

  return (
      <FormSection title="Dough Style" description="Start by choosing the result you're aiming for." icon={<RecipeIcon className="h-6 w-6" />}>
          <div className="grid grid-cols-3 gap-3">
              <ChoiceButton active={config.bakeType === BakeType.PIZZAS} onClick={() => onBakeTypeChange(BakeType.PIZZAS)}>Pizzas</ChoiceButton>
              <ChoiceButton active={config.bakeType === BakeType.BREADS_SAVORY} onClick={() => onBakeTypeChange(BakeType.BREADS_SAVORY)}>Breads</ChoiceButton>
              <ChoiceButton active={config.bakeType === BakeType.SWEETS_PASTRY} onClick={() => onBakeTypeChange(BakeType.SWEETS_PASTRY)}>Pastry</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {recipeStylesToShow.map((preset) => (
                  <ChoiceButton key={preset.id} active={config.stylePresetId === preset.id} onClick={() => onStyleChange(preset.id)}>{preset.name}</ChoiceButton>
              ))}
          </div>
           {isBasic && currentPreset && (
             <div className="pt-4 mt-4 border-t border-slate-200">
                <button
                    onClick={handleResetPreset}
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