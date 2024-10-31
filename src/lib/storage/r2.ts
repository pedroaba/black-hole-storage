import { S3Client } from '@aws-sdk/client-s3'

import { env } from '@/env'

export const accountId = env.CLOUDFLARE_ACCOUNT_ID
export const bucketEndpoint = `https://${accountId}.r2.cloudflarestorage.com/${env.AWS_BUCKET_NAME}`
export const r2 = new S3Client({
  region: 'auto',
  endpoint: bucketEndpoint,
  credentials: {
    accessKeyId: env.AWS_BUCKET_ACCESS_KEY,
    secretAccessKey: env.AWS_BUCKET_SECRET_ACCESS_KEY,
  },
})
