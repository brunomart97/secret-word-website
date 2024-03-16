import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './constants/translate'

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true
})

export const config = {
  matcher: ['/', '/game', '/about', '/(en|pt|es)/:path*']
}
