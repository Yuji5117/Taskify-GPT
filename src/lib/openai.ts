import OpenAI from "openai";
import { env } from "./env";
import { generateTaskExtractionPrompt } from "./prompts";
import { extractJsonFromCodeBlock } from "@/util/parse";

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export const extractTasksFromChat = async (chatText: string) => {
  const prompt = generateTaskExtractionPrompt(chatText);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    // model: "gpt-4o",
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

  const raw = response.choices[0].message.content?.trim() ?? "";

  const cleaned = extractJsonFromCodeBlock(raw);

  try {
    const tasks = JSON.parse(cleaned);
    return tasks;
  } catch (err) {
    console.error("❌ JSON parse error:", err);
    console.error("GPT response was:", raw);
    throw new Error("Unable to interpret the GPT output as JSON.");
  }
};
