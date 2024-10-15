'use server'

import { DrizzleUserRepository } from '@core/drizzle/repositories/drizzle-user.repository'
import { RegisterUserUseCase } from '@core/use-cases/register-user'
import { z } from 'zod'
import { createServerAction } from 'zsa'

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
