import React from 'react'
import Link from 'next/link'
import { BreadcrumbItem, StructuredData } from './types'

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
  separator?: string
  baseUrl?: string
}

// Helper function to ensure URL is absolute
const toAbsoluteUrl = (url: string, baseUrl: string = 'https://overx.ai'): string => {
  if (!url) return baseUrl
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className = '',
  separator = '›',
  baseUrl = 'https://overx.ai'
}) => {
  const structuredData: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && {
        item: {
          '@type': 'WebPage',
          '@id': toAbsoluteUrl(item.url, baseUrl)
        }
      })
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav aria-label="Breadcrumb" className={`breadcrumbs ${className}`}>
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-500 light:text-gray-400" aria-hidden="true">
                  {separator}
                </span>
              )}
              {item.url && index < items.length - 1 ? (
                <Link 
                  href={item.url}
                  className="text-blue-600 dark:text-blue-400 light:text-blue-600 hover:text-blue-500 dark:hover:text-blue-300 light:hover:text-blue-500 transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="text-gray-900 dark:text-white light:text-gray-900" aria-current={index === items.length - 1 ? 'page' : undefined}>
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}