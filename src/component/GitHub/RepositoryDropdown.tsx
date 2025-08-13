'use client'

import React from 'react'

import { Repository } from '@/schemas/repository'

interface RepositoryDropdownProps {
  repositories: Repository[]
  selectedRepository: Repository | null
  onSelect: (repository: Repository) => void
  disabled?: boolean
}

const RepositoryDropdown = ({
  repositories,
  selectedRepository,
  onSelect,
  disabled = false,
}: RepositoryDropdownProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const repositoryId = parseInt(event.target.value)
    const repository = repositories.find(repo => repo.id === repositoryId)
    if (repository) {
      onSelect(repository)
    }
  }

  if (repositories.length === 0) {
    return <div className="text-center text-sm text-red-500">レポジトリが見つかりませんでした</div>
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="repository-select" className="text-sm font-medium text-gray-700">
        Issue作成先のレポジトリを選択
      </label>
      <select
        id="repository-select"
        value={selectedRepository?.id || ''}
        onChange={handleChange}
        disabled={disabled}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
      >
        <option value="">レポジトリを選択してください</option>
        {repositories.map(repository => (
          <option key={repository.id} value={repository.id}>
            {repository.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default RepositoryDropdown
