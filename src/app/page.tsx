"use client";

import TaskCard from "@/component/Task/TaskCard";
import { Task } from "@/types/types";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [chatText, setChatText] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);

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
    setSelectedTasks(data.tasks);
  };

  const handleToggleTask = (task: Task) => {
    setSelectedTasks((prev) =>
      prev.some((prevTask) => prevTask.id === task.id)
        ? prev.filter((t) => t.id !== task.id)
        : [...prev, task]
    );
  };

  return (
    <div>
      <textarea
        value={chatText}
        onChange={handleChatChange}
        className="border"
        placeholder="ChatGPTとの会話を貼り付けてください"
      />
      <button onClick={handleExtractTasks}>タスクの抽出</button>

      {tasks.length > 0 ? (
        <div>
          {tasks.map((task) => (
            <TaskCard
              key={task.title}
              task={task}
              isChecked={selectedTasks.some((t) => t.id === task.id)}
              onToggle={handleToggleTask}
            />
          ))}
        </div>
      ) : (
        <p>タスクがありません。</p>
      )}
    </div>
  );
}
