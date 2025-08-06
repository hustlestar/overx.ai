import { useEffect, useState } from 'react'
import { getCurrencyFlag } from '../utils/currencyFlags'
import { isWindows, getCountryCode } from '../utils/windowsDetection'
import { getFlagDataUrl } from '../utils/flagSvgs'

interface CurrencyFlagProps {
  currencyCode: string
  className?: string
}

export function CurrencyFlag({ currencyCode, className = '' }: CurrencyFlagProps) {
  const [isWindowsOS, setIsWindowsOS] = useState(false)
  
  useEffect(() => {
    setIsWindowsOS(isWindows())
  }, [])
  
  // For Windows, show SVG flag or styled country code
  if (isWindowsOS) {
    const countryCode = getCountryCode(currencyCode)
    
    if (countryCode) {
      const flagUrl = getFlagDataUrl(countryCode)
      
      // If we have an SVG flag, use it
      if (flagUrl) {
        return (
          <span className={`inline-flex items-center justify-center ${className}`}>
            <img 
              src={flagUrl} 
              alt={`${currencyCode} flag`}
              className="w-6 h-4 rounded-sm shadow-sm"
              style={{ minWidth: '24px' }}
            />
          </span>
        )
      }
      
      // Otherwise show country code in a styled box
      return (
        <span className={`inline-flex items-center justify-center w-8 h-6 text-xs font-bold bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 text-blue-900 dark:text-blue-100 rounded border border-blue-300 dark:border-blue-700 ${className}`}>
          {countryCode}
        </span>
      )
    }
    
    // Fallback to currency code
    return (
      <span className={`inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded ${className}`}>
        {currencyCode}
      </span>
    )
  }
  
  // For non-Windows, use emoji flags
  return <span className={className}>{getCurrencyFlag(currencyCode)}</span>
}