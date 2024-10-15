'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { useServerAction } from 'zsa-react'

import { signUpAction } from '@/app/actions/auth/sign-up-action'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export const createSignSchema = (t: (k: string) => string) =>
  z
    .object({
      name: z
        .string({
          required_error: t('signUp.schema.name.required'),
        })
        .min(6, {
          message: t('signUp.schema.name.min'),
        })
        .transform((name, context) => {
          const nameRefined = name.trim()
          if (nameRefined.length < 6) {
            context.addIssue({
              code: z.ZodIssueCode.too_small,
              minimum: 6,
              type: 'string',
              inclusive: true,
              message: t('signUp.schema.name.min'),
            })

            return z.NEVER
          }

          return nameRefined
        }),

      email: z
        .string({
          required_error: t('signUp.schema.email.required'),
        })
        .email({
          message: t('signUp.schema.email.format'),
        }),

      password: z
        .string({
          required_error: t('signUp.schema.password.required'),
        })
        .min(8, {
          message: t('signUp.schema.password.min'),
        })
        .transform((password, context) => {
          const passwordRefined = password.trim()
          if (passwordRefined.length < 8) {
            context.addIssue({
              code: z.ZodIssueCode.too_small,
              minimum: 6,
              type: 'string',
              inclusive: true,
              message: t('signUp.schema.password.min'),
            })

            return z.NEVER
          }

          return passwordRefined
        }),
      confirmPassword: z.string({
        required_error: t('signUp.schema.confirmationPassword.required'),
      }),
    })
    .refine(({ confirmPassword, password }) => password === confirmPassword, {
      message: t('signUp.schema.password.match'),
      path: ['password'],
    })

// export type SignUpSchema = z.infer<typeof signSchema>

export function SignUpForm() {
  const t = useTranslations('SignUp')
  const tValidation = useTranslations('validation')
  const tMessage = useTranslations('messages')
  const router = useRouter()

  const { execute, isPending } = useServerAction(signUpAction)

  const schema = createSignSchema(tValidation)
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    disabled: isPending,
  })

  async function handleSignUp({
    email,
    name,
    password,
  }: z.infer<typeof schema>) {
    const [, error] = await execute({
      email,
      password,
      name,
    })

    if (error) {
      toast.error(tMessage('toasts.pages.signUp.failed.title'), {
        description: error.message,
      })

      return
    }

    toast.success(tMessage('toasts.pages.signUp.success.title'))
    router.replace('/auth/sign-in')
  }

  return (
    <Form {...form}>
      <form
        className="w-full space-y-4"
        onSubmit={form.handleSubmit(handleSignUp)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.fields.name.label')} *</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('form.fields.name.placeholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.fields.email.label')} *</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('form.fields.email.placeholder')}
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.fields.password.label')} *</FormLabel>
              <FormControl>
                <Input placeholder="●●●●●●●●●●●●" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.fields.confirmPassword.label')} *</FormLabel>
              <FormControl>
                <Input placeholder="●●●●●●●●●●●●" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-6">
          <Button className="w-full" variant="secondary" disabled={isPending}>
            {isPending ? (
              <LoaderCircle className="size-4 animate-spin text-zinc-800 dark:text-zinc-100" />
            ) : (
              t('form.submit.text')
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
