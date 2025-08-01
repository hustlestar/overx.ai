import { GetStaticProps } from 'next'
import { BaseSEO, SmartLink } from '../components/NextSEO'
import { createOrganizationSchema, Breadcrumbs, useTheme } from '@overx-ai/shared'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Navigation } from '../components/Navigation'
import { Footer } from '../components/Footer'
import { ContactForm } from '../components/ContactForm'

interface ConsultancyService {
  id: string
  titleKey: string
  descriptionKey: string
  icon: React.ReactNode
  features: string[]
}

const services: ConsultancyService[] = [
  {
    id: 'strategy',
    titleKey: 'consultancy.services.strategy.title',
    descriptionKey: 'consultancy.services.strategy.description',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    features: [
      'consultancy.features.aiReadiness',
      'consultancy.features.roadmapDev',
      'consultancy.features.roiAnalysis',
      'consultancy.features.riskAssessment'
    ]
  },
  {
    id: 'implementation',
    titleKey: 'consultancy.services.implementation.title',
    descriptionKey: 'consultancy.services.implementation.description',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    features: [
      'consultancy.features.customAI',
      'consultancy.features.processAuto',
      'consultancy.features.dataPipeline',
      'consultancy.features.performance'
    ]
  },
  {
    id: 'integration',
    titleKey: 'consultancy.services.integration.title',
    descriptionKey: 'consultancy.services.integration.description',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    features: [
      'consultancy.features.apiDev',
      'consultancy.features.modernization',
      'consultancy.features.cloudMigration',
      'consultancy.features.security'
    ]
  },
  {
    id: 'training',
    titleKey: 'consultancy.services.training.title',
    descriptionKey: 'consultancy.services.training.description',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    features: [
      'consultancy.features.executiveWorkshops',
      'consultancy.features.teamTraining',
      'consultancy.features.bestPractices',
      'consultancy.features.ongoingSupport'
    ]
  }
]

export default function ConsultancyPage() {
  const { t } = useTranslation('common')
  const { theme } = useTheme()

  const structuredData = [
    createOrganizationSchema({
      name: 'OverX AI',
      url: 'https://overx.ai',
      logo: 'https://overx.ai/logo.png'
    }),
    {
      '@context': 'https://schema.org' as const,
      '@type': 'Service',
      name: 'AI Consultancy Services',
      provider: {
        '@type': 'Organization',
        name: 'OverX AI'
      },
      description: t('consultancy.description'),
      serviceType: 'Technology Consulting',
      areaServed: 'Worldwide',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'AI Consultancy Services',
        itemListElement: services.map(service => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t(service.titleKey),
            description: t(service.descriptionKey)
          }
        }))
      }
    }
  ]

  return (
    <>
      <BaseSEO
        title="AI Consultancy Services - OverX AI | Expert AI Implementation"
        description="Transform your business with OverX AI's expert consultancy services. From AI strategy to implementation, we guide you through every step of your AI journey."
        canonical="https://overx.ai/consultancy"
        openGraph={{
          type: 'website',
          title: 'OverX AI Consultancy - Expert AI Solutions',
          description: 'Professional AI consultancy services to transform your business',
          url: 'https://overx.ai/consultancy'
        }}
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
        <Navigation />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <Breadcrumbs items={[
                { name: t('navigation.home'), url: '/' },
                { name: t('consultancy.title') }
              ]} />
              
              <div className="text-center mb-16 mt-8">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
                    {t('consultancy.title')}
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-4">
                  {t('consultancy.subtitle')}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-500 max-w-2xl mx-auto">
                  {t('consultancy.description')}
                </p>
              </div>
            </div>
          </section>
          
          {/* Services Section */}
          <section className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12">
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black p-10 rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-gray-300 dark:hover:border-white/20 shadow-lg dark:shadow-none"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-cyan-100/50 dark:from-blue-600/10 dark:to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <div className="text-white">
                          {service.icon}
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300">
                        {t(service.titleKey)}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                        {t(service.descriptionKey)}
                      </p>
                      
                      <ul className="space-y-3">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="w-5 h-5 mt-0.5 mr-3 text-cyan-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">{t(feature)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Process Section */}
          <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                    {t('consultancy.process.title')}
                  </span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-500">{t('consultancy.process.subtitle')}</p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { step: '01', key: 'discovery' },
                  { step: '02', key: 'strategy' },
                  { step: '03', key: 'implementation' },
                  { step: '04', key: 'support' }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{t(`consultancy.process.steps.${item.key}.title`)}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{t(`consultancy.process.steps.${item.key}.description`)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Contact Form Section */}
          <section className="py-24 relative" id="booking">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    {t('consultancy.cta.bookConsultation')}
                  </span>
                </h2>
                <p className="text-xl text-gray-500">{t('consultancy.form.heading')}</p>
              </div>
              
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black p-10 rounded-2xl border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-none">
                <ContactForm />
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common']))
    }
  }
}