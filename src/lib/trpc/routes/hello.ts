import { createTRPCRouter, protectedProcedure } from '../trpc'

export const helloRouter = createTRPCRouter({
  hello: protectedProcedure.query(async () => {
    return {
      message: 'Hello World',
    }
  }),
})
