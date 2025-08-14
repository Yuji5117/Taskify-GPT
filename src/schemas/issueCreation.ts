import { z } from 'zod'

import { TaskSchema } from './task'

export const IssueCreationRequestSchema = z.object({
  tasks: z.array(TaskSchema).min(1, '少なくとも1つのタスクが必要です'),
  repositoryFullName: z.string().min(1, 'リポジトリ名は必須です'),
})

export type IssueCreationRequest = z.infer<typeof IssueCreationRequestSchema>

export const CreatedIssueSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string().optional(),
  html_url: z.string(),
})

export type CreatedIssue = z.infer<typeof CreatedIssueSchema>
