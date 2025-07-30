import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

// Add debug logging
if (typeof window !== 'undefined') {
  console.log('[Converter useTheme] Current domain:', window.location.hostname)
}

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light'
        console.log('[Converter useTheme] Toggling theme from', state.theme, 'to', newTheme)
        return { theme: newTheme }
      }),
      setTheme: (theme) => {
        console.log('[Converter useTheme] Setting theme to:', theme)
        return set({ theme })
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        console.log('[Converter useTheme] Rehydrated state:', state)
      },
    }
  )
)