import { UniqueEntityId } from '@core/entities/value-objects/unique-entity-id'
import { ResourceNotFoundError } from '@core/errors/resource-not-found-error'
import { makeUser } from '@test/factories/make-user'
import { InMemoryUserDatabase } from '@test/repositories/in-memory-user-repository'

import { GetUserProfileUseCase } from './get-user-profile'

let inMemoryUserDatabase: InMemoryUserDatabase
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    inMemoryUserDatabase = new InMemoryUserDatabase()
    sut = new GetUserProfileUseCase(inMemoryUserDatabase)
  })

  it('should be to recovery user profile', async () => {
    inMemoryUserDatabase.items.push(
      makeUser(),
      makeUser({ email: 'john@email.com' }, new UniqueEntityId('user-id')),
      makeUser(),
    )

    const result = await sut.execute({
      id: 'user-id',
    })

    expect(result.isRight()).toBe(true)

    // @ts-expect-error [ignore]
    expect(result.value.user).toMatchObject(
      expect.objectContaining({
        id: new UniqueEntityId('user-id'),
        email: 'john@email.com',
      }),
    )
  })

  it('should not be to recovery user profile with wrong id', async () => {
    inMemoryUserDatabase.items.push(makeUser(), makeUser(), makeUser())

    const result = await sut.execute({
      id: 'user-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
