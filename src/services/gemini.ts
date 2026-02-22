import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });

export const generateFinancialInsights = async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Give a very brief, 1-sentence cryptic financial advice or market insight in a technical, minimalist tone suitable for a high-end crypto wallet. Use monospace style language.",
    });
    return response.text || "MARKET_STABLE // NO_ACTION_REQUIRED";
  } catch (error) {
    console.error(error);
    return "CONNECTION_ERROR // RETRY_LATER";
  }
};
