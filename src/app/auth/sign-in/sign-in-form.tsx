'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { useServerAction } from 'zsa-react'

import { signInWithCredentialsAction } from '@/app/actions/auth/sign-in-actions'
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
  z.object({
    email: z
      .string({
        required_error: t('pages.signIn.schema.email.required'),
      })
      .email({
        message: t('pages.signIn.schema.email.format'),
      }),

    password: z.string({
      required_error: t('pages.signIn.schema.password.required'),
    }),
  })

// export type SignInSchema = z.infer<typeof signSchema>

export function SignInForm() {
  const t = useTranslations('SignIn')
  const tValidation = useTranslations('validation')
  const tMessage = useTranslations('messages')

  const { execute, isPending } = useServerAction(signInWithCredentialsAction)

  const schema = useMemo(() => createSignSchema(tValidation), [tValidation])
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    disabled: isPending,
  })

  function showInvalidCredentialError() {
    form.resetField('email', {
      defaultValue: '',
    })

    form.resetField('password', {
      defaultValue: '',
    })

    form.setError('email', {
      type: 'required',
      message: tValidation('pages.signIn.invalidCredentials'),
    })

    form.setError('password', {
      type: 'value',
      message: tValidation('pages.signIn.invalidCredentials'),
    })
  }

  async function handleSignIn(data: z.infer<typeof schema>) {
    const [, error] = await execute(data)
    if (error) {
      showInvalidCredentialError()

      toast.error(tMessage('toasts.pages.signIn.failed.title'), {
        description: tValidation('pages.signIn.invalidCredentials'),
      })

      return
    }

    toast.success(tMessage('toasts.pages.signIn.success.title'), {
      description: tMessage('toasts.pages.signIn.success.message'),
    })
  }

  return (
    <Form {...form}>
      <form
        className="w-full space-y-4"
        onSubmit={form.handleSubmit(handleSignIn)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.fields.email.label')} *</FormLabel>
              <FormControl>
                <Input
                  data-testId="email_field"
                  placeholder={t('form.fields.email.placeholder')}
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
                <Input
                  data-testId="password_field"
                  placeholder="●●●●●●●●●●●●"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-6">
          <Button
            data-testId="login_submit_button"
            className="w-full"
            variant="secondary"
            disabled={isPending}
          >
            {t('form.submit.text')}
          </Button>
        </div>
      </form>
    </Form>
  )
}
