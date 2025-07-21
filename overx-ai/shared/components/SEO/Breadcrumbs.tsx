import React from 'react'
import Link from 'next/link'
import { BreadcrumbItem, StructuredData } from './types'

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
  separator?: string
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  items, 
  className = '',
  separator = '›'
}) => {
  const structuredData: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url })
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
                <span className="mx-2 text-gray-500" aria-hidden="true">
                  {separator}
                </span>
              )}
              {item.url && index < items.length - 1 ? (
                <Link 
                  href={item.url}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="text-white" aria-current={index === items.length - 1 ? 'page' : undefined}>
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