import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { appWithTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'
// import { useLanguageSync } from '@overx-ai/shared' // TODO: Fix shared package export
import { useRouter } from 'next/router'

// Temporary inline implementation until shared package is fixed
function useLanguageSync() {
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

function MyApp({ Component, pageProps }: AppProps) {
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