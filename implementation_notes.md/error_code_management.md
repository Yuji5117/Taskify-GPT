# エラーコード定数管理

このドキュメントでは、Taskify-GPTアプリケーションにおけるエラーコードの定数管理方針と実装方法を定義します。

## 基本方針

### 目的
- エラーコードの一元管理によるタイポ防止
- TypeScriptの型安全性とIDE補完機能の活用
- エラーコードの重複や不整合の防止
- リファクタリング時の影響範囲の明確化

### 管理方法
- `src/constants/errorCodes.ts` で全エラーコードを定数として管理
- `as const` アサーションによる型安全性の確保
- カテゴリ別のグループ化

## 実装仕様

### ファイル構造

```typescript
// src/constants/errorCodes.ts
export const ERROR_CODES = {
  // 認証関連
  AUTH_UNAUTHORIZED: 'AUTH_UNAUTHORIZED',
  AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
  
  // GitHub API関連
  GITHUB_API_ERROR: 'GITHUB_API_ERROR',
  GITHUB_RATE_LIMITED: 'GITHUB_RATE_LIMITED',
  GITHUB_REPOSITORY_ACCESS_DENIED: 'GITHUB_REPOSITORY_ACCESS_DENIED',
  
  // バリデーション関連
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  VALIDATION_REQUIRED_FIELD: 'VALIDATION_REQUIRED_FIELD',
  VALIDATION_INVALID_FORMAT: 'VALIDATION_INVALID_FORMAT',
  INVALID_REPOSITORY_FORMAT: 'INVALID_REPOSITORY_FORMAT',
  
  // タスク処理関連
  TASK_EXTRACTION_FAILED: 'TASK_EXTRACTION_FAILED',
  
  // ネットワーク関連
  NETWORK_CONNECTION_FAILED: 'NETWORK_CONNECTION_FAILED',
  NETWORK_TIMEOUT: 'NETWORK_TIMEOUT',
} as const

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES]
```

### 型定義の更新

```typescript
// src/types/index.ts
import { ErrorCode } from '@/constants/errorCodes'

type ApiErrorResponse = {
  data: null
  success: false
  message: string
  errorCode: ErrorCode  // string から ErrorCode 型に変更
}
```

## 使用方法

### API Route での使用

```typescript
import { ERROR_CODES } from '@/constants/errorCodes'

// 認証エラー
return NextResponse.json<ApiResponse<T>>(
  {
    data: null,
    success: false,
    message: 'ログインが必要です',
    errorCode: ERROR_CODES.AUTH_UNAUTHORIZED,
  },
  { status: 401 },
)

// バリデーションエラー
return NextResponse.json<ApiResponse<T>>(
  {
    data: null,
    success: false,
    message: 'リポジトリ名が正しい形式ではありません',
    errorCode: ERROR_CODES.INVALID_REPOSITORY_FORMAT,
  },
  { status: 400 },
)
```

### フロントエンドでの使用

```typescript
import { ERROR_CODES } from '@/constants/errorCodes'

// 型安全なエラーコード判定
if (response.errorCode === ERROR_CODES.AUTH_UNAUTHORIZED) {
  // 認証エラー特有の処理
  redirectToLogin()
} else if (response.errorCode === ERROR_CODES.GITHUB_RATE_LIMITED) {
  // レート制限特有の処理
  showRetryAfterMessage()
}

// Switch文での使用
switch (response.errorCode) {
  case ERROR_CODES.AUTH_UNAUTHORIZED:
    handleAuthError()
    break
  case ERROR_CODES.VALIDATION_ERROR:
    handleValidationError()
    break
  default:
    handleGenericError()
}
```

## メリット

### 開発体験の向上
- **IDE補完**: エラーコード入力時の自動補完
- **型チェック**: 存在しないエラーコードの使用をコンパイル時に検出
- **リファクタリング**: エラーコード名変更時の一括置換

### コード品質の向上
- **一貫性**: 全体で統一されたエラーコード命名
- **保守性**: 新しいエラーコード追加時の影響範囲が明確
- **可読性**: カテゴリ別の整理による理解しやすさ

## 移行計画

### Phase 1: 定数ファイル作成
1. `src/constants/errorCodes.ts` の作成
2. 既存エラーコードの定数化
3. 型定義の更新

### Phase 2: 既存コードの更新
1. API Route でのエラーコード使用箇所を定数に変更
2. フロントエンドでのエラーハンドリング箇所を更新
3. 型安全性の恩恵を受けるためのリファクタリング

### Phase 3: 新機能での活用
1. 新しいエラーコード追加時は必ず定数を使用
2. エラーハンドリングの統一パターン確立

## 注意事項

- エラーコード追加時は必ず `ERROR_CODES` オブジェクトに定義
- 既存のエラーコード名変更時は全影響箇所の確認が必要
- カテゴリ分けは明確で一貫性のある命名規則に従う