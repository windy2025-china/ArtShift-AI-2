
import { GoogleGenAI } from "@google/genai";
import { ArtisticStyle, ModificationState } from "../types";

export const performStyleTransfer = async (
  base64Image: string,
  stylePrompt: string,
  modState: ModificationState
): Promise<string | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    
    // Construct refined prompt
    let finalPrompt = stylePrompt;
    
    if (modState.customStylePrompt) {
      finalPrompt += ` Additionally, apply this specific style: ${modState.customStylePrompt}.`;
    }

    if (modState.newText) {
      finalPrompt += ` Please identify any prominent text in the image and change it to say exactly "${modState.newText}". Keep the font style consistent.`;
    }

    if (modState.objectChange && modState.objectTarget) {
      finalPrompt += ` Target the ${modState.objectTarget} in the image and modify it according to this instruction: ${modState.objectChange}.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1],
              mimeType: 'image/png',
            },
          },
          {
            text: finalPrompt,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    return null;
  } catch (error) {
    console.error("Style transfer failed:", error);
    throw error;
  }
};
