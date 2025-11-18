
import {
  DoughConfig,
  Oven,
  FlourDefinition,
  SmartAdjustmentResult,
  RecipeStyle,
  AmbientTemperature,
  YeastType,
  Levain,
  BakeType,
} from './types';
import { ENVIRONMENT_TEMPERATURE_GUIDELINES } from './constants';
import { hoursBetween } from './helpers';

// Default result structure
const createDefaultResult = (): SmartAdjustmentResult => ({
  messages: [],
  riskWarnings: [],
  suggestions: [],
});

interface AdjustmentOptions {
  oven?: Oven;
  flour?: FlourDefinition;
  userLevain?: Levain | null;
}

/**
 * Analyzes the dough configuration along with environmental factors (oven, flour, temp)
 * and returns a set of suggestions, warnings, and potential adjustments.
 */
export const getSmartAdjustments = (
  config: DoughConfig,
  options: AdjustmentOptions,
): SmartAdjustmentResult => {
  const result = createDefaultResult();
  const { oven, flour, userLevain } = options;

  // --- New DDT Calculation ---
  const tempMapping = {
    [AmbientTemperature.COLD]: 16,
    [AmbientTemperature.MILD]: 22,
    [AmbientTemperature.HOT]: 28,
  };
  const roomTemp = tempMapping[config.ambientTemperature];
  const flourTemp = roomTemp; // Assume flour temp is same as room temp for now
  const desiredDoughTemp = 25;
  // Formula: ((DDT - 1) * 3) - roomTemp - flourTemp
  const waterTemp = ((desiredDoughTemp - 1) * 3) - roomTemp - flourTemp;
  result.messages.push(
    `Para atingir a temperatura ideal da massa (DDT 24–26°C), use água a aproximadamente ${waterTemp.toFixed(0)}°C.`
  );


  // --- Rule 1: Neapolitan AVPN Compliance ---
  if (config.recipeStyle === RecipeStyle.NEAPOLITAN && (config.oil > 0 || (config.sugar && config.sugar > 0))) {
    result.riskWarnings.push(
      'Aviso de Autenticidade: A receita original da Pizza Napolitana (AVPN) não permite a adição de gordura (óleo) ou açúcar na massa.'
    );
    if (config.oil > 0) {
        result.suggestions.push({ key: 'oil', value: 0, message: 'Sugestão: Remover o óleo para seguir a receita tradicional.' });
    }
     if (config.sugar && config.sugar > 0) {
        result.suggestions.push({ key: 'sugar', value: 0, message: 'Sugestão: Remover o açúcar.' });
    }
  }
  
  // --- Levain Strength ---
  if (config.yeastType === YeastType.USER_LEVAIN && userLevain) {
    const hours = hoursBetween(new Date().toISOString(), userLevain.lastFeeding);
    if (hours > 24) {
      result.riskWarnings.push(`Seu levain foi alimentado há mais de 24 horas. Ele pode estar fraco, resultando em uma fermentação mais lenta. Considere alimentá-lo antes de usar.`);
    } else if (hours < 4) {
      result.messages.push(`Seu levain está jovem (alimentado há ${hours.toFixed(0)}h). A fermentação pode ser um pouco mais lenta, mas isso pode desenvolver sabores mais complexos.`);
    } else if (hours <= 12) {
       result.messages.push(`Seu levain está no pico de atividade. Ótimo para começar sua massa agora!`);
    }
  }


  // --- Rule 2: Weak Domestic Oven + Neapolitan Pizza ---
  if (
    oven &&
    (oven.type === 'GAS' || oven.type === 'ELECTRIC') &&
    oven.maxTemperature <= 300 &&
    config.recipeStyle === RecipeStyle.NEAPOLITAN
  ) {
    result.messages.push(
      'Fornos domésticos (~250°C) cozinham a pizza mais lentamente. Para compensar, considere usar um estilo como o "New York", que se beneficia da adição de óleo e açúcar para obter melhor cor e textura em temperaturas mais baixas.'
    );
    if (config.oil === 0) {
      result.suggestions.push({
        key: 'oil',
        value: 2,
        message: 'Sugestão para adaptar: Adicionar 2% de azeite para uma crosta mais macia no forno doméstico.',
      });
    }
  }

  // --- Rule 3: Weak Flour + High Hydration ---
  if (flour && config.hydration > (flour.hydrationHint?.max ?? 100)) {
     result.riskWarnings.push(
      `Alerta: A hidratação de ${config.hydration}% é muito alta para a farinha "${flour.name}", que tem um limite recomendado de ${flour.hydrationHint?.max}%. A massa pode ficar muito pegajosa e difícil de manusear.`
     );
     if(flour.hydrationHint?.max) {
        result.suggestions.push({
            key: 'hydration',
            value: flour.hydrationHint.max,
            message: `Sugestão: Reduzir a hidratação para o máximo recomendado de ${flour.hydrationHint.max}%.`
        });
     }
  } else if (flour && flour.strengthW && flour.strengthW < 240 && config.hydration > 65) {
      result.riskWarnings.push(
          `Alerta: Farinhas com W ~${flour.strengthW} (fracas) podem não desenvolver uma rede de glúten forte o suficiente para hidratações acima de 65%.`
      );
  }


  // --- Rule 4: Ambient Temperature Adjustments ---
  const tempGuidelines = ENVIRONMENT_TEMPERATURE_GUIDELINES[config.ambientTemperature];
  if (tempGuidelines && tempGuidelines.yeastAdjustment !== 1.0) {
      result.messages.push(tempGuidelines.notes);
      if (config.yeastType !== YeastType.SOURDOUGH_STARTER && config.yeastType !== YeastType.USER_LEVAIN) {
          const suggestedYeast = parseFloat((config.yeastPercentage * tempGuidelines.yeastAdjustment).toFixed(2));
          const changePct = Math.round((tempGuidelines.yeastAdjustment - 1) * 100);
          result.suggestions.push({
              key: 'yeastPercentage',
              value: suggestedYeast,
              message: `Sugestão: Ajustar o fermento em ~${changePct}% (para ${suggestedYeast}%) para compensar a temperatura.`
          });
      }
  }
  
  // --- Rule 5: Baking Surface ---
// FIX: This comparison appears to be unintentional because the types 'BakeType' and '"PIZZA"' have no overlap. Changed to use BakeType.PIZZAS enum member.
  if(oven && config.bakeType === BakeType.PIZZAS) {
      if(oven.maxTemperature <= 300 && !oven.hasSteel) {
          result.messages.push("Para fornos domésticos (até 300°C), um 'baking steel' (chapa de aço) é superior a uma pedra, pois transfere calor mais rápido, resultando em uma base mais crocante.");
      }
      if(oven.maxTemperature > 400 && oven.hasSteel) {
           result.messages.push("Em fornos de altíssima temperatura (>400°C), um 'baking steel' pode queimar a base da pizza muito rápido. Uma pedra refratária ou um 'biscotto' (pedra de argila) são mais indicados.");
      }
  }


  return result;
};
