import React from 'react'
import { BlogPostMetadata } from '../../lib/blog'
import { SmartLink } from '../SEO'
import { OptimizedImage } from '../Performance'

interface BlogCardProps {
  post: BlogPostMetadata
  locale: string
  defaultLocale: string
  basePath: string
  className?: string
  showExcerpt?: boolean
  showAuthor?: boolean
  showReadingTime?: boolean
  showTags?: boolean
  imageSize?: 'small' | 'medium' | 'large'
}

export const BlogCard: React.FC<BlogCardProps> = ({
  post,
  locale,
  defaultLocale,
  basePath,
  className = '',
  showExcerpt = true,
  showAuthor = true,
  showReadingTime = true,
  showTags = false,
  imageSize = 'medium'
}) => {
  const title = post.title[locale] || post.title[defaultLocale] || 'Untitled'
  const excerpt = post.excerpt[locale] || post.excerpt[defaultLocale] || ''
  
  const postUrl = `${basePath}/${post.slug}`
  
  const imageSizes = {
    small: { width: 300, height: 200 },
    medium: { width: 400, height: 250 },
    large: { width: 600, height: 300 }
  }
  
  const imageSize_ = imageSizes[imageSize]
  
  return (
    <article className={`group transition-all duration-300 ${className}`}>
      <SmartLink href={postUrl} className="block">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600">
          {/* Post Image */}
          <div className="relative overflow-hidden">
            <OptimizedImage
              src={post.image.url}
              alt={post.image.alt}
              width={imageSize_.width}
              height={imageSize_.height}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {post.featured && (
              <div className="absolute top-4 left-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ⭐ Featured
                </span>
              </div>
            )}
          </div>
          
          {/* Post Content */}
          <div className="p-6">
            {/* Tags */}
            {showTags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            {/* Title */}
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {title}
            </h3>
            
            {/* Excerpt */}
            {showExcerpt && excerpt && (
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                {excerpt}
              </p>
            )}
            
            {/* Meta Information */}
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                {/* Author */}
                {showAuthor && (
                  <div className="flex items-center space-x-2">
                    {post.author.avatar && (
                      <OptimizedImage
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    <span>{post.author.name}</span>
                  </div>
                )}
                
                {/* Reading Time */}
                {showReadingTime && (
                  <span className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{post.readingTime} min read</span>
                  </span>
                )}
              </div>
              
              {/* Published Date */}
              <time dateTime={post.publishedAt} className="text-sm">
                {new Date(post.publishedAt).toLocaleDateString(locale, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </time>
            </div>
          </div>
        </div>
      </SmartLink>
    </article>
  )
}

export default BlogCard