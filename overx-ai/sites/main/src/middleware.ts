import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Temporarily disable www redirect to fix redirect loop
  // The www to non-www redirect should be handled at the DNS/Vercel level
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - _next/webpack-hmr (webpack HMR)
     * - favicon.ico (favicon file)
     * - robots.txt
     * - sitemap.xml
     * - .well-known
     */
    '/((?!api|_next/static|_next/image|_next/webpack-hmr|favicon.ico|robots.txt|sitemap.xml|.well-known).*)',
  ],
}