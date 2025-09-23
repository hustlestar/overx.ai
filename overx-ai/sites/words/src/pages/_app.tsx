import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { useLanguageSync } from '@overx-ai/shared'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  useLanguageSync() // Enable cross-subdomain language sync

  // Make debug function available globally
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('[Words] Language sync initialized')
    }
  }, [])

  return <Component {...pageProps} />
}

export default appWithTranslation(MyApp)