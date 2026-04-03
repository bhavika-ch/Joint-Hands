import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

let apiKey = process.env.GROK_API_KEY || process.env.OPENAI_API_KEY;
let baseURL = "https://api.x.ai/v1";
if (apiKey && apiKey.startsWith("gsk_")) {
  baseURL = "https://api.groq.com/openai/v1";
}

const openai = new OpenAI({ apiKey, baseURL });

export const chatWithAI = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ success: false, message: "Messages array is required" });
    }

    let completion;
    let modelsToTry = ["grok-2-latest", "grok-beta", "grok-2-1212"];
    if (apiKey && apiKey.startsWith("gsk_")) {
      modelsToTry = ["llama3-8b-8192", "mixtral-8x7b-32768", "llama-3.1-8b-instant"];
    }

    for (const model of modelsToTry) {
      try {
        completion = await openai.chat.completions.create({
          model,
          messages: [
            {
              role: "system",
              content: "You are AccessWork Assistant — a friendly, empathetic AI assistant that helps people with disabilities find accessible jobs, get career guidance, navigate the platform, and understand workplace accommodations. Be concise, clear, and supportive.",
            },
            ...messages,
          ],
        });
        break;
      } catch (err) {
        if (err.status === 400 || err.status === 404 || (err.message && err.message.includes("not found"))) {
          console.log(`[Chatbot Fallback] ${model} unavailable, trying next...`);
          continue;
        }
        throw err;
      }
    }

    if (!completion) {
      throw new Error("All AI models failed. Please check your API key.");
    }

    const reply = completion.choices[0].message.content;
    return res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error("Chatbot Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
