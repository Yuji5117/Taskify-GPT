import TaskExtractorContainer from "@/component/Task/TaskExtractorContainer";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="max-w-5xl mx-auto py-10">
      <div>
        <h2 className="text-3xl text-center font-bold">
          🤖 ChatGPTとの会話を貼り付けてタスクを抽出しよう
        </h2>

        <div className="my-10">
          <TaskExtractorContainer session={session} />
        </div>
      </div>
    </div>
  );
}
