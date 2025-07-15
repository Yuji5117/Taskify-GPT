import TaskExtractorContainer from "@/component/Task/TaskExtractorContainer";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto py-10">
      <div>
        <h2 className="text-3xl text-center font-bold">
          🤖 ChatGPTとの会話を貼り付けてタスクを抽出しよう
        </h2>

        <TaskExtractorContainer />
      </div>
    </div>
  );
}
