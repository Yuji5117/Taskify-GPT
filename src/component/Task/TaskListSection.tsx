import React from "react";
import TaskCard from "./TaskCard";
import Button from "../ui/Button";
import { Task } from "@/types";

interface TaskListSectionProps {
  tasks: Task[];
  selectedTasks: Task[];
  handleToggleTask: (task: Task) => void;
  handleCreateIssues: () => void;
}

const TaskListSection = ({
  tasks,
  selectedTasks,
  handleToggleTask,
  handleCreateIssues,
}: TaskListSectionProps) => {
  return (
    <>
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
            <Button size="md" onClick={handleCreateIssues}>
              タスクをIssue化
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-center text-xl">タスクがありません。</p>
      )}
    </>
  );
};

export default TaskListSection;
