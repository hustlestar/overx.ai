import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'es', 'ru']
const defaultLocale = 'en'

function getLocaleFromCookie(request: NextRequest): string | null {
  const cookieLocale = request.cookies.get('overx-locale')?.value
  if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale
  return null
}

function getLocaleFromBrowser(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') || ''
  const languages = acceptLanguage.split(',').map(lang => lang.trim().split('-')[0].toLowerCase())
  for (const lang of languages) {
    if (locales.includes(lang)) return lang
  }
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  if (!pathnameHasLocale) {
    const locale = getLocaleFromCookie(request) || getLocaleFromBrowser(request)
    const newUrl = new URL(`/${locale}${pathname}`, request.url)
    return NextResponse.redirect(newUrl)
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|manifest.json|locales|images|fonts).*)',
  ],
}
