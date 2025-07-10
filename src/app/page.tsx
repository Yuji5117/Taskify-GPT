"use client";

import { Task } from "@/types/types";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [chatText, setChatText] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>();

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

          <table>
            <thead>
              <tr>
                <th>タイトル</th>
                <th>説明</th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task, index) => (
                <tr key={index}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
