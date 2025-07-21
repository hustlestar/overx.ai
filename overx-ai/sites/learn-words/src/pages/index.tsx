import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { BaseSEO } from '@overx-ai/shared'
import { Layout } from '@/components/Layout'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const { t } = useTranslation('common')
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const words = ['Hello', 'Hola', 'Bonjour', 'Привет', '你好', 'مرحبا']

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
        setIsVisible(true)
      }, 300)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <BaseSEO
        title={`${t('site.title')} - ${t('site.tagline')}`}
        description={t('site.description')}
        canonical="https://learn.overx.ai"
        openGraph={{
          type: 'website',
          title: t('site.title'),
          description: t('site.description'),
          url: 'https://learn.overx.ai',
          siteName: 'Learn Words Bot'
        }}
      />
      
      <Layout>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-emerald-900/20"></div>
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-green-400/20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    {t('hero.title')}
                  </span>
                </h1>
                <div className="text-3xl md:text-5xl font-light mb-8">
                  <span className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    {words[currentWordIndex]}
                  </span>
                  <span className="text-gray-500"> → </span>
                  <span className="text-2xl md:text-4xl">{t('hero.subtitle')}</span>
                </div>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  {t('hero.description')}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <a 
                  href="https://t.me/learn_words_bot" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full text-lg font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30"
                >
                  <span className="relative z-10">{t('hero.cta1')}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </a>
                <Link 
                  href="#how-it-works" 
                  className="group relative px-8 py-4 border border-white/20 rounded-full text-lg font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:border-white/40 hover:shadow-2xl hover:shadow-white/10"
                >
                  <span className="relative z-10">{t('hero.cta2')}</span>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                {Object.entries(t('hero.stats', { returnObjects: true })).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-3xl font-bold text-green-400">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-24 relative" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 opacity-0 animate-slide-in-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {t('features.title')}
                </span>
              </h2>
              <p className="text-xl text-gray-500">{t('features.subtitle')}</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(t('features.list', { returnObjects: true })).map(([key, feature]: [string, any], index) => (
                <div 
                  key={key}
                  className="group relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-green-500/20 opacity-0 animate-slide-in-right"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {key === 'ai' && (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                      {key === 'exercises' && (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      )}
                      {key === 'spaced' && (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {key === 'languages' && (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                      )}
                      {key === 'tracking' && (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      )}
                      {key === 'personalized' && (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-24 bg-gradient-to-b from-black via-gray-900/30 to-black" id="how-it-works">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {t('howItWorks.title')}
                </span>
              </h2>
              <p className="text-xl text-gray-500">{t('howItWorks.subtitle')}</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(t('howItWorks.steps', { returnObjects: true })).map(([key, step]: [string, any], index) => (
                <div key={key} className="text-center">
                  <div className="relative">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mb-6">
                      <span className="text-3xl font-bold">{index + 1}</span>
                    </div>
                    {index < 3 && (
                      <div className="hidden lg:block absolute top-10 left-20 w-full">
                        <svg className="w-full h-2" viewBox="0 0 100 10">
                          <path d="M0,5 L100,5" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="5,5" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {t('testimonials.title')}
                </span>
              </h2>
              <p className="text-xl text-gray-500">{t('testimonials.subtitle')}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(t('testimonials.items', { returnObjects: true })).map(([key, item]: [string, any]) => (
                <div key={key} className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{item.text}"</p>
                  <div>
                    <p className="font-semibold">{item.author}</p>
                    <p className="text-sm text-gray-500">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-emerald-600/10 to-teal-600/10"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                {t('cta.title')}
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              {t('cta.subtitle')}
            </p>
            <a 
              href="https://t.me/learn_words_bot" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30"
            >
              <span>{t('cta.telegram')}</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </a>
          </div>
        </section>
      </Layout>
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