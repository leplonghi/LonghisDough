
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
    name: 'Flour',
    type: 'solid',
    bakerPercentage: 100,
    role: 'flour'
  });

  // 2. Water (Hydration)
  ingredients.push({
    id: 'water',
    name: 'Water',
    type: 'liquid',
    bakerPercentage: config.hydration,
    role: 'water'
  });

  // 3. Salt
  ingredients.push({
    id: 'salt',
    name: 'Salt',
    type: 'solid',
    bakerPercentage: config.salt,
    role: 'salt'
  });

  // 4. Oil
  if (config.oil > 0) {
    ingredients.push({
      id: 'oil',
      name: 'Oil/Olive Oil',
      type: 'liquid',
      bakerPercentage: config.oil,
      role: 'fat'
    });
  }

  // 5. Sugar
  if (config.sugar && config.sugar > 0) {
    ingredients.push({
      id: 'sugar',
      name: 'Sugar',
      type: 'solid',
      bakerPercentage: config.sugar,
      role: 'sugar'
    });
  }

  // 6. Yeast
  if ([YeastType.SOURDOUGH_STARTER, YeastType.USER_LEVAIN].includes(config.yeastType)) {
     ingredients.push({
         id: 'levain',
         name: 'Levain (Sourdough Starter)',
         type: 'solid', // Semisolid
         bakerPercentage: config.yeastPercentage,
         role: 'starter'
     });
  } else {
      // Commercial Yeast or Chemical Leavening
      ingredients.push({
          id: 'yeast',
          name: 'Yeast/Leavening',
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

/**
 * THE CORE CALCULATOR ENGINE
 * 
 * This function takes the configuration and outputs exact weights.
 * It handles:
 * 1. Baker's Percentage Math (Weight = Flour * %)
 * 2. Pre-ferment decomposition (Splitting flour/water/yeast into Day 1 vs Day 2)
 * 3. Sourdough Hydration logic
 */
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
    // Standard calc: Total Dough = NumPizzas * BallWeight * Scale
    let totalTargetWeight = config.numPizzas * config.doughBallWeight * config.scale;
    
    // If calculating by total flour input, logic reverses
    let totalFlour = 0;

    // Calculate Sum of Percentages (The "Factor")
    // Example: 100 (flour) + 65 (water) + 3 (salt) = 168%
    let totalPercentage = 0;
    ingredients.forEach(ing => {
        totalPercentage += ing.bakerPercentage;
    });

    if (calculationMode === 'flour' && config.totalFlour) {
        // Mode: "I have 1kg of flour, how much dough does it make?"
        totalFlour = config.totalFlour;
        totalTargetWeight = totalFlour * (totalPercentage / 100);
    } else {
        // Mode: "I need 1kg of dough, how much flour do I need?"
        // Formula: Flour = TotalDough * (100 / SumPercentages)
        totalFlour = totalTargetWeight * (100 / totalPercentage);
    }

    // 2. Calculate Absolute Weights for ALL ingredients based on Total Flour
    const ingredientWeights = ingredients.map(ing => ({
        id: ing.id,
        name: ing.name,
        weight: totalFlour * (ing.bakerPercentage / 100),
        role: ing.role,
        bakerPercentage: ing.bakerPercentage
    }));

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

    // Extract base weights for easy access
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

    // 3. PRE-FERMENT DECOMPOSITION LOGIC
    // If using Biga/Poolish, we must subtract their flour/water from the main mix.
    
    const isChemicalOrNoFerment = config.fermentationTechnique === FermentationTechnique.CHEMICAL || config.fermentationTechnique === FermentationTechnique.NO_FERMENT;

    // CASE A: Sourdough / Levain
    if (!isChemicalOrNoFerment && (config.yeastType === YeastType.SOURDOUGH_STARTER || config.yeastType === YeastType.USER_LEVAIN)) {
        const starterWeight = yeastOrStarterWeight;
        
        // Determine starter hydration (default 100% or user defined)
        let levainHydration = 100; 
        if (config.yeastType === YeastType.USER_LEVAIN && userLevain) {
            levainHydration = userLevain.hydration;
        }

        // Math: StarterWeight = Flour + Water
        // Water = Flour * Hydration
        // StarterWeight = Flour + (Flour * Hydration) = Flour * (1 + Hydration)
        // Flour = StarterWeight / (1 + Hydration)
        const starterFlour = starterWeight / (1 + (levainHydration / 100));
        const starterWater = starterWeight - starterFlour;

        result.preferment = {
            flour: starterFlour,
            water: starterWater,
            yeast: 0 // The starter IS the yeast culture
        };

        result.finalDough = {
            flour: totalFlour - starterFlour, // "Reforço" flour
            water: waterWeight - starterWater, // "Reforço" water
            salt: saltWeight,
            oil: oilWeight,
            sugar: sugarWeight,
            yeast: 0
        };

    // CASE B: Poolish or Biga (Commercial Yeast Preferments)
    } else if (!isChemicalOrNoFerment && (config.fermentationTechnique === FermentationTechnique.POOLISH || config.fermentationTechnique === FermentationTechnique.BIGA)) {
        
        // How much of the Total Flour goes into the preferment?
        // defined by prefermentFlourPercentage (e.g., 30%)
        const prefermentFlour = totalFlour * (config.prefermentFlourPercentage / 100);
        
        let prefermentWater = 0;
        
        if (config.fermentationTechnique === FermentationTechnique.BIGA) {
            // BIGA: Traditionally 45-50% hydration. We use 50% for calculation simplicity.
            prefermentWater = prefermentFlour * 0.5; 
        } else {
            // POOLISH: Always 100% hydration (1:1 ratio)
            prefermentWater = prefermentFlour * 1.0;
        }

        // Yeast in preferment
        // Standard practice: Use a tiny fraction (0.1% - 0.2%) of the preferment flour for the preferment,
        // and put the rest in the final dough if needed.
        // For this calculator, we assume a fixed small amount for the preferment to ensure it activates.
        const prefermentYeast = prefermentFlour * 0.002; // 0.2% of preferment flour
        
        result.preferment = {
            flour: prefermentFlour,
            water: prefermentWater,
            yeast: prefermentYeast
        };

        // Final Dough (The Mix Day)
        result.finalDough = {
            flour: totalFlour - prefermentFlour,
            water: waterWeight - prefermentWater,
            salt: saltWeight,
            oil: oilWeight,
            sugar: sugarWeight,
            // Remaining yeast is added to final dough. 
            // If yeastOrStarterWeight (total yeast) is less than what we put in preferment, we assume 0 added.
            yeast: Math.max(0, yeastOrStarterWeight - prefermentYeast)
        };

    } else {
        // CASE C: Direct Method (Everything mixed at once)
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
