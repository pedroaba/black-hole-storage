import type { ReactNode } from 'react'

type AppLayoutProps = {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <main className="h-[calc(100vh-56px)] w-screen dark:bg-zinc-900/5 bg-zinc-50">
      {children}
    </main>
  )
}
