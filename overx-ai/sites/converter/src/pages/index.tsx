import { GetStaticProps } from 'next'
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout } from '@/components/Layout'
import { BaseSEO } from '@overx-ai/shared'
import { CurrencySelector } from '@/components/CurrencySelector'
import { LazyProviderTable } from '@/components/LazyProviderTable'
import { useAllRates, useCurrencies } from '@/hooks/useExchangeRates'
import { useUserPreferences } from '@/hooks/useUserPreferences'
import { CURRENCY_REGIONS } from '@/utils/regions'
import { STATIC_CURRENCIES } from '@/data/static-currencies'

export default function HomePage() {
  const { t } = useTranslation('common')
  const { defaultBase, defaultTargets } = useUserPreferences()
  const [baseCurrency, setBaseCurrency] = useState(defaultBase)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  
  // Update base currency when user preference changes
  useEffect(() => {
    setBaseCurrency(defaultBase)
  }, [defaultBase])
  
  const { data: ratesData, isLoading } = useAllRates(baseCurrency)
  const { data: currenciesData } = useCurrencies()

  // Use static currencies for immediate rendering
  const currencies = currenciesData || STATIC_CURRENCIES
  
  // Organize currencies: user selected first, then by regions
  const organizeCurrencies = () => {
    if (!currencies.length) return []
    
    const userCurrencies = defaultTargets
    const allCurrencyCodes = new Set(currencies.map(c => c.code))
    
    // Start with user selected currencies
    let organizedCurrencies = userCurrencies.filter(code => allCurrencyCodes.has(code))
    
    // Add all currencies from regions (avoiding duplicates)
    const addedCurrencies = new Set(organizedCurrencies)
    
    CURRENCY_REGIONS.forEach(region => {
      region.currencies.forEach(code => {
        if (allCurrencyCodes.has(code) && !addedCurrencies.has(code)) {
          organizedCurrencies.push(code)
          addedCurrencies.add(code)
        }
      })
    })
    
    // Add any remaining currencies not in regions
    currencies.forEach(currency => {
      if (!addedCurrencies.has(currency.code)) {
        organizedCurrencies.push(currency.code)
        addedCurrencies.add(currency.code)
      }
    })
    
    return organizedCurrencies
  }
  
  const targetCurrencies = organizeCurrencies()

  // Update last update time
  useEffect(() => {
    if (ratesData) {
      setLastUpdate(new Date())
    }
  }, [ratesData])

  const getTimeSinceUpdate = () => {
    const now = new Date()
    const diff = Math.floor((now.getTime() - lastUpdate.getTime()) / 1000)
    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    return `${Math.floor(diff / 3600)}h ago`
  }


  const structuredData = {
    '@context': 'https://schema.org' as const,
    '@type': 'WebApplication',
    name: 'Exchange Rates Pro',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }

  return (
    <>
      <BaseSEO
        title={t('title')}
        description={t('description')}
        canonical="https://rates.overx.ai"
        openGraph={{
          type: 'website',
          title: t('title'),
          description: t('description'),
          siteName: 'Exchange Rates Pro - OverX AI',
          locale: 'en_US',
          url: 'https://rates.overx.ai',
        }}
        structuredData={[structuredData]}
      />
      
      <Layout>
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="glass-effect rounded-xl p-4 mb-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-2xl font-bold gradient-text">
                Exchange Rates Pro
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">{t('home.baseCurrency')}:</span>
                  <CurrencySelector
                    label=""
                    value={baseCurrency}
                    onChange={setBaseCurrency}
                    currencies={currencies}
                  />
                </div>
                
                <div className="text-sm text-gray-400">
                  {t('home.lastUpdate')}: <span className="text-white">{getTimeSinceUpdate()}</span>
                </div>
              </div>
            </div>
          </div>


        </div>
        
        {/* Provider Comparison Table - Full Width */}
        <div>
          <div className="container mx-auto px-4 mb-6">
            <h2 className="text-2xl font-bold gradient-text">{t('providers.title')}</h2>
          </div>
          <div className="w-full">
            <LazyProviderTable 
              baseCurrency={baseCurrency}
              targetCurrencies={targetCurrencies}
              userCurrencies={defaultTargets}
            />
          </div>
        </div>

        {/* Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
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