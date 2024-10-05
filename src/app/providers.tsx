'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'

import { ThemeProvider } from '@/components/theme-provider'

type ProviderProps = {
  children: ReactNode
}

export function Providers({ children }: ProviderProps) {
  const [queryClient] = useState(() => {
    return new QueryClient()
  })

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  )
}
