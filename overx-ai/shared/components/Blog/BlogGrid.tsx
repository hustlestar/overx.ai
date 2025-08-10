import React from 'react'
import { BlogPostMetadata } from '../../lib/blog'
import BlogCard from './BlogCard'

interface BlogGridProps {
  posts: BlogPostMetadata[]
  locale: string
  defaultLocale: string
  basePath: string
  columns?: 1 | 2 | 3 | 4
  showExcerpt?: boolean
  showAuthor?: boolean
  showReadingTime?: boolean
  showTags?: boolean
  imageSize?: 'small' | 'medium' | 'large'
  className?: string
}

export const BlogGrid: React.FC<BlogGridProps> = ({
  posts,
  locale,
  defaultLocale,
  basePath,
  columns = 3,
  showExcerpt = true,
  showAuthor = true,
  showReadingTime = true,
  showTags = false,
  imageSize = 'medium',
  className = ''
}) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }
  
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No posts found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Check back later for new content!
        </p>
      </div>
    )
  }
  
  return (
    <div className={`grid ${gridClasses[columns]} gap-8 ${className}`}>
      {posts.map((post, index) => (
        <BlogCard
          key={post.slug}
          post={post}
          locale={locale}
          defaultLocale={defaultLocale}
          basePath={basePath}
          showExcerpt={showExcerpt}
          showAuthor={showAuthor}
          showReadingTime={showReadingTime}
          showTags={showTags}
          imageSize={imageSize}
          className={`animate-fade-in-up`}
        />
      ))}
    </div>
  )
}

export default BlogGrid