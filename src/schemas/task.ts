import { z } from 'zod'

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'タイトルは必須です').max(255, 'IDは255文字以内で入力してください'),
  description: z.string().max(500, 'descriptionは500文字以内で入力してください').optional(),
})

export type Task = z.infer<typeof TaskSchema>
