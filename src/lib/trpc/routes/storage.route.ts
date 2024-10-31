import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'

import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2 } from '@/lib/storage/r2'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { env } from '@/env'
import { db } from '@/drizzle'
import { file } from '@/drizzle/schema'

export const storageRoute = createTRPCRouter({
  getSignedUrl: protectedProcedure
    .input(
      z.object({
        filename: z.string(),
        filesize: z.coerce.number(),
        filetype: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const [fileCreated] = await db
        .insert(file)
        .values({
          name: input.filename,
          size: input.filesize,
          userId: ctx.session.user.id!,
        })
        .returning()

      const uniqueFilename = `${fileCreated.id}-${fileCreated.name}`
      const signedUrl = await getSignedUrl(
        r2,
        new PutObjectCommand({
          Bucket: env.AWS_BUCKET_NAME,
          ContentType: input.filetype,
          Key: uniqueFilename,
        }),
        {
          expiresIn: 600,
        },
      )

      return {
        signedUrl,
        fileId: fileCreated.id,
      }
    }),
})
