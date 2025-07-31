import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'es', 'ru']
const defaultLocale = 'en'

function getLocaleFromCookie(request: NextRequest): string | null {
  const cookieLocale = request.cookies.get('overx-locale')?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }
  return null
}

function getLocaleFromBrowser(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') || ''
  const languages = acceptLanguage.split(',').map(lang => {
    const [code] = lang.trim().split('-')
    return code.toLowerCase()
  })
  
  for (const lang of languages) {
    if (locales.includes(lang)) {
      return lang
    }
  }
  
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Check if the pathname already includes a locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  if (!pathnameHasLocale) {
    // First check cookie, then browser preference
    const locale = getLocaleFromCookie(request) || getLocaleFromBrowser(request)
    
    // Redirect to the locale-prefixed path
    const newUrl = new URL(`/${locale}${pathname}`, request.url)
    return NextResponse.redirect(newUrl)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc)
    '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|site.webmanifest|locales|images|fonts).*)',
  ],
}