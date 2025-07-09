import OpenAI from "openai";
import { env } from "./env";
import { generateTaskExtractionPrompt } from "./prompts";

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export const extractTasksFromChat = async (chatText: string) => {
  const prompt = generateTaskExtractionPrompt(chatText);

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are a software development assistant. Please extract actionable development tasks from the conversation with ChatGPT.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const raw = response.choices[0].message.content?.trim();

  try {
    const json = raw ? JSON.parse(raw) : [];
    return json;
  } catch (err) {
    console.error("❌ JSON parse error:", err);
    console.error("GPT response was:", raw);
    throw new Error("Unable to interpret the GPT output as JSON.");
  }
};
