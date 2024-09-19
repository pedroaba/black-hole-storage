import type { ReactNode } from 'react'

type AuthLayoutProps = {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="h-[calc(100vh-56px)] w-screen dark:bg-zinc-900 bg-zinc-50 bg-[url(/black-hole-in-nebula.jpg)] bg-cover bg-no-repeat">
      {children}
    </main>
  )
}
