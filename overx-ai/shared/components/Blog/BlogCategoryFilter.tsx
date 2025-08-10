import React from 'react'
import { BlogCategory } from '../../lib/blog'
import { SmartLink } from '../SEO'

interface BlogCategoryFilterProps {
  categories: BlogCategory[]
  currentCategory?: string
  locale: string
  defaultLocale: string
  basePath: string
  allPostsLabel?: string
  className?: string
  showPostCounts?: boolean
}

export const BlogCategoryFilter: React.FC<BlogCategoryFilterProps> = ({
  categories,
  currentCategory,
  locale,
  defaultLocale,
  basePath,
  allPostsLabel = 'All Posts',
  className = '',
  showPostCounts = true
}) => {
  const isActive = (category?: string) => {
    return (!currentCategory && !category) || currentCategory === category
  }
  
  const getCategoryUrl = (categorySlug?: string) => {
    return categorySlug ? `${basePath}/category/${categorySlug}` : basePath
  }
  
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {/* All Posts Filter */}
      <SmartLink
        href={getCategoryUrl()}
        className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
          isActive()
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        {allPostsLabel}
        {showPostCounts && (
          <span className="ml-2 text-sm opacity-75">
            ({categories.reduce((sum, cat) => sum + cat.postCount, 0)})
          </span>
        )}
      </SmartLink>
      
      {/* Category Filters */}
      {categories.map((category) => {
        const categoryName = category.name[locale] || category.name[defaultLocale] || category.slug
        
        return (
          <SmartLink
            key={category.slug}
            href={getCategoryUrl(category.slug)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              isActive(category.slug)
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {categoryName}
            {showPostCounts && (
              <span className="ml-2 text-sm opacity-75">
                ({category.postCount})
              </span>
            )}
          </SmartLink>
        )
      })}
    </div>
  )
}

export default BlogCategoryFilter