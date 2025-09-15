import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

// Fix: Adhering to the coding guidelines, the API key is sourced exclusively from
// `process.env.API_KEY`. The hardcoded key and related checks that caused
// the TypeScript error have been removed. It is assumed the environment
// variable is correctly configured.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export async function* runChatStream(history: ChatMessage[]): AsyncGenerator<string, void, unknown> {
  // Transform the client's message history to the format required by the Google GenAI SDK
  const contents = history.map(({ role, text }) => ({
    role,
    parts: [{ text }],
  }));

  try {
    const response = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: contents,
        config: {
            systemInstruction: "You are a helpful AI assistant for a web developer. You help them build backend logic for the app they are building in a tool called Smart Canvas. Keep your responses concise and helpful, and use markdown for code snippets.",
        },
    });

    for await (const chunk of response) {
      yield chunk.text;
    }
  } catch (error) {
    console.error("Gemini API stream error:", error);
    yield "An error occurred while communicating with the AI. Please check the console for details.";
  }
}
