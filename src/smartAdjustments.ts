
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

export const getSmartAdjustments = (
  config: DoughConfig,
  options: AdjustmentOptions,
): SmartAdjustmentResult => {
  const result = createDefaultResult();
  const { oven, flour, userLevain } = options;

  const tempMapping = {
    [AmbientTemperature.COLD]: 16,
    [AmbientTemperature.MILD]: 22,
    [AmbientTemperature.HOT]: 28,
  };
  const roomTemp = tempMapping[config.ambientTemperature];
  const flourTemp = roomTemp; 
  const desiredDoughTemp = 25;
  const waterTemp = ((desiredDoughTemp - 1) * 3) - roomTemp - flourTemp;
  result.messages.push(
    `To reach the ideal dough temperature (DDT 24–26°C), use water at approximately ${waterTemp.toFixed(0)}°C.`
  );


  if (config.recipeStyle === RecipeStyle.NEAPOLITAN && (config.oil > 0 || (config.sugar && config.sugar > 0))) {
    result.riskWarnings.push(
      'Authenticity Warning: The original Neapolitan Pizza (AVPN) recipe does not allow fat (oil) or sugar in the dough.'
    );
    if (config.oil > 0) {
        result.suggestions.push({ key: 'oil', value: 0, message: 'Suggestion: Remove oil to follow the traditional recipe.' });
    }
     if (config.sugar && config.sugar > 0) {
        result.suggestions.push({ key: 'sugar', value: 0, message: 'Suggestion: Remove sugar.' });
    }
  }
  
  if (config.yeastType === YeastType.USER_LEVAIN && userLevain) {
    const hours = hoursBetween(new Date().toISOString(), userLevain.lastFeeding);
    if (hours > 24) {
      result.riskWarnings.push(`Your levain was fed over 24 hours ago. It might be weak, resulting in slower fermentation. Consider feeding it before use.`);
    } else if (hours < 4) {
      result.messages.push(`Your levain is young (fed ${hours.toFixed(0)}h ago). Fermentation might be slightly slower, but this can develop more complex flavors.`);
    } else if (hours <= 12) {
       result.messages.push(`Your levain is at peak activity. Great time to start your dough!`);
    }
  }


  if (
    oven &&
    (oven.type === 'GAS' || oven.type === 'ELECTRIC') &&
    oven.maxTemperature <= 300 &&
    config.recipeStyle === RecipeStyle.NEAPOLITAN
  ) {
    result.messages.push(
      'Home ovens (~250°C) bake pizza slower. To compensate, consider using a style like "New York", which benefits from oil and sugar for better color and texture at lower temperatures.'
    );
    if (config.oil === 0) {
      result.suggestions.push({
        key: 'oil',
        value: 2,
        message: 'Adaptation tip: Add 2% olive oil for a softer crust in a home oven.',
      });
    }
  }

  if (flour && config.hydration > (flour.hydrationHint?.max ?? 100)) {
     result.riskWarnings.push(
      `Warning: Hydration of ${config.hydration}% is very high for flour "${flour.name}", which has a recommended limit of ${flour.hydrationHint?.max}%. The dough may become very sticky and hard to handle.`
     );
     if(flour.hydrationHint?.max) {
        result.suggestions.push({
            key: 'hydration',
            value: flour.hydrationHint.max,
            message: `Suggestion: Reduce hydration to the recommended maximum of ${flour.hydrationHint.max}%.`
        });
     }
  } else if (flour && flour.strengthW && flour.strengthW < 240 && config.hydration > 65) {
      result.riskWarnings.push(
          `Warning: Flours with W ~${flour.strengthW} (weak) might not develop a strong enough gluten network for hydration above 65%.`
      );
  }


  const tempGuidelines = ENVIRONMENT_TEMPERATURE_GUIDELINES[config.ambientTemperature];
  if (tempGuidelines && tempGuidelines.yeastAdjustment !== 1.0) {
      result.messages.push(tempGuidelines.notes);
      if (config.yeastType !== YeastType.SOURDOUGH_STARTER && config.yeastType !== YeastType.USER_LEVAIN) {
          const suggestedYeast = parseFloat((config.yeastPercentage * tempGuidelines.yeastAdjustment).toFixed(2));
          const changePct = Math.round((tempGuidelines.yeastAdjustment - 1) * 100);
          result.suggestions.push({
              key: 'yeastPercentage',
              value: suggestedYeast,
              message: `Suggestion: Adjust yeast by ~${changePct}% (to ${suggestedYeast}%) to compensate for temperature.`
          });
      }
  }
  
  if(oven && config.bakeType === BakeType.PIZZAS) {
      if(oven.maxTemperature <= 300 && !oven.hasSteel) {
          result.messages.push("For home ovens (up to 300°C), a 'baking steel' is superior to a stone as it transfers heat faster, resulting in a crispier base.");
      }
      if(oven.maxTemperature > 400 && oven.hasSteel) {
           result.messages.push("In extremely hot ovens (>400°C), a baking steel can burn the pizza base very quickly. A baking stone or 'biscotto' (clay stone) is recommended.");
      }
  }

  return result;
};
