import { db } from '@/drizzle'
import { compare } from 'bcryptjs'
import { CredentialsSignin } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const credentialsProvider = Credentials({
    name: 'credentials-provider',
    credentials: {
        email: {
            type: 'email',
        },
        password: {
            type: 'password',
        },
    },
    async authorize(credentials) {
        try {
            if (!(credentials?.email && credentials?.password)) {
                throw new CredentialsSignin('invalid credentials')
            }

            const { email, password } = credentials

            const userOnDb = await db.query.user.findFirst({
                where(fields, { eq }) {
                    return eq(fields.email, email as string)
                },
            })

            if (!userOnDb) {
                throw new CredentialsSignin('invalid credentials')
            }

            const passwordMatches = await compare(
                password as string,
                userOnDb.password as string,
            )

            if (passwordMatches) {
                return userOnDb
            }

            throw new CredentialsSignin('invalid credentials')
        } catch (error) {
            throw new CredentialsSignin('invalid credentials')
        }
    },
})
