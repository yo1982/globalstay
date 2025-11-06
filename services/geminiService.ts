
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development. In a real environment, the key should be set.
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateLocalGuide = async (hotelName: string, city: string): Promise<string> => {
  const prompt = `You are a friendly and knowledgeable travel guide. Create a concise and exciting local guide for a tourist staying at the "${hotelName}" in ${city}. The guide should be in markdown format. Include the following sections: 
- A brief, welcoming intro to the city.
- **Top 3 Nearby Attractions**: List three must-see attractions close to the hotel, with a one-sentence description for each.
- **Hidden Gem**: Suggest one lesser-known local spot (like a small cafe, a park, a unique shop, or a viewpoint).
- **Local Cuisine to Try**: Recommend two specific local dishes or drinks and suggest a type of place to find them (e.g., 'a traditional trattoria', 'a bustling food market').
Keep the tone enthusiastic and helpful.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating local guide with Gemini:", error);
    return "We're sorry, but we couldn't generate a local guide at this time. Please check your API key and network connection.";
  }
};
