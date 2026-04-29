import { GoogleGenAI, Type } from "@google/genai";
import { Choice, Language, ScenarioStep, Scenario } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateNextWargameStep = async (
  scenario: Scenario,
  history: { description: string; choice: string }[],
  currentStepIndex: number,
  lang: Language
): Promise<ScenarioStep> => {
  const prompt = `
    You are an advanced Geopolitical War Game AI.
    Scenario: ${scenario.title[lang]} - ${scenario.description[lang]}
    Current Progress: Step ${currentStepIndex + 1} of ${scenario.maxSteps}
    
    History of events so far:
    ${history.map((h, i) => `Step ${i + 1}: ${h.description} -> Choice: ${h.choice}`).join('\n')}
    
    Generate the NEXT logical step in this simulation. 
    It must be a multiple choice question with 3 options.
    Difficulty should increase as we approach step ${scenario.maxSteps}.
    
    Respond in ${lang === 'pt' ? 'Portuguese (Brazil)' : 'English'}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: {
              type: Type.OBJECT,
              properties: {
                pt: { type: Type.STRING },
                en: { type: Type.STRING }
              },
              required: ['pt', 'en']
            },
            choices: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: {
                    type: Type.OBJECT,
                    properties: {
                      pt: { type: Type.STRING },
                      en: { type: Type.STRING }
                    },
                    required: ['pt', 'en']
                  },
                  consequence: {
                    type: Type.OBJECT,
                    properties: {
                      pt: { type: Type.STRING },
                      en: { type: Type.STRING }
                    },
                    required: ['pt', 'en']
                  },
                  impact: {
                    type: Type.OBJECT,
                    properties: {
                      stability: { type: Type.NUMBER },
                      economy: { type: Type.NUMBER },
                      military: { type: Type.NUMBER },
                      diplomacy: { type: Type.NUMBER }
                    },
                    required: ['stability', 'economy', 'military', 'diplomacy']
                  }
                },
                required: ['label', 'consequence', 'impact']
              }
            }
          },
          required: ['description', 'choices']
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty AI response");

    const data = JSON.parse(text);
    
    return {
      id: `step-${currentStepIndex + 1}`,
      description: data.description,
      choices: data.choices.map((c: any) => ({
        ...c,
        nextStepId: `step-${currentStepIndex + 2}`
      }))
    };
  } catch (error) {
    console.error("AI Generation Error:", error);
    return {
      id: 'fallback',
      description: { pt: 'Ocorreu um erro na rede neural. Como deseja proceder?', en: 'A neural network error occurred. How do you wish to proceed?' },
      choices: [
        { 
          label: { pt: 'Tentar reconectar', en: 'Try reconnecting' }, 
          consequence: { pt: 'Sistema restaurado.', en: 'System restored.' }, 
          nextStepId: 'retry', 
          impact: { stability: 0, economy: 0, military: 0, diplomacy: 0 } 
        }
      ]
    };
  }
};

export async function generateScenarioDraft(prompt: string, lang: Language): Promise<Partial<Scenario>> {
  try {
    const aiPrompt = `
      You are a strategic wargame designer. Based on this idea: "${prompt}", create a detailed scenario skeleton.
      Respond in ${lang === 'pt' ? 'Portuguese (Brazil)' : 'English'}.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: aiPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            category: { 
              type: Type.STRING,
              enum: ['cyber', 'kinetic', 'diplomatic', 'economic']
            },
            difficulty: { type: Type.INTEGER }
          },
          required: ['title', 'description', 'category', 'difficulty']
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty AI response");
    const data = JSON.parse(text);
    
    return {
      title: { pt: data.title, en: data.title }, 
      description: { pt: data.description, en: data.description },
      category: data.category,
      difficulty: data.difficulty
    };
  } catch (error) {
    console.error("Scenario generation failed:", error);
    throw error;
  }
}

export const getAIConsequenceAnalysis = async (
  scenarioTitle: string,
  currentDescription: string,
  choice: Choice,
  lang: Language
) => {
  try {
    const prompt = `
      As a geopolitical strategy expert, analyze the possible long-term consequences of this decision in a war game simulation.
      Scenario: ${scenarioTitle}
      Current Situation: ${currentDescription}
      Player Decision: ${choice.label[lang]}
      Immediate Consequence: ${choice.consequence[lang]}
      
      Respond in ${lang === 'pt' ? 'Portuguese (Brazil)' : 'English'}.
      Format: A concise, technical analysis (max 100 words).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt
    });

    return response.text || "Analysis unavailable.";
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return "Error getting AI analysis.";
  }
};
