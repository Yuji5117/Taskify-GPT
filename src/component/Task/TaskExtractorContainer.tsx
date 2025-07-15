"use client";

import React, { ChangeEvent, useState } from "react";
import TaskInputSection from "./TaskInputSection";
import TaskListSection from "./TaskListSection";
import { Task } from "@/types";
import { Session } from "next-auth";

interface TaskExtractorContainerProps {
  session: Session | null;
}

const TaskExtractorContainer = ({ session }: TaskExtractorContainerProps) => {
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
  return (
    <div className="space-y-10">
      <TaskInputSection
        chatText={chatText}
        handleChatChange={handleChatChange}
        handleExtractTasks={handleExtractTasks}
      />
      <TaskListSection
        tasks={tasks}
        selectedTasks={selectedTasks}
        session={session}
        handleToggleTask={handleToggleTask}
      />
    </div>
  );
};

export default TaskExtractorContainer;
