import Image from 'next/image'
import { getCurrencyFlag } from '../utils/currencyFlags'

interface CurrencyFlagProps {
  currencyCode: string
  className?: string
}

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

export function CurrencyFlag({ currencyCode, className = '' }: CurrencyFlagProps) {
  const flag = getCurrencyFlag(currencyCode)
  
  if (!flag) return null
  
  // Convert emoji to Twemoji URL
  const codepoints = emojiToCodepoints(flag)
  const imageUrl = `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codepoints}.svg`
  
  return (
    <span className={`inline-block ${className}`}>
      <Image
        src={imageUrl}
        alt={`${currencyCode} flag`}
        width={20}
        height={20}
        className="inline-block align-text-bottom"
        unoptimized // SVGs don't need Next.js optimization
        onError={(e) => {
          // Fallback to emoji if image fails to load
          const target = e.target as HTMLImageElement
          target.style.display = 'none'
          if (target.parentElement) {
            target.parentElement.textContent = flag
          }
        }}
      />
    </span>
  )
}