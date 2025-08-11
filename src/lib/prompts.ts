export const generateTaskExtractionPrompt = (chatText: string) => {
  return `
  以下は、ユーザーとAIの間で交わされた開発に関する会話です。
  この会話から、実装すべき具体的なタスクを日本語で抽出してください。

  出力形式は以下のJSON配列としてください：

  [
    {
      "title": "タスクのタイトル（簡潔に）",
      "body": "実装内容や補足情報（必要に応じて）",
      "labels": ["任意のラベル"]
    },
    ...
  ]

  制約：
  - titleはGitHub Issueのタイトルとして使えるように20〜50文字程度で
  - bodyには実装の背景や補足がある場合だけ書いてください（なければ空でもOK）
  - labelsは["backend", "frontend", "validation"]など自由に判断してOK（不要なら省略）

  # 会話ログ:
  ${chatText}
  `
}
