import React from 'react'
import Image from 'next/image'

// Helper function to convert emoji to Unicode codepoints for Twemoji URL
function emojiToCodepoints(emoji: string): string {
  const codepoints: string[] = []
  for (let i = 0; i < emoji.length; i++) {
    const code = emoji.codePointAt(i)
    if (code) {
      // Skip variation selectors and zero-width joiners
      if (code !== 0xfe0f && code !== 0x200d) {
        codepoints.push(code.toString(16))
      }
      // Handle surrogate pairs
      if (code > 0xffff) i++
    }
  }
  return codepoints.join('-')
}

interface FlagImageProps {
  emoji: string
  alt: string
  size?: number
  className?: string
}

export function FlagImage({ emoji, alt, size = 20, className = '' }: FlagImageProps) {
  const codepoints = emojiToCodepoints(emoji)
  const imageUrl = `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codepoints}.svg`
  
  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={size}
      height={size}
      className={`inline-block ${className}`}
      unoptimized // SVGs don't need Next.js optimization
      onError={(e) => {
        // Fallback to emoji if image fails to load
        const target = e.target as HTMLImageElement
        target.style.display = 'none'
        if (target.parentElement) {
          const span = document.createElement('span')
          span.textContent = emoji
          span.className = className
          target.parentElement.replaceChild(span, target)
        }
      }}
    />
  )
}