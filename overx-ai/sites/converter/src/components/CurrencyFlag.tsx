import { useEffect, useRef } from 'react'
import twemoji from 'twemoji'
import { getCurrencyFlag } from '../utils/currencyFlags'

interface CurrencyFlagProps {
  currencyCode: string
  className?: string
}

export function CurrencyFlag({ currencyCode, className = '' }: CurrencyFlagProps) {
  const flagRef = useRef<HTMLSpanElement>(null)
  const flag = getCurrencyFlag(currencyCode)
  
  useEffect(() => {
    // Parse the emoji and replace with Twitter's SVG images
    // This ensures consistent display across all platforms, especially Windows
    if (flagRef.current) {
      twemoji.parse(flagRef.current, {
        folder: 'svg',
        ext: '.svg',
        base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/'
      })
    }
  }, [flag])
  
  return (
    <span ref={flagRef} className={className}>
      {flag}
    </span>
  )
}