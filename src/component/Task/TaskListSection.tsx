"use client";

import React, { useState } from "react";
import TaskCard from "./TaskCard";
import Button from "../ui/Button";
import { Task } from "@/types";
import { Session } from "next-auth";
import LoginModal from "../auth/LoginModal";

interface TaskListSectionProps {
  tasks: Task[];
  selectedTasks: Task[];
  session: Session | null;
  handleToggleTask: (task: Task) => void;
}

const TaskListSection = ({
  tasks,
  selectedTasks,
  session,
  handleToggleTask,
}: TaskListSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCreateIssues = () => {
    console.log("Create these issues: ", selectedTasks);
  };

  return (
    <>
      {tasks.length > 0 ? (
        <div className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
            {session ? (
              <Button size="md" onClick={handleCreateIssues}>
                タスクをIssue化
              </Button>
            ) : (
              <Button size="md" onClick={() => setIsModalOpen(true)}>
                ログインしてタスクをIssue化
              </Button>
            )}
          </div>
          {isModalOpen && (
            <LoginModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
      ) : (
        <p className="text-center text-xl">タスクがありません。</p>
      )}
    </>
  );
};

export default TaskListSection;
