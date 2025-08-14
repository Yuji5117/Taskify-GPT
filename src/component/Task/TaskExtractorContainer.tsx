'use client'

import React, { ChangeEvent, useState } from 'react'

import { paths } from '@/constants/paths'
import { apiClient } from '@/lib/apiClient'
import { CreatedIssue, IssueCreationRequest } from '@/schemas/issueCreation'
import { Repository } from '@/schemas/repository'
import { Task } from '@/schemas/task'
import { ApiResponse } from '@/types'

import TaskInputSection from './TaskInputSection'
import TaskListSection from './TaskListSection'

interface TaskExtractorContainerProps {
  isAuthenticated: boolean
}

const TaskExtractorContainer = ({ isAuthenticated }: TaskExtractorContainerProps) => {
  const [chatText, setChatText] = useState<string>('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([])
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [selectedRepository, setSelectedRepository] = useState<Repository | null>(null)
  const [isCreatingIssues, setIsCreatingIssues] = useState<boolean>(false)

  const handleChatChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setChatText(e.target.value)
  }

  const handleExtractTasks = async () => {
    try {
      const tasksResponse = await apiClient.post<ApiResponse<Task[]>>(
        paths.api.tasks.extract.path,
        {
          body: chatText,
        },
      )

      if (tasksResponse.success === false) {
        console.error('タスクの抽出に失敗:', tasksResponse.message)
        return
      }

      setTasks(tasksResponse.data || [])
      setSelectedTasks(tasksResponse.data || [])

      if (isAuthenticated) {
        try {
          const reposResponse = await apiClient.get<ApiResponse<Repository[]>>(
            paths.api.github.repos.path,
          )

          if (reposResponse.success) {
            setRepositories(reposResponse.data || [])
            setSelectedRepository(null)
          } else {
            console.error('レポジトリの取得に失敗:', reposResponse.message)
            setRepositories([])
            setSelectedRepository(null)
          }
        } catch (error) {
          console.error('レポジトリ取得エラー:', error)
          setRepositories([])
          setSelectedRepository(null)
        }
      } else {
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

  const handleCreateIssues = async () => {
    if (!selectedRepository || selectedTasks.length === 0) {
      console.error('リポジトリまたはタスクが選択されていません')
      return
    }

    setIsCreatingIssues(true)

    try {
      const requestBody: IssueCreationRequest = {
        tasks: selectedTasks,
        repositoryFullName: selectedRepository.full_name,
      }

      const response = await apiClient.post<ApiResponse<CreatedIssue[]>>(
        paths.api.github.issues.path,
        requestBody,
      )

      if (response.success === false) {
        console.error('GitHub issueの作成に失敗:', response.message)
        return
      }

      const createdIssues = response.data || []
      console.log('作成されたGitHub issue:', createdIssues)

      setSelectedTasks([])
    } catch (error) {
      console.error('GitHub issue作成エラー:', error)
    } finally {
      setIsCreatingIssues(false)
    }
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
        isAuthenticated={isAuthenticated}
        handleToggleTask={handleToggleTask}
        repositories={repositories}
        selectedRepository={selectedRepository}
        onRepositorySelect={handleRepositorySelect}
        handleCreateIssues={handleCreateIssues}
        isCreatingIssues={isCreatingIssues}
      />
    </div>
  )
}

export default TaskExtractorContainer
