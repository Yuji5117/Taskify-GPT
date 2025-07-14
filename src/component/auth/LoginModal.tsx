"use client";

import Image from "next/image";
import React from "react";

const LoginModal = () => {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/30">
      <div className="w-[30vw] max-w-md p-6 bg-white z-50 rounded-md shadow-lg relative">
        <button className="text-4xl transition-colors absolute top-4 right-6 text-gray-400 hover:text-gray-600 cursor-pointer">
          &times;
        </button>

        <div className="flex justify-center">
          <h2 className="text-center text-4xl font-bold mt-4 mb-6">
            Taskify-GPT
          </h2>
        </div>
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          ChatGPTとの会話からタスクを作成し、GitHub
          Issueとして管理できるツールです。
        </p>
        <div className="flex justify-center mb-6">
          <button className="flex items-center gap-2 px-12 border border-gray-400 rounded-full py-2 hover:bg-blue-100 transition-colors cursor-pointer">
            <Image src="/github.svg" alt="Github" width={20} height={20} />
            <span>Githubでログイン</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
