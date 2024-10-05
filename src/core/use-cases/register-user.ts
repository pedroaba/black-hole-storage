import { user as userTable } from '@/drizzle/schema'
import { type Either, left, right } from '@core/general/either'
import { ResourceConflictError } from '@core/general/errors/resource-conflict-error'
import type { Nullable } from '@core/general/types/nullable'
import { User } from '@core/domain/core/entities/user'
import type { UserRepository } from '@core/domain/core/repositories/user.repository'
import { hash } from 'bcryptjs'

type RegisterUserUseCaseRequest = Omit<
    typeof userTable.$inferInsert,
    'id' | 'emailVerified' | 'image'
> & {
    avatarUrl?: Nullable<string>
}

type RegisterUserUseCaseResponse = Either<ResourceConflictError, { user: User }>

export class RegisterUserUseCase {
    constructor(private userRepository: UserRepository) {
    }

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
