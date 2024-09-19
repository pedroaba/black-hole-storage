import { auth, signOut } from '@bhs/auth'
import { Github, LogOut } from 'lucide-react'
import Link from 'next/link'

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

  async function handleSignOut() {
    'use server'

    await signOut()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:brightness-125">
        <div className="flex items-center">
          <p className="truncate w-32 capitalize">{userName}</p>
          <Avatar className="size-8">
            <AvatarImage src={session?.user?.image ?? '#'} />
            <AvatarFallback className="uppercase text-xs font-bold font-mono">
              {initialLetters}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link className="w-full" href="/profile">
                Perfil
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Link
              href="https://github.com/pedroaba/black-hole-storage"
              className="flex justify-between w-full items-center"
            >
              <span>GitHub</span>
              <Github className="size-4" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href="https://github.com/pedroaba/black-hole-storage/issues"
              className="flex justify-between w-full items-center"
            >
              <span>Suporte</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <form action={handleSignOut}>
            <DropdownMenuItem>
              <button className="w-full flex items-center justify-between">
                <span>Sair</span>
                <LogOut className="size-4" />
              </button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
