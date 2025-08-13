import { z } from 'zod'

export const RepositorySchema = z.object({
  id: z.number(),
  full_name: z.string(),
  name: z.string(),
})

export type Repository = z.infer<typeof RepositorySchema>
