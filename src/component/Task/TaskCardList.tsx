import { Task } from "@/types/types";
import React from "react";
import TaskCard from "./TaskCard";

type TaskCardListProps = {
  tasks: Task[];
};

function TaskCardList({ tasks }: TaskCardListProps) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task.title} task={task} />
      ))}
    </div>
  );
}

export default TaskCardList;
