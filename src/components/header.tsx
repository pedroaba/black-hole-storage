import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import Logo from '@/assets/icon.png'
import { auth } from '@/lib/auth'

import { LanguageToggle } from './language-toggle'
import { ThemeToggle } from './theme-toggle'
import { UserProfileIcon } from './user-profile-icon'

export async function Header() {
  const session = await auth()
  const t = await getTranslations('navbar')

  return (
    <header className="flex h-14 w-full items-center justify-between bg-zinc-100 py-2 pl-5 pr-3 dark:bg-zinc-950">
      <Link href="/" rel="author" className="flex items-center gap-4">
        <Image src={Logo} alt="black hole blue color" className="size-6" />
        <span className="text-xl font-semibold">Black Hole Storage</span>
      </Link>

      <div className="flex items-center gap-2">
        <LanguageToggle />
        {session?.user && <UserProfileIcon />}
        {!session?.user && (
          <>
            <ThemeToggle />
            <Link
              data-testId="sign_in_header_button"
              href="/auth/sign-in"
              className="mr-2 hover:underline"
            >
              {t('signIn')}
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
