import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useAllRates, useCurrencies } from '@/hooks/useExchangeRates'
import { CurrencySelector } from './CurrencySelector'
import { formatCurrency } from '@/utils/currencies'
import { AllRatesResponse } from '@/types/api'

export function CurrencyConverter() {
  const { t } = useTranslation('common')
  const [amount, setAmount] = useState<string>('100')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [result, setResult] = useState<number | null>(null)

  const { data: currenciesData } = useCurrencies()
  const { data: ratesData, isLoading } = useAllRates(fromCurrency)
  
  const typedRatesData = ratesData as AllRatesResponse | undefined

  useEffect(() => {
    if (typedRatesData && typedRatesData.providers) {
      // Get the first available provider with success status
      const availableProvider = Object.entries(typedRatesData.providers).find(
        ([_, provider]) => provider.status === 'success' && provider.rates && provider.rates[toCurrency]
      )
      
      if (availableProvider) {
        const [providerName, providerData] = availableProvider
        const convertedAmount = parseFloat(amount) * providerData.rates[toCurrency]
        setResult(convertedAmount)
      }
    }
  }, [amount, typedRatesData, toCurrency])

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  const currencies = currenciesData || []
  
  // Don't render until we have currency data
  if (!currenciesData || currencies.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="glass-effect rounded-2xl p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-white/10 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-32 bg-white/10 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="glass-effect rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-end">
          <div>
            <label className="block text-sm text-gray-400 mb-2">{t('hero.amount')}</label>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="w-full px-4 py-3 rounded-lg glass-effect bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition-colors text-2xl font-semibold"
              placeholder="0"
            />
          </div>

          <div className="flex justify-center pb-3">
            <button
              onClick={handleSwap}
              className="p-3 rounded-full glass-effect hover:bg-white/10 transition-colors group"
              aria-label={t('hero.swap')}
            >
              <svg
                className="w-6 h-6 group-hover:rotate-180 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <CurrencySelector
              label={t('hero.from')}
              value={fromCurrency}
              onChange={setFromCurrency}
              currencies={currencies}
            />
            <CurrencySelector
              label={t('hero.to')}
              value={toCurrency}
              onChange={setToCurrency}
              currencies={currencies}
            />
          </div>
        </div>

        {result !== null && !isLoading && typedRatesData && typedRatesData.providers && (
          <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20">
            <p className="text-center text-3xl font-bold">
              {formatCurrency(parseFloat(amount) || 0, fromCurrency)} ={' '}
              <span className="gradient-text">{formatCurrency(result, toCurrency)}</span>
            </p>
            {(() => {
              const provider = Object.entries(typedRatesData.providers).find(
                ([_, p]) => p.status === 'success' && p.rates && p.rates[toCurrency]
              )
              if (provider) {
                const [providerName, providerData] = provider
                return (
                  <>
                    <p className="text-center text-sm text-gray-400 mt-2">
                      {t('hero.lastUpdated', {
                        time: new Date(providerData.last_updated).toLocaleTimeString(),
                      })}
                    </p>
                    <p className="text-center text-xs text-gray-500 mt-1">
                      Provider: {providerName}
                    </p>
                  </>
                )
              }
              return null
            })()}
          </div>
        )}

        {isLoading && (
          <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20 animate-pulse">
            <div className="h-8 bg-white/10 rounded w-3/4 mx-auto"></div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          { key: 'realTime', icon: '⚡' },
          { key: 'currencies', icon: '🌍' },
          { key: 'transparent', icon: '🔍' },
          { key: 'noFees', icon: '✨' },
        ].map((feature) => (
          <div
            key={feature.key}
            className="glass-effect rounded-lg p-4 text-center hover-glow"
          >
            <div className="text-2xl mb-2">{feature.icon}</div>
            <p className="text-sm text-gray-400">{t(`features.${feature.key}`)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}