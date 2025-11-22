
import { DoughConfig, FermentationTechnique, RecipeStyle, BakeType, YeastType } from '../types';
import { getAllowedFermentationTechniques } from '../data/stylesData';

/**
 * Ensures that the DoughConfig is valid for the current RecipeStyle and BakeType.
 * - Enforces allowed FermentationTechniques.
 * - Resets incompatible techniques to the default for the style.
 * - Ensures YeastType consistency if technique is Sourdough.
 */
export function normalizeDoughConfig(config: DoughConfig): DoughConfig {
  const allowedTechniques = getAllowedFermentationTechniques(config.recipeStyle, config.bakeType);

  let newTechnique = config.fermentationTechnique;
  let newYeastType = config.yeastType;

  // 1. Validate Fermentation Technique
  if (!allowedTechniques.includes(newTechnique)) {
    // Fallback to the first allowed technique (usually DIRECT)
    newTechnique = allowedTechniques[0] || FermentationTechnique.DIRECT;
  }

  // 2. Consistency Check for Sourdough
  // If technique implies Sourdough, ensure yeast type matches, and vice-versa
  if (newTechnique === FermentationTechnique.SOURDOUGH) {
    if (newYeastType !== YeastType.SOURDOUGH_STARTER && newYeastType !== YeastType.USER_LEVAIN) {
      newYeastType = YeastType.SOURDOUGH_STARTER;
    }
  } else if (newTechnique === FermentationTechnique.CHEMICAL || newTechnique === FermentationTechnique.NO_FERMENT) {
     // For chemical/no ferment, yeast type is less relevant but should not be Sourdough
     if (newYeastType === YeastType.SOURDOUGH_STARTER || newYeastType === YeastType.USER_LEVAIN) {
         newYeastType = YeastType.IDY;
     }
  } else {
     // Direct, Poolish, Biga
     // If we are switching FROM Sourdough to Direct/Poolish/Biga, we must switch yeast type to commercial
     // unless the user specifically wants hybrid (which we treat as Sourdough technique usually).
     // For simplicity in this strict model:
     if (newYeastType === YeastType.SOURDOUGH_STARTER || newYeastType === YeastType.USER_LEVAIN) {
         // If config says Poolish but yeast is Sourdough -> Invalid state for standard Poolish.
         // Force yeast to IDY for standard preferments
         newYeastType = YeastType.IDY; 
     }
  }
  
  // 3. Specific overrides for Cookie/Pastry
  if (config.bakeType === BakeType.SWEETS_PASTRY) {
      if (config.recipeStyle.includes('COOKIE') || config.recipeStyle.includes('PATE')) {
          // Force no ferment/chemical
          if (newTechnique !== FermentationTechnique.CHEMICAL && newTechnique !== FermentationTechnique.NO_FERMENT) {
               newTechnique = allowedTechniques.includes(FermentationTechnique.CHEMICAL) 
                ? FermentationTechnique.CHEMICAL 
                : FermentationTechnique.NO_FERMENT;
          }
      }
  }

  return {
    ...config,
    fermentationTechnique: newTechnique,
    yeastType: newYeastType
  };
}
