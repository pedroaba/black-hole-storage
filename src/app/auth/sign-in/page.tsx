import type { Metadata } from 'next'
import Link from 'next/link'

import { SignInForm } from './sign-in-form'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function Login() {
  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="col-span-2 pt-40 pl-32 space-y-10">
        <h1 className="text-3xl font-extrabold text-zinc-200">
          Acesse o Universo dos seus Arquivos
        </h1>
        <p className="text-lg text-zinc-100 w-5/6 font-semibold">
          Mergulhe no infinito com nossa solução estelar de armazenamento em
          nuvem. Com o Black Hole Storage, você entra em uma dimensão de
          segurança impenetrável e acessibilidade ilimitada. Explore, gerencie e
          proteja seus arquivos no vasto universo digital. Prepare-se para uma
          experiência cósmica onde seus dados são tão vastos quanto o espaço.
        </p>
      </div>
      <div className="w-full h-full bg-zinc-50 dark:bg-zinc-900">
        <div className="pt-6 pr-8 text-right">
          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            Não tenho uma conta ainda?
          </span>{' '}
          <Link
            href="/auth/sign-up"
            className="text-xs font-semibold text-blue-800 dark:text-blue-400 underline"
          >
            Cadastrar
          </Link>
        </div>

        <div className="flex px-8 flex-col my-16">
          <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-10">
            Embarcar no sistema
          </h1>

          <SignInForm />
        </div>

        <div className="px-8 rounded-full relative flex items-center my-4">
          <div className="h-px bg-zinc-400 dark:bg-zinc-500 w-full" />

          <span className="text-sm text-zinc-400 dark:text-zinc-500 absolute -top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-zinc-50 dark:bg-zinc-900 z-50 px-4">
            ou
          </span>
        </div>

        <p className="text-sm text-zinc-800 px-8 text-center my-8 mb-5 dark:text-zinc-200">
          Em breve você poderá embarcar no sistema através da sua conta social.
        </p>

        <div className="px-8">
          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            Não tenho uma conta ainda?
          </span>{' '}
          <Link
            href="/auth/sign-up"
            className="text-xs font-semibold text-blue-800 dark:text-blue-400 underline"
          >
            Cadastrar
          </Link>
        </div>
      </div>
    </div>
  )
}
