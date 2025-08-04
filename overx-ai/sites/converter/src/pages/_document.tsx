import { Html, Head, Main, NextScript } from 'next/document'

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
        {/* Favicons for OverX */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        
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