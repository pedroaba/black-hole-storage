'use server'

import { DrizzleUserRepository } from '@core/drizzle/repositories/drizzle-user.repository'
import { RegisterUserUseCase } from '@core/use-cases/register-user'
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

    const userRepository = new DrizzleUserRepository()
    const registerUserUseCase = new RegisterUserUseCase(userRepository)

    const result = await registerUserUseCase.execute({
      email,
      name,
      password,
    })

    if (!result.value.user) {
      throw new Error(result.value.message)
    }
  })
