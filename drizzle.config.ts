import { env } from '@/env'
import { type Config, defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './src/drizzle/schema/index.ts',
    out: './src/drizzle/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: env.DATABASE_URL,
    },
} as Config)
