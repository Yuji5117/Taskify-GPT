import React, { ChangeEvent } from "react";
import Button from "../ui/Button";

interface TaskInputSectionProps {
  chatText: string;
  handleChatChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleExtractTasks: () => Promise<void>;
}

const TaskInputSection = ({
  chatText,
  handleChatChange,
  handleExtractTasks,
}: TaskInputSectionProps) => {
  return (
    <div className="py-10 flex flex-col items-center">
      <textarea
        value={chatText}
        onChange={handleChatChange}
        className="w-full p-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
        placeholder="ChatGPTとの会話を貼り付けてください"
        rows={15}
      />
      <Button
        size="lg"
        className="mt-6 w-[50vw] max-w-xl"
        onClick={handleExtractTasks}
      >
        タスクの抽出
      </Button>
    </div>
  );
};

export default TaskInputSection;
