import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BaseSEO as SharedBaseSEO, SmartLink as SharedSmartLink } from '@overx-ai/shared/seo'
import { 
  OptimizedImage as SharedOptimizedImage, 
  PreconnectLink as SharedPreconnectLink,
  PreloadLink as SharedPreloadLink,
  PrefetchLink as SharedPrefetchLink
} from '@overx-ai/shared/performance'
import type { SEOProps } from '@overx-ai/shared/seo'

// Wrapper for BaseSEO that provides Next.js Head component
export const BaseSEO: React.FC<SEOProps> = (props) => {
  return <SharedBaseSEO {...props} HeadComponent={Head} />
}

// Wrapper for SmartLink that provides Next.js Link and useRouter
export const SmartLink: React.FC<Omit<Parameters<typeof SharedSmartLink>[0], 'LinkComponent' | 'useRouter'>> = (props) => {
  return <SharedSmartLink {...props} LinkComponent={Link} useRouter={useRouter} />
}

// Wrapper for OptimizedImage that provides Next.js Image component
export const OptimizedImage: React.FC<Omit<Parameters<typeof SharedOptimizedImage>[0], 'ImageComponent'>> = (props) => {
  return <SharedOptimizedImage {...props} ImageComponent={Image} />
}

// Wrapper for PreconnectLink that provides Next.js Head component
export const PreconnectLink: React.FC<Omit<Parameters<typeof SharedPreconnectLink>[0], 'HeadComponent'>> = (props) => {
  return <SharedPreconnectLink {...props} HeadComponent={Head} />
}

// Wrapper for PreloadLink that provides Next.js Head component
export const PreloadLink: React.FC<Omit<Parameters<typeof SharedPreloadLink>[0], 'HeadComponent'>> = (props) => {
  return <SharedPreloadLink {...props} HeadComponent={Head} />
}

// Wrapper for PrefetchLink that provides Next.js Head component
export const PrefetchLink: React.FC<Omit<Parameters<typeof SharedPrefetchLink>[0], 'HeadComponent'>> = (props) => {
  return <SharedPrefetchLink {...props} HeadComponent={Head} />
}