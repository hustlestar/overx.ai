import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState, useEffect } from 'react'
import { Layout } from '@/components/Layout'
import { EnhancedSEO } from '@overx-ai/shared'
import { CurrencySelector } from '@/components/CurrencySelector'
import { useUserPreferences } from '@/hooks/useUserPreferences'
import { useCurrencies } from '@/hooks/useExchangeRates'
import { STATIC_CURRENCIES } from '@/data/static-currencies'
import { CURRENCY_REGIONS } from '@/utils/regions'
import { localizeCurrencyName } from '@/utils/localizeProviders'

export default function SettingsPage() {
  const { t } = useTranslation('common')
  const { data: currenciesData } = useCurrencies()
  const currencies = currenciesData || STATIC_CURRENCIES
  
  const {
    defaultBase,
    defaultTargets,
    showTriangulation,
    showProviderRates,
    updateDefaultBase,
    updateDefaultTargets,
    toggleTriangulation,
    toggleProviderRates,
    isPremium,
    canAddMoreCurrencies,
  } = useUserPreferences()

  const [selectedTargets, setSelectedTargets] = useState<string[]>(defaultTargets)

  useEffect(() => {
    setSelectedTargets(defaultTargets)
  }, [defaultTargets])

  const handleBaseChange = (base: string) => {
    updateDefaultBase(base)
  }

  const handleTargetToggle = (code: string) => {
    const newTargets = selectedTargets.includes(code)
      ? selectedTargets.filter(c => c !== code)
      : [...selectedTargets, code]
    
    setSelectedTargets(newTargets)
    updateDefaultTargets(newTargets)
  }

  const structuredData = {
    '@context': 'https://schema.org' as const,
    '@type': 'WebPage',
    name: 'Settings - Exchange Rates Pro',
    description: 'Customize your currency converter preferences',
    url: 'https://rates.overx.ai/settings',
  }

  return (
    <>
      <EnhancedSEO
        title={`${t('settings.title')} - Exchange Rates Pro`}
        description="Customize your currency converter preferences, default currencies, and display options."
        canonical="https://rates.overx.ai/settings"
        structuredData={[structuredData]}
      />
      
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-4xl font-bold mb-2 gradient-text">{t('settings.title')}</h1>
          <p className="text-gray-400 mb-8">{t('settings.preferences')}</p>

          {/* Default Base Currency */}
          <div className="glass-effect rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">{t('settings.defaultBase')}</h2>
            <div className="max-w-xs">
              <CurrencySelector
                label=""
                value={defaultBase}
                onChange={handleBaseChange}
                currencies={currencies}
              />
            </div>
          </div>

          {/* Default Target Currencies */}
          <div className="glass-effect rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">{t('settings.defaultTargets')}</h2>
            
            {/* Selected Currencies */}
            {selectedTargets.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">{t('regions.yourSelected')}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {selectedTargets.map((code) => {
                    const currency = currencies.find(c => c.code === code)
                    if (!currency) return null
                    const localizedName = localizeCurrencyName(currency.code, t) || currency.name
                    
                    return (
                      <label
                        key={currency.code}
                        className="flex items-center space-x-2 cursor-pointer bg-blue-600/10 hover:bg-blue-600/20 p-2 rounded transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={true}
                          onChange={() => handleTargetToggle(currency.code)}
                          className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-mono">{currency.code}</span>
                            <span className="text-xs text-gray-400">{currency.symbol}</span>
                          </div>
                          <div className="text-xs text-gray-500">{localizedName}</div>
                        </div>
                      </label>
                    )
                  })}
                </div>
              </div>
            )}
            
            {/* Currencies by Region */}
            {CURRENCY_REGIONS.map((region) => {
              const regionCurrencies = region.currencies
                .filter(code => currencies.some(c => c.code === code))
                .filter(code => !selectedTargets.includes(code))
                
              if (regionCurrencies.length === 0) return null
              
              const regionKey = {
                'major': 'major',
                'americas': 'americas',
                'europe': 'europe',
                'asia-pacific': 'asiaPacific',
                'middle-east-africa': 'middleEastAfrica',
                'central-asia': 'centralAsia'
              }[region.id] || region.id
              
              return (
                <div key={region.id} className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-400 mb-3">{t(`regions.${regionKey}`)}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {regionCurrencies.map((code) => {
                      const currency = currencies.find(c => c.code === code)
                      if (!currency) return null
                      const localizedName = localizeCurrencyName(currency.code, t) || currency.name
                      
                      return (
                        <label
                          key={currency.code}
                          className={`flex items-center space-x-2 p-2 rounded transition-colors ${
                            !isPremium && selectedTargets.length >= 5
                              ? 'opacity-50 cursor-not-allowed'
                              : 'cursor-pointer hover:bg-white/5'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={false}
                            onChange={() => handleTargetToggle(currency.code)}
                            className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-mono">{currency.code}</span>
                              <span className="text-xs text-gray-400">{currency.symbol}</span>
                            </div>
                            <div className="text-xs text-gray-500">{localizedName}</div>
                          </div>
                        </label>
                      )
                    })}
                  </div>
                </div>
              )
            })}
            
            {/* Other Currencies */}
            {(() => {
              const regionCodes = CURRENCY_REGIONS.flatMap(r => r.currencies)
              const otherCurrencies = currencies
                .filter(c => !regionCodes.includes(c.code) && !selectedTargets.includes(c.code))
                
              if (otherCurrencies.length === 0) return null
              
              return (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-400 mb-3">{t('regions.other')}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {otherCurrencies.map((currency) => {
                      const localizedName = localizeCurrencyName(currency.code, t) || currency.name
                      
                      return (
                        <label
                          key={currency.code}
                          className={`flex items-center space-x-2 p-2 rounded transition-colors ${
                            !isPremium && selectedTargets.length >= 5
                              ? 'opacity-50 cursor-not-allowed'
                              : 'cursor-pointer hover:bg-white/5'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={false}
                            onChange={() => handleTargetToggle(currency.code)}
                            className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-mono">{currency.code}</span>
                              <span className="text-xs text-gray-400">{currency.symbol}</span>
                            </div>
                            <div className="text-xs text-gray-500">{localizedName}</div>
                          </div>
                        </label>
                      )
                    })}
                  </div>
                </div>
              )
            })()}
          </div>

          {/* Display Options */}
          <div className="glass-effect rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">{t('settings.display')}</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-300">{t('settings.showTriangulation')}</span>
                <button
                  onClick={toggleTriangulation}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showTriangulation ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showTriangulation ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>
              
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-300">{t('settings.showProviders')}</span>
                <button
                  onClick={toggleProviderRates}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showProviderRates ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showProviderRates ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>
            </div>
          </div>

          {/* Info */}
          <div className="mt-8 text-sm text-gray-400">
            <p>{t('settings.info', 'Your preferences are saved locally and will be remembered on your next visit.')}</p>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }
}