import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(req: any, res: any) {
  const lang = req.query.lang || 'en';
  
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
  }

  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  try {
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
      
      Respond only with the JSON data.
      Respond in ${lang === 'pt' ? 'Portuguese (Brazil)' : 'English'}.
    `;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
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

    const response = await result.response;
    const text = response.text();
    
    // Attempt to extract JSON if there's markdown or extra text
    let jsonStr = text.trim();
    if (jsonStr.startsWith("```json")) {
      jsonStr = jsonStr.replace(/^```json/, "").replace(/```$/, "").trim();
    } else if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.replace(/^```/, "").replace(/```$/, "").trim();
    }

    try {
      const parsedData = JSON.parse(jsonStr);
      res.json(Array.isArray(parsedData) ? parsedData : []);
    } catch (e) {
      console.error("JSON Parse error on serverless function:", e, "Raw text:", text);
      const arrayMatch = text.match(/\[\s*{.*}\s*\]/s);
      if (arrayMatch) {
        res.json(JSON.parse(arrayMatch[0]));
      } else {
        res.json([]);
      }
    }
  } catch (error) {
    console.error("Serverless API Error:", error);
    res.status(500).json({ error: "Failed to generate intel reports" });
  }
}
