import OpenAI from 'openai'
import { v4 as uuidv4 } from 'uuid'

import { env } from '@/config/env'
import { Task } from '@/schemas/task'
import { extractJsonFromCodeBlock } from '@/util/parse'

import { generateTaskExtractionPrompt } from './prompts'

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY })

export const extractTasksFromChat = async (chatText: string) => {
  const prompt = generateTaskExtractionPrompt(chatText)

  const response = await openai.chat.completions.create({
    model: 'gpt-5-nano',
    messages: [
      {
        role: 'system',
        content:
          'You are a software development assistant. Please extract actionable development tasks from the conversation with ChatGPT.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const raw = response.choices[0].message.content?.trim() ?? ''

  const cleaned = extractJsonFromCodeBlock(raw)

  try {
    const tasks = JSON.parse(cleaned)
    const tasksWtihId = tasks.map((task: Task) => ({ ...task, id: uuidv4() }))
    return tasksWtihId
  } catch (err) {
    console.error('❌ JSON parse error:', err)
    console.error('GPT response was:', raw)
    throw new Error('Unable to interpret the GPT output as JSON.')
  }
}
