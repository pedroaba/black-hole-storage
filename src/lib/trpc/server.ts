import 'server-only'

import { auth } from '@/lib/auth'

import { appRouter, createCallerFactory } from '.'

export const serverClient = createCallerFactory(appRouter)(async () => {
  const session = await auth()

  return { session }
})
