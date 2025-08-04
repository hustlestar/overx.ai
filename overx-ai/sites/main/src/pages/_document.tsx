import { Html, Head, Main, NextScript } from 'next/document'
import { Favicon } from '@overx-ai/shared'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Shared Favicon for all OverX subdomains */}
        <Favicon />
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        {/* Theme initialization script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Check for theme in cookie first (cross-subdomain)
                  const cookieTheme = document.cookie.split(';').find(c => c.trim().startsWith('overx-theme='));
                  if (cookieTheme) {
                    const theme = cookieTheme.split('=')[1];
                    if (theme === 'light') {
                      document.documentElement.classList.add('light');
                      document.documentElement.classList.remove('dark');
                    } else {
                      document.documentElement.classList.add('dark');
                      document.documentElement.classList.remove('light');
                    }
                    return;
                  }
                  
                  // Fallback to localStorage
                  const stored = localStorage.getItem('theme-storage');
                  if (stored) {
                    const parsed = JSON.parse(stored);
                    if (parsed.state.theme === 'light') {
                      document.documentElement.classList.add('light');
                      document.documentElement.classList.remove('dark');
                    } else {
                      document.documentElement.classList.add('dark');
                      document.documentElement.classList.remove('light');
                    }
                  } else {
                    // Default to dark theme
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}