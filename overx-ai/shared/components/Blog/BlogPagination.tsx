import React from 'react'
import { SmartLink } from '../SEO'

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  hasNextPage: boolean
  hasPrevPage: boolean
  category?: string
  className?: string
  showFirstLast?: boolean
  maxVisiblePages?: number
}

export const BlogPagination: React.FC<BlogPaginationProps> = ({
  currentPage,
  totalPages,
  basePath,
  hasNextPage,
  hasPrevPage,
  category,
  className = '',
  showFirstLast = true,
  maxVisiblePages = 5
}) => {
  if (totalPages <= 1) return null
  
  const getPageUrl = (page: number) => {
    const basePath_ = category ? `${basePath}/category/${category}` : basePath
    return page === 1 ? basePath_ : `${basePath_}/page/${page}`
  }
  
  // Calculate visible page numbers
  const getVisiblePages = () => {
    const pages: number[] = []
    const halfVisible = Math.floor(maxVisiblePages / 2)
    
    let startPage = Math.max(1, currentPage - halfVisible)
    let endPage = Math.min(totalPages, currentPage + halfVisible)
    
    // Adjust if we don't have enough pages on one side
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
      } else {
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    
    return pages
  }
  
  const visiblePages = getVisiblePages()
  
  const buttonClass = "px-3 py-2 mx-1 text-sm font-medium rounded-lg transition-all duration-300 border"
  const activeClass = "bg-blue-600 text-white border-blue-600 shadow-md"
  const inactiveClass = "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
  const disabledClass = "bg-gray-100 dark:bg-gray-900 text-gray-400 dark:text-gray-600 border-gray-200 dark:border-gray-700 cursor-not-allowed"
  
  return (
    <nav className={`flex items-center justify-center space-x-1 ${className}`} aria-label="Blog pagination">
      {/* First Page Button */}
      {showFirstLast && currentPage > 1 && (
        <SmartLink
          href={getPageUrl(1)}
          className={`${buttonClass} ${inactiveClass}`}
          aria-label="First page"
        >
          ⟪
        </SmartLink>
      )}
      
      {/* Previous Page Button */}
      {hasPrevPage ? (
        <SmartLink
          href={getPageUrl(currentPage - 1)}
          className={`${buttonClass} ${inactiveClass}`}
          aria-label="Previous page"
        >
          ‹ Previous
        </SmartLink>
      ) : (
        <span className={`${buttonClass} ${disabledClass}`} aria-label="Previous page (disabled)">
          ‹ Previous
        </span>
      )}
      
      {/* Show ellipsis if there are pages before visible range */}
      {visiblePages[0] > 1 && (
        <>
          {visiblePages[0] > 2 && (
            <span className="px-2 py-2 text-gray-500 dark:text-gray-400">...</span>
          )}
        </>
      )}
      
      {/* Page Numbers */}
      {visiblePages.map((page) => (
        <SmartLink
          key={page}
          href={getPageUrl(page)}
          className={`${buttonClass} ${
            page === currentPage ? activeClass : inactiveClass
          }`}
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </SmartLink>
      ))}
      
      {/* Show ellipsis if there are pages after visible range */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-2 py-2 text-gray-500 dark:text-gray-400">...</span>
          )}
        </>
      )}
      
      {/* Next Page Button */}
      {hasNextPage ? (
        <SmartLink
          href={getPageUrl(currentPage + 1)}
          className={`${buttonClass} ${inactiveClass}`}
          aria-label="Next page"
        >
          Next ›
        </SmartLink>
      ) : (
        <span className={`${buttonClass} ${disabledClass}`} aria-label="Next page (disabled)">
          Next ›
        </span>
      )}
      
      {/* Last Page Button */}
      {showFirstLast && currentPage < totalPages && (
        <SmartLink
          href={getPageUrl(totalPages)}
          className={`${buttonClass} ${inactiveClass}`}
          aria-label="Last page"
        >
          ⟫
        </SmartLink>
      )}
    </nav>
  )
}

export default BlogPagination