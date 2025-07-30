import { useEffect } from 'react'
import { useRouter } from 'next/router'

// Cross-subdomain language sync using cookies
export function useLanguageSync() {
  const router = useRouter()
  const { locale } = router
  
  console.log('[useLanguageSync] Current domain:', typeof window !== 'undefined' ? window.location.hostname : 'SSR')
  console.log('[useLanguageSync] Current locale:', locale)

  // Set cookie on language change
  useEffect(() => {
    if (locale) {
      // Set cookie that works across all subdomains
      const cookieString = `overx-locale=${locale}; domain=.overx.ai; path=/; max-age=31536000; SameSite=Lax`
      console.log('[useLanguageSync] Setting cookie:', cookieString)
      document.cookie = cookieString
      
      // Verify cookie was set
      console.log('[useLanguageSync] All cookies after set:', document.cookie)
    }
  }, [locale])

  // Read cookie on mount and sync language
  useEffect(() => {
    console.log('[useLanguageSync] Reading cookies on mount...')
    console.log('[useLanguageSync] Raw cookie string:', document.cookie)
    
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=')
      acc[key] = value
      return acc
    }, {} as Record<string, string>)
    
    console.log('[useLanguageSync] Parsed cookies:', cookies)
    
    const cookieLocale = cookies['overx-locale']
    console.log('[useLanguageSync] Cookie locale:', cookieLocale, 'Current locale:', locale)
    console.log('[useLanguageSync] Available locales:', router.locales)
    
    if (cookieLocale && cookieLocale !== locale && router.locales?.includes(cookieLocale)) {
      console.log('[useLanguageSync] Syncing locale from', locale, 'to', cookieLocale)
      // Change locale without full page reload
      router.push(router.pathname, router.asPath, { locale: cookieLocale })
    } else {
      console.log('[useLanguageSync] No sync needed')
    }
  }, [])
}