import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || request.nextUrl.hostname
  
  // Redirect www to non-www
  if (hostname.startsWith('www.')) {
    const nonWwwUrl = request.nextUrl.clone()
    nonWwwUrl.hostname = hostname.replace('www.', '')
    return NextResponse.redirect(nonWwwUrl, 301)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}