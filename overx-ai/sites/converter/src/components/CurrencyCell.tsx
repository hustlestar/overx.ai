import { TFunction } from 'next-i18next'
import { CurrencyFlag } from './CurrencyFlag'

interface CurrencyCellProps {
  currencyCode: string
  displayName: string
  symbol?: string
  isSelected: boolean
  isHovered?: boolean
  t: TFunction
}

export function CurrencyCell({ 
  currencyCode, 
  displayName, 
  symbol, 
  isSelected, 
  isHovered = false,
  t 
}: CurrencyCellProps) {
  return (
    <div className="flex items-center space-x-2 sm:space-x-3 min-w-[120px] sm:min-w-[150px] w-full">
      <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-xl sm:text-2xl transition-all duration-200 rounded-full">
        {isHovered ? (
          <span className={`text-2xl sm:text-3xl ${isSelected ? 'text-red-400 light:text-red-500' : 'text-green-400 light:text-green-600'}`}>
            {isSelected ? '−' : '+'}
          </span>
        ) : (
          <CurrencyFlag currencyCode={currencyCode} className="text-xl sm:text-2xl" />
        )}
      </div>
      <div>
        <div className="font-semibold text-sm sm:text-base">{currencyCode}</div>
        <div className="text-xs text-gray-400 light:text-gray-600 hidden sm:block">{displayName}</div>
      </div>
    </div>
  )
}