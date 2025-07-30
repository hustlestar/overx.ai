import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout } from '@/components/Layout'
import { CurrencyConverter } from '@/components/CurrencyConverter'
import { BaseSEO } from '@overx-ai/shared'

export default function SimpleConverterPage() {
  const { t } = useTranslation('common')

  const structuredData = {
    '@context': 'https://schema.org' as const,
    '@type': 'WebApplication',
    name: 'Simple Currency Converter',
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
        canonical="https://rates.overx.ai/simple"
        openGraph={{
          type: 'website',
          title: t('title'),
          description: t('description'),
          siteName: 'Exchange Rates Pro - OverX AI',
          locale: 'en_US',
          url: 'https://rates.overx.ai/simple',
        }}
        structuredData={[structuredData]}
      />
      
      <Layout>
        <div className="container mx-auto px-4">
          <section className="pt-20 pb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-center mb-4 gradient-text">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>

            <CurrencyConverter />
          </section>

          {/* Background Elements */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
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