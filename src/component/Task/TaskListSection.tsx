'use client'

import React, { useState } from 'react'

import { Repository } from '@/schemas/repository'
import { Task } from '@/schemas/task'

import TaskCard from './TaskCard'
import LoginModal from '../auth/LoginModal'
import RepositoryDropdown from '../GitHub/RepositoryDropdown'
import Button from '../ui/Button'

interface TaskListSectionProps {
  tasks: Task[]
  selectedTasks: Task[]
  isAuthenticated: boolean
  handleToggleTask: (task: Task) => void
  repositories: Repository[]
  selectedRepository: Repository | null
  onRepositorySelect: (repository: Repository) => void
  handleCreateIssues: () => void
  isCreatingIssues: boolean
}

const TaskListSection = ({
  tasks,
  selectedTasks,
  isAuthenticated,
  handleToggleTask,
  repositories,
  selectedRepository,
  onRepositorySelect,
  handleCreateIssues,
  isCreatingIssues,
}: TaskListSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const isDisabled = !selectedRepository || selectedTasks.length === 0 || isCreatingIssues

  if (tasks.length === 0) {
    return <p className="text-center text-xl">タスクがありません。</p>
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            isChecked={selectedTasks.some(t => t.id === task.id)}
            onToggle={handleToggleTask}
          />
        ))}
      </div>

      {isAuthenticated && repositories.length > 0 && (
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <RepositoryDropdown
              repositories={repositories}
              selectedRepository={selectedRepository}
              onSelect={onRepositorySelect}
            />
          </div>
        </div>
      )}

      <div className="flex justify-center">
        {isAuthenticated ? (
          <Button size="md" onClick={handleCreateIssues} disabled={isDisabled}>
            {isCreatingIssues ? 'Issue作成中...' : 'タスクをIssue化'}
          </Button>
        ) : (
          <Button size="md" onClick={() => setIsModalOpen(true)}>
            ログインしてタスクをIssue化
          </Button>
        )}
      </div>
      {isModalOpen && <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}

export default TaskListSection
