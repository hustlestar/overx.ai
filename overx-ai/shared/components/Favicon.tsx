import React from 'react'

/**
 * Shared favicon component for all OverX subdomains
 * Includes all necessary meta tags and links for cross-platform support
 */
export function Favicon() {
  return (
    <>
      {/* Primary favicon formats */}
      <link rel="icon" type="image/svg+xml" href="https://overx.ai/shared/favicon/favicon.svg" />
      <link rel="icon" type="image/x-icon" href="https://overx.ai/shared/favicon/favicon.ico" />
      
      {/* Apple Touch Icons */}
      <link rel="apple-touch-icon" sizes="180x180" href="https://overx.ai/shared/favicon/apple-touch-icon.png" />
      
      {/* PNG versions for different sizes */}
      <link rel="icon" type="image/png" sizes="32x32" href="https://overx.ai/shared/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="https://overx.ai/shared/favicon/favicon-16x16.png" />
      
      {/* Web App Manifest */}
      <link rel="manifest" href="https://overx.ai/shared/favicon/site.webmanifest" />
      
      {/* Theme color for mobile browsers */}
      <meta name="theme-color" content="#0891b2" />
      
      {/* Microsoft Tiles (optional) */}
      <meta name="msapplication-TileColor" content="#0891b2" />
    </>
  )
}