import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useAllRates, useCurrencies } from '@/hooks/useExchangeRates'
import { CurrencySelector } from './CurrencySelector'
import { formatCurrency } from '@/utils/currencies'
import { AllRatesResponse } from '@/types/api'

export function SimpleCurrencyConverter() {
  const { t } = useTranslation('common')
  const [amount, setAmount] = useState<string>('100')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [selectedProvider, setSelectedProvider] = useState<string>('')
  const [result, setResult] = useState<number | null>(null)

  const { data: currenciesData } = useCurrencies()
  const { data: ratesData, isLoading } = useAllRates(fromCurrency)
  
  const typedRatesData = ratesData as AllRatesResponse | undefined

  // Get available providers
  const availableProviders = typedRatesData?.providers 
    ? Object.entries(typedRatesData.providers)
        .filter(([_, provider]) => provider.status === 'success')
        .map(([name, _]) => name)
    : []

  // Set default provider when data loads
  useEffect(() => {
    if (availableProviders.length > 0 && !selectedProvider) {
      setSelectedProvider(availableProviders[0])
    }
  }, [availableProviders, selectedProvider])

  useEffect(() => {
    if (typedRatesData && typedRatesData.providers && selectedProvider) {
      const provider = typedRatesData.providers[selectedProvider]
      
      if (provider && provider.status === 'success' && provider.rates && provider.rates[toCurrency]) {
        const convertedAmount = parseFloat(amount) * provider.rates[toCurrency]
        setResult(convertedAmount)
      }
    }
  }, [amount, typedRatesData, toCurrency, selectedProvider])

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
        {/* API Provider Selector */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">Exchange Rate Provider</label>
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="w-full px-4 py-3 rounded-lg glass-effect bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition-colors"
          >
            {availableProviders.map((provider) => (
              <option key={provider} value={provider} className="bg-gray-900 text-white">
                {provider.charAt(0).toUpperCase() + provider.slice(1)}
              </option>
            ))}
          </select>
        </div>

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

        {result !== null && !isLoading && typedRatesData && typedRatesData.providers && selectedProvider && (
          <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20">
            <p className="text-center text-3xl font-bold">
              {formatCurrency(parseFloat(amount) || 0, fromCurrency)} ={' '}
              <span className="gradient-text">{formatCurrency(result, toCurrency)}</span>
            </p>
            {(() => {
              const provider = typedRatesData.providers[selectedProvider]
              if (provider && provider.status === 'success') {
                return (
                  <>
                    <p className="text-center text-sm text-gray-400 mt-2">
                      {t('hero.lastUpdated', {
                        time: new Date(provider.last_updated).toLocaleTimeString(),
                      })}
                    </p>
                    <p className="text-center text-xs text-gray-500 mt-1">
                      Rate: 1 {fromCurrency} = {provider.rates[toCurrency]?.toFixed(4)} {toCurrency}
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

        {/* Provider Information */}
        {selectedProvider && typedRatesData?.providers[selectedProvider] && (
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>Using {selectedProvider} API</p>
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