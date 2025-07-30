import { useEffect } from 'react'
import { useTheme } from './useTheme'

// Sync theme between Zustand and shared theme storage
export function useThemeSync() {
  const { theme, setTheme } = useTheme()
  
  useEffect(() => {
    console.log('[Converter useThemeSync] Initializing theme sync...')
    console.log('[Converter useThemeSync] Current theme:', theme)
    
    // Listen for storage changes from other domains/tabs
    const handleStorageChange = (e: StorageEvent) => {
      console.log('[Converter useThemeSync] Storage event:', e.key, e.newValue, 'from:', e.url)
      
      if (e.key === 'theme-storage' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue)
          console.log('[Converter useThemeSync] Parsed storage value:', parsed)
          
          // Check if it's from the shared hook format
          if (parsed.state && parsed.state.theme) {
            const newTheme = parsed.state.theme
            if (newTheme !== theme) {
              console.log('[Converter useThemeSync] Syncing theme from', theme, 'to', newTheme)
              setTheme(newTheme)
            }
          }
        } catch (error) {
          console.error('[Converter useThemeSync] Failed to parse theme storage:', error)
        }
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // Also update the storage format when theme changes locally
    const updateSharedFormat = () => {
      const currentStorage = localStorage.getItem('theme-storage')
      console.log('[Converter useThemeSync] Updating shared format, current:', currentStorage)
      
      if (currentStorage) {
        try {
          const parsed = JSON.parse(currentStorage)
          // Ensure it's in the correct format for both systems
          if (!parsed.version) {
            parsed.version = 0
          }
          localStorage.setItem('theme-storage', JSON.stringify(parsed))
        } catch (e) {
          console.error('[Converter useThemeSync] Failed to update storage format:', e)
        }
      }
    }
    
    updateSharedFormat()
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [theme, setTheme])
  
  return { theme }
}