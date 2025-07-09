import { extractTasksFromChat } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { chatText } = await req.json();

  const tasks = await extractTasksFromChat(chatText);

  return NextResponse.json({ tasks });
};
