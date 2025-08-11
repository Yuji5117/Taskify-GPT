import '@/styles/globals.css'
import { getServerSession } from 'next-auth'

import LoginTriggerButton from '@/component/LoginTriggerButton'
import { authOptions } from '@/lib/auth'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Taskify-GPT',
  description:
    'An AI-powered tool that turns your ChatGPT conversations into clear, actionable tasks. Ideal for developers and project managers. Open-source on GitHub.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="flex min-h-screen flex-col">
          <header className="h-14 bg-amber-50">
            <div className="mx-auto flex h-full max-w-6xl items-center justify-between">
              <h1 className="text-xl font-bold">Taskify-GPT</h1>
              <LoginTriggerButton session={session} />
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="flex justify-center bg-blue-900">
            <div className="text-sm text-white">© 2025 Polylingo</div>
          </footer>
        </div>
      </body>
    </html>
  )
}
