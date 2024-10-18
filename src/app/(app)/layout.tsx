import type { ReactNode } from 'react'

type AppLayoutProps = {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <main className="flex h-[calc(100vh-56px)] flex-col bg-zinc-50 dark:bg-zinc-900/5">
      {children}
    </main>
  )
}
