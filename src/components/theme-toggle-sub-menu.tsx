'use client'

import { useTheme } from 'next-themes'

import { cn } from '@/lib/utils'

import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from './ui/dropdown-menu'

export function ThemeToggleSubMenu() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Tema</DropdownMenuSubTrigger>
      <DropdownMenuSubContent sideOffset={8}>
        <DropdownMenuItem
          className={cn(
            'mb-1',
            theme === 'light' && 'bg-accent text-accent-foreground',
          )}
          onClick={() => setTheme('light')}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            'mb-1',
            theme === 'dark' && 'bg-accent text-accent-foreground',
          )}
          onClick={() => setTheme('dark')}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            theme === 'system' && 'bg-accent text-accent-foreground',
          )}
          onClick={() => setTheme('system')}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}
