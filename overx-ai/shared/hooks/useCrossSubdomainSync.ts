import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from './useTheme'

interface SyncData {
  theme: 'light' | 'dark'
  locale: string
}

// Cross-subdomain sync for theme and language
export function useCrossSubdomainSync() {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const { locale } = router

  // Sync to cookies (works across subdomains)
  useEffect(() => {
    // Set cookies that work across all subdomains
    document.cookie = `overx-theme=${theme}; domain=.overx.ai; path=/; max-age=31536000; SameSite=Lax`
    document.cookie = `overx-locale=${locale}; domain=.overx.ai; path=/; max-age=31536000; SameSite=Lax`
  }, [theme, locale])

  // Read cookies on mount to sync initial state
  useEffect(() => {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=')
      acc[key] = value
      return acc
    }, {} as Record<string, string>)
    
    // Sync theme from cookie
    const cookieTheme = cookies['overx-theme'] as 'light' | 'dark' | undefined
    if (cookieTheme && cookieTheme !== theme) {
      setTheme(cookieTheme)
    }
    
    // Sync locale from cookie
    const cookieLocale = cookies['overx-locale']
    if (cookieLocale && cookieLocale !== locale && router.locales?.includes(cookieLocale)) {
      // Change locale without full page reload
      router.push(router.pathname, router.asPath, { locale: cookieLocale })
    }
  }, [])

  // BroadcastChannel for same-origin sync (between tabs)
  useEffect(() => {
    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel('overx-sync')
      
      // Listen for changes from other tabs
      channel.onmessage = (event) => {
        const data = event.data as SyncData
        
        if (data.theme !== theme) {
          setTheme(data.theme)
        }
        
        if (data.locale !== locale && router.locales?.includes(data.locale)) {
          router.push(router.pathname, router.asPath, { locale: data.locale })
        }
      }

      // Broadcast current state
      const broadcastState = () => {
        channel.postMessage({ theme, locale } as SyncData)
      }
      
      // Send current state on mount and changes
      broadcastState()
      
      return () => {
        channel.close()
      }
    }
  }, [theme, locale, setTheme, router])

  // Storage event for cross-tab sync (fallback)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme-storage' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue)
          if (parsed.state.theme !== theme) {
            setTheme(parsed.state.theme)
          }
        } catch (error) {
          console.error('Failed to parse theme storage:', error)
        }
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [theme, setTheme])
}