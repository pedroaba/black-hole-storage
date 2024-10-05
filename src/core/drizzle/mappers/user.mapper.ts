import type { user } from '@/drizzle/schema'
import { UniqueEntityId } from '@core/general/entities/value-objects/unique-entity-id'
import { User } from '@core/domain/core/entities/user'

type DrizzleUserTable = typeof user.$inferInsert

export class DrizzleUserMapper {
    static toDrizzle(raw: User) {
        return {
            email: raw.email,
            id: raw.id.toString(),
            name: raw.name,
            password: raw.password,
            image: raw.avatarUrl,
        }
    }

    static toDomain(raw: DrizzleUserTable) {
        return User.create(
            {
                email: raw.email,
                name: raw.name,
                password: raw.password,
                avatarUrl: raw.image,
            },
            new UniqueEntityId(raw.id),
        )
    }
}
