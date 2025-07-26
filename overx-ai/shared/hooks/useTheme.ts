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
    
    // Load theme from localStorage
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY)
      if (stored) {
        const parsed: ThemeStorage = JSON.parse(stored)
        setThemeState(parsed.state.theme)
        
        // Apply theme class to document
        if (parsed.state.theme === 'light') {
          document.documentElement.classList.add('light')
        } else {
          document.documentElement.classList.remove('light')
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
        
        if (defaultTheme === 'light') {
          document.documentElement.classList.add('light')
        }
      }
    } catch (error) {
      console.error('Failed to load theme:', error)
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
    if (newTheme === 'light') {
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
    }
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