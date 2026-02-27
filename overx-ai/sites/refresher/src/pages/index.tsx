import type { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout } from '@/components/Layout'
import { AppStoreCTA } from '@/components/AppStoreCTA'
import { EnhancedSEO } from '@overx-ai/shared'

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Refresher: Meditation & Focus',
    operatingSystem: 'iOS',
    applicationCategory: 'HealthApplication',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    url: 'https://refresher.overx.ai',
  },
]

const TECHNIQUES = ['box', '478', 'coherent', 'wim'] as const

const TECHNIQUE_ICONS: Record<string, JSX.Element> = {
  box: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4h16v16H4z" />
    </svg>
  ),
  '478': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2a10 10 0 110 20A10 10 0 0112 2zm0 4v4l3 3" />
    </svg>
  ),
  coherent: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  wim: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
}

export default function HomePage() {
  const { t } = useTranslation('common')

  const steps = t('howItWorks.steps', { returnObjects: true }) as Array<{
    step: string
    title: string
    description: string
  }>

  const privacyPoints = t('privacy.points', { returnObjects: true }) as string[]

  return (
    <>
      <EnhancedSEO
        title="Refresher: Meditation & Focus — Breathing Exercises for iPhone"
        description="Science-backed Box Breathing, 4-7-8, Coherent Breathing, and Wim Hof Method for iPhone. Free · HealthKit · No Ads."
        canonical="https://refresher.overx.ai"
        structuredData={structuredData}
      />
      <Layout>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 pt-20 pb-32">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-500/10 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Animated breathing orb */}
            <div className="flex justify-center mb-10">
              <div className="relative w-24 h-24 animate-breathe">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-20 blur-xl" />
                <div className="absolute inset-2 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-40" />
                <div className="absolute inset-4 bg-gradient-to-br from-blue-300 to-indigo-500 rounded-full" />
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="animated-gradient-text">{t('hero.title')}</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <AppStoreCTA size="lg" />
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
                {t('hero.badge')}
              </span>
            </div>
          </div>
        </section>

        {/* Techniques Grid */}
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('techniques.title')}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t('techniques.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {TECHNIQUES.map((key) => (
                <div
                  key={key}
                  className="group relative p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="text-blue-500 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {TECHNIQUE_ICONS[key]}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t(`techniques.${key}.name`)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {t(`techniques.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy Highlight */}
        <section className="py-24 bg-gray-900 dark:bg-gray-950 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Privacy First
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('privacy.title')}</h2>
            <p className="text-xl text-gray-400 mb-12">{t('privacy.subtitle')}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {privacyPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-3 text-left max-w-xs">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300 text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold">{t('howItWorks.title')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xl font-bold rounded-2xl mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Download Refresher for iPhone
            </h2>
            <p className="text-blue-100 text-lg mb-10">
              Start your mindfulness journey today. Free to download.
            </p>
            <AppStoreCTA size="lg" className="bg-white text-blue-700 hover:bg-blue-50" />
          </div>
        </section>
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
