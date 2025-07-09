"use client";

import { ChangeEvent, useState } from "react";

export default function Home() {
  const [chatText, setChatText] = useState<string>("");

  const handleChatChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setChatText(e.target.value);
  };
  const handleExtractTasks = () => {
    alert(chatText);
  };

  return (
    <div>
      <main>
        <div>
          <textarea
            value={chatText}
            onChange={handleChatChange}
            className="border"
            placeholder="ChatGPTとの会話を貼り付けてください"
          />
          <button onClick={handleExtractTasks}>タスクの抽出</button>
        </div>
      </main>
    </div>
  );
}
