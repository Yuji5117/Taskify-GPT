import React from 'react'

import { Task } from '@/types'

type TaskCardProps = {
  task: Task
  isChecked: boolean
  onToggle: (task: Task) => void
}

const TaskCard = ({ task, isChecked, onToggle }: TaskCardProps) => {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-md transition-shadow duration-200 hover:shadow-lg">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onToggle(task)}
          className="h-5 w-5 accent-blue-600"
        />
        <h3 className="text-lg font-semibold">{task.title}</h3>
      </div>

      <p className="text-sm text-gray-700">{task.body}</p>

      <div className="flex flex-wrap gap-2">
        {task.label?.map(label => (
          <span
            key={label}
            className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700"
          >
            #{label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default TaskCard
