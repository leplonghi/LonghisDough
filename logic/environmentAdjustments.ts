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
      `Para atingir a temperatura ideal da massa (~${targetDDT}°C), a água deve estar em torno de ${advice.recommendedWaterTempC.toFixed(0)}°C.`
    );
     if (ambientTemperatureC > 26) {
        advice.notes.push("Ambiente quente: use água mais fria para atingir a DDT.");
    } else if (ambientTemperatureC < 20) {
        advice.notes.push("Ambiente frio: água ligeiramente mais quente ajuda a atingir a DDT.");
    }
  } else {
    advice.notes.push(
      'Informe a temperatura da farinha para um cálculo preciso da temperatura da água (DDT).',
    );
  }

  // 2. Surface and Oven combination warnings (Source: PizzaBlab/Serious Eats)
  if (
    (ovenType === 'wood_fired' || ovenType === 'portable_high_temp') &&
    surfaceType === 'steel'
  ) {
    advice.warnings.push(
      `CUIDADO: Usar uma chapa de aço em fornos de altíssima temperatura (>400°C) pode queimar a base da pizza muito rapidamente. Recomenda-se uma pedra de argila (biscotto).`
    );
    advice.recommendedSurfaceOverride = 'biscotto';
  }
  
  if (
    (ovenType === 'gas_home' || ovenType === 'electric_home') &&
    !surfaceType && styleId && ![RecipeStyle.DETROIT, RecipeStyle.FOCACCIA, RecipeStyle.PAN_PIZZA].includes(styleId)
  ) {
    advice.notes.push(
      `DICA: Para fornos domésticos, uma chapa de aço ("baking steel") é a melhor superfície para uma base mais crocante, pois transfere calor mais rápido que a pedra.`
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
        advice.notes.push("AVPN: Forno a 485°C, 60-90s, sem gordura/açúcar na massa.");
    } else if (ovenType === 'gas_home' || ovenType === 'electric_home') {
        advice.recommendedBakeTempC = 290; // Max safe temp for home ovens
        advice.recommendedBakeTimeSeconds = [360, 480]; // 6-8 min
        advice.recommendedSurfaceOverride = 'steel';
        advice.flags?.push('HOME_OVEN_COMPROMISE');
        advice.warnings.push("ALERTA: É um desafio replicar a pizza napolitana em forno doméstico. Este é um perfil adaptado.");
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
      advice.notes.push("Ambiente quente acelera a fermentação; considere diminuir o tempo de bulk ou reduzir a quantidade de fermento.");
  } else if (ambientTemperatureC <= 18) { // COLD_AMBIENT_MAX
      advice.notes.push("Ambiente frio retarda a fermentação; considere aumentar o tempo de bulk para atingir o volume desejado.");
  }

  return advice;
}
