import createMiddleware from 'next-intl/middleware'
import { locales } from './constants/translate'

export default createMiddleware({
  locales,
  defaultLocale: 'en'
})

export const config = {
  matcher: ['/', '/game', '/about', '/(en|pt|es)/:path*']
}
