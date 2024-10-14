import { compareSync, hashSync } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { getTranslations } from 'next-intl/server'
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
      const translations = await getTranslations('messages')
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
          message: translations('routes.generics.userDoesNotExists'),
        }
      }

      const hasSamePasswordOfLoggedUser = compareSync(
        currentPassword,
        userOnDb.password,
      )

      if (!hasSamePasswordOfLoggedUser) {
        return {
          success: false,
          message: translations(
            'routes.profile.changePassword.doesNotMatchWithCurrentPassword',
          ),
        }
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
        message: translations('routes.profile.changePassword.success'),
      }
    }),
})
