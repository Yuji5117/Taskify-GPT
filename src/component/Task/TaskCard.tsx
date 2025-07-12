import { Task } from "@/types";
import React from "react";

type TaskCardProps = {
  task: Task;
  isChecked: boolean;
  onToggle: (task: Task) => void;
};

const TaskCard = ({ task, isChecked, onToggle }: TaskCardProps) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onToggle(task)}
          className="w-5 h-5 accent-blue-600"
        />
        <h3 className="text-lg font-semibold">{task.title}</h3>
      </div>

      <p className="text-gray-700 text-sm">{task.body}</p>

      <div className="flex flex-wrap gap-2">
        {task.label?.map((label) => (
          <span
            key={label}
            className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
          >
            #{label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
