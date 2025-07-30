import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { appWithTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'
import { useLanguageSync } from '@/hooks/useLanguageSync'
import { debugSyncStatus } from '@/utils/debugSync'

function MyApp({ Component, pageProps }: AppProps) {
  console.log('[Converter _app.tsx] App initializing...')
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  )
  
  useLanguageSync() // Enable cross-subdomain language sync
  
  // Make debug function available globally
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).debugSyncStatus = debugSyncStatus;
    }
  }, [])
  
  // Register service worker for offline support
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch((error) => {
          console.error('Service Worker registration failed:', error)
        })
      })
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}

export default appWithTranslation(MyApp)