import React, { ChangeEvent } from 'react'

import Button from '../ui/Button'

interface TaskInputSectionProps {
  chatText: string
  handleChatChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  handleExtractTasks: () => Promise<void>
}

const TaskInputSection = ({
  chatText,
  handleChatChange,
  handleExtractTasks,
}: TaskInputSectionProps) => {
  return (
    <div className="flex flex-col items-center space-y-10">
      <textarea
        value={chatText}
        onChange={handleChatChange}
        className="w-full rounded-lg border border-gray-300 bg-white p-4 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="ChatGPTとの会話を貼り付けてください"
        rows={15}
      />
      <Button size="lg" className="w-[50vw] max-w-xl" onClick={handleExtractTasks}>
        タスクの抽出
      </Button>
    </div>
  )
}

export default TaskInputSection
