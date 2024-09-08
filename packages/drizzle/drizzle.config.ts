import { env } from '@bhs/env'
import { type Config, defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './schema/index.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} as Config)
