import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { helloRouter } from './routes/hello'
import { profileRoute } from './routes/profile.route'
import { createCallerFactory, mergeRouters } from './trpc'

export const appRouter = mergeRouters(helloRouter, profileRoute)

export { createCallerFactory }

export type AppRouter = typeof appRouter
export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
