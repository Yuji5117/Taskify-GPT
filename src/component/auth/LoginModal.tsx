'use client'

import Image from 'next/image'
import { signIn } from 'next-auth/react'
import React, { useEffect } from 'react'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  if (!isOpen) return <></>

  return (
    <div
      onClick={onClose}
      className={'fixed inset-0 z-30 flex items-center justify-center bg-black/30'}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative z-50 w-[30vw] max-w-md rounded-md bg-white p-6 shadow-lg"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-6 cursor-pointer text-4xl text-gray-400 transition-colors hover:text-gray-600"
        >
          &times;
        </button>

        <div className="flex justify-center">
          <h2 className="mt-4 mb-6 text-center text-4xl font-bold">Taskify-GPT</h2>
        </div>
        <p className="mb-6 text-sm leading-relaxed text-gray-600">
          ChatGPTとの会話からタスクを作成し、GitHub Issueとして管理できるツールです。
        </p>
        <div className="mb-6 flex justify-center">
          <button
            onClick={() => signIn()}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-400 px-12 py-2 transition-colors hover:bg-blue-100"
          >
            <Image src="/github.svg" alt="Github" width={20} height={20} />
            <span>Githubでログイン</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
