import { Github, LogOut } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import { auth, signOut } from '@/lib/auth'

import { ThemeToggleSubMenu } from './theme-toggle-sub-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export async function UserProfileIcon() {
  const session = await auth()
  const userName =
    session?.user?.name?.trim().split(' ').slice(0, 2).join(' ') ??
    'Unknown User'

  const initialLetters =
    session?.user?.name
      ?.split(' ')
      .reduce((acc, name) => {
        return acc.concat(name.at(0)!)
      }, '')
      .slice(0, 2) ?? 'UU'

  const translations = await getTranslations('navbar')

  async function handleSignOut() {
    'use server'

    await signOut()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:brightness-125">
        <div data-testId="user_profile_menu" className="flex items-center">
          <p className="w-32 truncate capitalize">{userName}</p>
          <Avatar className="size-8">
            <AvatarImage src={session?.user?.image ?? '#'} />
            <AvatarFallback className="bg-zinc-300 font-mono text-xs font-bold uppercase">
              {initialLetters}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem data-testId="profile_page_button">
              <Link className="w-full" href="/profile">
                {translations('profile')}
              </Link>
            </DropdownMenuItem>
            <ThemeToggleSubMenu />
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link
                href="https://github.com/pedroaba/black-hole-storage"
                className="flex w-full items-center justify-between"
              >
                <span>GitHub</span>
                <Github className="size-4" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="https://github.com/pedroaba/black-hole-storage/issues"
                className="flex w-full items-center justify-between"
              >
                <span>{translations('support')}</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <form action={handleSignOut}>
              <DropdownMenuItem>
                <button className="flex w-full items-center justify-between">
                  <span>{translations('logout')}</span>
                  <LogOut className="size-4" />
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
