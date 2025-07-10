"use client";

import TaskCardList from "@/component/Task/TaskCardList";
import { Task } from "@/types/types";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [chatText, setChatText] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleChatChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setChatText(e.target.value);
  };

  const handleExtractTasks = async () => {
    const response = await fetch("/api/extract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatText }),
    });

    const data = await response.json();
    setTasks(data.tasks);
  };

  return (
    <div>
      <main>
        <div>
          <textarea
            value={chatText}
            onChange={handleChatChange}
            className="border"
            placeholder="ChatGPTとの会話を貼り付けてください"
          />
          <button onClick={handleExtractTasks}>タスクの抽出</button>

          {tasks.length > 0 ? (
            <TaskCardList tasks={tasks} />
          ) : (
            <p>タスクがありません。</p>
          )}
        </div>
      </main>
    </div>
  );
}
