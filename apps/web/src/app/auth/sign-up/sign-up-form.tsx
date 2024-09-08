'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

export const signSchema = z
  .object({
    name: z
      .string({
        required_error: 'Insira o seu nome.',
      })
      .min(6, {
        message: 'Você precisa colocar um nome com no mínimo 6 caracteres',
      })
      .transform((name, context) => {
        const nameRefined = name.trim()
        if (nameRefined.length < 6) {
          context.addIssue({
            code: z.ZodIssueCode.too_small,
            minimum: 6,
            type: 'string',
            inclusive: true,
            message: 'Você precisa colocar um nome com no mínimo 6 caracteres',
          })

          return z.NEVER
        }

        return nameRefined
      }),

    email: z
      .string({
        required_error: 'É necessário passar o seu email.',
      })
      .email({
        message: 'Entre com um email válido.',
      }),

    password: z
      .string({
        required_error: 'A senha não pode ser vazia',
      })
      .min(8, {
        message: 'A senha precisa ter no mínimo 8 caracteres',
      })
      .transform((password, context) => {
        const passwordRefined = password.trim()
        if (passwordRefined.length < 8) {
          context.addIssue({
            code: z.ZodIssueCode.too_small,
            minimum: 6,
            type: 'string',
            inclusive: true,
            message: 'A senha precisa ter no mínimo 8 caracteres',
          })

          return z.NEVER
        }

        return passwordRefined
      }),
    confirmPassword: z.string({
      required_error: 'Insira a confirmação da senha',
    }),
  })
  .refine(({ confirmPassword, password }) => password === confirmPassword, {
    message: 'As senhas não são iguais',
    path: ['password'],
  })

export type SignInSchema = z.infer<typeof signSchema>

export function SignUpForm() {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signSchema),
  })

  async function handleSignUp(data: SignInSchema) {
    console.log(data)
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
              <FormLabel>Nome *</FormLabel>
              <FormControl>
                <Input placeholder="Ex: John Doe" {...field} />
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
              <FormLabel>E-mail *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: johndoe@email.com"
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
              <FormLabel>Senha *</FormLabel>
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
              <FormLabel>Confirmar senha *</FormLabel>
              <FormControl>
                <Input placeholder="●●●●●●●●●●●●" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-6">
          <Button className="w-full" variant="secondary">
            Embarcar
          </Button>
        </div>
      </form>
    </Form>
  )
}
