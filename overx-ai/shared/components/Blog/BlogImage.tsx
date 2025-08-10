import React from 'react'
import Image from 'next/image'

export interface BlogImageProps {
  src: string
  alt: {
    en: string
    es?: string
    ru?: string
  }
  width: number
  height: number
  type?: 'hero' | 'content' | 'featured'
  caption?: {
    en: string
    es?: string
    ru?: string
  }
  locale?: string
  className?: string
  priority?: boolean
}

export function BlogImage({
  src,
  alt,
  width,
  height,
  type = 'content',
  caption,
  locale = 'en',
  className,
  priority = false,
}: BlogImageProps) {
  const currentAlt = alt[locale as keyof typeof alt] || alt.en
  const currentCaption = caption?.[locale as keyof typeof caption] || caption?.en

  const getImageClasses = () => {
    let classes = 'rounded-lg object-cover'
    
    if (type === 'hero') classes += ' w-full h-[400px] md:h-[500px]'
    else if (type === 'content') classes += ' w-full h-[250px] md:h-[300px] my-6'
    else if (type === 'featured') classes += ' w-full h-[200px] md:h-[250px] my-4'
    
    if (className) classes += ` ${className}`
    
    return classes
  }

  const getContainerClasses = () => {
    let classes = 'overflow-hidden'
    
    if (type === 'hero') classes += ' mb-8'
    else if (type === 'content') classes += ' my-6 max-w-4xl mx-auto'
    else if (type === 'featured') classes += ' my-4 max-w-3xl mx-auto'
    
    return classes
  }

  return (
    <figure className={getContainerClasses()}>
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={currentAlt}
          width={width}
          height={height}
          className={getImageClasses()}
          priority={priority}
          sizes={
            type === 'hero' 
              ? '(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px'
              : type === 'content'
              ? '(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 896px'
              : '(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 768px'
          }
        />
      </div>
      {currentCaption && (
        <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center italic">
          {currentCaption}
        </figcaption>
      )}
    </figure>
  )
}

export default BlogImage