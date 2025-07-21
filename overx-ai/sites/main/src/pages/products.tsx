import { GetStaticProps } from 'next'
import { useState } from 'react'
import { BaseSEO, SmartLink, OptimizedImage } from '../components/NextSEO'
import { createProductSchema, Breadcrumbs } from '@overx-ai/shared'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LanguageSwitcher } from '../components/LanguageSwitcher'

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
    id: 'blockWebsite',
    titleKey: 'productList.blockWebsite.title',
    descriptionKey: 'productList.blockWebsite.description',
    category: 'productivity',
    color: 'from-blue-500 to-cyan-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    features: ['productFeatures.smartPatternBlocking', 'productFeatures.wellnessActivities', 'productFeatures.passwordProtection', 'productFeatures.realTimeSync']
  },
  {
    id: 'currencyConverter',
    titleKey: 'productList.currencyConverter.title',
    descriptionKey: 'productList.currencyConverter.description',
    category: 'productivity',
    color: 'from-emerald-500 to-teal-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    features: ['productFeatures.currencies100Plus', 'productFeatures.complexCalculations', 'productFeatures.privacyFirst', 'productFeatures.languages9']
  },
  {
    id: 'instagramSaver',
    titleKey: 'productList.instagramSaver.title',
    descriptionKey: 'productList.instagramSaver.description',
    category: 'productivity',
    color: 'from-purple-500 to-pink-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    features: ['productFeatures.languages13', 'productFeatures.spacedRepetition', 'productFeatures.voiceSupport', 'productFeatures.exerciseTypes4'],
    href: 'https://learn.overx.ai'
  },
  {
    id: 'yourLearner',
    titleKey: 'productList.yourLearner.title',
    descriptionKey: 'productList.yourLearner.description',
    category: 'education',
    color: 'from-amber-500 to-orange-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    features: ['productFeatures.aiGeneratedExercises', 'productFeatures.intelligentEvaluation', 'productFeatures.smartNotifications', 'productFeatures.adaptiveLearning']
  }
]

export default function ProductsPage() {
  const { t } = useTranslation('common')
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
          url: 'https://overx.ai/products'
        }}
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-black text-white">
        <header className="fixed top-0 w-full bg-black/90 backdrop-blur-xl border-b border-white/10 z-50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <SmartLink href="/" className="group">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">OverX AI</span>
                    <span className="text-xs text-gray-500 font-light tracking-wider transform -translate-y-1">Over the Xorizon</span>
                  </div>
                </SmartLink>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <SmartLink href="/products" className="text-white relative group">
                  <span>{t('navigation.products')}</span>
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"></span>
                </SmartLink>
                <SmartLink href="https://blog.overx.ai" className="text-gray-300 hover:text-white transition-colors duration-300 relative group" external>
                  <span>{t('navigation.blog')}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                </SmartLink>
                <SmartLink 
                  href="/consultancy" 
                  className="relative overflow-hidden px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <span className="relative z-10">{t('navigation.bookConsultation')}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </SmartLink>
                <LanguageSwitcher />
              </div>
            </div>
          </nav>
        </header>
        
        <main className="pt-16">
          <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <Breadcrumbs items={[
                { name: t('navigation.home'), url: '/' },
                { name: t('navigation.products') }
              ]} />
              
              <div className="text-center mb-16 mt-8">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                    {t('products.title')}
                  </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
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
                        : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
              
              {/* Products Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    id={product.category}
                    className="group relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-white/20"
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      willChange: 'transform'
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className={`w-14 h-14 bg-gradient-to-r ${product.color} rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {product.icon}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-semibold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                        {t(product.titleKey)}
                      </h3>
                      
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        {t(product.descriptionKey)}
                      </p>
                      
                      {product.features && (
                        <ul className="space-y-2 mb-6">
                          {product.features.slice(0, 3).map((feature, i) => (
                            <li key={i} className="flex items-center text-sm text-gray-500">
                              <svg className="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {t(feature)}
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      <SmartLink 
                        href={product.href || '#'} 
                        className={`inline-flex items-center text-sm font-medium group/link transition-colors duration-300 bg-gradient-to-r ${product.color} bg-clip-text text-transparent`}
                      >
                        <span>{t('products.learnMore')}</span>
                        <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </SmartLink>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* CTA Section */}
              <div className="text-center mt-20">
                <h2 className="text-3xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    {t('productsCta.title')}
                  </span>
                </h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
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
        
        <footer className="relative bg-black border-t border-white/10 py-16 mt-24">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/5 to-transparent"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <p className="text-gray-400">&copy; 2024 {t('companyName')}. {t('footer.rights')}.</p>
            </div>
          </div>
        </footer>
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