/* eslint-disable camelcase */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { RotateCw } from 'lucide-react'
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

const changePasswordSchema = z
  .object({
    current_password: z
      .string({
        required_error: 'Type a valid password.',
      })
      .min(1, {
        message: 'Você precisa inserir a senha atual para trocar sua senha',
      }),
    new_password: z
      .string({
        required_error: 'Type a valid password.',
      })
      .min(1, {
        message: 'Você precisa inserir a senha atual para trocar sua senha',
      }),
    password_confirmation: z
      .string({
        required_error: 'Type a valid password.',
      })
      .min(1, {
        message: 'Você precisa inserir a senha atual para trocar sua senha',
      }),
  })
  .refine(
    ({ new_password, password_confirmation }) => {
      return new_password === password_confirmation
    },
    {
      message: 'A nova senha não está igual a confirmação de senha',
      path: ['password_confirmation'],
    },
  )

type ChangePasswordForm = z.infer<typeof changePasswordSchema>

export function ChangePasswordForm() {
  const { mutateAsync, isPending } = trpc.changePassword.useMutation()
  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
  })

  async function handleChangePassword(data: ChangePasswordForm) {
    const { success, message } = await mutateAsync({
      current_password: data.current_password,
      new_password: data.new_password,
    })

    if (success) {
      return toast.success('Password has been changed', {
        description: message,
      })
    }

    toast.error('Any error was occurred, please try again later.', {
      description: message,
    })
  }

  return (
    <Card>
      <CardContent className="mb-4 p-6">
        <div className="mb-4 flex items-center justify-between">
          <CardHeader className="p-0 text-lg">Senha</CardHeader>
        </div>

        <Form {...form}>
          <form className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="current_password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Senha antiga</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="senha antiga"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Nova Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="nova senha"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Confirme sua senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="confirme sua nova senha"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4 flex w-full items-center justify-end">
              <Button
                type="button"
                onClick={form.handleSubmit(handleChangePassword)}
                disabled={isPending}
                variant="secondary"
              >
                {isPending ? (
                  <RotateCw className="size-4 animate-spin" />
                ) : (
                  'Salvar'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
