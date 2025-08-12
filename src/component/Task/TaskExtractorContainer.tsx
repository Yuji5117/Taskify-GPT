'use client'

import { Session } from 'next-auth'
import React, { ChangeEvent, useState } from 'react'

import { paths } from '@/constants/paths'
import { apiClient } from '@/lib/apiClient'
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

  const handleChatChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setChatText(e.target.value)
  }

  const handleExtractTasks = async () => {
    try {
      const response = await apiClient.post<ApiResponse<Task[]>>(paths.api.tasks.extract.path, {
        body: chatText,
      })

      if (response.success === false) {
        console.error('タスクの抽出に失敗:', response.message)
        return
      }

      setTasks(response.data || [])
      setSelectedTasks(response.data || [])
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
      />
    </div>
  )
}

export default TaskExtractorContainer
