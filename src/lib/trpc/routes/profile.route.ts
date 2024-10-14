import { TRPCError } from '@trpc/server'
import { compareSync, hashSync } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { db } from '@/drizzle'
import { user } from '@/drizzle/schema'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const profileRoute = createTRPCRouter({
  changePassword: protectedProcedure
    .input(
      z.object({
        current_password: z.string(),
        new_password: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { current_password: currentPassword, new_password: newPassword } =
        input
      const { session } = ctx

      const userOnDb = await db.query.user.findFirst({
        where: (fields, { eq }) => {
          return eq(fields.id, session.user.id!)
        },
      })

      if (!userOnDb) {
        return {
          success: false,
          message: 'User does not exists!',
        }
      }

      const hasSamePasswordOfLoggedUser = compareSync(
        currentPassword,
        userOnDb.password,
      )

      if (!hasSamePasswordOfLoggedUser) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'The passwords does not match with current password',
        })
      }

      const passwordHashed = hashSync(newPassword, 10)

      await db
        .update(user)
        .set({
          password: passwordHashed,
        })
        .where(eq(user.id, userOnDb.id))
        .returning()

      return {
        success: true,
        message: 'Password was changed with success',
      }
    }),
})
