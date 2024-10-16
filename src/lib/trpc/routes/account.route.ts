import { hashSync } from 'bcryptjs'
import { z } from 'zod'

import { db } from '@/drizzle'
import { user } from '@/drizzle/schema'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const accountRoute = createTRPCRouter({
  createAccount: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string(),
        password: z.string(),
        // avatarUrl: z.string().url().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      console.log(input)
      const { email, name, password } = input

      const userOnDb = await db.query.user.findFirst({
        where: (fields, { eq }) => eq(fields.email, email),
      })

      if (userOnDb) {
        return {
          success: false,
          message: 'Resource already exists!',
        }
      }

      const passwordHash = hashSync(password, 10)
      await db.insert(user).values({
        email,
        name,
        password: passwordHash,
        // image: avatarUrl,
      })

      return {
        success: true,
        message: 'User was created with success!',
      }
    }),
})
