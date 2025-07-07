import React from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  priority?: boolean
  eager?: boolean
  className?: string
  ImageComponent?: React.ComponentType<any>
  [key: string]: any
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  eager = false,
  className = '',
  ImageComponent,
  ...rest
}) => {
  const loading = priority || eager ? 'eager' : 'lazy'
  
  if (ImageComponent) {
    return (
      <ImageComponent
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        priority={priority}
        className={className}
        placeholder="blur"
        quality={85}
        {...rest}
      />
    )
  }

  // Fallback to regular img tag
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={className}
      {...rest}
    />
  )
}