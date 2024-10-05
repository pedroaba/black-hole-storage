import { type Either, left, right } from '@core/either'
import { ResourceNotFoundError } from '@core/errors/resource-not-found-error'
import { User } from '@domain/core/entities/user'
import type { UserRepository } from '@domain/core/repositories/user.repository'

type GetUserProfileUseCaseRequest = {
  id: string
}

type GetUserProfileUseCaseResponse = Either<
  ResourceNotFoundError,
  { user: User }
>

export class GetUserProfileUseCase {
  constructor(private userRepository: UserRepository) {}

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
