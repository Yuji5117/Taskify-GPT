"use client";

import TaskCard from "@/component/Task/TaskCard";
import { Task } from "@/types";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [chatText, setChatText] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);

  const handleChatChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setChatText(e.target.value);
  };

  const handleExtractTasks = async () => {
    const response = await fetch("/api/tasks/extract", {
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

  const handleCreateIssues = () => {
    console.log("Create these issues: ", selectedTasks);
    // githubにイシューを作る処理を実装
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <div>
        <h2 className="text-3xl text-center font-bold">
          🤖 ChatGPTとの会話を貼り付けてタスクを抽出しよう
        </h2>
        <div className="py-10 flex flex-col">
          <textarea
            value={chatText}
            onChange={handleChatChange}
            className="w-full p-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
            placeholder="ChatGPTとの会話を貼り付けてください"
            rows={15}
          />
          <button
            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md transition-all duration-200 ease-in-out"
            onClick={handleExtractTasks}
          >
            タスクの抽出
          </button>
        </div>

        {tasks.length > 0 ? (
          <div className="px-4">
            <div className="my-8 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => (
                <TaskCard
                  key={task.title}
                  task={task}
                  isChecked={selectedTasks.some((t) => t.id === task.id)}
                  onToggle={handleToggleTask}
                />
              ))}
            </div>

            <div className="flex justify-center">
              <button
                className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md transition-all duration-200 ease-in-out"
                onClick={handleCreateIssues}
              >
                タスクをIssue化
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-xl">タスクがありません。</p>
        )}
      </div>
    </div>
  );
}
