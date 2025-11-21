
import {
  EnvironmentInput,
  EnvironmentAdvice,
  RecipeStyle,
} from '../types';
import {
  DEFAULT_DDT_C,
  BAKING_PROFILES,
} from '../constants';
import { calculateWaterTempDDT } from '../helpers';

/**
 * Analyzes the user's baking environment and provides tailored advice.
 * This logic is based on references from ChainBaker (DDT), AVPN (Neapolitan), 
 * and Serious Eats/PizzaBlab (Home Ovens, Surfaces).
 * @param input - The environmental conditions provided by the user.
 * @returns An object containing notes, warnings, and recommendations.
 */
export function getEnvironmentAdjustments(
  input: EnvironmentInput,
): EnvironmentAdvice {
  const advice: EnvironmentAdvice = {
    notes: [],
    warnings: [],
    flags: [],
  };

  const {
    ambientTemperatureC,
    flourTemperatureC,
    targetDDT = DEFAULT_DDT_C,
    ovenType,
    surfaceType,
    styleId,
  } = input;

  // 1. Calculate Recommended Water Temperature using DDT formula (Source: ChainBaker)
  if (flourTemperatureC) {
    advice.recommendedWaterTempC = calculateWaterTempDDT(
      targetDDT,
      ambientTemperatureC,
      flourTemperatureC,
    );
    advice.notes.push(
      `To reach the ideal dough temperature (~${targetDDT}°C), the water should be around ${advice.recommendedWaterTempC.toFixed(0)}°C.`
    );
     if (ambientTemperatureC > 26) {
        advice.notes.push("Hot environment: use cooler water to hit DDT.");
    } else if (ambientTemperatureC < 20) {
        advice.notes.push("Cold environment: slightly warmer water helps hit DDT.");
    }
  } else {
    advice.notes.push(
      'Enter flour temperature for an accurate water temperature (DDT) calculation.',
    );
  }

  // 2. Surface and Oven combination warnings (Source: PizzaBlab/Serious Eats)
  if (
    (ovenType === 'wood_fired' || ovenType === 'portable_high_temp') &&
    surfaceType === 'steel'
  ) {
    advice.warnings.push(
      `WARNING: Using a baking steel in extremely hot ovens (>400°C) can burn the pizza base very quickly. A clay stone (biscotto) is recommended.`
    );
    advice.recommendedSurfaceOverride = 'biscotto';
  }
  
  if (
    (ovenType === 'gas_home' || ovenType === 'electric_home') &&
    !surfaceType && styleId && ![RecipeStyle.DETROIT, RecipeStyle.FOCACCIA, RecipeStyle.PAN_PIZZA].includes(styleId)
  ) {
    advice.notes.push(
      `TIP: For home ovens, a "baking steel" is the best surface for a crispier base, as it transfers heat faster than stone.`
    );
    advice.recommendedSurfaceOverride = 'steel';
  }

  // 3. Recommend Baking Profile based on Style and Oven
  if (styleId === RecipeStyle.NEAPOLITAN) {
    if (ovenType === 'wood_fired') {
        advice.recommendedBakeTempC = 485;
        advice.recommendedBakeTimeSeconds = [60, 90];
        advice.recommendedSurfaceOverride = 'biscotto';
        advice.flags?.push('STRICT_AVPN');
        advice.notes.push("AVPN: Oven at 485°C, 60-90s, no oil/sugar in dough.");
    } else if (ovenType === 'gas_home' || ovenType === 'electric_home') {
        advice.recommendedBakeTempC = 290; // Max safe temp for home ovens
        advice.recommendedBakeTimeSeconds = [360, 480]; // 6-8 min
        advice.recommendedSurfaceOverride = 'steel';
        advice.flags?.push('HOME_OVEN_COMPROMISE');
        advice.warnings.push("WARNING: Replicating Neapolitan pizza in a home oven is challenging. This is an adapted profile.");
    }
  }

  // Fallback to generic profile if no style-specific one was found
  if (!advice.recommendedBakeTempC) {
      const effectiveSurface = surfaceType || (ovenType.includes('home') ? 'pan' : 'stone');
      const profile = BAKING_PROFILES[ovenType]?.[effectiveSurface];
      if (profile) {
        advice.recommendedBakeTempC = profile.tempC;
        advice.recommendedBakeTimeSeconds = profile.timeSeconds;
      }
  }

  // 4. Ambient temperature warnings for fermentation
  if (ambientTemperatureC >= 28) { // HOT_AMBIENT_MIN
      advice.notes.push("Hot environment accelerates fermentation; consider reducing bulk time or yeast amount.");
  } else if (ambientTemperatureC <= 18) { // COLD_AMBIENT_MAX
      advice.notes.push("Cold environment slows fermentation; consider increasing bulk time to reach desired volume.");
  }

  return advice;
}
