'use server'

import { hashSync } from 'bcryptjs'
import { z } from 'zod'
import { createServerAction } from 'zsa'

import { db } from '@/drizzle'
import { user } from '@/drizzle/schema'

const signSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
})

export const signUpAction = createServerAction()
  .input(signSchema, {
    type: 'json',
  })
  .handler(async function signInWithCredentials({ input }) {
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
  })
