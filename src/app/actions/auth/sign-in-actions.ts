'use server'

import { z } from 'zod'
import { createServerAction } from 'zsa'

import { signIn } from '@/lib/auth'

const signSchema = z.object({
  email: z
    .string({
      required_error: 'É necessário passar o seu email.',
    })
    .email({
      message: 'Entre com um email válido.',
    }),

  password: z.string({
    required_error: 'A senha não pode ser vazia',
  }),
})

export const signInWithCredentialsAction = createServerAction()
  .input(signSchema, {
    type: 'json',
  })
  .handler(async function signInWithCredentials({ input }) {
    const { email, password } = input

    const response = await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    })

    return response
  })
