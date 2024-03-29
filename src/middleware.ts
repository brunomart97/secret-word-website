import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './constants/translate'

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true
})

export const config = {
  matcher: ['/', '/game', '/rules', '/(en|pt|es)/:path*']
}
