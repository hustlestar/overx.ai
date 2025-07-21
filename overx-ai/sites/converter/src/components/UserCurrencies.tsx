import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useUserPreferences } from '@/hooks/useUserPreferences'
import { CURRENCY_NAMES } from '@/utils/currencies'

interface UserCurrenciesProps {
  rates: Record<string, number>
  baseCurrency: string
  onCustomize: () => void
}

export function UserCurrencies({ rates, baseCurrency, onCustomize }: UserCurrenciesProps) {
  const { t } = useTranslation('common')
  const { defaultTargets } = useUserPreferences()
  const [previousRates, setPreviousRates] = useState<Record<string, number>>({})

  // Calculate rate changes (mock for now)
  const getRateChange = (currency: string): number => {
    // In production, this would compare with previous day's rates
    // Use deterministic calculation based on currency code to avoid hydration issues
    const hash = currency.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return ((hash % 50) - 25) / 100 // Deterministic: -0.25% to +0.25%
  }

  const formatRate = (rate: number): string => {
    if (rate >= 1000) return rate.toFixed(0)
    if (rate >= 10) return rate.toFixed(2)
    return rate.toFixed(4)
  }

  const formatChange = (change: number): string => {
    const sign = change > 0 ? '+' : ''
    return `${sign}${change.toFixed(2)}%`
  }

  const userCurrencies = defaultTargets.length > 0 ? defaultTargets : ['EUR', 'GBP', 'JPY', 'CAD', 'PLN']

  return (
    <div className="glass-effect rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{t('home.yourCurrencies')}</h2>
        <button
          onClick={onCustomize}
          className="flex items-center gap-2 px-4 py-2 rounded-lg glass-effect hover:bg-white/10 transition-colors text-sm"
        >
          <span>{t('home.customize')}</span>
          <span>⚙️</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {userCurrencies.map((currency: string) => {
          const rate = rates[currency] || 0
          const change = getRateChange(currency)
          const isPositive = change > 0
          const isNeutral = Math.abs(change) < 0.01

          return (
            <div key={currency} className="text-center">
              <div className="text-2xl font-bold mb-1">{currency}</div>
              <div className="text-xl font-mono mb-2">{formatRate(rate)}</div>
              <div className={`text-sm flex items-center justify-center gap-1 ${
                isNeutral ? 'text-gray-400' : isPositive ? 'text-green-400' : 'text-red-400'
              }`}>
                <span>{isNeutral ? '→' : isPositive ? '↑' : '↓'}</span>
                <span>{formatChange(change)}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {CURRENCY_NAMES[currency]?.split(' ')[0]}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}