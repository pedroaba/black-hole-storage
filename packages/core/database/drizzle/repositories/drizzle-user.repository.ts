import { db } from '@bhs/drizzle'
import { user as userTable } from '@bhs/drizzle/schema'
import type { User } from '@domain/core/entities/user'
import type { UserRepository } from '@domain/core/repositories/user.repository'
import { DrizzleUserMapper } from '@mappers/user.mapper'

export class DrizzleUserRepository implements UserRepository {
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
