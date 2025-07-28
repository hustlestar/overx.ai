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
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=')
      acc[key] = value
      return acc
    }, {} as Record<string, string>)
    
    const cookieLocale = cookies['overx-locale']
    if (cookieLocale && cookieLocale !== locale && router.locales?.includes(cookieLocale)) {
      // Change locale without full page reload
      router.push(router.pathname, router.asPath, { locale: cookieLocale })
    }
  }, [])
}