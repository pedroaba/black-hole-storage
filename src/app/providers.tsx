'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'

import { ThemeProvider } from '@/components/theme-provider'
import { trpcLinks } from '@/lib/trpc/client'
import { trpc, TRPCProvider } from '@/lib/trpc/react'

type ProviderProps = {
  children: ReactNode
}

export function Providers({ children }: ProviderProps) {
  const [queryClient] = useState(() => {
    return new QueryClient()
  })

  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: trpcLinks,
    })
  })

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TRPCProvider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </TRPCProvider>
    </ThemeProvider>
  )
}
