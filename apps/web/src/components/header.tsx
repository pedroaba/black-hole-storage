import Logo from '@assets/icon.png'
import Image from 'next/image'
import Link from 'next/link'

import { ThemeToggle } from './theme-toggle'

export function Header() {
  return (
    <header className="h-12 items-center justify-between w-full pr-3 pl-5 py-2 flex bg-zinc-100 dark:bg-zinc-950">
      <Link href="/" rel="author" className="flex items-center gap-4">
        <Image src={Logo} alt="black hole blue color" className="size-6" />
        <span className="font-semibold text-xl">Black Hole Storage</span>
      </Link>

      <div className="flex items-center gap-2">
        <Link href="/auth/sign-in" className="mr-2 hover:underline">
          Sign In
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
