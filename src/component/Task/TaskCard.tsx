import { Task } from "@/types/types";
import React from "react";

type TaskCardProps = {
  task: Task;
  isChecked: boolean;
  onToggle: (task: Task) => void;
};

const TaskCard = ({ task, isChecked, onToggle }: TaskCardProps) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => onToggle(task)}
      />
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
