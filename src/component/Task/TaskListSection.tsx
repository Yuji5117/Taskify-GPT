'use client'

import { Session } from 'next-auth'
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
  session: Session | null
  handleToggleTask: (task: Task) => void
  repositories: Repository[]
  selectedRepository: Repository | null
  onRepositorySelect: (repository: Repository) => void
}

const TaskListSection = ({
  tasks,
  selectedTasks,
  session,
  handleToggleTask,
  repositories,
  selectedRepository,
  onRepositorySelect,
}: TaskListSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleCreateIssues = () => {
    console.log('Create these issues: ', selectedTasks)
  }

  return (
    <>
      {tasks.length > 0 ? (
        <div className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map(task => (
              <TaskCard
                key={task.title}
                task={task}
                isChecked={selectedTasks.some(t => t.id === task.id)}
                onToggle={handleToggleTask}
              />
            ))}
          </div>

          {session && repositories.length > 0 && (
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
            {session ? (
              <Button size="md" onClick={handleCreateIssues} disabled={!selectedRepository}>
                タスクをIssue化
              </Button>
            ) : (
              <Button size="md" onClick={() => setIsModalOpen(true)}>
                ログインしてタスクをIssue化
              </Button>
            )}
          </div>
          {isModalOpen && <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
        </div>
      ) : (
        <p className="text-center text-xl">タスクがありません。</p>
      )}
    </>
  )
}

export default TaskListSection
