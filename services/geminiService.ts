import { GoogleGenAI } from "@google/genai";
import { CARD_REGISTRY } from "../cardRegistry";

const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateMarkdownContent = async (prompt: string): Promise<string> => {
  if (!ai) {
    throw new Error("API Key not found in environment variables.");
  }

  const model = "gemini-3-flash-preview";

  // Dynamically build the list of available cards for the AI
  const cardInstructions = CARD_REGISTRY.map(card => 
    `- "${card.usage}" to ${card.description} (e.g., "${card.templateStr.trim()}").`
  ).join('\n        ');
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: `You are a helpful assistant for a Markdown editor. 
        You specialize in generating market reports. 
        You can use custom markdown tags:
        ${cardInstructions}
        Always format the output in clean Markdown.`,
      }
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
