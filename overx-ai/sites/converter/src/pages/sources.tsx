import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout } from '@/components/Layout'
import { BaseSEO } from '@overx-ai/shared'
import { PROVIDERS } from '@/utils/providers'
import { 
  localizeProviderName, 
  localizeProviderDescription,
  localizeProviderSource,
  localizeProviderFeatures,
  localizeUpdateFrequency 
} from '@/utils/localizeProviders'

export default function SourcesPage() {
  const { t } = useTranslation('common')

  const structuredData = {
    '@context': 'https://schema.org' as const,
    '@type': 'WebPage',
    name: 'Currency Data Sources',
    description: 'List of exchange rate data providers and their features',
    url: 'https://converter.overx.ai/sources',
  }

  return (
    <>
      <BaseSEO
        title="Currency Data Sources - Exchange Rates Pro"
        description="Comprehensive list of exchange rate data providers, their update frequencies, and supported currencies."
        canonical="https://converter.overx.ai/sources"
        structuredData={[structuredData]}
      />
      
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2 gradient-text">{t('sources.title')}</h1>
          <p className="text-gray-400 mb-8">
            {t('sources.subtitle')}
          </p>

          <div className="grid gap-6">
            {PROVIDERS.map((provider) => (
              <div key={provider.id} className="glass-effect rounded-xl p-6 hover:bg-white/5 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-xl font-semibold">{localizeProviderName(provider.id, provider.name, t)}</h2>
                  <span className="text-sm text-gray-400 ml-4">{localizeUpdateFrequency(provider.updateFrequency, t)}</span>
                </div>
                
                <p className="text-gray-300 mb-4">{localizeProviderDescription(provider.id, provider.description, t)}</p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">{t('sources.coverage')}:</span>
                    <span className="text-white">{t('sources.currencies', { count: provider.supportedCurrenciesCount })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">{t('sources.source')}:</span>
                    <span className="text-white">{localizeProviderSource(provider.id, provider.source, t)}</span>
                  </div>
                  {provider.specialFeatures && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">{t('sources.features')}:</span>
                      <span className="text-white">{localizeProviderFeatures(provider.id, provider.specialFeatures, t)}</span>
                    </div>
                  )}
                </div>

                {provider.website && (
                  <a 
                    href={provider.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>{t('sources.learnMore')}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 glass-effect rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-3">{t('sources.dataAccuracy.title')}</h2>
            <p className="text-gray-300 mb-4">
              {t('sources.dataAccuracy.description1')}
            </p>
            <p className="text-gray-300">
              {t('sources.dataAccuracy.description2')}
            </p>
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