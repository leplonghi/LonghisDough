// Grams per cup for key ingredients. These are standard baking conversions.
const GRAMS_PER_CUP: { [key: string]: number } = {
  flour: 120, // All-purpose flour
  water: 236.59,
  salt: 292, // Fine sea salt
  oil: 218,
  yeast: 140, // Instant Dry Yeast
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
 * @param ingredient The name of the ingredient (must exist in GRAMS_PER_CUP).
 * @param grams The weight of the ingredient in grams.
 * @param units An object with translated unit names.
 * @returns A formatted string like "2 ½ cups" or "1.2 tbsp".
 */
export function gramsToVolume(
  ingredient: keyof typeof GRAMS_PER_CUP,
  grams: number,
  units: { cups: string; tbsp: string; tsp: string },
): string {
  if (grams < 0.1) return `0 ${units.tsp}`;

  const gramsPerCup = GRAMS_PER_CUP[ingredient];
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