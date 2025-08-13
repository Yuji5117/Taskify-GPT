'use client'

import { Session } from 'next-auth'
import React, { ChangeEvent, useState } from 'react'

import { paths } from '@/constants/paths'
import { apiClient } from '@/lib/apiClient'
import { Repository } from '@/schemas/repository'
import { Task } from '@/schemas/task'
import { ApiResponse } from '@/types'

import TaskInputSection from './TaskInputSection'
import TaskListSection from './TaskListSection'

interface TaskExtractorContainerProps {
  session: Session | null
}

const TaskExtractorContainer = ({ session }: TaskExtractorContainerProps) => {
  const [chatText, setChatText] = useState<string>('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([])
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [selectedRepository, setSelectedRepository] = useState<Repository | null>(null)

  const handleChatChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setChatText(e.target.value)
  }

  const handleExtractTasks = async () => {
    try {
      const [tasksResponse, reposResponse] = await Promise.all([
        apiClient.post<ApiResponse<Task[]>>(paths.api.tasks.extract.path, {
          body: chatText,
        }),
        apiClient.get<ApiResponse<Repository[]>>(paths.api.github.repos.path),
      ])

      if (tasksResponse.success === false) {
        console.error('タスクの抽出に失敗:', tasksResponse.message)
        return
      }

      setTasks(tasksResponse.data || [])
      setSelectedTasks(tasksResponse.data || [])

      //TODO:  apiからの返却値でのsessionがない場合のエラー処理
      if (reposResponse.success) {
        setRepositories(reposResponse.data || [])
        setSelectedRepository(null)
      } else {
        console.error('レポジトリの取得に失敗:', reposResponse.message)
        setRepositories([])
        setSelectedRepository(null)
      }
    } catch (error) {
      console.error('API呼び出しエラー:', error)
    }
  }

  const handleToggleTask = (task: Task) => {
    setSelectedTasks(prev =>
      prev.some(prevTask => prevTask.id === task.id)
        ? prev.filter(t => t.id !== task.id)
        : [...prev, task],
    )
  }

  const handleRepositorySelect = (repository: Repository) => {
    setSelectedRepository(repository)
  }
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
        repositories={repositories}
        selectedRepository={selectedRepository}
        onRepositorySelect={handleRepositorySelect}
      />
    </div>
  )
}

export default TaskExtractorContainer
