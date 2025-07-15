"use client";

import React, { ChangeEvent, useState } from "react";
import TaskInputSection from "./TaskInputSection";
import TaskListSection from "./TaskListSection";
import { Task } from "@/types";

const TaskExtractorContainer = () => {
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
    <div>
      <TaskInputSection
        chatText={chatText}
        handleChatChange={handleChatChange}
        handleExtractTasks={handleExtractTasks}
      />
      <TaskListSection
        tasks={tasks}
        selectedTasks={selectedTasks}
        handleToggleTask={handleToggleTask}
        handleCreateIssues={handleCreateIssues}
      />
    </div>
  );
};

export default TaskExtractorContainer;
