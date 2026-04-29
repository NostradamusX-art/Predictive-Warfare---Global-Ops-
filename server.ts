import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// API Route for Intel Reports
app.get("/api/intel", async (req, res) => {
  const lang = req.query.lang || 'en';
  
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
  }

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
      model: "gemini-1.5-flash", // Using a more stable model name
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
      console.error("JSON Parse error on server:", e, "Raw text:", text);
      // Fallback: try regex to find the array if parsing failed
      const arrayMatch = text.match(/\[\s*{.*}\s*\]/s);
      if (arrayMatch) {
        res.json(JSON.parse(arrayMatch[0]));
      } else {
        res.json([]);
      }
    }
  } catch (error) {
    console.error("Server API Error:", error);
    res.status(500).json({ error: "Failed to generate intel reports" });
  }
});

// Vite middleware for development
if (process.env.NODE_ENV !== "production") {
  const { createServer: createViteServer } = await import("vite");
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
