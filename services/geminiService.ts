import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { Plant, PlantCareInfo, WeatherData, PlantHealthStatus } from "../types";

// Note: API key is read from environment variables
let aiInstance: GoogleGenAI | null = null;

const getAi = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing. Please check your .env file.");
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

// Helper function to convert File to base64 for Gemini API
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: {
      data: await base64EncodedDataPromise,
      mimeType: file.type,
    },
  };
};

export const getChatResponse = async (prompt: string, imageFile?: File, systemInstruction?: string): Promise<string> => {
  try {
    const contents: any[] = [{ text: prompt }];
    if (imageFile) {
      const imagePart = await fileToGenerativePart(imageFile);
      contents.unshift(imagePart); // Put image first for better context in some models
    }

    const baseSystemInstruction = "You are ARTEMIS, a specialized Bio-AI assistant. You ONLY answer questions related to plants, gardening, forestry, agriculture, and biotechnology. If a user asks a question outside of these topics, politely decline and explain that your expertise is limited to the biological world of plants.";
    const finalSystemInstruction = systemInstruction ? `${baseSystemInstruction} ${systemInstruction}` : baseSystemInstruction;

    const response: GenerateContentResponse = await getAi().models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts: contents },
      config: {
        systemInstruction: finalSystemInstruction,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error getting chat response from Gemini:", error);
    return "Sorry, I encountered an error. Please try again.";
  }
};


export const getPlantCareInfo = async (plantSpecies: string): Promise<PlantCareInfo> => {
    try {
        const prompt = `Provide brief plant care information for ${plantSpecies} in JSON format. The JSON object should have three keys: "watering" (e.g., "Keep soil moist but not waterlogged"), "sunlight" (e.g., "Full sun to partial shade"), and "commonPests" (e.g., "Aphids, spider mites").`;
        const response = await getAi().models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        watering: { type: Type.STRING },
                        sunlight: { type: Type.STRING },
                        commonPests: { type: Type.STRING },
                    }
                }
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText);

    } catch (error) {
        console.error("Error fetching plant care info:", error);
        return {
            watering: "N/A",
            sunlight: "N/A",
            commonPests: "N/A",
        };
    }
};

export const analyzePlantPhoto = async (imageFile: File): Promise<string> => {
    try {
        const imagePart = await fileToGenerativePart(imageFile);
        const textPart = { text: "Analyze this plant photo for health issues. Identify any visible signs of disease, pests, or nutrient deficiencies. Provide a brief, one or two sentence summary of the plant's health." };
        
        const response = await getAi().models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: { parts: [imagePart, textPart] },
        });

        return response.text;
    } catch (error) {
        console.error("Error analyzing plant photo:", error);
        return "Could not analyze the photo at this time.";
    }
};

export const generateDailyTasks = async (plants: Plant[]): Promise<string[]> => {
    if (plants.length === 0) return [];
    try {
        const plantList = plants.map(p => `- ${p.name} (${p.species})`).join('\n');
        const prompt = `Based on this list of plants in a garden, generate 2-3 brief, actionable tasks for today. Focus on general care. Assume a temperate climate. \n\nPlants:\n${plantList}\n\nReturn the response as a JSON array of strings. For example: ["Check soil moisture for tomatoes", "Look for aphids on the roses"]`;

        const response = await getAi().models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.STRING
                    }
                }
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error generating daily tasks:", error);
        return ["Check on all plants.", "Ensure proper watering."];
    }
};

export const generatePlantHealthStatuses = async (plants: Plant[]): Promise<Record<string, PlantHealthStatus>> => {
    if (plants.length === 0) return {};
    try {
        const plantData = plants.map(p => ({
            id: p.id,
            name: p.name,
            species: p.species,
            journalEntryCount: p.journal.length,
            lastJournalNote: p.journal[0]?.note,
            lastHealthAnalysis: p.journal[0]?.aiHealthAnalysis
        }));

        const prompt = `
            Analyze the following list of plants and provide a health status for each.
            Consider the plant's species, and its latest journal entry/health analysis if available.
            
            Plants: ${JSON.stringify(plantData)}

            For each plant ID, return a JSON object with two keys:
            1. "status": A single word status from this list: "Thriving", "Stable", "Needs Attention", "Vulnerable".
            2. "summary": A very brief (3-5 word) summary of its current state.
            
            Return a single JSON object where keys are the plant IDs.
            Example: {"plant-123": {"status": "Thriving", "summary": "Healthy new growth"}, "plant-456": {"status": "Needs Attention", "summary": "Signs of yellowing leaves"}}
        `;

        const response = await getAi().models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);

    } catch (error) {
        console.error("Error generating plant health statuses:", error);
        return {};
    }
};

export const generateGardenHealthReport = async (plants: Plant[], weather: WeatherData | null): Promise<string> => {
    if (plants.length === 0) return "Your garden is empty. Add a plant to get started!";
    try {
        const plantData = plants.map(p => ({
            name: p.name,
            species: p.species,
            healthStatus: p.aiHealthStatus,
            lastJournalNote: p.journal[0]?.note,
        }));
        const prompt = `
            Generate a comprehensive "Garden Health Report" in Markdown format.
            Analyze the overall state of the garden based on the provided plant data and weather forecast.

            **Plants:**
            ${JSON.stringify(plantData, null, 2)}

            **Weather Forecast:**
            ${weather ? `${weather.temperature}°F, ${weather.condition}. ${weather.aiSummary || ''}` : 'Not available.'}

            The report should include:
            1.  An **Overall Summary** of the garden's health.
            2.  A section for **Plants Thriving**, listing plants that are doing well.
            3.  A section for **Plants Requiring Attention**, highlighting any plants with "Needs Attention" or "Vulnerable" statuses and suggesting specific actions.
            4.  **Proactive Advice** based on the weather forecast.
            5.  A prioritized list of **Top 3 Recommended Actions** for today.
        `;
        const response = await getAi().models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating garden health report:", error);
        return "Could not generate a health report at this time.";
    }
};

export const generateProactiveWeatherAlert = async (plants: Plant[], weather: WeatherData): Promise<string> => {
    if (plants.length === 0) return "Add plants to receive personalized weather advice.";
    try {
        const plantList = plants.map(p => p.species).join(', ');
        const prompt = `
            Based on the following weather forecast and plant list, provide a single, actionable sentence of advice for a gardener.
            Focus on the most critical action. For example, warn about frost for sensitive plants, or suggest watering during a heatwave.

            **Weather:** ${weather.temperature}°F, ${weather.condition}
            **Plants:** ${plantList}

            Example responses:
            - "Frost warning tonight! Consider covering your tomatoes and peppers."
            - "Heatwave approaching; ensure your hydrangeas and ferns get extra water."
            - "Perfect growing conditions today; a good day for fertilizing."
        `;
        const response = await getAi().models.generateContent({ model: "gemini-3-flash-preview", contents: prompt });
        return response.text.trim();
    } catch (error) {
        console.error("Error generating proactive weather alert:", error);
        return "General weather conditions are favorable.";
    }
};