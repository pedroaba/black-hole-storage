import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { accountRoute } from './routes/account.route'
import { profileRoute } from './routes/profile.route'
import { createCallerFactory, mergeRouters } from './trpc'
import { storageRoute } from './routes/storage.route'

export const appRouter = mergeRouters(profileRoute, accountRoute, storageRoute)

export { createCallerFactory }

export type AppRouter = typeof appRouter
export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
