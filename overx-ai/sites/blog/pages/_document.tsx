import { Html, Head, Main, NextScript } from 'next/document'
import { Favicon } from '@overx-ai/shared'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Shared Favicon for all OverX subdomains */}
        <Favicon />
        
        {/* Preconnect to optimize font loading */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}