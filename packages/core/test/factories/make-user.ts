import { db } from '@bhs/drizzle'
import { user } from '@bhs/drizzle/schema'
import type { UniqueEntityId } from '@core/entities/value-objects/unique-entity-id'
import { User, type UserProps } from '@domain/core/entities/user'
import { faker } from '@faker-js/faker'
import { DrizzleUserMapper } from '@mappers/user.mapper'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityId,
) {
  const user = User.create(
    {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      avatarUrl: faker.image.avatar(),
      ...override,
    },
    id,
  )

  return user
}

export class UserFactory {
  static async makeDrizzleUser(
    data: Partial<UserProps> = {},
    id?: UniqueEntityId,
  ) {
    const fakeUser = makeUser(data, id)

    await db.insert(user).values(DrizzleUserMapper.toDrizzle(fakeUser))
    return fakeUser
  }
}
