import { StructuredData } from '../../components/SEO/types'

interface OrganizationConfig {
  name: string
  url: string
  logo: string
  sameAs?: string[]
  contactPoint?: {
    telephone: string
    contactType: string
    areaServed?: string | string[]
    availableLanguage?: string | string[]
  }
  address?: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
}

export function createOrganizationSchema(config: OrganizationConfig): StructuredData {
  const schema: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.name,
    url: config.url,
    logo: config.logo
  }

  if (config.sameAs) {
    schema.sameAs = config.sameAs
  }

  if (config.contactPoint) {
    schema.contactPoint = {
      '@type': 'ContactPoint',
      ...config.contactPoint
    }
  }

  if (config.address) {
    schema.address = {
      '@type': 'PostalAddress',
      ...config.address
    }
  }

  return schema
}

export function createWebSiteSchema(config: {
  name: string
  url: string
  potentialAction?: boolean
}): StructuredData {
  const schema: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.name,
    url: config.url
  }

  if (config.potentialAction) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${config.url}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }

  return schema
}