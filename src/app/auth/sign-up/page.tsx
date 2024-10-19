import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import { SignUpForm } from './sign-up-form'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default async function SignUp() {
  const t = await getTranslations('SignUp')

  return (
    <div className="grid h-full w-full grid-cols-3">
      <div className="col-span-2 space-y-10 pl-32 pt-40">
        <h1 className="text-3xl font-extrabold text-zinc-200">{t('title')}</h1>
        <p className="w-5/6 text-lg font-semibold text-zinc-100">
          {t('description')}
        </p>
      </div>
      <div className="h-full w-full bg-zinc-50 dark:bg-zinc-900">
        <div className="pr-8 pt-6 text-right">
          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            {t('form.signWithAccount.text')}
          </span>{' '}
          <Link
            data-testId="sign_in_button_top"
            href="/auth/sign-in"
            className="text-xs font-semibold text-blue-800 underline dark:text-blue-400"
          >
            {t('form.signWithAccount.link')}
          </Link>
        </div>

        <div className="my-16 flex flex-col px-8">
          <h1 className="mb-10 text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
            {t('form.title')}
          </h1>

          <SignUpForm />
        </div>

        <div className="relative my-4 flex items-center rounded-full px-8">
          <div className="h-px w-full bg-zinc-400 dark:bg-zinc-500" />

          <span className="absolute -top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-zinc-50 px-4 text-sm text-zinc-400 dark:bg-zinc-900 dark:text-zinc-500">
            {t('form.separator')}
          </span>
        </div>

        <p className="my-8 mb-5 px-8 text-center text-sm text-zinc-800 dark:text-zinc-200">
          {t('form.comingSoon')}
        </p>

        <div className="px-8">
          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            {t('form.signWithAccount.text')}
          </span>{' '}
          <Link
            data-testId="sign_in_button_bottom"
            href="/auth/sign-in"
            className="text-xs font-semibold text-blue-800 underline dark:text-blue-400"
          >
            {t('form.signWithAccount.link')}
          </Link>
        </div>
      </div>
    </div>
  )
}
