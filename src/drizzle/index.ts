import { env } from '@/env'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

import * as schema from './schema'

const client = neon(env.DATABASE_URL)

// @ts-expect-error [ignore]
export const db = drizzle(client, { schema })
