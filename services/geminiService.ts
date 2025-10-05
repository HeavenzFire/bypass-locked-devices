
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this simulation, we'll throw an error if the key is missing.
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateBypassLog = async (): Promise<string[]> => {
  try {
    const prompt = `
      Generate a fictional, highly technical, step-by-step log of a mobile device security bypass.
      Use terms like 'kernel exploitation', 'bootloader handshake', 'signature verification bypass', 'secure enclave access', 'privilege escalation', 'R.O.M. injection', and 'sandbox escape'.
      Make it look like a real console output.
      Output 10-12 lines. Each line should be a separate step in the process. Do not include timestamps or prefixes like [INFO]. Just the raw log lines.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    const text = response.text;
    if (!text) {
      return ["Failed to generate log: No text returned."];
    }
    // Split into lines and filter out any empty lines
    return text.split('\n').filter(line => line.trim() !== '');
  } catch (error) {
    console.error("Error generating bypass log:", error);
    return [
        "Error: Could not connect to Gemini API.",
        "Displaying fallback static log.",
        "Initializing connection to device...",
        "Attempting bootloader handshake...",
        "Handshake failed. Trying alternative exploit vector.",
        "Injecting payload into memory buffer...",
        "Bypassing signature verification...",
        "Gaining root access via kernel exploit...",
        "Disabling secure enclave protections...",
        "Privilege escalation successful.",
        "System partition mounted with write access.",
        "Bypass complete. Awaiting user action."
      ];
  }
};
