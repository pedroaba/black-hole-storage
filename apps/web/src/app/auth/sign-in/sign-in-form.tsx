'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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

export const signSchema = z.object({
  email: z
    .string({
      required_error: 'É necessário passar o seu email.',
    })
    .email({
      message: 'Entre com um email válido.',
    }),

  password: z.string({
    required_error: 'A senha não pode ser vazia',
  }),
})

export type SignInSchema = z.infer<typeof signSchema>

export function SignInForm() {
  const { execute, isPending } = useServerAction(signInWithCredentialsAction)
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signSchema),
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
      message: 'E-mail ou senha incorretos.',
    })

    form.setError('password', {
      type: 'value',
      message: 'E-mail ou senha incorretos.',
    })
  }

  async function handleSignIn(data: SignInSchema) {
    const [, error] = await execute(data)
    if (error) {
      showInvalidCredentialError()

      toast.error('Credenciais inválidas', {
        description: 'E-mail ou senha inválidos',
      })
    }
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
              <FormLabel>E-mail *</FormLabel>
              <FormControl>
                <Input placeholder="Ex: johndoe@email.com" {...field} />
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
              <FormLabel>Senha *</FormLabel>
              <FormControl>
                <Input placeholder="●●●●●●●●●●●●" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-6">
          <Button className="w-full" variant="secondary" disabled={isPending}>
            Embarcar
          </Button>
        </div>
      </form>
    </Form>
  )
}
