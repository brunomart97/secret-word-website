import { Poppins } from 'next/font/google'
import { LightThemeContextProvider } from '../../contexts/LightThemeContext'
import { GameContextProvider } from '../../contexts/GameContext'
import { SelectHeader } from '../../components/common/SelectHeader'
import { Footer } from '../../components/common/Footer'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'

import '../../styles/global.scss'

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

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

              <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1023788139836717"
                crossOrigin="anonymous"
              />
            </head>

            <body className={poppins.className}>
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
