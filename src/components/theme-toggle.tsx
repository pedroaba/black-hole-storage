'use client'

import { Moon, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const translations = useTranslations('theme')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{translations('toggle')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
