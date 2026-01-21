import React from 'react'
import Head from 'next/head'
import { BaseSEO } from './BaseSEO'
import type { SEOProps } from './types'

interface EnhancedSEOProps extends Partial<SEOProps> {
  title: string
  description?: string
  siteName?: string
  domain?: string
  defaultImage?: {
    url: string
    width: number
    height: number
    alt: string
  }
}

const SITE_DEFAULTS = {
  'overx.ai': {
    siteName: 'OverX AI - AI Solutions',
    domain: 'https://overx.ai',
    defaultImage: {
      url: 'https://overx.ai/og-image.jpg',
      width: 1312,
      height: 736,
      alt: 'OverX AI - AI Solutions that Save Your Time'
    }
  },
  'blog.overx.ai': {
    siteName: 'OverX AI Blog - AI Insights',
    domain: 'https://blog.overx.ai',
    defaultImage: {
      url: 'https://blog.overx.ai/og-image.png',
      width: 1312,
      height: 736,
      alt: 'OverX AI Blog - Expert AI and Technology Insights'
    }
  },
  'rates.overx.ai': {
    siteName: 'Exchange Rates Pro - OverX AI',
    domain: 'https://rates.overx.ai',
    defaultImage: {
      url: 'https://rates.overx.ai/og-image.png',
      width: 1312,
      height: 736,
      alt: 'Exchange Rates Pro - Transparent Currency Conversion'
    }
  },
  'words.overx.ai': {
    siteName: 'WWW Words Bot - OverX AI',
    domain: 'https://words.overx.ai',
    defaultImage: {
      url: 'https://words.overx.ai/og-image.png',
      width: 1312,
      height: 736,
      alt: 'WWW Words Bot - Learn Languages Through Daily Messaging'
    }
  }
}

export function EnhancedSEO({
  title,
  description,
  canonical,
  openGraph,
  twitter,
  structuredData,
  siteName,
  domain,
  defaultImage,
  ...otherProps
}: EnhancedSEOProps) {
  // Auto-detect site from canonical URL or window location
  const detectSite = () => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname
      if (hostname.includes('blog.')) return 'blog.overx.ai'
      if (hostname.includes('rates.')) return 'rates.overx.ai'
      if (hostname.includes('words.')) return 'words.overx.ai'
      return 'overx.ai'
    }
    
    // Fallback to canonical URL parsing
    if (canonical) {
      if (canonical.includes('blog.overx.ai')) return 'blog.overx.ai'
      if (canonical.includes('rates.overx.ai')) return 'rates.overx.ai'
      if (canonical.includes('words.overx.ai')) return 'words.overx.ai'
      return 'overx.ai'
    }
    
    return 'overx.ai' // Final fallback
  }

  const siteKey = detectSite()
  const siteDefaults = SITE_DEFAULTS[siteKey] || SITE_DEFAULTS['overx.ai']

  // Create fallback description
  const fallbackDescription = description || `${title} - ${siteDefaults.siteName}`

  // Create enhanced OpenGraph with automatic fallbacks
  const enhancedOpenGraph = {
    type: 'website' as const,
    title,
    description: fallbackDescription,
    siteName: siteName || siteDefaults.siteName,
    locale: 'en_US',
    url: canonical || siteDefaults.domain,
    image: defaultImage || siteDefaults.defaultImage,
    ...openGraph
  }

  // Create enhanced Twitter Card with automatic fallbacks
  const imageData = defaultImage || siteDefaults.defaultImage
  const enhancedTwitter = {
    card: 'summary_large_image' as const,
    site: '@overxai',
    title,
    description: fallbackDescription,
    image: imageData.url,
    imageAlt: imageData.alt,
    ...twitter
  }

  return (
    <BaseSEO
      title={title}
      description={fallbackDescription}
      canonical={canonical}
      openGraph={enhancedOpenGraph}
      twitter={enhancedTwitter}
      structuredData={structuredData}
      HeadComponent={Head}
      {...otherProps}
    />
  )
}