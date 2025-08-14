import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { ApiResponse } from '@/types'

export const POST = async () => {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.accessToken) {
      return NextResponse.json<ApiResponse<any>>(
        {
          data: null,
          success: false,
          message: 'ログインが必要です',
          errorCode: 'UNAUTHORIZED',
        },
        { status: 401 },
      )
    }

    // TODO: リクエストボディのバリデーション
    // TODO: GitHub API でissue作成
    // TODO: レスポンス返却

    return NextResponse.json<ApiResponse<any>>(
      {
        data: null,
        success: true,
        message: 'GitHub issueの作成に成功しました',
      },
      { status: 200 },
    )
  } catch (err) {
    console.error('❌ GitHub issues API error:', err)

    return NextResponse.json<ApiResponse<any>>(
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
