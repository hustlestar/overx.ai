import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'

// Cookie utilities
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null
  }
  return null
}

// Cross-subdomain language sync using cookies
export function useLanguageSync() {
  const router = useRouter()
  const { locale, pathname, asPath, query } = router
  const [mounted, setMounted] = useState(false)
  const lastKnownLocale = useRef(locale)

  // Enable debug mode via query param or development env
  const [isDebug] = useState(() =>
    process.env.NODE_ENV === 'development' ||
    (typeof window !== 'undefined' && window.location.search.includes('debug=lang'))
  )

  // Log function that respects debug mode
  const log = (message: string, ...args: any[]) => {
    if (isDebug) {
      console.log(`[LanguageSync] ${message}`, ...args)
    }
  }

  // Dynamic domain detection for cookies
  const getCookieDomain = () => {
    if (typeof window === 'undefined') return ''
    const hostname = window.location.hostname

    // For localhost development - no domain restriction
    if (hostname === 'localhost' || hostname.includes('127.0.0.1')) {
      log('Domain: localhost detected, using no domain restriction')
      return ''
    }

    // For production - use .overx.ai for cross-subdomain
    if (hostname.includes('overx.ai')) {
      log('Domain: overx.ai detected, using .overx.ai')
      return '.overx.ai'
    }

    log('Domain: unknown, using no domain restriction')
    return ''
  }

  // Set language cookie with proper domain
  const setLanguageCookie = (newLocale: string) => {
    const domain = getCookieDomain()
    const cookieString = domain
      ? `overx-locale=${newLocale}; domain=${domain}; path=/; max-age=31536000; SameSite=Lax`
      : `overx-locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`

    log(`Setting cookie: ${cookieString}`)
    document.cookie = cookieString

    // Verify cookie was set
    setTimeout(() => {
      const verifyValue = getCookie('overx-locale')
      log(`Cookie verification: overx-locale=${verifyValue}`)
      if (verifyValue !== newLocale) {
        console.error('[LanguageSync] Cookie was not set properly!')
      }
    }, 10)

    // Dispatch custom event for immediate sync in same tab
    window.dispatchEvent(new CustomEvent('language-change', { detail: newLocale }))
  }

  // Check and sync language from cookie
  const checkAndSyncLanguage = () => {
    const cookieLocale = getCookie('overx-locale')

    log('Checking language sync:', {
      cookieLocale,
      currentLocale: locale,
      pathname,
      availableLocales: router.locales,
      query
    })

    // If cookie locale exists, is different, and is valid
    if (cookieLocale &&
        cookieLocale !== locale &&
        router.locales?.includes(cookieLocale)) {

      log(`Syncing locale from ${locale} to ${cookieLocale}`)

      // Build the new path with query parameters preserved
      const queryString = new URLSearchParams(query as any).toString()
      const newAsPath = asPath.replace(new RegExp(`^/${locale}`), `/${cookieLocale}`)

      // Perform the redirect
      router.push(
        {
          pathname,
          query
        },
        newAsPath,
        { locale: cookieLocale, shallow: false }
      ).then(() => {
        log('Language sync completed')
      }).catch((err) => {
        console.error('[LanguageSync] Failed to sync language:', err)
      })

      return true // Sync was needed
    }

    log('No language sync needed')
    return false // No sync needed
  }

  // Set up on mount
  useEffect(() => {
    setMounted(true)
    log('Component mounted, initial locale:', locale)

    // Initial check
    checkAndSyncLanguage()
  }, [])

  // Update cookie when locale changes
  useEffect(() => {
    if (mounted && locale && locale !== lastKnownLocale.current) {
      log(`Locale changed from ${lastKnownLocale.current} to ${locale}`)
      setLanguageCookie(locale)
      lastKnownLocale.current = locale
    }
  }, [locale, mounted])

  // Poll for cookie changes from other tabs/subdomains
  useEffect(() => {
    if (!mounted) return

    let lastCookieValue = getCookie('overx-locale')
    log('Starting cookie polling, initial value:', lastCookieValue)

    const pollInterval = setInterval(() => {
      const currentCookieValue = getCookie('overx-locale')

      // If cookie changed and is different from current locale
      if (currentCookieValue !== lastCookieValue) {
        log(`Cookie changed: ${lastCookieValue} -> ${currentCookieValue}`)
        lastCookieValue = currentCookieValue

        if (currentCookieValue && currentCookieValue !== locale) {
          checkAndSyncLanguage()
        }
      }
    }, 500) // Check every 500ms

    // Listen for same-tab language changes
    const handleLanguageChange = (e: CustomEvent) => {
      const newLocale = e.detail as string
      log('Language change event received:', newLocale)
      if (newLocale !== locale && router.locales?.includes(newLocale)) {
        checkAndSyncLanguage()
      }
    }

    window.addEventListener('language-change', handleLanguageChange as EventListener)

    // Cleanup
    return () => {
      clearInterval(pollInterval)
      window.removeEventListener('language-change', handleLanguageChange as EventListener)
      log('Cleaning up language sync')
    }
  }, [mounted, locale, pathname, asPath])

  // Debug status function
  useEffect(() => {
    if (isDebug && typeof window !== 'undefined') {
      (window as any).debugLanguageSync = () => {
        const cookieLocale = getCookie('overx-locale')
        const info = {
          currentLocale: locale,
          cookieLocale,
          availableLocales: router.locales,
          pathname,
          asPath,
          hostname: window.location.hostname,
          cookieDomain: getCookieDomain(),
          allCookies: document.cookie
        }
        console.table(info)
        return info
      }

      log('Debug function available: window.debugLanguageSync()')
    }
  }, [isDebug, locale, pathname, asPath])
}