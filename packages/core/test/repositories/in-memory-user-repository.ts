import type { User } from '@domain/core/entities/user'
import type { UserRepository } from '@domain/core/repositories/user.repository'

export class InMemoryUserDatabase implements UserRepository {
  public items: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email)
    if (!user) {
      return null
    }

    return user
  }

  async create(user: User): Promise<void> {
    this.items.push(user)
  }
}
