
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this context, we assume the key is always present.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

// Helper to wait for a specified duration
const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const generateVideo = async (
  prompt: string,
  onProgress: (message: string) => void
): Promise<string> => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }
  
  onProgress("Starting video generation...");

  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-2.0-generate-001',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
      }
    });

    onProgress("Request sent. The AI is now crafting your video...");
    await sleep(10000); // Initial wait

    const pollingMessages = [
      "This can take a few minutes. Time for a quick stretch!",
      "Teaching pixels to dance to your prompt...",
      "Rendering your masterpiece, frame by frame...",
      "Almost there! Polishing the final scenes...",
    ];
    let messageIndex = 0;

    while (!operation.done) {
      onProgress(pollingMessages[messageIndex % pollingMessages.length]);
      messageIndex++;
      
      await sleep(10000); // Wait 10 seconds between checks
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    if (operation.error) {
      throw new Error(`Video generation failed: ${operation.error.message}`);
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

    if (!downloadLink) {
      throw new Error("Video generation completed, but no download link was found.");
    }

    onProgress("Video generated! Downloading...");

    // The download link requires the API key to be appended
    const response = await fetch(`${downloadLink}&key=${API_KEY}`);
    if (!response.ok) {
        throw new Error(`Failed to download video: ${response.statusText}`);
    }

    const videoBlob = await response.blob();
    const videoObjectURL = URL.createObjectURL(videoBlob);
    
    onProgress("Download complete!");
    return videoObjectURL;

  } catch (error) {
    console.error("Error generating video with Gemini:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate video: ${error.message}`);
    }
    throw new Error("An unknown error occurred during video generation.");
  }
};
