
import { GoogleGenAI } from "@google/genai";
import { DoughConfig, DoughResult, Batch, FlourDefinition, Oven, RecipeStyle, Levain, FeedingEvent } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// This function builds a detailed system prompt for the AI model.
function buildGeneralSystemPrompt(t: (key: string) => string): string {
  return t('assistant.system_prompt');
}


/**
 * Builds a rich, contextual prompt for the AI model based on the user's current state in the app.
 * @param question The user's question.
 * @param config The current dough configuration from the calculator.
 * @param flour The selected flour definition.
 * @param oven The user's default oven profile.
 * @param lastBatch The user's most recent batch for historical context.
 * @returns A formatted string containing both context and the user's question.
 */
function buildRichContext(
  t: (key: string, replacements?: { [key: string]: string | number | undefined }) => string,
  question: string,
  config?: DoughConfig,
  flour?: FlourDefinition,
  oven?: Oven,
  lastBatch?: Batch,
): string {
  const contextParts: string[] = [];

  if (config) {
    contextParts.push(`- **${t('assistant.context.active_recipe')}**:`);
    contextParts.push(`  - ${t('assistant.context.style')}: ${config.recipeStyle}`);
    contextParts.push(`  - ${t('assistant.context.hydration')}: ${config.hydration}%`);
    contextParts.push(`  - ${t('assistant.context.salt')}: ${config.salt}%`);
    contextParts.push(`  - ${t('assistant.context.oil')}: ${config.oil}%`);
    contextParts.push(`  - ${t('assistant.context.yeast')}: ${config.yeastPercentage}% (${config.yeastType})`);
    contextParts.push(`  - ${t('assistant.context.technique')}: ${config.fermentationTechnique}`);
    contextParts.push(`  - ${t('assistant.context.ambient')}: ${config.ambientTemperature}`);

    // AVPN/NY Violation checks
    if (config.recipeStyle === RecipeStyle.NEAPOLITAN && (config.oil > 0 || (config.sugar && config.sugar > 0))) {
      contextParts.push(`  - **${t('assistant.context.style_warning.title')}**: ${t('assistant.context.style_warning.neapolitan')}`);
    }
    if (config.recipeStyle === RecipeStyle.NEW_YORK && config.oil === 0) {
      contextParts.push(`  - **${t('assistant.context.style_warning.title')}**: ${t('assistant.context.style_warning.ny_style')}`);
    }
  }

  if (flour) {
    contextParts.push(`- **${t('assistant.context.selected_flour')}**: ${flour.name} (${t('assistant.context.strength_w')}: ${flour.strengthW || t('common.not_applicable')}, ${t('assistant.context.protein')}: ${flour.protein || t('common.not_applicable')}%)`);
  }

  if (oven) {
    contextParts.push(`- **${t('assistant.context.default_oven')}**: ${t(`profile.ovens.types.${oven.type.toLowerCase()}`)}, ${t('assistant.context.max_temp')}: ${oven.maxTemperature}°C. ${t('assistant.context.surface')}: ${oven.hasSteel ? t('assistant.context.steel') : (oven.hasStone ? t('assistant.context.stone') : t('assistant.context.none'))}.`);
  }

  if (lastBatch) {
    contextParts.push(`- **${t('assistant.context.last_batch')}**: "${lastBatch.name}" (${t('assistant.context.style')}: ${lastBatch.doughConfig.recipeStyle}, ${t('assistant.context.rating')}: ${lastBatch.rating || t('common.not_applicable')} ${t('assistant.context.stars')})`);
  }
  
  const contextString = contextParts.length > 0
    ? `${t('assistant.context.header')}:\n${contextParts.join('\n')}`
    : t('assistant.context.no_context');

  return `${contextString}\n\n${t('assistant.context.user_question')}:\n"${question}"`;
}


interface AssistantInput {
  question: string;
  doughConfig?: DoughConfig;
  doughResult?: DoughResult | null;
  lastBatch?: Batch;
  flour?: FlourDefinition;
  oven?: Oven;
  t: (key: string, replacements?: { [key: string]: string | number | undefined }) => string;
}

export async function askGeneralAssistant(input: AssistantInput): Promise<string> {
  const { question, doughConfig, flour, oven, lastBatch, t } = input;
  
  const systemInstruction = buildGeneralSystemPrompt(t);
  const userPrompt = buildRichContext(t, question, doughConfig, flour, oven, lastBatch);

  try {
    // FIX: Updated model from gemini-1.5-pro to gemini-2.5-pro
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: userPrompt,
      config: {
        systemInstruction,
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from AI model");
    }
    return text;
  } catch (error) {
    console.error('[DoughLab Assistant] Error calling AI model:', error);
    throw new Error(t('assistant_page.error'));
  }
}

// --- LEVAIN PET ASSISTANT ---

function buildLevainSystemPrompt(): string {
  return `You are a baking assistant specialized in sourdough starter (levain).
- Your role is to answer questions strictly related to levain: feeding, routine adjustments, use in recipes, and interpreting signs (smell, acidity, strength).
- Use the provided context about the user's specific levain to give practical and personalized advice.
- Be concise and direct.
- **Strict Rule**: If the user asks about human health, clinical nutrition, or advanced food safety, you MUST reply ONLY with: "I can only help with technical adjustments for levain and dough. For health or specific dietary questions, please consult a specialized professional."
- Respond in English.`;
}

function buildLevainContext(
  levain: Levain,
  question: string,
): string {
  const contextParts: string[] = [];

  contextParts.push(`**User Levain Context:**`);
  contextParts.push(`- **Name:** ${levain.name}`);
  contextParts.push(`- **Current Status:** ${levain.status}`);
  contextParts.push(`- **Hydration:** ${levain.hydration}%`);
  contextParts.push(`- **Base Flour:** ${levain.baseFlourType || 'Not specified'}`);
  contextParts.push(`- **Typical Use:** ${levain.typicalUse || 'Not specified'}`);
  contextParts.push(`- **Last Feeding:** ${new Date(levain.lastFeeding).toLocaleString()}`);
  
  if (levain.feedingHistory && levain.feedingHistory.length > 0) {
      contextParts.push(`- **Last ${Math.min(5, levain.feedingHistory.length)} Feeding Logs (newest first):**`);
      levain.feedingHistory.slice(0, 5).forEach(log => {
          contextParts.push(`  - **Date:** ${new Date(log.date).toLocaleString()}`);
          contextParts.push(`    - **Ratio:** ${log.ratio || 'N/A'}`);
          contextParts.push(`    - **Temperature:** ${log.ambientTemperature ? log.ambientTemperature + '°C' : 'N/A'}`);
          if(log.notes) contextParts.push(`    - **Notes:** ${log.notes}`);
      });
  }

  return `${contextParts.join('\n')}\n\n**User Question:**\n"${question}"`;
}

export async function askLevainAssistant(levain: Levain, question: string): Promise<string> {
    const systemInstruction = buildLevainSystemPrompt();
    const userPrompt = buildLevainContext(levain, question);

    // Hardcoded check for out-of-scope questions (English keywords)
    const healthKeywords = ['health', 'nutrition', 'clinical', 'medical', 'eat', 'ingest', 'safe to eat', 'safe for consumption'];
    if (healthKeywords.some(keyword => question.toLowerCase().includes(keyword))) {
        return "I can only help with technical adjustments for levain and dough. For health or specific dietary questions, please consult a specialized professional.";
    }

    try {
        // FIX: Updated model from gemini-1.5-pro to gemini-2.5-pro
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: userPrompt,
            config: {
                systemInstruction,
            }
        });
        const text = response.text;
        if (!text) {
            throw new Error("Empty response from AI model");
        }
        return text;
    } catch (error) {
        console.error('[Levain Assistant] Error calling AI model:', error);
        throw new Error("Sorry, I couldn't process your question right now. Please try again.");
    }
}
