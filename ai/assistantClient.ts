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
  return `Você é um assistente de panificação especializado em fermento natural (levain).
- Seu papel é responder a perguntas estritamente relacionadas ao levain: alimentação, ajustes de rotina, uso em receitas e interpretação de sinais (cheiro, acidez, força).
- Use o contexto fornecido sobre o levain específico do usuário para dar conselhos práticos e personalizados.
- Seja conciso e direto.
- **Regra Estrita**: Se o usuário perguntar sobre saúde humana, nutrição clínica ou segurança alimentar avançada, você DEVE responder APENAS com: "Posso te ajudar apenas com ajustes técnicos do levain e da massa. Para questões de saúde ou alimentação específica, procure um profissional especializado."
- Responda em português do Brasil.`;
}

function buildLevainContext(
  levain: Levain,
  question: string,
): string {
  const contextParts: string[] = [];

  contextParts.push(`**Contexto do Levain do Usuário:**`);
  contextParts.push(`- **Nome:** ${levain.name}`);
  contextParts.push(`- **Status Atual:** ${levain.status}`);
  contextParts.push(`- **Hidratação:** ${levain.hydration}%`);
  contextParts.push(`- **Farinha Base:** ${levain.baseFlourType || 'Não especificada'}`);
  contextParts.push(`- **Uso Típico:** ${levain.typicalUse || 'Não especificado'}`);
  contextParts.push(`- **Última Alimentação:** ${new Date(levain.lastFeeding).toLocaleString('pt-BR')}`);
  
  if (levain.feedingHistory && levain.feedingHistory.length > 0) {
      contextParts.push(`- **Últimos ${Math.min(5, levain.feedingHistory.length)} Registros de Alimentação (mais recente primeiro):**`);
      levain.feedingHistory.slice(0, 5).forEach(log => {
          contextParts.push(`  - **Data:** ${new Date(log.date).toLocaleString('pt-BR')}`);
          contextParts.push(`    - **Proporção:** ${log.ratio || 'N/A'}`);
          contextParts.push(`    - **Temperatura:** ${log.ambientTemperature ? log.ambientTemperature + '°C' : 'N/A'}`);
          if(log.notes) contextParts.push(`    - **Notas:** ${log.notes}`);
      });
  }

  return `${contextParts.join('\n')}\n\n**Pergunta do Usuário:**\n"${question}"`;
}

export async function askLevainAssistant(levain: Levain, question: string): Promise<string> {
    const systemInstruction = buildLevainSystemPrompt();
    const userPrompt = buildLevainContext(levain, question);

    // Hardcoded check for out-of-scope questions
    const healthKeywords = ['saúde', 'nutrição', 'clínico', 'médico', 'comer', 'ingerir', 'seguro para consumo'];
    if (healthKeywords.some(keyword => question.toLowerCase().includes(keyword))) {
        return "Posso te ajudar apenas com ajustes técnicos do levain e da massa. Para questões de saúde ou alimentação específica, procure um profissional especializado.";
    }

    try {
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
        throw new Error("Desculpe, não consegui processar sua pergunta agora. Tente novamente.");
    }
}
