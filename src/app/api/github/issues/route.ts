import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { ZodError } from 'zod'

import { authOptions } from '@/lib/auth'
import { createOctokit } from '@/lib/github'
import { IssueCreationRequestSchema, CreatedIssue } from '@/schemas/issueCreation'
import { ApiResponse } from '@/types'

export const POST = async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.accessToken) {
      return NextResponse.json<ApiResponse<CreatedIssue[]>>(
        {
          data: null,
          success: false,
          message: 'ログインが必要です',
          errorCode: 'UNAUTHORIZED',
        },
        { status: 401 },
      )
    }

    const body = await request.json()
    const validatedData = IssueCreationRequestSchema.parse(body)

    const [owner, repo] = validatedData.repositoryFullName.split('/')
    if (!owner || !repo) {
      return NextResponse.json<ApiResponse<CreatedIssue[]>>(
        {
          data: null,
          success: false,
          message: 'リポジトリ名が正しい形式ではありません（owner/repo形式で入力してください）',
          errorCode: 'INVALID_REPOSITORY_FORMAT',
        },
        { status: 400 },
      )
    }

    const octokit = createOctokit(session.user.accessToken)
    const createdIssues: CreatedIssue[] = []

    for (const task of validatedData.tasks) {
      const issueResponse = await octokit.rest.issues.create({
        owner,
        repo,
        title: task.title,
        body: task.body || '',
      })

      createdIssues.push({
        id: issueResponse.data.id,
        title: issueResponse.data.title,
        body: issueResponse.data.body || undefined,
        html_url: issueResponse.data.html_url,
      })
    }

    return NextResponse.json<ApiResponse<CreatedIssue[]>>(
      {
        data: createdIssues,
        success: true,
        message: 'GitHub issueの作成に成功しました',
      },
      { status: 200 },
    )
  } catch (err) {
    console.error('❌ GitHub issues API error:', err)

    if (err instanceof ZodError) {
      return NextResponse.json<ApiResponse<CreatedIssue[]>>(
        {
          data: null,
          success: false,
          message: 'リクエストパラメータが不正です',
          errorCode: 'VALIDATION_ERROR',
        },
        { status: 400 },
      )
    }

    return NextResponse.json<ApiResponse<CreatedIssue[]>>(
      {
        data: null,
        success: false,
        message: 'GitHub issueの作成に失敗しました',
        errorCode: 'GITHUB_API_ERROR',
      },
      { status: 500 },
    )
  }
}
