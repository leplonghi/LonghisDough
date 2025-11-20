
import { FlourDefinition, IngredientConfig } from '../types';
import { FLOURS } from '../flours-constants';

export interface BlendResult {
  estimatedW: number;
  estimatedProtein: number;
  compositeName: string;
}

/**
 * Calculates the theoretical W (Strength) and Protein content of a flour blend
 * using weighted averages.
 * 
 * Reference: This is a standard approximation used in milling and baking technology.
 * While exact rheology (Alveograph) requires lab testing, the weighted average
 * provides a reliable estimation for recipe formulation.
 */
export function calculateBlendCharacteristics(
  ingredients: IngredientConfig[]
): BlendResult {
  let totalPercentage = 0;
  let weightedW = 0;
  let weightedProtein = 0;
  const flourNames: string[] = [];

  ingredients.forEach(ing => {
    if (ing.role !== 'flour') return;

    // Find the definition to get technical specs
    // We try to match by ID first, or fallback if it's a generic custom flour
    const definition = FLOURS.find(f => f.id === ing.id) || FLOURS.find(f => f.id === 'generic_all_purpose');
    
    if (definition) {
      const pct = ing.bakerPercentage; // e.g. 90 for 90%
      totalPercentage += pct;
      
      // Use definition W or fallback to 200 (generic weak/medium flour)
      const w = definition.strengthW || 200;
      const p = definition.protein || 10;

      weightedW += w * pct;
      weightedProtein += p * pct;
      
      if (pct > 5) { // Only include in name if significant
        flourNames.push(definition.name.split('(')[0].trim());
      }
    }
  });

  if (totalPercentage === 0) return { estimatedW: 0, estimatedProtein: 0, compositeName: 'No Flour' };

  return {
    estimatedW: Math.round(weightedW / totalPercentage),
    estimatedProtein: parseFloat((weightedProtein / totalPercentage).toFixed(1)),
    compositeName: flourNames.length > 1 ? 'Custom Blend' : (flourNames[0] || 'Unknown Flour')
  };
}

/**
 * Rebalances flour percentages so they sum to 100%.
 * Typically called when a user modifies a secondary flour.
 * The "Main" flour absorbs the difference.
 */
export function balanceFlourPercentages(
  ingredients: IngredientConfig[],
  mainFlourId: string
): IngredientConfig[] {
  const nonMainFlours = ingredients.filter(i => i.role === 'flour' && i.id !== mainFlourId);
  const mainFlour = ingredients.find(i => i.role === 'flour' && i.id === mainFlourId);

  if (!mainFlour) return ingredients;

  let secondarySum = 0;
  nonMainFlours.forEach(f => secondarySum += f.bakerPercentage);

  // Clamp secondary sum to max 95% (leaving 5% for main flour)
  if (secondarySum > 95) {
     // If we exceed, we just return as is (UI should prevent this), 
     // or strictly we could scale them down. For now, let's clamp the main flour.
     secondarySum = 95;
  }

  const newMainPercentage = 100 - secondarySum;

  return ingredients.map(i => {
    if (i.id === mainFlourId) {
      return { ...i, bakerPercentage: newMainPercentage };
    }
    return i;
  });
}
