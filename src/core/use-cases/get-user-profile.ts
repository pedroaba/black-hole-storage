import { type Either, left, right } from '@core/general/either'
import { ResourceNotFoundError } from '@core/general/errors/resource-not-found-error'
import { User } from '@core/domain/core/entities/user'
import type { UserRepository } from '@core/domain/core/repositories/user.repository'

type GetUserProfileUseCaseRequest = {
    id: string
}

type GetUserProfileUseCaseResponse = Either<
    ResourceNotFoundError,
    { user: User }
>

export class GetUserProfileUseCase {
    constructor(private userRepository: UserRepository) {
    }

    async execute({
                      id: userId,
                  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        const user = await this.userRepository.findById(userId)
        if (!user) {
            return left(new ResourceNotFoundError())
        }

        return right({
            user,
        })
    }
}
