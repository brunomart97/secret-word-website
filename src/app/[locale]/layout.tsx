import { LightThemeContextProvider } from '../../contexts/LightThemeContext'
import { SelectHeader } from '../../components/common/SelectHeader'
import { Poppins } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import type { ReactNode } from 'react'

import '../../styles/global.scss'

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin']
})

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

          <body className={poppins.className}>
            <SelectHeader />
            {children}
          </body>
        </NextIntlClientProvider>
      </html>
    </LightThemeContextProvider>
  )
}
