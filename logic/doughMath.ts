
import { DoughConfig, DoughResult, IngredientConfig, YeastType, FermentationTechnique, Levain, CalculationMode } from '../types';

// --- Helpers ---

export function getBaseFlour(ingredients: IngredientConfig[]): IngredientConfig | undefined {
  // In blend logic, we might have multiple. This usually returns the first one or the one with highest %.
  return ingredients.filter(i => i.role === 'flour').sort((a, b) => b.bakerPercentage - a.bakerPercentage)[0];
}

// --- Normalization Logic ---

export function normalizeDoughConfigWithIngredients(config: DoughConfig): DoughConfig {
  // Check if we already have ingredients populated (e.g. from state or presets)
  if (config.ingredients && config.ingredients.length > 0) {
    // Even if populated, we need to ensure specific dynamic values (like water from slider) 
    // are updating the ingredient list if they haven't been manually overridden.
    // However, for the normalization step (initial structure), we return as is if structure exists.
    return config; 
  }

  // Build initial ingredients from legacy fields
  const ingredients: IngredientConfig[] = [];

  // 1. Base Flour (100%) - Uses the config.flourId
  // If this was a blend, the config.ingredients would typically already exist from the UI.
  // This fallback creates a single flour entry.
  ingredients.push({
    id: config.flourId || 'generic_all_purpose',
    name: 'Farinha', // Will be updated by UI lookup usually
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
        
        // Note: We do NOT sync 'flour' percentage here because if it's a blend, 
        // the percentage is managed by the Blend Editor, not a global slider.
        
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

    // 1. Calculate Total Target Weight
    let totalTargetWeight = (config.numPizzas || 0) * (config.doughBallWeight || 0) * (config.scale || 1);
    
    // Safe guard for NaN/Infinity in inputs
    if (isNaN(totalTargetWeight) || totalTargetWeight < 0) totalTargetWeight = 0;

    // Calculate Sum of Percentages
    // IMPORTANT: For blends, multiple ingredients have role='flour'. 
    // Their percentages should sum to 100% ideally, but we sum everything to get the divisor.
    let totalPercentage = 0;
    ingredients.forEach(ing => {
        totalPercentage += (ing.bakerPercentage || 0);
    });

    // Calculate Flour Weight (The Base)
    // In universal calculation, "Total Flour" is the reference 100%.
    // If calculationMode is 'flour', config.totalFlour IS the 100% base.
    let totalFlourBase = 0;
    if (calculationMode === 'flour' && config.totalFlour) {
        totalFlourBase = config.totalFlour;
        // Re-calculate total dough weight
        totalTargetWeight = totalFlourBase * (totalPercentage / 100);
    } else {
        // Mass mode: Total Weight / (Sum of % / 100)
        // E.g. 1000g / (165/100) = 606g Total Flour
        if (totalPercentage > 0) {
             totalFlourBase = totalTargetWeight / (totalPercentage / 100);
        } else {
             totalFlourBase = 0;
        }
    }
    
    // Safe guard
    if (isNaN(totalFlourBase)) totalFlourBase = 0;

    // Calculate Individual Weights
    const ingredientWeights = ingredients.map(ing => ({
        id: ing.id,
        name: ing.name,
        weight: totalFlourBase * ((ing.bakerPercentage || 0) / 100),
        role: ing.role,
        bakerPercentage: ing.bakerPercentage || 0
    }));

    // Map to DoughResult structure for UI Compatibility
    // Aggregating all flours for the 'totalFlour' field in result
    const aggregatedFlourWeight = ingredientWeights
        .filter(i => i.role === 'flour')
        .reduce((sum, i) => sum + i.weight, 0);

    const result: DoughResult = {
        totalFlour: aggregatedFlourWeight,
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
            levainHydration = userLevain.hydration || 100;
        }

        // Calculate flour and water INSIDE the starter
        // formula: Flour = Total / (1 + hydration/100)
        const starterFlour = starterWeight / (1 + (levainHydration / 100));
        const starterWater = starterWeight - starterFlour;

        result.preferment = {
            flour: isNaN(starterFlour) ? 0 : starterFlour,
            water: isNaN(starterWater) ? 0 : starterWater,
            yeast: 0 // Starter itself is the yeast source
        };

        result.finalDough = {
            flour: Math.max(0, aggregatedFlourWeight - starterFlour), // Remaining flour
            water: Math.max(0, waterWeight - starterWater),
            salt: saltWeight,
            oil: oilWeight,
            sugar: sugarWeight,
            yeast: 0
        };

    } else if (config.fermentationTechnique !== FermentationTechnique.DIRECT) {
        // Poolish or Biga
        // Note: Usually preferment is calculated based on Total Flour. 
        // prefermentFlourPercentage is % of Total Flour.
        
        const prefermentFlour = aggregatedFlourWeight * ((config.prefermentFlourPercentage || 0) / 100);
        let prefermentWater = prefermentFlour; // Poolish default (100%)
        
        if (config.fermentationTechnique === FermentationTechnique.BIGA) {
            prefermentWater = prefermentFlour * 0.5; // Biga (50%)
        }

        const prefermentYeast = prefermentFlour * 0.002; // Hardcoded tiny yeast for preferment
        
        result.preferment = {
            flour: prefermentFlour,
            water: prefermentWater,
            yeast: prefermentYeast
        };

        result.finalDough = {
            flour: Math.max(0, aggregatedFlourWeight - prefermentFlour),
            water: Math.max(0, waterWeight - prefermentWater),
            salt: saltWeight,
            oil: oilWeight,
            sugar: sugarWeight,
            yeast: Math.max(0, yeastOrStarterWeight - prefermentYeast)
        };

    } else {
        // Direct Method
        result.finalDough = {
            flour: aggregatedFlourWeight,
            water: waterWeight,
            salt: saltWeight,
            oil: oilWeight,
            sugar: sugarWeight,
            yeast: yeastOrStarterWeight
        };
    }
    
    // Final sanity check to avoid NaN in result
    const sanitize = (val: number) => isNaN(val) ? 0 : val;
    
    if (result.preferment) {
        result.preferment.flour = sanitize(result.preferment.flour);
        result.preferment.water = sanitize(result.preferment.water);
        result.preferment.yeast = sanitize(result.preferment.yeast);
    }
    if (result.finalDough) {
        result.finalDough.flour = sanitize(result.finalDough.flour);
        result.finalDough.water = sanitize(result.finalDough.water);
        result.finalDough.salt = sanitize(result.finalDough.salt);
        result.finalDough.oil = sanitize(result.finalDough.oil);
        result.finalDough.sugar = sanitize(result.finalDough.sugar);
        result.finalDough.yeast = sanitize(result.finalDough.yeast);
    }

    return result;
};
