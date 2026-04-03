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

export const generateInterviewQuestions = async (req, res) => {
  try {
    const { jobRole } = req.body;

    if (!jobRole) {
      return res.status(400).json({
        success: false,
        message: "Job role is required",
      });
    }

    const prompt = `
Generate exactly 5 common interview questions for a ${jobRole} role.
For each, provide:
1. question
2. sampleAnswer
3. 2-3 short improvement tips.

Return ONLY pure JSON array, no markdown or text.
Example format:
[
  {
    "question": "What is React?",
    "sampleAnswer": "React is a JS library for building UIs.",
    "tips": ["Mention hooks", "Explain virtual DOM"]
  }
]
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

    let responseText = completion.choices[0].message.content.trim();

    // 🧹 Remove unwanted formatting if present
    responseText = responseText
      .replace(/```json|```/g, "")
      .replace(/^json/i, "")
      .replace(/^\s*[\r\n]/gm, "")
      .trim();

    // ✅ Try to parse safely
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch (jsonError) {
      console.error("⚠️ JSON Parse Failed. Raw Text:", responseText);
      return res.status(500).json({
        success: false,
        message: "Failed to parse AI response",
        raw: responseText,
      });
    }

    return res.status(200).json({
      success: true,
      questions: parsedData,
    });
  } catch (error) {
    console.error("❌ Error generating questions:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ✅ Get AI Feedback on user's answer
export const getInterviewFeedback = async (req, res) => {
  try {
    const { question, userAnswer } = req.body;

    if (!question || !userAnswer) {
      return res.status(400).json({
        success: false,
        message: "Question and user answer are required",
      });
    }

    const prompt = `
Provide constructive feedback on this interview answer:

Question: ${question}
Answer: ${userAnswer}

Analyze and respond with:
1. Clarity and structure
2. Relevance
3. Confidence & tone
4. Areas to improve
5. Example of a better version
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

    const feedback = completion.choices[0].message.content;

    return res.status(200).json({
      success: true,
      feedback,
    });
  } catch (error) {
    console.error("Error in feedback:", error);
    return res.status(500).json({
      success: false,
      message: "Error getting feedback",
      error: error.message,
    });
  }
};
