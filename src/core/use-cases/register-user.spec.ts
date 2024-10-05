import { ResourceConflictError } from '@core/errors/resource-conflict-error'
import { makeUser } from '@test/factories/make-user'
import { InMemoryUserDatabase } from '@test/repositories/in-memory-user-repository'

import { RegisterUserUseCase } from './register-user'

let inMemoryUserDatabase: InMemoryUserDatabase
let sut: RegisterUserUseCase

describe('Register User Use Case', () => {
  beforeEach(() => {
    inMemoryUserDatabase = new InMemoryUserDatabase()
    sut = new RegisterUserUseCase(inMemoryUserDatabase)
  })

  it('should be to register user', async () => {
    const user = makeUser()

    const result = await sut.execute(user)

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserDatabase.items[0]).toMatchObject(
      expect.objectContaining({
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      }),
    )

    expect(inMemoryUserDatabase.items[0].id).toBeTruthy()
  })

  it('should not be able to register user with same email', async () => {
    inMemoryUserDatabase.items.push(makeUser({ email: 'johndoe@gmail.com' }))
    const result = await sut.execute(makeUser({ email: 'johndoe@gmail.com' }))

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceConflictError)
  })

  it('should be able to hash password when register user', async () => {
    const user = makeUser({
      password: 'development',
    })

    const result = await sut.execute(user)

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserDatabase.items[0].password).not.toEqual('development')
  })
})
