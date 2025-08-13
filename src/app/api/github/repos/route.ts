import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { createOctokit } from '@/lib/github'
import { Repository, RepositorySchema } from '@/schemas/repository'
import { ApiResponse } from '@/types'

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.accessToken) {
      return NextResponse.json<ApiResponse<Repository[]>>(
        {
          data: null,
          success: false,
          message: 'ログインが必要です',
          errorCode: 'UNAUTHORIZED',
        },
        { status: 401 },
      )
    }

    const octokit = createOctokit(session.user.accessToken)

    const response = await octokit.rest.repos.listForAuthenticatedUser({
      visibility: 'public',
      sort: 'updated',
      per_page: 15,
    })

    const repositories = response.data.map(repo => {
      return RepositorySchema.parse({
        id: repo.id,
        full_name: repo.full_name,
        name: repo.name,
      })
    })

    return NextResponse.json<ApiResponse<Repository[]>>(
      {
        data: repositories,
        success: true,
        message: 'レポジトリの取得に成功しました',
      },
      { status: 200 },
    )
  } catch (err) {
    console.error('❌ GitHub repos API error:', err)

    return NextResponse.json<ApiResponse<Repository[]>>(
      {
        data: null,
        success: false,
        message: 'レポジトリの取得に失敗しました',
        errorCode: 'GITHUB_API_ERROR',
      },
      { status: 500 },
    )
  }
}
