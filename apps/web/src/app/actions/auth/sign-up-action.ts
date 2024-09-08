'use server'

import { db } from '@bhs/drizzle'
import { user } from '@bhs/drizzle/schema'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { createServerAction } from 'zsa'

const signSchema = z.object({
  name: z
    .string({
      required_error: 'Insira o seu nome.',
    })
    .min(6, {
      message: 'Você precisa colocar um nome com no mínimo 6 caracteres',
    }),

  email: z
    .string({
      required_error: 'É necessário passar o seu email.',
    })
    .email({
      message: 'Entre com um email válido.',
    }),

  password: z
    .string({
      required_error: 'A senha não pode ser vazia',
    })
    .min(8, {
      message: 'A senha precisa ter no mínimo 8 caracteres',
    }),
})

export const signUpAction = createServerAction()
  .input(signSchema, {
    type: 'json',
  })
  .handler(async function signInWithCredentials({ input }) {
    const { email, password, name } = input

    const drizzleUser = await db.query.user.findFirst({
      where(fields, { eq }) {
        return eq(fields.email, email)
      },
    })

    if (drizzleUser) {
      throw new Error('user already exists.')
    }

    const passwordHash = await hash(password, 10)
    await db.insert(user).values({
      email,
      name,
      password: passwordHash,
    })
  })
