'use client'
import { LightThemeContextProvider } from '../contexts/LightThemeContext'
import { useIsMobileScreen } from '../hooks/useIsMobileScreen'
import { DesktopHeader } from '../components/common/DesktopHeader'
import { Poppins } from 'next/font/google'
import type { ReactNode } from 'react'
import '../styles/global.scss'

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin']
})

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  const { isMobileScreen } = useIsMobileScreen(905)

  return (
    <LightThemeContextProvider>
      <html lang="en">
        <body className={poppins.className}>
          {!isMobileScreen && <DesktopHeader />}
          {children}
        </body>
      </html>
    </LightThemeContextProvider>
  )
}
