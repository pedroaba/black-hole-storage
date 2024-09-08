import type { Adapter } from '@auth/core/adapters'
import { prisma } from '@bhs/prisma'
import { hash } from 'bcryptjs'

export const prismaAdapter: Adapter = {
  async createUser(newUser) {
    const passwordHashed = await hash(newUser.password, 10)

    const prismaUser = await prisma.user.create({
      data: {
        ...newUser,
        password: passwordHashed,
      },
    })

    return prismaUser
  },

  async getUser(userId) {
    const prismaUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    })

    return prismaUser
  },

  async getUserByEmail(userEmail) {
    const prismaUser = await prisma.user.findFirst({
      where: {
        email: userEmail,
      },
    })

    return prismaUser
  },

  async getUserByAccount({ provider, providerAccountId }) {
    const prismaUser = await prisma.user.findFirst({
      where: {
        accounts: {
          some: {
            provider,
            providerAccountId,
          },
        },
      },
    })

    return prismaUser
  },

  async updateUser({ id: userId, ...user }) {
    const prismaUserUpdated = await prisma.user.update({
      where: {
        id: userId,
      },
      data: user,
    })

    return prismaUserUpdated
  },

  async linkAccount(newAccount) {
    await prisma.account.create({
      data: newAccount,
    })
  },

  async createSession(newSession) {
    const prismaSession = await prisma.session.create({
      data: newSession,
    })

    return prismaSession
  },

  async getSessionAndUser(sessionToken) {
    const session = await prisma.session.findFirst({
      where: {
        sessionToken,
      },
      include: {
        user: true,
      },
    })

    if (!session) {
      return null
    }

    return {
      user: session.user,
      session,
    }
  },

  async updateSession({ sessionToken, ...session }) {
    const prismaSessionUpdated = await prisma.session.update({
      where: {
        sessionToken,
      },
      data: session,
    })

    return prismaSessionUpdated
  },

  async deleteSession(sessionToken) {
    await prisma.session.delete({
      where: {
        sessionToken,
      },
    })
  },
}
