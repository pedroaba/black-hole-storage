import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { profileRoute } from './routes/profile.route'
import { createCallerFactory, mergeRouters } from './trpc'

export const appRouter = mergeRouters(profileRoute)

export { createCallerFactory }

export type AppRouter = typeof appRouter
export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
