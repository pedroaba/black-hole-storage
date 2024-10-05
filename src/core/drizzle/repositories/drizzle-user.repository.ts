import { db } from '@/drizzle'
import { user as userTable } from '@/drizzle/schema'
import type { User } from '@core/domain/core/entities/user'
import type { UserRepository } from '@core/domain/core/repositories/user.repository'
import { DrizzleUserMapper } from '@core/drizzle/mappers/user.mapper'

export class DrizzleUserRepository implements UserRepository {
    findById(userId: string): Promise<User | null> {
        throw new Error('Method not implemented.')
    }

    async findByEmail(email: string): Promise<User | null> {
        const userOnDb = await db.query.user.findFirst({
            where: (fields, { eq }) => eq(fields.email, email),
        })

        if (!userOnDb) {
            return null
        }

        return DrizzleUserMapper.toDomain(userOnDb)
    }

    async create(user: User): Promise<void> {
        const drizzleUser = DrizzleUserMapper.toDrizzle(user)

        await db.insert(userTable).values(drizzleUser)
    }
}
