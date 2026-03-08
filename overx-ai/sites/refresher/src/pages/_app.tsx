import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { useTheme, useLanguageSync } from '@overx-ai/shared'

function MyApp({ Component, pageProps }: AppProps) {
  useTheme()
  useLanguageSync()
  return <Component {...pageProps} />
}

export default appWithTranslation(MyApp)
