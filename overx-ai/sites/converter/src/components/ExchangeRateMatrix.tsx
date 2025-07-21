import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { CurrencyRegion } from '@/utils/regions'
import { formatCurrency, CURRENCY_NAMES } from '@/utils/currencies'

interface ExchangeRateMatrixProps {
  rates: Record<string, number>
  baseCurrency: string
  region: CurrencyRegion
  selectedCurrencies: string[]
}

export function ExchangeRateMatrix({ rates, baseCurrency, region, selectedCurrencies }: ExchangeRateMatrixProps) {
  const { t } = useTranslation('common')
  const [hoveredCell, setHoveredCell] = useState<string | null>(null)

  // Calculate cross rates
  const calculateCrossRate = (from: string, to: string): { rate: number; isTriangulated: boolean } => {
    if (from === to) return { rate: 1, isTriangulated: false }
    
    // Direct rate from base currency
    if (from === baseCurrency && rates[to]) {
      return { rate: rates[to], isTriangulated: false }
    }
    
    // Inverse rate to base currency
    if (to === baseCurrency && rates[from]) {
      return { rate: 1 / rates[from], isTriangulated: false }
    }
    
    // Triangulated rate through base currency
    if (rates[from] && rates[to]) {
      return { rate: rates[to] / rates[from], isTriangulated: true }
    }
    
    return { rate: 0, isTriangulated: true }
  }

  const formatRate = (rate: number): string => {
    if (rate === 0) return '-'
    if (rate >= 1000) return rate.toFixed(0)
    if (rate >= 10) return rate.toFixed(2)
    if (rate >= 1) return rate.toFixed(4)
    if (rate >= 0.01) return rate.toFixed(4)
    return rate.toExponential(2)
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-3 text-sm font-medium text-gray-400">
              {region.name}
            </th>
            {selectedCurrencies.map(currency => (
              <th key={currency} className="p-3 text-center text-sm font-medium">
                <div className="font-semibold">{currency}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {region.currencies.map(fromCurrency => {
            if (!rates[fromCurrency] && fromCurrency !== baseCurrency) return null
            
            return (
              <tr key={fromCurrency} className="border-t border-white/10">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{fromCurrency}</span>
                    <span className="text-xs text-gray-400">
                      {CURRENCY_NAMES[fromCurrency]?.split(' ')[0]}
                    </span>
                  </div>
                </td>
                {selectedCurrencies.map(toCurrency => {
                  const { rate, isTriangulated } = calculateCrossRate(fromCurrency, toCurrency)
                  const cellKey = `${fromCurrency}-${toCurrency}`
                  
                  return (
                    <td 
                      key={toCurrency} 
                      className="p-3 text-center relative"
                      onMouseEnter={() => setHoveredCell(cellKey)}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      <div className={`font-mono ${isTriangulated ? 'text-blue-400' : 'text-white'}`}>
                        {formatRate(rate)}
                        {isTriangulated && <span className="text-xs ml-1">*</span>}
                      </div>
                      
                      {/* Tooltip for triangulated rates */}
                      {isTriangulated && hoveredCell === cellKey && (
                        <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 rounded-lg text-xs whitespace-nowrap">
                          <div className="text-gray-300">
                            Triangulated through {baseCurrency}
                          </div>
                          <div className="text-gray-400">
                            {fromCurrency} → {baseCurrency} → {toCurrency}
                          </div>
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}