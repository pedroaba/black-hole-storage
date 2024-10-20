/* eslint-disable camelcase */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { RotateCw } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { trpc } from '@/lib/trpc/react'

const createChangePasswordSchema = (translations: (key: string) => string) =>
  z
    .object({
      current_password: z
        .string({
          required_error: translations(
            'pages.profile.changePasswordSchema.currentPassword.required',
          ),
        })
        .min(1, {
          message: translations(
            'pages.profile.changePasswordSchema.currentPassword.min',
          ),
        }),
      new_password: z
        .string({
          required_error: translations(
            'pages.profile.changePasswordSchema.newPassword.required',
          ),
        })
        .min(1, {
          message: translations(
            'pages.profile.changePasswordSchema.newPassword.min',
          ),
        }),
      password_confirmation: z
        .string({
          required_error: translations(
            'pages.profile.changePasswordSchema.confirmPassword.required',
          ),
        })
        .min(1, {
          message: translations(
            'pages.profile.changePasswordSchema.confirmPassword.min',
          ),
        }),
    })
    .refine(
      ({ new_password, password_confirmation }) => {
        return new_password === password_confirmation
      },
      {
        message: translations(
          'pages.profile.changePasswordSchema.newPassword.match',
        ),
        path: ['password_confirmation'],
      },
    )

// type ChangePasswordForm = z.infer<typeof changePasswordSchema>

export function ChangePasswordForm() {
  const translations = useTranslations('Profile')
  const messageTranslations = useTranslations('messages')
  const validationTranslations = useTranslations('validation')
  const { mutateAsync, isPending } = trpc.changePassword.useMutation()

  const schema = useMemo(
    () => createChangePasswordSchema(validationTranslations),
    [validationTranslations],
  )
  const form = useForm({
    resolver: zodResolver(schema),
  })

  async function handleChangePassword(data: z.infer<typeof schema>) {
    const { success, message } = await mutateAsync({
      current_password: data.current_password,
      new_password: data.new_password,
    })

    if (success) {
      return toast.success(
        messageTranslations('toasts.pages.profile.changePassword.success'),
        {
          description: message,
        },
      )
    }

    toast.error(messageTranslations('toasts.any.error'), {
      description: message,
    })
  }

  return (
    <Card>
      <CardContent className="mb-4 p-6">
        <div className="mb-4 flex items-center justify-between">
          <CardHeader className="p-0 text-lg">
            {translations('tabs.info.cards.password.title')}
          </CardHeader>
        </div>

        <Form {...form}>
          <form className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="current_password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>
                      {translations(
                        'tabs.info.cards.password.form.fields.oldPassword.label',
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        data-testId="current_password_field"
                        placeholder={translations(
                          'tabs.info.cards.password.form.fields.oldPassword.placeholder',
                        )}
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage data-testId="current_password_message" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>
                      {translations(
                        'tabs.info.cards.password.form.fields.newPassword.label',
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        data-testId="new_password_field"
                        placeholder={translations(
                          'tabs.info.cards.password.form.fields.newPassword.placeholder',
                        )}
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage data-testId="new_password_message" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>
                      {translations(
                        'tabs.info.cards.password.form.fields.confirmationPassword.label',
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        data-testId="new_password_confirmation_field"
                        placeholder={translations(
                          'tabs.info.cards.password.form.fields.confirmationPassword.placeholder',
                        )}
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage data-testId="new_password_confirmation_message" />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4 flex w-full items-center justify-end">
              <Button
                data-testId="change_password_submit_button"
                type="button"
                // @ts-expect-error [ignore]
                onClick={form.handleSubmit(handleChangePassword)}
                disabled={isPending}
                variant="secondary"
              >
                {isPending ? (
                  <RotateCw className="size-4 animate-spin" />
                ) : (
                  translations('tabs.info.cards.password.form.submit.text')
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
