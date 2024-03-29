import { LightThemeContextProvider } from '../../contexts/LightThemeContext'
import { GameContextProvider } from '../../contexts/GameContext'
import { SelectHeader } from '../../components/common/SelectHeader'
import { Footer } from '../../components/common/Footer'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'

import '../../styles/global.scss'

export const metadata: Metadata = {
  title: {
    default: 'Zignix',
    template: 'Zignix | %s'
  }
}

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: ReactNode
  params: { locale: string }
}>) {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <LightThemeContextProvider>
        <GameContextProvider>
          <html lang={locale}>
            <head>
              <link
                rel="shortcut icon"
                href="/logos/zignix-pink-logo.svg"
                type="image/svg"
              />
            </head>

            <body>
              <SelectHeader />
              {children}
              <Footer />
            </body>
          </html>
        </GameContextProvider>
      </LightThemeContextProvider>
    </NextIntlClientProvider>
  )
}
