import { UnitSystem } from './types';

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
  yeast: { us: 140, metric: 140 }, // Instant Dry Yeast
  wholeWheat: { us: 113, metric: 120 },
  rye: { us: 102, metric: 110 },
};

// Standard volumetric conversions
const TBSP_PER_CUP = 16;
const TSP_PER_CUP = 48;

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
