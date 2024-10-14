import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { type NextRequest, NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { appRouter } from '@/lib/trpc'

const handler = async (req: NextRequest) => {
  try {
    const response = await fetchRequestHandler({
      endpoint: '/api/trpc',
      req,
      router: appRouter,
      createContext: async () => {
        const session = await auth()

        return {
          session,
        }
      },
      onError: ({ error }) => {
        console.error('BANANA:', error)

        if (error.code === 'INTERNAL_SERVER_ERROR') {
          // TODO: send to bug reporting
        }
      },
    })

    return new NextResponse(response.body, {
      headers: response.headers,
      status: response.status,
      statusText: response.statusText,
    })
  } catch (err) {
    console.error(err)
  }
}

export const runtime = 'edge'
export const preferredRegion = 'cle1'
export { handler as GET, handler as POST }
