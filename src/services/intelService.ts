import { GoogleGenAI, Type } from "@google/genai";
import { Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface IntelReport {
  title: string;
  summary: string;
  region: string;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  lat: number;
  lng: number;
}

export const fetchRealTimeIntel = async (lang: Language): Promise<IntelReport[]> => {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY is missing. Intel feed will be disabled.");
    return [];
  }

  try {
    console.log("Fetching real-time intel using gemini-3-flash-preview...");
    const prompt = `
      You are a high-level Geospatial Intelligence Analyst (GEOINT) and Open Source Intelligence (OSINT) specialist. 
      Generate 5 highly detailed and realistic intelligence reports on current (2024-2025) global geopolitical, military, or cyber events.
      
      Focus on:
      1. Troop movements or military exercises near sensitive borders.
      2. Significant cyberattacks on critical infrastructure.
      3. Breakthrough diplomatic negotiations or sudden breakdowns in treaties.
      4. Maritime incidents in disputed waters (e.g., South China Sea, Red Sea).
      5. Emergence of new insurgent or paramilitary activity.

      Each report must feel technical and urgent, like a sitrep (situation report).
      Identify a specific source (e.g., "Maxar Satellite Imagery", "OSINT-X Deep Web Monitoring", "AP Ground Correspondents", "Signal Intercept Alpha-9").
      
      Respond in ${lang === 'pt' ? 'Portuguese (Brazil)' : 'English'}.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              region: { type: Type.STRING },
              threatLevel: { 
                type: Type.STRING,
                enum: ['low', 'medium', 'high', 'critical']
              },
              source: { type: Type.STRING },
              lat: { type: Type.NUMBER },
              lng: { type: Type.NUMBER }
            },
            required: ['title', 'summary', 'region', 'threatLevel', 'source', 'lat', 'lng']
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];

    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError, "Text was:", text);
      const jsonMatch = text.match(/\[.*\]/s);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw parseError;
    }
  } catch (error) {
    console.error("Failed to fetch real-time intel:", error);
    throw error;
  }
};
