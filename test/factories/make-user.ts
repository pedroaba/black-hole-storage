import { db } from '@/drizzle'
import { user } from '@/drizzle/schema'
import type { UniqueEntityId } from '@core/general/entities/value-objects/unique-entity-id'
import { User, type UserProps } from '@core/domain/core/entities/user'
import { faker } from '@faker-js/faker'
import { DrizzleUserMapper } from '@core/drizzle/mappers/user.mapper'

export function makeUser(
    override: Partial<UserProps> = {},
    id?: UniqueEntityId,
) {
    return User.create(
        {
            email: faker.internet.email(),
            name: faker.person.fullName(),
            password: faker.internet.password(),
            avatarUrl: faker.image.avatar(),
            ...override,
        },
        id,
    )
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
