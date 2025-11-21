import { GoogleGenAI, Content } from "@google/genai";
import { DoughConfig, DoughResult, Batch, FlourDefinition, Oven, ChatMessage, Levain } from '../types';
import { getSystemInstruction, buildContextPrompt } from './prompts';

// Initialize strictly with env var as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// CONFIGURATION
// Sliding Window: Limit context to the last N turns to save tokens and maintain focus.
// A smaller window improves Time to First Token (TTFT) and reduces cost.
const HISTORY_WINDOW_SIZE = 10; 
// Model Selection: Flash is optimized for speed and cost-efficiency in chat tasks.
const CHAT_MODEL_ID = 'gemini-2.5-flash';

interface AssistantInput {
  question: string;
  history: ChatMessage[]; // Receive UI history
  doughConfig?: DoughConfig;
  doughResult?: DoughResult | null;
  lastBatch?: Batch;
  flour?: FlourDefinition;
  oven?: Oven;
  t: (key: string, replacements?: { [key: string]: string | number | undefined }) => string;
}

/**
 * Converts internal ChatMessage format to Gemini SDK Content format.
 * Implements a sliding window to keep context relevant and cheap.
 */
function formatHistory(history: ChatMessage[]): Content[] {
  // 1. Filter out error messages or internal system notes not meant for the model context
  const cleanHistory = history.filter(msg => msg.role === 'user' || msg.role === 'assistant');

  // 2. Apply Sliding Window
  // We slice from the end to keep the most recent interactions.
  const recentHistory = cleanHistory.slice(-HISTORY_WINDOW_SIZE);
  
  // 3. Map to Gemini Content format
  return recentHistory.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }],
  }));
}

/**
 * Streams a response from the Assistant using Gemini 2.5 Flash.
 */
export async function* createAssistantStream(input: AssistantInput) {
  const { question, history, doughConfig, flour, oven, lastBatch, t } = input;

  // 1. Build the specialized prompt incorporating the current app state.
  // This creates a RAG-like experience by injecting "Active State" into the latest turn.
  const contextualizedPrompt = buildContextPrompt(t, question, doughConfig, flour, oven, lastBatch);

  try {
    // 2. Initialize Chat with History
    const chat = ai.chats.create({
      model: CHAT_MODEL_ID,
      config: {
        systemInstruction: getSystemInstruction(),
        temperature: 0.7, // Balanced creativity
        maxOutputTokens: 1000, // Prevent excessively long responses
      },
      history: formatHistory(history),
    });

    // 3. Send Message with Streaming
    const result = await chat.sendMessageStream({ 
      message: contextualizedPrompt 
    });

    // 4. Yield chunks as they arrive for immediate UI feedback
    for await (const chunk of result) {
      const text = chunk.text;
      if (text) {
        yield text;
      }
    }

  } catch (error) {
    console.error('[DoughLab AI] Error in stream:', error);
    // Throw a user-friendly error that the UI can catch and display
    throw new Error("Connection unstable. Please try again.");
  }
}

// --- LEVAIN ASSISTANT (Legacy wrapper switched to Flash) ---

export async function askLevainAssistant(levain: Levain, question: string): Promise<string> {
    const systemInstruction = `You are an expert sourdough assistant. 
    Context: Levain "${levain.name}", Hydration ${levain.hydration}%, Status ${levain.status}, Last fed ${new Date(levain.lastFeeding).toLocaleDateString()}.
    Answer strictly about sourdough maintenance. Keep it short.`;

    try {
        // Using generateContent for single-turn interaction (no history needed here)
        const response = await ai.models.generateContent({
            model: CHAT_MODEL_ID, // Consistent model usage
            contents: question,
            config: {
                systemInstruction,
            }
        });
        return response.text || "No response.";
    } catch (error) {
        console.error('[Levain AI] Error:', error);
        throw new Error("Levain assistant unavailable.");
    }
}