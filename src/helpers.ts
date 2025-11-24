import { UnitSystem, ToppingSizeProfile, YeastType } from './types';
import { YEAST_EQUIVALENCIES } from './constants';

// Grams per cup for key ingredients.
// US Customary cup is ~236.59mL. Metric cup is 250mL.
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

const TBSP_PER_CUP = 16;
const TSP_PER_CUP = 48;

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
    return `~ ${grams.toFixed(0)}g`; 
  }

  const gramsPerCup =
    unitSystem === UnitSystem.METRIC ? density.metric : density.us;

  const cups = grams / gramsPerCup;

  const tsp = cups * TSP_PER_CUP;
  if (tsp < 3) {
    const roundedTsp = Math.round(tsp * 4) / 4;
    return `${decimalToFraction(roundedTsp)} ${units.tsp}`;
  }

  const tbsp = cups * TBSP_PER_CUP;
  if (tbsp < 4) {
    const roundedTbsp = Math.round(tbsp * 2) / 2;
    return `${decimalToFraction(roundedTbsp)} ${units.tbsp}`;
  }

  const roundedCups = Math.round(cups * 4) / 4;
  return `${decimalToFraction(roundedCups)} ${units.cups}`;
}

export function weightToEstimatedSizeCm(weightInGrams: number): number {
    const baseWeight = 250;
    const baseDiameter = 30;
    const estimatedDiameter = baseDiameter * Math.sqrt(weightInGrams / baseWeight);
    return Math.round(estimatedDiameter);
}

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

export function convertYeast(amount: number, from: YeastType, to: YeastType): number {
  if (from === to) {
    return amount;
  }
  let idyAmount = amount;
  if (from === YeastType.ADY) {
    idyAmount = amount * YEAST_EQUIVALENCIES.ADY_TO_IDY;
  } else if (from === YeastType.FRESH) {
    idyAmount = amount * YEAST_EQUIVALENCIES.FRESH_TO_IDY;
  }

  if (to === YeastType.ADY) {
    return idyAmount * YEAST_EQUIVALENCIES.IDY_TO_ADY;
  }
  if (to === YeastType.FRESH) {
    return idyAmount * YEAST_EQUIVALENCIES.IDY_TO_FRESH;
  }
  
  return idyAmount;
}

export function calculateWaterTempDDT(ddt: number, ambientTemp: number, flourTemp: number): number {
    return ((ddt - 1) * 3) - ambientTemp - flourTemp;
}

export function hoursBetween(date1: string, date2: string): number {
  const d1 = new Date(date1).getTime();
  const d2 = new Date(date2).getTime();
  return Math.abs(d1 - d2) / (1000 * 60 * 60);
}

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

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