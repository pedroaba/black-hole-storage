import Image from 'next/image'
import Link from 'next/link'

import Logo from '@/assets/icon.png'
import { auth } from '@/lib/auth'

import { ThemeToggle } from './theme-toggle'
import { UserProfileIcon } from './user-profile-icon'

export async function Header() {
  const session = await auth()

  return (
    <header className="flex h-14 w-full items-center justify-between bg-zinc-100 py-2 pl-5 pr-3 dark:bg-zinc-950">
      <Link href="/" rel="author" className="flex items-center gap-4">
        <Image src={Logo} alt="black hole blue color" className="size-6" />
        <span className="text-xl font-semibold">Black Hole Storage</span>
      </Link>

      <div className="flex items-center gap-2">
        {session?.user && <UserProfileIcon />}
        {!session?.user && (
          <>
            <ThemeToggle />
            <Link href="/auth/sign-in" className="mr-2 hover:underline">
              Sign In
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
