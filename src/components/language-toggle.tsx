'use client'

import { setCookie } from 'cookies-next'
import { Languages } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { ValidLocales } from '@/i18n/request'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  // DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function LanguageToggle() {
  const router = useRouter()
  const translations = useTranslations('language')

  function handleSetLanguageOnCookies(language: ValidLocales) {
    setCookie('locale', language, {
      maxAge: 60 * 60 * 24 * 365 * 3, // 3 years
    })

    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button data-testId="language_button" variant="ghost">
          <Languages className="mr-2 size-4 text-foreground" />
          {translations('trigger')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          {/* <DropdownMenuLabel>Languages</DropdownMenuLabel> */}

          <DropdownMenuItem
            data-testId="lan_select_en"
            onClick={() => handleSetLanguageOnCookies('en')}
          >
            {translations('en')}
          </DropdownMenuItem>
          <DropdownMenuItem
            data-testId="lan_select_pot-BR"
            onClick={() => handleSetLanguageOnCookies('pt-BR')}
          >
            {translations('pt-BR')}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
