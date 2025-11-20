
import { DoughConfig, StylePresetPayload, FermentationTechnique, BakeType } from '../types';
import { syncIngredientsFromConfig } from './doughMath';

export function loadStylePresetIntoCalculator(
    currentConfig: DoughConfig,
    preset: StylePresetPayload
): DoughConfig {
    const newConfig: DoughConfig = {
        ...currentConfig,
        bakeType: preset.category === 'Pizza' ? BakeType.PIZZAS : 
                  preset.category === 'Pão' ? BakeType.BREADS_SAVORY : 
                  preset.category === 'Doce' ? BakeType.SWEETS_PASTRY : BakeType.PIZZAS, // Map category to bakeType
        recipeStyle: preset.recipeStyle || currentConfig.recipeStyle, // Use preset style or keep current if generic
        hydration: preset.hydration ?? currentConfig.hydration,
        salt: preset.salt ?? currentConfig.salt,
        oil: preset.oil ?? currentConfig.oil,
        sugar: preset.sugar ?? currentConfig.sugar,
        fermentationTechnique: preset.fermentationTechnique ?? FermentationTechnique.DIRECT,
        bakingTempC: preset.bakingTempC ?? currentConfig.bakingTempC,
        stylePresetId: undefined, // Clear preset ID as this is a custom load
    };

    if (preset.flourId) {
        newConfig.flourId = preset.flourId;
    }

    // Sync ingredients array based on the new slider values
    newConfig.ingredients = syncIngredientsFromConfig(newConfig);

    return newConfig;
}
