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

  // Function to check and sync language from cookie
  const checkAndSyncLanguage = () => {
    console.log('[useLanguageSync] Checking cookie for language sync...')
    console.log('[useLanguageSync] Raw cookie string:', document.cookie)
    
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const trimmedCookie = cookie.trim()
      const eqIndex = trimmedCookie.indexOf('=')
      if (eqIndex > 0) {
        const key = trimmedCookie.substring(0, eqIndex).trim()
        const value = trimmedCookie.substring(eqIndex + 1).trim()
        if (key && value) {
          acc[key] = value
        }
      }
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
  }

  // Check on mount
  useEffect(() => {
    checkAndSyncLanguage()
  }, [])

  // Poll for cookie changes every 2 seconds to detect cross-subdomain changes
  useEffect(() => {
    const interval = setInterval(() => {
      checkAndSyncLanguage()
    }, 2000)

    // Also check on window focus
    const handleFocus = () => {
      console.log('[useLanguageSync] Window focused, checking for language sync...')
      checkAndSyncLanguage()
    }
    
    window.addEventListener('focus', handleFocus)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('focus', handleFocus)
    }
  }, [locale, router])
}