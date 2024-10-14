import type { Metadata } from 'next'
import Link from 'next/link'

import { SignInForm } from './sign-in-form'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default async function Login() {
  return (
    <div className="grid h-full w-full grid-cols-3">
      <div className="col-span-2 space-y-10 pl-32 pt-40">
        <h1 className="text-3xl font-extrabold text-zinc-200">
          Acesse o Universo dos seus Arquivos
        </h1>
        <p className="w-5/6 text-lg font-semibold text-zinc-100">
          Mergulhe no infinito com nossa solução estelar de armazenamento em
          nuvem. Com o Black Hole Storage, você entra em uma dimensão de
          segurança impenetrável e acessibilidade ilimitada. Explore, gerencie e
          proteja seus arquivos no vasto universo digital. Prepare-se para uma
          experiência cósmica onde seus dados são tão vastos quanto o espaço.
        </p>
      </div>
      <div className="h-full w-full bg-zinc-50 dark:bg-zinc-900">
        <div className="pr-8 pt-6 text-right">
          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            Não tenho uma conta ainda?
          </span>{' '}
          <Link
            href="/auth/sign-up"
            className="text-xs font-semibold text-blue-800 underline dark:text-blue-400"
          >
            Cadastrar
          </Link>
        </div>

        <div className="my-16 flex flex-col px-8">
          <h1 className="mb-10 text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
            Embarcar no sistema
          </h1>

          <SignInForm />
        </div>

        <div className="relative my-4 flex items-center rounded-full px-8">
          <div className="h-px w-full bg-zinc-400 dark:bg-zinc-500" />

          <span className="absolute -top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-zinc-50 px-4 text-sm text-zinc-400 dark:bg-zinc-900 dark:text-zinc-500">
            ou
          </span>
        </div>

        <p className="my-8 mb-5 px-8 text-center text-sm text-zinc-800 dark:text-zinc-200">
          Em breve você poderá embarcar no sistema através da sua conta social.
        </p>

        <div className="px-8">
          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            Não tenho uma conta ainda?
          </span>{' '}
          <Link
            href="/auth/sign-up"
            className="text-xs font-semibold text-blue-800 underline dark:text-blue-400"
          >
            Cadastrar
          </Link>
        </div>
      </div>
    </div>
  )
}
