'use client'

import { signOut } from 'next-auth/react'
import React, { useState } from 'react'

import LoginModal from './auth/LoginModal'
import Button from './ui/Button'

interface LoginTriggerButtonProps {
  isAuthenticated: boolean
}

const LoginTriggerButton = ({ isAuthenticated }: LoginTriggerButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <>
      {isAuthenticated ? (
        <Button size="sm" onClick={() => signOut()}>
          Log out
        </Button>
      ) : (
        <Button size="sm" onClick={() => setIsModalOpen(true)}>
          Log in
        </Button>
      )}
      {isModalOpen && <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  )
}

export default LoginTriggerButton
