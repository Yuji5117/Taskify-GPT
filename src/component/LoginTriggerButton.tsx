'use client'

import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import React, { useState } from 'react'

import LoginModal from './auth/LoginModal'
import Button from './ui/Button'

interface LoginTriggerButtonProps {
  session: Session | null
}

const LoginTriggerButton = ({ session }: LoginTriggerButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <>
      {session ? (
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
