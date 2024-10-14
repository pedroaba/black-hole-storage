import './globals.css'

import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

// import Link from 'next/link'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'

import { Providers } from './providers'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Black Hole Storage',
    default: 'Black Hole Storage',
  },
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-screen min-h-screen`}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header />
            {children}

            {/* <span className="fixed text-zinc-950 dark:text-zinc-50 font-semibold text-xs bottom-4 left-1/2 -translate-x-1/2 z-50">
            developed by{' '}
            <Link
              href="https://github.com/pedroaba"
              rel="search"
              className="hover:underline"
              target="_blank"
            >
              pedr.augustobarbosa.aparecido@gmail.com
            </Link>
          </span> */}

            <Toaster richColors position="top-center" closeButton />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
