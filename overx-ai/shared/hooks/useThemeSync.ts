import { useEffect } from 'react'
import { useTheme } from './useTheme'

// Cross-subdomain theme sync using BroadcastChannel or postMessage
export function useThemeSync() {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // Try to use BroadcastChannel first (better for same-origin)
    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel('overx-theme-sync')
      
      // Listen for theme changes from other tabs/windows
      channel.onmessage = (event) => {
        if (event.data.type === 'theme-change' && event.data.theme !== theme) {
          setTheme(event.data.theme)
        }
      }

      // Broadcast our theme changes
      const broadcastTheme = () => {
        channel.postMessage({ type: 'theme-change', theme })
      }
      
      // Send current theme on mount
      broadcastTheme()
      
      return () => {
        channel.close()
      }
    }
    
    // Fallback: Listen for storage events (works across tabs but not subdomains)
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

  // For cross-subdomain sync, we'll also set a cookie
  useEffect(() => {
    // Set cookie that works across subdomains
    document.cookie = `overx-theme=${theme}; domain=.overx.ai; path=/; max-age=31536000; SameSite=Lax`
  }, [theme])

  // Read cookie on mount to sync initial theme
  useEffect(() => {
    const cookies = document.cookie.split(';')
    const themeCookie = cookies.find(c => c.trim().startsWith('overx-theme='))
    
    if (themeCookie) {
      const cookieTheme = themeCookie.split('=')[1] as 'light' | 'dark'
      if (cookieTheme && cookieTheme !== theme) {
        setTheme(cookieTheme)
      }
    }
  }, [])
}