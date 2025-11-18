
import { DoughConfig, DoughResult, IngredientConfig, YeastType, FermentationTechnique, Levain, CalculationMode } from '../types';

// --- Helpers ---

export function getBaseFlour(ingredients: IngredientConfig[]): IngredientConfig | undefined {
  return ingredients.find(i => i.role === 'flour');
}

// --- Normalization Logic ---

export function normalizeDoughConfigWithIngredients(config: DoughConfig): DoughConfig {
  if (config.ingredients && config.ingredients.length > 0) {
    return config; // Already has ingredients
  }

  // Build ingredients from legacy fields
  const ingredients: IngredientConfig[] = [];

  // 1. Base Flour (100%)
  ingredients.push({
    id: 'base-flour',
    name: 'Farinha',
    type: 'solid',
    bakerPercentage: 100,
    role: 'flour'
  });

  // 2. Water (Hydration)
  ingredients.push({
    id: 'water',
    name: 'Água',
    type: 'liquid',
    bakerPercentage: config.hydration,
    role: 'water'
  });

  // 3. Salt
  ingredients.push({
    id: 'salt',
    name: 'Sal',
    type: 'solid',
    bakerPercentage: config.salt,
    role: 'salt'
  });

  // 4. Oil
  if (config.oil > 0) {
    ingredients.push({
      id: 'oil',
      name: 'Azeite/Óleo',
      type: 'liquid',
      bakerPercentage: config.oil,
      role: 'fat'
    });
  }

  // 5. Sugar
  if (config.sugar && config.sugar > 0) {
    ingredients.push({
      id: 'sugar',
      name: 'Açúcar',
      type: 'solid',
      bakerPercentage: config.sugar,
      role: 'sugar'
    });
  }

  // 6. Yeast
  // Note: Pre-ferments (Levain/Biga/Poolish) are handled separately in calculation logic 
  // regarding distribution, but here we add the "yeast component" percentage.
  // If using Sourdough Starter/Levain, we add it as an ingredient.
  if ([YeastType.SOURDOUGH_STARTER, YeastType.USER_LEVAIN].includes(config.yeastType)) {
     ingredients.push({
         id: 'levain',
         name: 'Levain (Fermento Natural)',
         type: 'solid', // Semisolid
         bakerPercentage: config.yeastPercentage,
         role: 'starter'
     });
  } else {
      // Commercial Yeast
      ingredients.push({
          id: 'yeast',
          name: 'Fermento Biológico',
          type: 'solid',
          bakerPercentage: config.yeastPercentage,
          role: 'yeast'
      });
  }

  return {
    ...config,
    ingredients
  };
}

// --- Sync Logic ---

export function syncIngredientsFromConfig(config: DoughConfig): IngredientConfig[] {
    const normalized = normalizeDoughConfigWithIngredients(config);
    
    // Iterate through ingredients and update values based on config settings,
    // BUT respect manualOverride flag if present.
    const ingredients = normalized.ingredients!.map(ing => {
        // If manually overridden in the table, do not update from sliders
        if (ing.manualOverride) {
            return ing; 
        }

        // Sync logic for standard sliders
        if (ing.role === 'water') return { ...ing, bakerPercentage: config.hydration };
        if (ing.role === 'salt') return { ...ing, bakerPercentage: config.salt };
        if (ing.role === 'fat') return { ...ing, bakerPercentage: config.oil };
        if (ing.role === 'sugar') return { ...ing, bakerPercentage: config.sugar || 0 };
        if (ing.role === 'yeast' || ing.role === 'starter') return { ...ing, bakerPercentage: config.yeastPercentage };
        
        return ing;
    });
    return ingredients;
}


// --- Calculation Logic ---

export const calculateDoughUniversal = (
  config: DoughConfig,
  calculatorMode: 'basic' | 'advanced',
  calculationMode: CalculationMode,
  userLevain?: Levain | null
): DoughResult => {
    // Ensure we have ingredients
    const normalizedConfig = normalizeDoughConfigWithIngredients(config);
    const ingredients = normalizedConfig.ingredients || [];

    // 1. Calculate Total Flour Weight
    // Standard calc: Total Dough = NumPizzas * BallWeight * Scale
    let totalTargetWeight = config.numPizzas * config.doughBallWeight * config.scale;
    
    // If calculating by total flour
    if (calculationMode === 'flour' && config.totalFlour) {
        // This path is slightly different, but for now let's stick to mass mode as primary for V1 universal
        // or derive target weight from total flour if needed.
    }

    // Calculate Sum of Percentages
    let totalPercentage = 0;
    ingredients.forEach(ing => {
        totalPercentage += ing.bakerPercentage;
    });

    // Calculate Flour Weight (The Base)
    // If we are in flour mode, we use config.totalFlour directly
    let totalFlour = 0;
    if (calculationMode === 'flour' && config.totalFlour) {
        totalFlour = config.totalFlour;
        // Re-calculate total dough weight
        totalTargetWeight = totalFlour * (totalPercentage / 100);
    } else {
        // Mass mode
        totalFlour = totalTargetWeight * (100 / totalPercentage);
    }

    // Calculate Individual Weights
    const ingredientWeights = ingredients.map(ing => ({
        id: ing.id,
        name: ing.name,
        weight: totalFlour * (ing.bakerPercentage / 100),
        role: ing.role,
        bakerPercentage: ing.bakerPercentage
    }));

    // Map to DoughResult structure for UI Compatibility
    // We need to separate Pre-ferment vs Final Dough logic here.

    const result: DoughResult = {
        totalFlour: totalFlour,
        totalWater: 0,
        totalSalt: 0,
        totalOil: 0,
        totalSugar: 0,
        totalYeast: 0,
        totalDough: totalTargetWeight,
        ingredientWeights: ingredientWeights
    };

    // Extract base weights for legacy summary
    const waterWeight = ingredientWeights.find(i => i.role === 'water')?.weight || 0;
    const saltWeight = ingredientWeights.find(i => i.role === 'salt')?.weight || 0;
    const oilWeight = ingredientWeights.find(i => i.role === 'fat')?.weight || 0;
    const sugarWeight = ingredientWeights.find(i => i.role === 'sugar')?.weight || 0;
    const yeastOrStarterWeight = ingredientWeights.find(i => i.role === 'yeast' || i.role === 'starter')?.weight || 0;

    result.totalWater = waterWeight;
    result.totalSalt = saltWeight;
    result.totalOil = oilWeight;
    result.totalSugar = sugarWeight;
    result.totalYeast = yeastOrStarterWeight;

    // Handle Pre-ferments Logic (Levain, Poolish, Biga)
    
    if (config.yeastType === YeastType.SOURDOUGH_STARTER || config.yeastType === YeastType.USER_LEVAIN) {
        // Levain Logic
        const starterWeight = yeastOrStarterWeight;
        let levainHydration = 100; // Default 100%
        if (config.yeastType === YeastType.USER_LEVAIN && userLevain) {
            levainHydration = userLevain.hydration;
        }

        // Calculate flour and water INSIDE the starter
        const starterFlour = starterWeight / (1 + (levainHydration / 100));
        const starterWater = starterWeight - starterFlour;

        result.preferment = {
            flour: starterFlour,
            water: starterWater,
            yeast: 0 // Starter itself is the yeast source
        };

        result.finalDough = {
            flour: totalFlour - starterFlour,
            water: waterWeight - starterWater,
            salt: saltWeight,
            oil: oilWeight,
            sugar: sugarWeight,
            yeast: 0
        };

    } else if (config.fermentationTechnique !== FermentationTechnique.DIRECT) {
        // Poolish or Biga
        // The 'yeastOrStarterWeight' here is commercial yeast.
        // We need to calculate the preferment flour amount based on prefermentFlourPercentage
        
        const prefermentFlour = totalFlour * (config.prefermentFlourPercentage / 100);
        let prefermentWater = prefermentFlour; // Poolish default (100%)
        
        if (config.fermentationTechnique === FermentationTechnique.BIGA) {
            prefermentWater = prefermentFlour * 0.5; // Biga (50%)
        }

        // Yeast in preferment (usually small fixed % of preferment flour, e.g. 0.1% - 0.5% or tiny amount)
        // Legacy logic used: const prefermentYeast = prefermentFlour * 0.002;
        const prefermentYeast = prefermentFlour * 0.002;
        
        // Commercial yeast adjustments for type (ADY/Fresh) should happen on the input percentage
        // We assume 'yeastOrStarterWeight' is already the correct amount for the specific type chosen in UI
        
        result.preferment = {
            flour: prefermentFlour,
            water: prefermentWater,
            yeast: prefermentYeast
        };

        result.finalDough = {
            flour: totalFlour - prefermentFlour,
            water: waterWeight - prefermentWater,
            salt: saltWeight,
            oil: oilWeight,
            sugar: sugarWeight,
            yeast: Math.max(0, yeastOrStarterWeight - prefermentYeast)
        };

    } else {
        // Direct Method
        result.finalDough = {
            flour: totalFlour,
            water: waterWeight,
            salt: saltWeight,
            oil: oilWeight,
            sugar: sugarWeight,
            yeast: yeastOrStarterWeight
        };
    }

    return result;
};
