import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

let apiKey = process.env.GROK_API_KEY || process.env.OPENAI_API_KEY;
let baseURL = "https://api.x.ai/v1";
if (apiKey && apiKey.startsWith("gsk_")) {
  baseURL = "https://api.groq.com/openai/v1";
}

const openai = new OpenAI({
  apiKey,
  baseURL,
});

export const generateAISuggestions = async (req, res) => {
  try {
    const { summary, experience, education, skills } = req.body;

    if (!summary && !experience && !education && !skills) {
      return res.status(400).json({
        success: false,
        message: "Please provide resume details for analysis.",
      });
    }

    const prompt = `
You are a professional career advisor AI.
Analyze the following resume sections and provide improvement suggestions
in bullet points. Keep the tone professional, encouraging, and clear.

Summary: ${summary || "N/A"}
Experience: ${experience || "N/A"}
Education: ${education || "N/A"}
Skills: ${skills || "N/A"}

Respond in this format:
- Improvement suggestions for each section
- New skill or keyword suggestions
- Optional improvements to make it more ATS-friendly
`;

    let completion;
    let modelsToTry = ["grok-2-latest", "grok-beta", "grok-2-1212"];
    if (apiKey && apiKey.startsWith("gsk_")) {
      modelsToTry = ["llama3-8b-8192", "mixtral-8x7b-32768", "llama-3.1-8b-instant"];
    }

    for (const model of modelsToTry) {
      try {
        completion = await openai.chat.completions.create({
          model,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        });
        break; // Break on success
      } catch (err) {
        if (err.status === 400 || err.status === 404 || (err.message && err.message.includes("not found"))) {
          console.log(`[AI Fallback] ${model} unavailable, trying next...`);
          continue;
        }
        throw err;
      }
    }
    
    if (!completion) {
      throw new Error("All requested AI models failed or were not found for this API key.");
    }

    const suggestion = completion.choices[0].message.content;

    res.status(200).json({
      success: true,
      suggestion,
    });
  } catch (error) {
    console.error("AI Suggestion Error:", error);
    res.status(500).json({
      success: false,
      message: "AI suggestion generation failed.",
      error: error.message,
    });
  }
};
