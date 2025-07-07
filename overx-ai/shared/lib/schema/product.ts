import { StructuredData } from '../../components/SEO/types'

interface Offer {
  price: string
  priceCurrency: string
  availability: 'https://schema.org/InStock' | 'https://schema.org/OutOfStock' | 'https://schema.org/PreOrder'
  priceValidUntil?: string
  url?: string
}

interface Review {
  author: string
  reviewRating: {
    ratingValue: number
    bestRating?: number
  }
  reviewBody?: string
  datePublished?: string
}

interface ProductConfig {
  name: string
  description: string
  image: string | string[]
  brand: string
  sku?: string
  mpn?: string
  offers?: Offer | Offer[]
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
    bestRating?: number
  }
  review?: Review[]
}

export function createProductSchema(config: ProductConfig): StructuredData {
  const schema: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: config.name,
    description: config.description,
    image: config.image,
    brand: {
      '@type': 'Brand',
      name: config.brand
    }
  }

  if (config.sku) {
    schema.sku = config.sku
  }

  if (config.mpn) {
    schema.mpn = config.mpn
  }

  if (config.offers) {
    const offers = Array.isArray(config.offers) ? config.offers : [config.offers]
    schema.offers = offers.map(offer => ({
      '@type': 'Offer',
      ...offer
    }))
  }

  if (config.aggregateRating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ...config.aggregateRating
    }
  }

  if (config.review) {
    schema.review = config.review.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author
      },
      reviewRating: {
        '@type': 'Rating',
        ...review.reviewRating
      },
      ...(review.reviewBody && { reviewBody: review.reviewBody }),
      ...(review.datePublished && { datePublished: review.datePublished })
    }))
  }

  return schema
}

interface SoftwareApplicationConfig extends Omit<ProductConfig, 'sku' | 'mpn'> {
  applicationCategory: string
  operatingSystem?: string
  applicationSubCategory?: string
  permissions?: string[]
  screenshot?: string | string[]
}

export function createSoftwareApplicationSchema(config: SoftwareApplicationConfig): StructuredData {
  const schema: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: config.name,
    description: config.description,
    image: config.image,
    applicationCategory: config.applicationCategory,
    offers: config.offers,
    aggregateRating: config.aggregateRating,
    review: config.review
  }

  if (config.operatingSystem) {
    schema.operatingSystem = config.operatingSystem
  }

  if (config.applicationSubCategory) {
    schema.applicationSubCategory = config.applicationSubCategory
  }

  if (config.permissions) {
    schema.permissions = config.permissions.join(', ')
  }

  if (config.screenshot) {
    schema.screenshot = config.screenshot
  }

  return schema
}