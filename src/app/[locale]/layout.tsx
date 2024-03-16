import { LightThemeContextProvider } from '../../contexts/LightThemeContext'
import { SelectHeader } from '../../components/common/SelectHeader'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import type { ReactNode } from 'react'

import '../../styles/global.scss'

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: ReactNode
  params: { locale: string }
}>) {
  const messages = await getMessages()

  return (
    <LightThemeContextProvider>
      <html lang={locale}>
        <NextIntlClientProvider messages={messages}>
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
          </body>
        </NextIntlClientProvider>
      </html>
    </LightThemeContextProvider>
  )
}
