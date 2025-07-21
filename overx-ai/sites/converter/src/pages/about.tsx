import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { Layout } from '@/components/Layout'
import { BaseSEO } from '@overx-ai/shared'

export default function AboutPage() {
  const { t } = useTranslation('common')

  const structuredData = [
    {
      '@context': 'https://schema.org' as const,
      '@type': 'SoftwareApplication',
      name: 'Currency Converter Pro',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Chrome',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '2543',
      },
      description: t('about.pageDescription'),
    },
    {
      '@context': 'https://schema.org' as const,
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: t('about.faq.q1.question'),
          acceptedAnswer: {
            '@type': 'Answer',
            text: t('about.faq.q1.answer'),
          },
        },
        {
          '@type': 'Question',
          name: t('about.faq.q2.question'),
          acceptedAnswer: {
            '@type': 'Answer',
            text: t('about.faq.q2.answer'),
          },
        },
        {
          '@type': 'Question',
          name: t('about.faq.q3.question'),
          acceptedAnswer: {
            '@type': 'Answer',
            text: t('about.faq.q3.answer'),
          },
        },
      ],
    },
  ]

  return (
    <>
      <BaseSEO
        title={t('about.pageTitle')}
        description={t('about.pageDescription')}
        canonical="https://converter.overx.ai/about"
        openGraph={{
          title: t('about.hero.title'),
          description: t('about.hero.subtitle'),
          type: 'website',
          image: {
            url: 'https://converter.overx.ai/og-image.png',
            width: 1200,
            height: 630,
            alt: 'Currency Converter Pro Chrome Extension'
          },
        }}
        structuredData={structuredData}
      />
      
      <Layout>
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              {t('about.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-4">
              {t('about.hero.subtitle')}
            </p>
            <p className="text-lg text-gray-400 max-w-4xl mx-auto mb-8">
              {t('about.hero.tagline')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a 
                href="https://chromewebstore.google.com/detail/knpjpigjmagfflopamehjaminlbaflaa?utm_source=item-share-cb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 font-semibold text-lg"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.19 5.116c.078-.325.356-.525.681-.447l7.267 1.736a.75.75 0 01.554.554l1.736 7.267a.577.577 0 01-.447.681.577.577 0 01-.681-.447l-1.625-6.801-6.801-1.625a.577.577 0 01-.447-.681c0-.009.002-.018.003-.027a.575.575 0 01-.24-.21z"/>
                </svg>
                <span>{t('about.hero.chromeButton')}</span>
              </a>
              
              <Link 
                href="/" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full glass-effect hover:bg-white/10 transition-colors font-semibold text-lg"
              >
                <span>{t('about.hero.webButton')}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span>{t('about.hero.reviews')}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
                <span>{t('about.hero.activeUsers')}</span>
              </div>
            </div>
          </section>

          {/* Mission Statement - Purpose Level */}
          <section className="mb-16 glass-effect rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-center">{t('about.mission.title')}</h2>
            <p className="text-lg text-gray-300 text-center max-w-4xl mx-auto">
              {t('about.mission.description')}
            </p>
          </section>

          {/* Identity & Values */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-12 text-center">{t('about.whyUs.title')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-effect rounded-xl p-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-3">{t('about.whyUs.transparency.title')}</h3>
                <p className="text-gray-400">
                  {t('about.whyUs.transparency.description')}
                </p>
              </div>
              <div className="glass-effect rounded-xl p-6">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-3">{t('about.whyUs.realTime.title')}</h3>
                <p className="text-gray-400">
                  {t('about.whyUs.realTime.description')}
                </p>
              </div>
              <div className="glass-effect rounded-xl p-6">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold mb-3">{t('about.whyUs.trusted.title')}</h3>
                <p className="text-gray-400">
                  {t('about.whyUs.trusted.description')}
                </p>
              </div>
            </div>
          </section>

          {/* Capabilities */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-12 text-center">{t('about.features.title')}</h2>
            <div className="space-y-12">
              {/* Multiple Data Sources */}
              <div className="glass-effect rounded-xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">📊</div>
                  <h3 className="text-2xl font-semibold">{t('about.features.multipleDataSources.title')}</h3>
                </div>
                <p className="text-gray-400 text-lg">
                  {t('about.features.multipleDataSources.description')}
                </p>
              </div>
              
              {/* Smart Conversion */}
              <div className="glass-effect rounded-xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">🔄</div>
                  <h3 className="text-2xl font-semibold">{t('about.features.smartConversion.title')}</h3>
                </div>
                <p className="text-gray-400 text-lg">
                  {t('about.features.smartConversion.description')}
                </p>
              </div>
              
              {/* Professional Tools */}
              <div className="glass-effect rounded-xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">📈</div>
                  <h3 className="text-2xl font-semibold">{t('about.features.professionalTools.title')}</h3>
                </div>
                <p className="text-gray-400 text-lg">
                  {t('about.features.professionalTools.description')}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Privacy & Security */}
                <div className="glass-effect rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">🔒</div>
                    <h3 className="text-xl font-semibold">{t('about.features.privacyFirst.title')}</h3>
                  </div>
                  <p className="text-gray-400">
                    {t('about.features.privacyFirst.description')}
                  </p>
                </div>
                
                {/* Customizable */}
                <div className="glass-effect rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">⚙️</div>
                    <h3 className="text-xl font-semibold">{t('about.features.customizable.title')}</h3>
                  </div>
                  <p className="text-gray-400">
                    {t('about.features.customizable.description')}
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Use Cases */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-12 text-center">{t('about.useCases.title')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-effect rounded-xl p-6">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-xl font-semibold mb-3">{t('about.useCases.business.title')}</h3>
                <p className="text-gray-400">
                  {t('about.useCases.business.description')}
                </p>
              </div>
              <div className="glass-effect rounded-xl p-6">
                <div className="text-4xl mb-4">✈️</div>
                <h3 className="text-xl font-semibold mb-3">{t('about.useCases.travelers.title')}</h3>
                <p className="text-gray-400">
                  {t('about.useCases.travelers.description')}
                </p>
              </div>
              <div className="glass-effect rounded-xl p-6">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-3">{t('about.useCases.investors.title')}</h3>
                <p className="text-gray-400">
                  {t('about.useCases.investors.description')}
                </p>
              </div>
            </div>
          </section>


          {/* Environment - Data Sources */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-12 text-center">{t('about.dataSources.title')}</h2>
            <div className="glass-effect rounded-2xl p-8">
              <p className="text-center text-gray-400 mb-8">
                {t('about.dataSources.description')}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="font-semibold">{t('about.dataSources.centralBanks')}</div>
                  <div className="text-sm text-gray-500">{t('about.dataSources.centralBanksDesc')}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{t('about.dataSources.financialAPIs')}</div>
                  <div className="text-sm text-gray-500">{t('about.dataSources.financialAPIsDesc')}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{t('about.dataSources.marketData')}</div>
                  <div className="text-sm text-gray-500">{t('about.dataSources.marketDataDesc')}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{t('about.dataSources.regionalBanks')}</div>
                  <div className="text-sm text-gray-500">{t('about.dataSources.regionalBanksDesc')}</div>
                </div>
              </div>
              <div className="text-center mt-8">
                <Link 
                  href="/sources" 
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>{t('about.dataSources.viewAll')}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-12 text-center">{t('about.faq.title')}</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="glass-effect rounded-xl p-6">
                <h3 className="font-semibold mb-3">{t('about.faq.q1.question')}</h3>
                <p className="text-gray-400">
                  {t('about.faq.q1.answer')}
                </p>
              </div>
              <div className="glass-effect rounded-xl p-6">
                <h3 className="font-semibold mb-3">{t('about.faq.q2.question')}</h3>
                <p className="text-gray-400">
                  {t('about.faq.q2.answer')}
                </p>
              </div>
              <div className="glass-effect rounded-xl p-6">
                <h3 className="font-semibold mb-3">{t('about.faq.q3.question')}</h3>
                <p className="text-gray-400">
                  {t('about.faq.q3.answer')}
                </p>
              </div>
              <div className="glass-effect rounded-xl p-6">
                <h3 className="font-semibold mb-3">{t('about.faq.q4.question')}</h3>
                <p className="text-gray-400">
                  {t('about.faq.q4.answer')}
                </p>
              </div>
              <div className="glass-effect rounded-xl p-6">
                <h3 className="font-semibold mb-3">{t('about.faq.q5.question')}</h3>
                <p className="text-gray-400">
                  {t('about.faq.q5.answer')}
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-16">
            <h2 className="text-3xl font-bold mb-6">{t('about.cta.title')}</h2>
            <p className="text-xl text-gray-400 mb-4 max-w-3xl mx-auto">
              {t('about.cta.subtitle')}
            </p>
            <p className="text-lg text-gray-500 mb-8">
              {t('about.cta.tagline')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://chromewebstore.google.com/detail/knpjpigjmagfflopamehjaminlbaflaa?utm_source=item-share-cb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 font-semibold text-lg"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.19 5.116c.078-.325.356-.525.681-.447l7.267 1.736a.75.75 0 01.554.554l1.736 7.267a.577.577 0 01-.447.681.577.577 0 01-.681-.447l-1.625-6.801-6.801-1.625a.577.577 0 01-.447-.681c0-.009.002-.018.003-.027a.575.575 0 01-.24-.21z"/>
                </svg>
                <span>{t('about.cta.installButton')}</span>
              </a>
              
              <Link 
                href="/" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full glass-effect hover:bg-white/10 transition-colors font-semibold text-lg"
              >
                <span>{t('about.cta.tryWebButton')}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
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