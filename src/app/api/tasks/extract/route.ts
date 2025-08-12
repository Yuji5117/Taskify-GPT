import { NextRequest, NextResponse } from 'next/server'

import { extractTasksFromChat } from '@/lib/openai'
import { Task } from '@/schemas/task'
import { ApiResponse } from '@/types'

export const POST = async (req: NextRequest) => {
  try {
    const { chatText } = await req.json()

    const tasks = await extractTasksFromChat(chatText)

    return NextResponse.json<ApiResponse<Task[]>>(
      {
        data: tasks,
        success: true,
        message: 'タスクの抽出に成功しました',
      },
      { status: 200 },
    )
  } catch (err) {
    console.error('❌ API extract error:', err)

    return NextResponse.json<ApiResponse<Task[]>>(
      {
        data: null,
        success: false,
        message: 'タスクの抽出に失敗しました',
        errorCode: 'TASK_EXTRACTION_FAILED',
      },
      { status: 500 },
    )
  }
}
