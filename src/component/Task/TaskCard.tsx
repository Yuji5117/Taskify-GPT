import { Task } from "@/types/types";
import React from "react";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div>
      <input type="checkbox" />
      <h3>{task.title}</h3>
      <p>{task.body}</p>
      <div>
        {task.label?.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
