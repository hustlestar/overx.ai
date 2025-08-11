import { useEffect, useState } from 'react'

// Theme type
export type Theme = 'light' | 'dark'

// Cookie name for theme - same across all domains
const THEME_COOKIE_NAME = 'overx-theme'

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

function setCookie(name: string, value: string, days: number = 365) {
  if (typeof document === 'undefined') return
  
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  
  // Set cookie with domain .overx.ai for cross-subdomain access
  const domain = window.location.hostname.includes('overx.ai') ? '.overx.ai' : ''
  const cookieString = `${name}=${value}; expires=${expires.toUTCString()}; path=/; ${domain ? `domain=${domain}; ` : ''}SameSite=Lax`
  
  document.cookie = cookieString
  console.log(`[useTheme] Setting cookie: ${cookieString}`)
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)
  
  // Debug logging
  useEffect(() => {
    if (mounted) {
      console.log('[useTheme] Current domain:', window.location.hostname)
      console.log('[useTheme] Theme state:', theme)
    }
  }, [theme, mounted])

  useEffect(() => {
    setMounted(true)
    
    // Load theme from cookie or system preference
    const loadTheme = () => {
      console.log('[useTheme] Loading theme...')
      
      // First try to get theme from cookie
      const cookieTheme = getCookie(THEME_COOKIE_NAME) as Theme | null
      console.log('[useTheme] Cookie theme:', cookieTheme)
      
      if (cookieTheme && (cookieTheme === 'light' || cookieTheme === 'dark')) {
        setThemeState(cookieTheme)
        applyTheme(cookieTheme)
      } else {
        // No cookie, default to dark theme (OverX AI brand preference)
        const defaultTheme: Theme = 'dark'
        console.log('[useTheme] No cookie found, using default:', defaultTheme)
        
        setThemeState(defaultTheme)
        applyTheme(defaultTheme)
        
        // Save to cookie
        setCookie(THEME_COOKIE_NAME, defaultTheme)
      }
    }

    const applyTheme = (themeToApply: Theme) => {
      // Clean up any existing classes
      document.documentElement.classList.remove('light', 'dark')
      
      // Apply theme class to document
      if (themeToApply === 'dark') {
        document.documentElement.classList.add('dark')
      }
      
      console.log('[useTheme] Applied theme class:', themeToApply)
    }

    loadTheme()

    // Poll for cookie changes (since storage events don't work for cookies)
    let lastCookieValue = getCookie(THEME_COOKIE_NAME)
    const pollInterval = setInterval(() => {
      const currentCookieValue = getCookie(THEME_COOKIE_NAME)
      if (currentCookieValue !== lastCookieValue) {
        console.log('[useTheme] Cookie changed from', lastCookieValue, 'to', currentCookieValue)
        lastCookieValue = currentCookieValue
        if (currentCookieValue && (currentCookieValue === 'light' || currentCookieValue === 'dark')) {
          setThemeState(currentCookieValue)
          applyTheme(currentCookieValue)
        }
      }
    }, 1000) // Check every second

    // Listen for theme changes in the same tab
    const handleThemeChange = (e: CustomEvent) => {
      const newTheme = e.detail as Theme
      console.log('[useTheme] Theme change event received:', newTheme)
      setThemeState(newTheme)
      applyTheme(newTheme)
    }
    
    window.addEventListener('theme-change', handleThemeChange as EventListener)
    
    return () => {
      clearInterval(pollInterval)
      window.removeEventListener('theme-change', handleThemeChange as EventListener)
    }
  }, [])

  const setTheme = (newTheme: Theme) => {
    console.log('[useTheme] Setting theme to:', newTheme)
    setThemeState(newTheme)
    
    // Update cookie
    setCookie(THEME_COOKIE_NAME, newTheme)
    
    // Update document class
    document.documentElement.classList.remove('light', 'dark')
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    }

    // Dispatch custom event for immediate updates in the same tab
    window.dispatchEvent(new CustomEvent('theme-change', { detail: newTheme }))
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  // Prevent flash during SSR
  if (!mounted) {
    return { theme: 'dark', toggleTheme, setTheme }
  }

  return { theme, toggleTheme, setTheme }
}