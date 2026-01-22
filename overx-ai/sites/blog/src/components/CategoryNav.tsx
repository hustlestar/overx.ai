import { useTranslation } from 'next-i18next'
import { SmartLink } from './NextSEO'
import { motion } from 'framer-motion'
import type { Category } from '../types/blog'

interface CategoryNavProps {
  categories: Category[]
  className?: string
  title?: string
  showDescription?: boolean
}

export function CategoryNav({ categories, className = '', title, showDescription = false }: CategoryNavProps) {
  const { t } = useTranslation('common')

  return (
    <nav className={`${className}`} aria-label="Blog categories">
      {title && (
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white light:text-gray-900">
          {title}
        </h2>
      )}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <SmartLink
            key={category.slug}
            href={`/category/${category.slug}`}
            className={`group inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-gray-200 dark:border-gray-700 light:border-gray-200 hover:scale-105 bg-gradient-to-r ${category.color} bg-opacity-10 hover:bg-opacity-20 text-gray-800 dark:text-gray-200 light:text-gray-800`}
          >
            {category.name}
            <svg
              className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </SmartLink>
        ))}
      </div>
      {showDescription && (
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 light:text-gray-500">
          {t('browseByCategory', 'Browse articles by category to find content that interests you.')}
        </p>
      )}
    </nav>
  )
}

export function CategoryNavCompact({ categories }: { categories: Category[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <SmartLink
          key={category.slug}
          href={`/category/${category.slug}`}
          className={`text-xs px-3 py-1 rounded-full border border-gray-700 light:border-gray-300 hover:border-gray-500 light:hover:border-gray-400 transition-all duration-200 text-gray-400 light:text-gray-600 hover:text-gray-200 light:hover:text-gray-800`}
        >
          {category.name}
        </SmartLink>
      ))}
    </div>
  )
}

export function CategorySidebar({ categories }: { categories: Category[] }) {
  const { t } = useTranslation('common')

  return (
    <aside className="bg-gradient-to-br from-gray-900/30 to-gray-900/10 light:from-white/60 light:to-gray-50/40 backdrop-blur-sm border border-gray-800 light:border-gray-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-white light:text-gray-900">
        {t('categories', 'Categories')}
      </h3>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.slug}>
            <SmartLink
              href={`/category/${category.slug}`}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-800/50 light:hover:bg-gray-100 transition-colors group"
            >
              <span className="text-gray-300 light:text-gray-700 group-hover:text-white light:group-hover:text-gray-900 transition-colors">
                {category.name}
              </span>
              <svg
                className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </SmartLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}
