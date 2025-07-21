import { TFunction } from 'next-i18next'

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
    <div className="flex items-center space-x-3 min-w-[150px] w-full">
      <div className="relative w-10 h-10 flex items-center justify-center text-2xl transition-all duration-200 rounded-full">
        {isHovered ? (
          <span className={`text-3xl ${isSelected ? 'text-red-400 light:text-red-500' : 'text-green-400 light:text-green-600'}`}>
            {isSelected ? '−' : '+'}
          </span>
        ) : (
          symbol || <span className="text-sm font-mono">{currencyCode}</span>
        )}
      </div>
      <div>
        <div className="font-semibold">{currencyCode}</div>
        <div className="text-xs text-gray-400 light:text-gray-600">{displayName}</div>
      </div>
    </div>
  )
}