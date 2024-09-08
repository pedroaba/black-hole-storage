import Link from 'next/link'

import { SignUpForm } from './sign-up-form'

export default function SignUp() {
  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="col-span-2 pt-40 pl-32 space-y-10">
        <h1 className="text-3xl font-extrabold text-zinc-200">
          Explore Novos Horizontes
        </h1>
        <p className="text-lg text-zinc-100 w-5/6 font-semibold">
          Desbrave o desconhecido e expanda suas possibilidades com o Black Hole
          Storage. Ao criar sua conta, você abre as portas para um universo de
          armazenamento seguro e ilimitado, onde seus arquivos estão protegidos
          nas profundezas do cosmos digital. Junte-se a nós e comece sua jornada
          no espaço infinito de segurança e acessibilidade. Está pronto para
          entrar em órbita?
        </p>
      </div>
      <div className="w-full h-full bg-zinc-50 dark:bg-zinc-900">
        <div className="pt-6 pr-8 text-right">
          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            Já tenho uma conta?
          </span>{' '}
          <Link
            href="/auth/sign-in"
            className="text-xs font-semibold text-blue-800 dark:text-blue-400 underline"
          >
            Embarcar
          </Link>
        </div>

        <div className="flex px-8 flex-col my-16">
          <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-10">
            Embarcar no sistema
          </h1>

          <SignUpForm />
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
            Já tenho uma conta?
          </span>{' '}
          <Link
            href="/auth/sign-in"
            className="text-xs font-semibold text-blue-800 dark:text-blue-400 underline"
          >
            Embarcar
          </Link>
        </div>
      </div>
    </div>
  )
}
