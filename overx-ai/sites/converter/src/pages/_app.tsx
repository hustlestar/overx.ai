import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { appWithTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'
import { useLanguageSync } from '@/hooks/useLanguageSync'
import { debugSyncStatus } from '@/utils/debugSync'

// Conditionally import ReactQueryDevtools only in development
let ReactQueryDevtools: any = () => null
if (process.env.NODE_ENV === 'development') {
  ReactQueryDevtools = require('@tanstack/react-query-devtools').ReactQueryDevtools
}

function MyApp({ Component, pageProps }: AppProps) {
  console.log('[Converter _app.tsx] App initializing...')
  
  // Debug: Force console log to appear
  if (typeof window !== 'undefined') {
    window.console.log = window.console.log || function() {};
    window.console.error = window.console.error || function() {};
    console.log('[Converter] Console logging enabled');
  }
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
      // Add debug indicator
      const debugDiv = document.createElement('div');
      debugDiv.id = 'debug-indicator';
      debugDiv.style.cssText = 'position:fixed;bottom:10px;right:10px;background:green;color:white;padding:5px;font-size:12px;z-index:9999;';
      debugDiv.textContent = 'Debug: ON';
      document.body.appendChild(debugDiv);
      setTimeout(() => {
        debugDiv.remove();
      }, 3000);
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