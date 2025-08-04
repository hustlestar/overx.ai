import { Html, Head, Main, NextScript } from 'next/document'
import { Favicon } from '@overx-ai/shared/components/Favicon'

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Preconnect to API for faster data fetching */}
        <link rel="preconnect" href="https://api.overx.ai" />
        <link rel="dns-prefetch" href="https://api.overx.ai" />
        
        {/* Font preconnects */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Shared Favicon for all OverX subdomains */}
        <Favicon />
        
        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="Ss_vYawt-4eUxrOy8j_LBWYOynIY7kseugeq8L9mcBs" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              console.log('[Converter] Page loaded at:', new Date().toISOString());
              console.log('[Converter] Domain:', window.location.hostname);
              console.log('[Converter] Debug sync available:', typeof window.debugSyncStatus);
            `,
          }}
        />
      </body>
    </Html>
  )
}