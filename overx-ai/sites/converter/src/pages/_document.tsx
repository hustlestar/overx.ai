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
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        
        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="Ss_vYawt-4eUxrOy8j_LBWYOynIY7kseugeq8L9mcBs" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}