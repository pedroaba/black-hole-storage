import { cookies, headers } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'

export const VALID_LOCALES = ['en', 'pt-BR'] as const
export type ValidLocales = (typeof VALID_LOCALES)[number]

export default getRequestConfig(async () => {
  const cookieLocale = cookies().get('locale')?.value || null
  const headerLocale = headers().get('accept-language')?.split(',')[0] || null

  let locale = cookieLocale || headerLocale || 'en'

  const isValidLocale = VALID_LOCALES.includes(locale as ValidLocales)
  if (!isValidLocale) {
    locale = 'en'
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
