import type { AdapterUser as AdapterUserBase } from '@auth/core/adapters'
import type { DefaultSession, User as DefaultUser } from 'next-auth'
import type { DefaultJWT } from 'next-auth/jwt'

declare module '@auth/core/adapters' {
  export interface AdapterUser extends AdapterUserBase {
    password: string
  }
}

declare module 'next-auth' {
  interface User extends DefaultUser {
    password: string
  }

  export interface Session extends DefaultSession {
    user: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {}
}
