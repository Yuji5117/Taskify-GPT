import { getServerSession } from 'next-auth'

import TaskExtractorContainer from '@/component/Task/TaskExtractorContainer'
import { authOptions } from '@/lib/auth'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="mx-auto max-w-5xl py-10">
      <div>
        <h2 className="text-center text-3xl font-bold">
          🤖 ChatGPTとの会話を貼り付けてタスクを抽出しよう
        </h2>

        <div className="my-10">
          <TaskExtractorContainer session={session} />
        </div>
      </div>
    </div>
  )
}
