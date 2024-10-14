'use client'

import { useTranslations } from 'next-intl'
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
  const translations = useTranslations('theme')

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>{translations('default')}</DropdownMenuSubTrigger>
      <DropdownMenuSubContent sideOffset={8}>
        <DropdownMenuItem
          className={cn(
            'mb-1',
            theme === 'light' && 'bg-accent text-accent-foreground',
          )}
          onClick={() => setTheme('light')}
        >
          {translations('light')}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            'mb-1',
            theme === 'dark' && 'bg-accent text-accent-foreground',
          )}
          onClick={() => setTheme('dark')}
        >
          {translations('dark')}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            theme === 'system' && 'bg-accent text-accent-foreground',
          )}
          onClick={() => setTheme('system')}
        >
          {translations('system')}
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}
