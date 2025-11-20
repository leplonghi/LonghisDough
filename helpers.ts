
import { UnitSystem, ToppingSizeProfile, YeastType, IngredientUnit } from './types';
import { YEAST_EQUIVALENCIES } from './constants';

// Grams per cup for key ingredients.
// US Customary cup is ~236.59mL. Metric cup is 250mL.
// Sources: King Arthur Baking for flour densities, standard liquid conversions.
export const INGREDIENT_DENSITIES: {
  [key: string]: { us: number; metric: number };
} = {
  flour: { us: 120, metric: 125 }, // All-purpose flour
  water: { us: 236.59, metric: 250 },
  salt: { us: 292, metric: 300 }, // Fine sea salt
  oil: { us: 218, metric: 224 },
  sugar: { us: 200, metric: 210 },
  yeast: { us: 140, metric: 140 }, // Instant Dry Yeast
  wholeWheat: { us: 113, metric: 120 },
  rye: { us: 102, metric: 110 },
};

// Fallback density if key not found (assume water/1.0)
const DEFAULT_DENSITY = { us: 236.59, metric: 250 };

// Standard volumetric conversions
const TBSP_PER_CUP = 16;
const TSP_PER_CUP = 48;

/**
 * Helper to retrieve density based on a rough ID match
 */
export function getIngredientDensity(id: string): { us: number; metric: number } {
    const key = id.toLowerCase();
    if (key.includes('flour')) return INGREDIENT_DENSITIES.flour;
    if (key.includes('water')) return INGREDIENT_DENSITIES.water;
    if (key.includes('salt')) return INGREDIENT_DENSITIES.salt;
    if (key.includes('oil') || key.includes('olive') || key.includes('fat')) return INGREDIENT_DENSITIES.oil;
    if (key.includes('sugar') || key.includes('honey')) return INGREDIENT_DENSITIES.sugar;
    if (key.includes('yeast') || key.includes('levain') || key.includes('starter')) return INGREDIENT_DENSITIES.yeast;
    
    // Try direct lookup
    if (INGREDIENT_DENSITIES[key]) return INGREDIENT_DENSITIES[key];

    return DEFAULT_DENSITY;
}

/**
 * Converts a value in a specific unit to Grams.
 */
export function convertToGrams(
    value: number, 
    unit: IngredientUnit, 
    ingredientId: string,
    unitSystem: UnitSystem
): number {
    if (unit === 'g') return value;
    if (unit === 'kg') return value * 1000;
    if (unit === 'oz') return value * 28.3495;
    if (unit === 'lb') return value * 453.592;
    if (unit === '%') return value; // Cannot convert % to grams without context, calling code must handle
    
    // Volumetric
    const density = getIngredientDensity(ingredientId);
    const gramsPerCup = unitSystem === UnitSystem.METRIC ? density.metric : density.us;

    if (unit === 'cup') return value * gramsPerCup;
    if (unit === 'tbsp') return value * (gramsPerCup / TBSP_PER_CUP);
    if (unit === 'tsp') return value * (gramsPerCup / TSP_PER_CUP);
    
    // Liquid specific (assume density ~1 for ml/l if not water/oil, but we use density map)
    // Actually, density map is "grams per cup".
    // Metric Cup = 250ml.
    // Grams per ml = gramsPerCup / 250 (Metric) or gramsPerCup / 236.59 (US)
    // Ideally simply: 1ml water = 1g. 1ml oil = 0.92g.
    // Let's derive density ratio from the map relative to water.
    const waterDensity = unitSystem === UnitSystem.METRIC ? INGREDIENT_DENSITIES.water.metric : INGREDIENT_DENSITIES.water.us;
    const specificGravity = gramsPerCup / waterDensity;

    if (unit === 'ml') return value * specificGravity;
    if (unit === 'l') return value * 1000 * specificGravity;

    return value;
}

/**
 * Converts a value in Grams to a specific unit.
 */
export function convertFromGrams(
    grams: number, 
    targetUnit: IngredientUnit, 
    ingredientId: string,
    unitSystem: UnitSystem
): number {
    if (targetUnit === 'g') return grams;
    if (targetUnit === 'kg') return grams / 1000;
    if (targetUnit === 'oz') return grams / 28.3495;
    if (targetUnit === 'lb') return grams / 453.592;
    if (targetUnit === '%') return 0; // Context needed

    const density = getIngredientDensity(ingredientId);
    const gramsPerCup = unitSystem === UnitSystem.METRIC ? density.metric : density.us;
    
    if (targetUnit === 'cup') return grams / gramsPerCup;
    if (targetUnit === 'tbsp') return grams / (gramsPerCup / TBSP_PER_CUP);
    if (targetUnit === 'tsp') return grams / (gramsPerCup / TSP_PER_CUP);

    const waterDensity = unitSystem === UnitSystem.METRIC ? INGREDIENT_DENSITIES.water.metric : INGREDIENT_DENSITIES.water.us;
    const specificGravity = gramsPerCup / waterDensity;

    if (targetUnit === 'ml') return grams / specificGravity;
    if (targetUnit === 'l') return (grams / specificGravity) / 1000;

    return grams;
}


/**
 * Converts a decimal number to a string with a common fraction character.
 * e.g., 2.5 becomes "2 ½", 0.75 becomes "¾".
 * @param decimal The number to convert.
 * @returns A string representation with a fraction.
 */
function decimalToFraction(decimal: number): string {
  const whole = Math.floor(decimal);
  const frac = decimal - whole;

  if (frac < 0.05) {
    return whole > 0 ? `${whole}` : '0';
  }

  const fractions: { [key: number]: string } = {
    0.125: '⅛',
    0.25: '¼',
    0.333: '⅓',
    0.375: '⅜',
    0.5: '½',
    0.625: '⅝',
    0.666: '⅔',
    0.75: '¾',
    0.875: '⅞',
  };

  let closestFrac = '';
  let minDiff = Infinity;

  // Find the closest common fraction within a tolerance
  for (const key in fractions) {
    const diff = Math.abs(frac - parseFloat(key));
    if (diff < minDiff && diff < 0.05) {
      minDiff = diff;
      closestFrac = fractions[key];
    }
  }

  const wholeStr = whole > 0 ? `${whole} ` : '';
  return `${wholeStr}${closestFrac}`.trim();
}

/**
 * Converts a gram value of a specific ingredient to a user-friendly
 * volumetric measurement (cups, tbsp, or tsp) with fractions.
 * @param ingredient The name of the ingredient (must exist in INGREDIENT_DENSITIES).
 * @param grams The weight of the ingredient in grams.
 * @param units An object with translated unit names.
 * @param unitSystem The measurement system to use (US_CUSTOMARY or METRIC).
 * @returns A formatted string like "2 ½ cups" or "1.2 tbsp".
 */
export function gramsToVolume(
  ingredient: keyof typeof INGREDIENT_DENSITIES,
  grams: number,
  units: { cups: string; tbsp: string; tsp: string },
  unitSystem: UnitSystem,
): string {
  if (grams < 0.1) return `0 ${units.tsp}`;

  const density = INGREDIENT_DENSITIES[ingredient];
  if (!density) {
    console.warn(`No density found for ingredient: ${ingredient}`);
    return `~ ${grams.toFixed(0)}g`; // Fallback
  }

  const gramsPerCup =
    unitSystem === UnitSystem.METRIC ? density.metric : density.us;

  const cups = grams / gramsPerCup;

  // Use teaspoons for very small amounts
  const tsp = cups * TSP_PER_CUP;
  if (tsp < 3) {
    // For anything less than a tablespoon, use tsp, rounded to the nearest quarter
    const roundedTsp = Math.round(tsp * 4) / 4;
    return `${decimalToFraction(roundedTsp)} ${units.tsp}`;
  }

  // Use tablespoons for medium amounts
  const tbsp = cups * TBSP_PER_CUP;
  if (tbsp < 4) {
    // For anything less than 1/4 cup, use tbsp, rounded to the nearest half
    const roundedTbsp = Math.round(tbsp * 2) / 2;
    return `${decimalToFraction(roundedTbsp)} ${units.tbsp}`;
  }

  // Use cups for larger amounts, rounded to the nearest quarter
  const roundedCups = Math.round(cups * 4) / 4;
  return `${decimalToFraction(roundedCups)} ${units.cups}`;
}

/**
 * Estimates pizza diameter in cm from dough ball weight in grams.
 * This is a rough heuristic.
 * @param weightInGrams Dough ball weight.
 * @returns Estimated diameter in cm.
 */
export function weightToEstimatedSizeCm(weightInGrams: number): number {
    // Heuristic: A 250g ball makes roughly a 30cm pizza.
    // Area is proportional to weight. Area = PI * (d/2)^2. So weight is proportional to d^2.
    // d is proportional to sqrt(weight).
    const baseWeight = 250;
    const baseDiameter = 30;
    const estimatedDiameter = baseDiameter * Math.sqrt(weightInGrams / baseWeight);
    return Math.round(estimatedDiameter);
}

/**
 * Finds the closest topping size profile from a list based on a target diameter.
 * @param sizes Array of available topping size profiles.
 * @param targetSizeCm The target pizza diameter.
 * @returns The closest matching ToppingSizeProfile.
 */
export function findClosestToppingSize(sizes: ToppingSizeProfile[], targetSizeCm: number): ToppingSizeProfile {
    if (sizes.length === 0) {
        throw new Error("Cannot find closest size in an empty array.");
    }
    return sizes.reduce((prev, curr) => {
        const prevDiff = Math.abs(prev.sizeCm - targetSizeCm);
        const currDiff = Math.abs(curr.sizeCm - targetSizeCm);
        return currDiff < prevDiff ? curr : prev;
    });
}

/**
 * Converts an amount of one yeast type to an equivalent amount of another.
 * @param amount The quantity of the starting yeast.
 * @param from The starting yeast type.
 * @param to The target yeast type.
 * @returns The equivalent amount of the target yeast type.
 */
export function convertYeast(amount: number, from: YeastType, to: YeastType): number {
  if (from === to) {
    return amount;
  }
  // First, convert 'from' amount to a base of IDY
  let idyAmount = amount;
  if (from === YeastType.ADY) {
    idyAmount = amount * YEAST_EQUIVALENCIES.ADY_TO_IDY;
  } else if (from === YeastType.FRESH) {
    idyAmount = amount * YEAST_EQUIVALENCIES.FRESH_TO_IDY;
  }

  // Now, convert from IDY amount to the 'to' type
  if (to === YeastType.ADY) {
    return idyAmount * YEAST_EQUIVALENCIES.IDY_TO_ADY;
  }
  if (to === YeastType.FRESH) {
    return idyAmount * YEAST_EQUIVALENCIES.IDY_TO_FRESH;
  }
  
  return idyAmount; // This will be the case if 'to' is IDY
}

/**
 * Calculates the required water temperature to achieve a Desired Dough Temperature (DDT).
 * Uses a simplified heuristic formula provided.
 * @param ddt Desired Dough Temperature in Celsius.
 * @param ambientTemp Ambient temperature in Celsius.
 * @param flourTemp Flour temperature in Celsius.
 * @returns The required water temperature in Celsius.
 */
export function calculateWaterTempDDT(ddt: number, ambientTemp: number, flourTemp: number): number {
    // Using the user-provided simplified formula: ((DDT - 1) * 3) - ambient - flour
    // This is a non-standard heuristic, but we'll implement it as requested.
    // A note could be added in the UI that this is an estimate.
    return ((ddt - 1) * 3) - ambientTemp - flourTemp;
}

/**
 * Calculates the number of hours between two date strings.
 * @param date1 ISO date string
 * @param date2 ISO date string
 * @returns The difference in hours.
 */
export function hoursBetween(date1: string, date2: string): number {
  const d1 = new Date(date1).getTime();
  const d2 = new Date(date2).getTime();
  return Math.abs(d1 - d2) / (1000 * 60 * 60);
}

/**
 * Converts a Blob to a base64 encoded string (data URL).
 * @param blob The Blob to convert.
 * @returns A promise that resolves with the data URL.
 */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Formats a date string into a concise "time since" string.
 * @param dateString ISO date string
 * @returns A string like "2d", "5h", "10min"
 */
export function timeSince(dateString: string): string {
    if (!dateString) return 'nunca';
    const seconds = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return `${Math.floor(interval)} anos`;
    interval = seconds / 2592000;
    if (interval > 1) return `${Math.floor(interval)} meses`;
    interval = seconds / 86400;
    if (interval > 1) return `${Math.floor(interval)}d`;
    interval = seconds / 3600;
    if (interval > 1) return `${Math.floor(interval)}h`;
    interval = seconds / 60;
    if (interval > 1) return `${Math.floor(interval)}min`;
    return `${Math.floor(seconds)}s`;
}

// Add polyfill for randomUUID if it doesn't exist
if (typeof crypto === 'undefined') {
    (globalThis as any).crypto = {
        randomUUID: () => {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    };
} else if (!crypto.randomUUID) {
    crypto.randomUUID = (() => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }) as any;
}