/* eslint-disable camelcase */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
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

const changePasswordSchema = z
  .object({
    current_password: z.string().min(1, {
      message: 'Você precisa inserir a senha atual para trocar sua senha',
    }),
    new_password: z.string().min(1, {
      message: 'Você precisa inserir a senha atual para trocar sua senha',
    }),
    password_confirmation: z.string().min(1, {
      message: 'Você precisa inserir a senha atual para trocar sua senha',
    }),
  })
  .refine(
    ({ new_password, password_confirmation }) => {
      return new_password !== password_confirmation
    },
    {
      message: 'A nova senha não está igual a confirmação de senha',
      path: ['password_confirmation'],
    },
  )

type ChangePasswordForm = z.infer<typeof changePasswordSchema>

export function ChangePasswordForm() {
  const [isEnableToChangePassword, setIsEnableToChangePassword] =
    useState(false)
  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    disabled: !isEnableToChangePassword,
  })

  function handleToggleFormToChangePassword() {
    setIsEnableToChangePassword((state) => !state)
    form.setValue('current_password', '')
    form.setValue('new_password', '')
    form.setValue('password_confirmation', '')
  }

  return (
    <Card>
      <CardContent className="p-6 mb-4">
        <div className="mb-4 flex justify-between items-center">
          <CardHeader className="p-0 text-lg">Senha</CardHeader>
          <Button
            onClick={handleToggleFormToChangePassword}
            variant={isEnableToChangePassword ? 'destructive' : 'secondary'}
          >
            {!isEnableToChangePassword ? 'Alterar senha' : 'Cancelar'}
          </Button>
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

            {isEnableToChangePassword && (
              <div className="w-full flex items-center justify-end mt-4">
                <Button variant="secondary">Salvar</Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
