
import { DoughConfig, Oven, RecipeStyle } from '../types';

export interface EnvironmentAdjustments {
  hydrationSuggestion: string | null;
  yeastSuggestion: string | null;
  fermentationTimeSuggestion: string | null;
  warnings: string[];
}

export function getEnvironmentAdjustments(
  config: DoughConfig,
  oven?: Oven,
  environmentTempC?: number,
  flourStrength?: number,
): EnvironmentAdjustments {
  const adjustments: EnvironmentAdjustments = {
    hydrationSuggestion: null,
    yeastSuggestion: null,
    fermentationTimeSuggestion: null,
    warnings: [],
  };

  // 1. Temperature-based adjustments
  if (environmentTempC) {
    if (environmentTempC < 20) {
      adjustments.yeastSuggestion = 'Ambiente frio: a fermentação será mais lenta. Considere aumentar a quantidade de fermento em 20-30% para manter o tempo de processo.';
      adjustments.fermentationTimeSuggestion = 'Alternativa: Mantenha o fermento e aumente o tempo de fermentação em bulk, observando o volume da massa.';
    }
    if (environmentTempC > 28) {
      adjustments.yeastSuggestion = 'Ambiente quente: a fermentação será acelerada. Considere reduzir o fermento para evitar superfermentação e use água mais fria.';
      if (config.hydration > 68) {
        adjustments.hydrationSuggestion = 'Em dias muito quentes e úmidos, uma hidratação ligeiramente menor (1-2% a menos) pode facilitar muito o manuseio da massa.';
      }
    }
  }

  // 2. Flour strength-based adjustments
  if (flourStrength) {
    if (flourStrength >= 300) {
      if (config.hydration < 68) {
         adjustments.hydrationSuggestion = `Sua farinha é forte (W ~${flourStrength}). Ela pode suportar hidratações mais altas (68-75%), resultando em um miolo mais aerado.`;
      }
    }
    if (flourStrength <= 220) {
      if (config.hydration > 65) {
        adjustments.warnings.push(`Farinha fraca (W ~${flourStrength}) com hidratação alta (${config.hydration}%) pode resultar em uma massa pegajosa e sem estrutura. Considere reduzir a hidratação para 60-65%.`);
      }
    }
  }
  
  // 3. Oven-based adjustments
  if (oven && config.bakeType === 'PIZZA') {
    if ((oven.type === 'ELECTRIC' || oven.type === 'GAS') && oven.maxTemperature <= 280) {
      if (config.recipeStyle === RecipeStyle.NEAPOLITAN && config.oil === 0) {
        adjustments.warnings.push('Forno doméstico para Napolitana: adicionar 1-2% de óleo/azeite pode ajudar a evitar o ressecamento da massa durante o tempo de cozimento mais longo.');
      }
    }
    if (oven.maxTemperature >= 450) {
      if (config.hydration > 67) {
        adjustments.warnings.push(`Forno de altíssima temperatura (${oven.maxTemperature}°C): hidratações acima de 67% podem fazer com que a base da pizza queime antes que o topo cozinhe. A faixa de 62-65% é mais segura.`);
      }
    }
  }

  return adjustments;
}
