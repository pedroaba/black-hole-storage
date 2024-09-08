import { env } from '@bhs/env'
import { neon, neonConfig } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { migrate } from 'drizzle-orm/neon-http/migrator'

neonConfig.fetchConnectionCache = true

if (!process.env.DIRECT_DATABASE_URL) {
  throw new Error('Invalid environment variable DIRECT_DATABASE_URL')
}

const connection = neon(env.DIRECT_DATABASE_URL)

// @ts-expect-error [ignore]
const db = drizzle(connection)

migrate(db, { migrationsFolder: __dirname.concat('/migrations') }).then(() => {
  console.log('Migrations applied successfully!')
})
