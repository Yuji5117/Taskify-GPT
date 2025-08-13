# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## Project Architecture

This is a Next.js 15 application (App Router) that converts ChatGPT conversations into actionable development tasks.

### Core Application Flow

1. **Chat Input** (`TaskInputSection`) - User pastes ChatGPT conversation text
2. **AI Processing** (`/api/tasks/extract`) - OpenAI GPT-3.5-turbo extracts tasks from conversation
3. **Task Display** (`TaskListSection`) - Shows extracted tasks with selection/toggle capabilities
4. **GitHub Integration** - Authenticated users can create GitHub issues from selected tasks

### Key Directory Structure

- `src/app/api/` - API routes following App Router conventions
  - `tasks/extract/` - Main task extraction endpoint
  - `auth/[...nextauth]/` - NextAuth.js authentication
  - `github/` - GitHub API integration endpoints
- `src/component/` - React components organized by feature
  - `Task/` - Task-related components (Container, Input, List, Card)
  - `auth/` - Authentication components
  - `GitHub/` - GitHub integration components
- `src/lib/` - Core business logic and external integrations
  - `openai.ts` - OpenAI API integration for task extraction
  - `prompts.ts` - AI prompt templates (Japanese language)
  - `apiClient.ts` - HTTP client wrapper
  - `github.ts` - GitHub API integration
  - `auth.ts` - NextAuth.js configuration
- `src/schemas/` - Zod validation schemas
- `src/types/` - TypeScript type definitions
- `src/constants/` - Application constants (API paths)

### Authentication & External Services

- **NextAuth.js** with GitHub OAuth provider
- **OpenAI API** (GPT-3.5-turbo) for task extraction from Japanese text
- **GitHub API** via Octokit for repository and issue management
- **Zod** for runtime type validation

### API Response Pattern

All API endpoints use a standardized `ApiResponse<T>` type:

```typescript
type ApiResponse<T> = {
  data: T | null
  success: boolean
  message: string
  errorCode?: string // Only present on errors
}
```

### Task Data Model

Tasks are defined by the `TaskSchema` (Zod) with:

- `id`: string (UUID)
- `title`: string (1-255 chars) - Used as GitHub issue title
- `description`: optional string (max 500 chars)

### Sensitive Files

- `.env.local`
- Any API keys or secrets — never commit or expose

### Important Implementation Notes

- Follow ESLint rules strictly
- All user-facing text and AI prompts are in Japanese
- Task extraction uses Japanese prompts in `generateTaskExtractionPrompt()`
- API paths are centralized in `src/constants/paths.ts`
- The app uses TypeScript strictly with Zod validation at API boundaries
