import React from 'react'

/**
 * Shared favicon component for all OverX subdomains
 * Includes all necessary meta tags and links for cross-platform support
 */
export function Favicon() {
  return (
    <>
      {/* Primary favicon formats */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      
      {/* Apple Touch Icons */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* PNG versions for different sizes */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Web App Manifest */}
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Theme color for mobile browsers */}
      <meta name="theme-color" content="#000000" />
      
      {/* Microsoft Tiles (optional) */}
      <meta name="msapplication-TileColor" content="#000000" />
    </>
  )
}