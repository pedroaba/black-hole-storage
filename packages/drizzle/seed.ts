import { env } from '@bhs/env'
import { hash } from 'bcryptjs'

import { db } from '.'
import { user } from './schema'

async function seed() {
  console.log(env.DATABASE_URL)
  const passwordHashed = await hash('development', 10)

  await db
    .insert(user)
    .values({
      email: 'admin@bhs.com',
      name: 'Admin',
      password: passwordHashed,
      image:
        'https://u-static.fotor.com/images/text-to-image/result/PRO-46b42e8c3d76417789d9b982c9d36e9e.jpg',
    })
    .onConflictDoNothing()

  console.log(`
    Access:

    - Email: admin@bhs.com
    - Password: development    
    `)
}

seed()
