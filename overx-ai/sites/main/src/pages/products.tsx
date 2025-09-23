import { GetStaticProps } from 'next'
import { useState } from 'react'
import { BaseSEO, SmartLink, OptimizedImage } from '../components/NextSEO'
import { createProductSchema, Breadcrumbs, useTheme } from '@overx-ai/shared'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Navigation } from '../components/Navigation'
import { Footer } from '../components/Footer'

interface Product {
  id: string
  titleKey: string
  descriptionKey: string
  category: string
  icon: React.ReactNode
  color: string
  href?: string
  features?: string[]
}

const products: Product[] = [
  // Productivity
  {
    id: 'currencyConverter',
    titleKey: 'productList.currencyConverter.title',
    descriptionKey: 'productList.currencyConverter.description',
    category: 'productivity',
    color: 'from-emerald-500 to-teal-500',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    features: ['productFeatures.currencies100Plus', 'productFeatures.complexCalculations', 'productFeatures.privacyFirst', 'productFeatures.languages9'],
    href: 'https://rates.overx.ai'
  },
  {
    id: 'blockWebsite',
    titleKey: 'productList.blockWebsite.title',
    descriptionKey: 'productList.blockWebsite.description',
    category: 'productivity',
    color: 'from-blue-500 to-cyan-500',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    features: ['productFeatures.smartPatternBlocking', 'productFeatures.wellnessActivities', 'productFeatures.passwordProtection', 'productFeatures.realTimeSync'],
    href: 'https://chromewebstore.google.com/detail/block-website-self-contro/obfpjaknohmdgkhambgdkfhnijccdhfa'
  },
  {
    id: 'instagramSaver',
    titleKey: 'productList.instagramSaver.title',
    descriptionKey: 'productList.instagramSaver.description',
    category: 'productivity',
    color: 'from-purple-500 to-pink-500',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    features: ['productFeatures.antiDetectionTech', 'productFeatures.smartCaching', 'productFeatures.multiLanguage']
  },
  {
    id: 'reelSaver',
    titleKey: 'productList.reelSaver.title',
    descriptionKey: 'productList.reelSaver.description',
    category: 'productivity',
    color: 'from-indigo-500 to-purple-500',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    features: ['productFeatures.originalQuality', 'productFeatures.noWatermarks', 'productFeatures.privacyFocused', 'productFeatures.enterpriseReliability']
  },
  // Communication
  {
    id: 'claudeCodeBot',
    titleKey: 'productList.claudeCodeBot.title',
    descriptionKey: 'productList.claudeCodeBot.description',
    category: 'communication',
    color: 'from-cyan-500 to-teal-500',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    features: ['productFeatures.voiceCoding', 'productFeatures.zeroApiCosts', 'productFeatures.multipleProjects', 'productFeatures.taskQueueSystem']
  },
  {
    id: 'privetBot',
    titleKey: 'productList.privetBot.title',
    descriptionKey: 'productList.privetBot.description',
    category: 'communication',
    color: 'from-rose-500 to-pink-500',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    features: ['productFeatures.emotionalAwareness', 'productFeatures.longTermMemory', 'productFeatures.multiLanguageVoice', 'productFeatures.openSource']
  },
  {
    id: 'memeBuyBot',
    titleKey: 'productList.memeBuyBot.title',
    descriptionKey: 'productList.memeBuyBot.description',
    category: 'communication',
    color: 'from-yellow-500 to-orange-500',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    features: ['productFeatures.monitoring247', 'productFeatures.subSecondExecution', 'productFeatures.multiDexSupport', 'productFeatures.patternRecognition']
  },
  // Legal
  {
    id: 'consultBy',
    titleKey: 'productList.consultBy.title',
    descriptionKey: 'productList.consultBy.description',
    category: 'legal',
    color: 'from-teal-500 to-emerald-500',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    features: ['productFeatures.responseUnder1Min', 'productFeatures.completePrivacy', 'productFeatures.affordablePricing', 'productFeatures.belarusianLaw']
  },
  {
    id: 'yourLawyer',
    titleKey: 'productList.yourLawyer.title',
    descriptionKey: 'productList.yourLawyer.description',
    category: 'legal',
    color: 'from-slate-500 to-gray-600',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    features: ['productFeatures.availability247', 'productFeatures.costSavings90', 'productFeatures.customKnowledgeBase', 'productFeatures.contextualThreads']
  },
  // Education
  {
    id: 'languageFocus',
    titleKey: 'productList.languageFocus.title',
    descriptionKey: 'productList.languageFocus.description',
    category: 'education',
    color: 'from-violet-500 to-purple-500',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    features: ['productFeatures.languagePatterns14', 'productFeatures.aiScoring', 'productFeatures.progressTracking', 'productFeatures.scenarios100Plus']
  },
  {
    id: 'learnWords',
    titleKey: 'productList.learnWords.title',
    descriptionKey: 'productList.learnWords.description',
    category: 'education',
    color: 'from-green-500 to-emerald-500',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    features: ['productFeatures.languages13', 'productFeatures.spacedRepetition', 'productFeatures.voiceSupport', 'productFeatures.exerciseTypes4'],
    href: 'https://words.overx.ai'
  },
  {
    id: 'yourLearner',
    titleKey: 'productList.yourLearner.title',
    descriptionKey: 'productList.yourLearner.description',
    category: 'education',
    color: 'from-amber-500 to-orange-500',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    features: ['productFeatures.aiGeneratedExercises', 'productFeatures.intelligentEvaluation', 'productFeatures.smartNotifications', 'productFeatures.adaptiveLearning']
  }
]

export default function ProductsPage() {
  const { t } = useTranslation('common')
  const { theme } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: t('products.viewAll') },
    { id: 'productivity', label: t('products.categories.productivity') },
    { id: 'communication', label: t('products.categories.communication') },
    { id: 'legal', label: t('products.categories.legal') },
    { id: 'education', label: t('products.categories.education') }
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  const structuredData = products.map(product => 
    createProductSchema({
      name: t(product.titleKey),
      description: t(product.descriptionKey),
      image: 'https://overx.ai/products/default.jpg',
      brand: 'OverX AI',
      offers: {
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock' as const
      }
    })
  )

  return (
    <>
      <BaseSEO
        title="Products - OverX AI | AI Solutions That Give You Time Back"
        description="Explore OverX AI's suite of intelligent products designed to automate tasks and improve your life. From productivity tools to AI assistants, find the perfect solution for your needs."
        canonical="https://overx.ai/products"
        openGraph={{
          type: 'website',
          title: 'OverX AI Products - Smart Solutions for Modern Life',
          description: 'Discover AI-powered tools that save time and boost productivity',
          url: 'https://overx.ai/products',
          siteName: 'OverX AI',
          image: {
            url: 'https://overx.ai/og-image.jpg',
            width: 1312,
            height: 736,
            alt: 'OverX AI Products - AI Solutions'
          }
        }}
        twitter={{
          card: 'summary_large_image',
          site: '@overxai',
          title: 'OverX AI Products - AI Solutions',
          description: 'Discover AI-powered tools that save time and boost productivity',
          image: 'https://overx.ai/twitter-card.jpg'
        }}
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
        <Navigation />
        
        <main className="pt-16">
          <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-100/50 to-transparent dark:from-blue-900/10 dark:to-transparent"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <Breadcrumbs items={[
                { name: t('navigation.home'), url: '/' },
                { name: t('navigation.products') }
              ]} />
              
              <div className="text-center mb-16 mt-8">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
                    {t('products.title')}
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  {t('products.subtitle')}
                </p>
              </div>
              
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-300 dark:hover:bg-gray-800'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
              
              {/* Products Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <SmartLink
                    key={product.id}
                    href={product.href || '#'}
                    className="block group"
                  >
                    <div
                      id={product.category}
                      className="relative bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black p-5 rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-gray-300 dark:hover:border-white/20 shadow-md dark:shadow-lg hover:shadow-lg cursor-pointer"
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                        willChange: 'transform'
                      }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                      
                      <div className="relative z-10">
                        <div className={`w-10 h-10 bg-gradient-to-r ${product.color} rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <div className="text-white">
                            {product.icon}
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white transition-all duration-300">
                          {t(product.titleKey)}
                        </h3>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3">
                          {t(product.descriptionKey)}
                        </p>
                        
                        {product.features && (
                          <ul className="space-y-2">
                            {product.features.slice(0, 3).map((feature, i) => (
                              <li key={i} className="flex items-center text-xs text-gray-500">
                                <svg className="w-3 h-3 mr-1.5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="line-clamp-1">{t(feature)}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </SmartLink>
                ))}
              </div>
              
              {/* CTA Section */}
              <div className="text-center mt-20">
                <h2 className="text-3xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                    {t('productsCta.title')}
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  {t('productsCta.description')}
                </p>
                <SmartLink 
                  href="/consultancy" 
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30"
                >
                  <span>{t('productsCta.button')}</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </SmartLink>
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