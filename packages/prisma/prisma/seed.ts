import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient({
  log: ['query'],
})

async function bootstrap() {
  const commonHashedPassword = await hash('development', 10)

  const user = await prisma.user.create({
    data: {
      email: 'johndoe@email.com',
      password: commonHashedPassword,
      name: 'Pedro Augusto Barbosa Aparecido',
    },
  })

  console.log(`Created user: ${user.name}`)
  console.log(`
    Access:
      - E-mail: ${user.email}
      - Password: development
    `)
}

bootstrap()
  .then(() => console.log('database was seeded! 🚀'))
  .finally(() => {
    prisma.$disconnect()
  })
