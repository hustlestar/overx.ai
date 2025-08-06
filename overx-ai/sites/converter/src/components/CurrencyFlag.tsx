import { useEffect, useState } from 'react'
import { getCurrencyFlag } from '../utils/currencyFlags'
import { isWindows, getCountryCode } from '../utils/windowsDetection'

interface CurrencyFlagProps {
  currencyCode: string
  className?: string
}

export function CurrencyFlag({ currencyCode, className = '' }: CurrencyFlagProps) {
  const [isWindowsOS, setIsWindowsOS] = useState(false)
  
  useEffect(() => {
    setIsWindowsOS(isWindows())
  }, [])
  
  // For Windows, show country code in a styled box
  if (isWindowsOS) {
    const countryCode = getCountryCode(currencyCode)
    if (!countryCode) {
      // Fallback to currency code
      return (
        <span className={`inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded ${className}`}>
          {currencyCode}
        </span>
      )
    }
    
    return (
      <span className={`inline-flex items-center justify-center w-8 h-6 text-xs font-bold bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 text-blue-900 dark:text-blue-100 rounded border border-blue-300 dark:border-blue-700 ${className}`}>
        {countryCode}
      </span>
    )
  }
  
  // For non-Windows, use emoji flags
  return <span className={className}>{getCurrencyFlag(currencyCode)}</span>
}