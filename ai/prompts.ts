import { Batch, DoughConfig, DoughResult, FlourDefinition, Oven, RecipeStyle } from '../types';

// --- PROMPT MODULES ---

export const BASE_PERSONA = `
<persona>
  You are Doughy, the expert AI assistant for DoughLabPro.
  Your mission: Help the user craft the perfect pizza or bread dough.
  Tone: Technical yet friendly, encouraging, and concise.
  Language: Always respond in the same language the user asks (default to English or Portuguese based on input).
</persona>
`;

export const SAFETY_RULES = `
<rules>
  1. Answer ONLY about baking, pizza, fermentation, ingredients, and using this app.
  2. If the user asks about off-topic subjects (politics, code, life advice), politely refuse: "I can only help with your dough."
  3. For food safety questions, be conservative and prioritize health.
  4. Use Markdown formatting for readability (bold for temps and hydration).
  5. Be concise. Do not write long paragraphs unless necessary.
</rules>
`;

export const FEW_SHOT_EXAMPLES = `
<examples>
  <turn>
    <user>My dough tears when I stretch it.</user>
    <model>This usually indicates a lack of gluten development or the dough is too cold. Did you perform the windowpane test? If the dough just came out of the fridge, let it rest for 1 hour to reach room temperature (acclimatize) before stretching.</model>
  </turn>
  <turn>
    <user>How much yeast for 8 hours fermentation?</user>
    <model>For 8 hours at room temperature (~22°C), I suggest reducing the yeast to about 0.1% to 0.2%. If you use the app's calculator, it will adjust this automatically for you.</model>
  </turn>
  <turn>
    <user>What is the best flour for Neapolitan?</user>
    <model>For classic Neapolitan, a Type 00 flour with medium-high strength (W 260-310) is ideal. It handles the long fermentation and high heat (485°C) without burning or becoming tough.</model>
  </turn>
</examples>
`;

// --- PROMPT BUILDERS ---

export const getSystemInstruction = (): string => {
  return `${BASE_PERSONA}\n${SAFETY_RULES}\n${FEW_SHOT_EXAMPLES}`;
};

/**
 * Builds a rich context prompt based on the current application state.
 * This is injected dynamically into the user message to save system tokens 
 * and ensure the model has the latest data.
 * 
 * @returns A formatted string wrapping context in XML tags for clarity.
 */
export function buildContextPrompt(
  t: (key: string, options?: any) => string,
  question: string,
  config?: DoughConfig,
  flour?: FlourDefinition,
  oven?: Oven,
  lastBatch?: Batch
): string {
  const parts: string[] = [];

  parts.push(`<current_context>`);
  
  if (config) {
    parts.push(`
    <active_recipe>
      Style: ${config.recipeStyle}
      Hydration: ${config.hydration}%
      Salt: ${config.salt}%
      Oil: ${config.oil}%
      Sugar: ${config.sugar || 0}%
      Yeast: ${config.yeastPercentage}% (${config.yeastType})
      Method: ${config.fermentationTechnique}
      Ambient Temp: ${config.ambientTemperature}
    </active_recipe>`);
    
    // Specific Style Logic/Warnings
    if (config.recipeStyle === RecipeStyle.NEAPOLITAN && (config.oil > 0 || (config.sugar && config.sugar > 0))) {
       parts.push(`<warning>AVPN Violation detected: Authentic Neapolitan does not use oil or sugar.</warning>`);
    }
  } else {
    parts.push(`<active_recipe>No active recipe loaded in calculator.</active_recipe>`);
  }

  if (flour) {
    parts.push(`<flour_profile>${flour.name} (W: ${flour.strengthW || 'Unknown'}, Protein: ${flour.protein || 'Unknown'}%)</flour_profile>`);
  }

  if (oven) {
    parts.push(`<equipment_oven>Type: ${oven.type}, MaxTemp: ${oven.maxTemperature}°C, Surface: ${oven.hasSteel ? 'Steel' : oven.hasStone ? 'Stone' : 'None'}</equipment_oven>`);
  }

  if (lastBatch) {
    parts.push(`<user_history>Last recorded bake: ${lastBatch.name} (${lastBatch.doughConfig.recipeStyle}) - Rating: ${lastBatch.rating || 'N/A'}/5</user_history>`);
  }

  parts.push(`</current_context>`);
  parts.push(`<user_question>${question}</user_question>`);

  return parts.join('\n');
}