import { extractTasksFromChat } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { chatText } = await req.json();

    const tasks = await extractTasksFromChat(chatText);

    return NextResponse.json({ tasks });
  } catch (err) {
    console.error("❌ API extract error:", err);

    return NextResponse.json(
      { error: "OpenAI API Rate Limit Exceeded or Internal Error" },
      { status: 429 }
    );
  }
};
