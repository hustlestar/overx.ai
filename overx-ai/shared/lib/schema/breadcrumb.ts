import { StructuredData } from '../../components/SEO/types'

interface BreadcrumbItem {
  name: string
  url?: string
}

export function createBreadcrumbListSchema(items: BreadcrumbItem[]): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { 
        item: {
          '@type': 'WebPage',
          '@id': item.url
        }
      })
    }))
  }
}