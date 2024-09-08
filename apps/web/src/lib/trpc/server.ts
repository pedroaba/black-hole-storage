import 'server-only'

import { auth } from '@bhs/auth'
import { appRouter, createCallerFactory } from '@bhs/trpc'

export const serverClient = createCallerFactory(appRouter)(async () => {
  const session = await auth()

  return { session }
})
