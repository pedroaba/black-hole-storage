import type { User } from '../entities/user'

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>
  abstract create(user: User): Promise<void>
  abstract findById(userId: string): Promise<User | null>
}
