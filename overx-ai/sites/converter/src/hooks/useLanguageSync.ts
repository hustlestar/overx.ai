import { useEffect } from 'react'
import { useRouter } from 'next/router'

// Cross-subdomain language sync using cookies
export function useLanguageSync() {
  const router = useRouter()
  const { locale } = router

  // Set cookie on language change
  useEffect(() => {
    if (locale) {
      // Set cookie that works across all subdomains
      document.cookie = `overx-locale=${locale}; domain=.overx.ai; path=/; max-age=31536000; SameSite=Lax`
    }
  }, [locale])

  // Read cookie on mount and sync language
  useEffect(() => {
    console.log('[Converter useLanguageSync] Reading cookies on mount...')
    console.log('[Converter useLanguageSync] Raw cookie string:', document.cookie)
    
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=')
      acc[key] = value
      return acc
    }, {} as Record<string, string>)
    
    console.log('[Converter useLanguageSync] Parsed cookies:', cookies)
    
    const cookieLocale = cookies['overx-locale']
    console.log('[Converter useLanguageSync] Cookie locale:', cookieLocale, 'Current locale:', locale)
    console.log('[Converter useLanguageSync] Available locales:', router.locales)
    
    if (cookieLocale && cookieLocale !== locale && router.locales?.includes(cookieLocale)) {
      console.log('[Converter useLanguageSync] Syncing locale from', locale, 'to', cookieLocale)
      // Change locale without full page reload
      router.push(router.pathname, router.asPath, { locale: cookieLocale })
    } else {
      console.log('[Converter useLanguageSync] No sync needed')
    }
  }, [])
}