import type { AppRouter } from '@bhs/trpc'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<AppRouter>()

export const TRPCProvider = trpc.Provider
