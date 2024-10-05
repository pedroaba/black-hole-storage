import { user as userTable } from '@bhs/drizzle/schema'
import { type Either, left, right } from '@core/either'
import { ResourceConflictError } from '@core/errors/resource-conflict-error'
import type { Nullable } from '@core/types/nullable'
import { User } from '@domain/core/entities/user'
import type { UserRepository } from '@domain/core/repositories/user.repository'
import { hash } from 'bcryptjs'

type RegisterUserUseCaseRequest = Omit<
  typeof userTable.$inferInsert,
  'id' | 'emailVerified' | 'image'
> & {
  avatarUrl?: Nullable<string>
}

type RegisterUserUseCaseResponse = Either<ResourceConflictError, { user: User }>

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    name,
    password,
    avatarUrl,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userOnDb = await this.userRepository.findByEmail(email)
    if (userOnDb) {
      return left(new ResourceConflictError())
    }

    const passwordHashed = await hash(password, 10)
    const user = User.create({
      email,
      name,
      password: passwordHashed,
      avatarUrl,
    })

    await this.userRepository.create(user)

    return right({
      user,
    })
  }
}
