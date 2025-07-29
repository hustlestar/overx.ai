import { useEffect, useState } from 'react'

// Theme type
export type Theme = 'light' | 'dark'

// Storage key - same across all domains for consistent UX
const THEME_STORAGE_KEY = 'theme-storage'

// Theme storage structure to match zustand's persist format
interface ThemeStorage {
  state: {
    theme: Theme
  }
  version: number
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Clean up any existing classes on mount
    document.documentElement.classList.remove('light', 'dark')
    
    // Load theme from localStorage
    const loadTheme = () => {
      try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY)
        if (stored) {
          const parsed: ThemeStorage = JSON.parse(stored)
          setThemeState(parsed.state.theme)
          
          // Apply theme class to document
          document.documentElement.classList.remove('light', 'dark')
          if (parsed.state.theme === 'dark') {
            document.documentElement.classList.add('dark')
          }
        } else {
          // Check system preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          const defaultTheme = prefersDark ? 'dark' : 'light'
          setThemeState(defaultTheme)
          
          // Save default to localStorage
          const storage: ThemeStorage = {
            state: { theme: defaultTheme },
            version: 0
          }
          localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(storage))
          
          document.documentElement.classList.remove('light', 'dark')
          if (defaultTheme === 'dark') {
            document.documentElement.classList.add('dark')
          }
        }
      } catch (error) {
        console.error('Failed to load theme:', error)
      }
    }

    loadTheme()

    // Listen for storage changes (from other tabs/windows)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY) {
        loadTheme()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Listen for theme changes in the same tab
    const handleThemeChange = (e: CustomEvent) => {
      setThemeState(e.detail as Theme)
    }
    
    window.addEventListener('theme-change', handleThemeChange as EventListener)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('theme-change', handleThemeChange as EventListener)
    }
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    
    // Update localStorage in zustand format for compatibility
    const storage: ThemeStorage = {
      state: { theme: newTheme },
      version: 0
    }
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(storage))
    
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