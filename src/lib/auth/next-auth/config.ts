import type { NextAuthConfig, Session } from 'next-auth'

import { drizzleAuthAdapter } from './adapters/drizzle'
import { credentialsProvider } from './providers/credentials'

export const authConfig = {
  adapter: drizzleAuthAdapter,
  providers: [credentialsProvider],
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ account }) {
      if (account?.provider === 'credentials') {
        return true
      }

      return false
    },
    jwt({ token, session, trigger, user }) {
      function isSessionAvailable(session: unknown): session is Session {
        return !!session
      }

      if (trigger === 'update' && isSessionAvailable(session)) {
        token.name = session?.user?.name ?? user.name
      }

      return token
    },
    session({ session, ...params }) {
      if ('token' in params && session.user) {
        session.user.id = params.token.sub!
      }

      return session
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user

      const isOnPublicAPIRoutes =
        nextUrl.pathname.startsWith('/api/auth') ||
        nextUrl.pathname.startsWith('/api/trpc/register')
      const isOnAPIRoutes = nextUrl.pathname.startsWith('/api')
      const isOnPublicPages = nextUrl.pathname.startsWith('/auth')
      const isOnPublicBackgroundImage = nextUrl.pathname.startsWith(
        '/black-hole-in-nebula.jpg',
      )
      const isOnPrivatePages = !isOnPublicPages

      if (isOnPublicAPIRoutes || isOnPublicBackgroundImage) {
        return true
      }

      if (isOnPublicPages && isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl))
      }

      if (isOnAPIRoutes && !isLoggedIn) {
        return Response.json({ message: 'Unauthorized.' }, { status: 401 })
      }

      if (isOnPrivatePages && !isLoggedIn) {
        return false
      }

      return true
    },
  },
} satisfies NextAuthConfig
