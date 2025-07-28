import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import { BaseSEO, SmartLink, OptimizedImage, PreconnectLink } from '../components/NextSEO'
import { Breadcrumbs, createOrganizationSchema, createWebSiteSchema, ThemeToggle, useTheme } from '@overx-ai/shared'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LanguageSwitcher } from '../components/LanguageSwitcher'

interface HomePageProps {
  lastModified: string
}

export default function HomePage({ lastModified }: HomePageProps) {
  const { t } = useTranslation('common')
  const { theme } = useTheme()
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)

    // Intersection Observer for slide-in animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-in-active')
        }
      })
    }, { threshold: 0.1 })

    // Observe all elements with slide animations
    const elements = document.querySelectorAll('.animate-slide-in-left, .animate-slide-in-right')
    elements.forEach((el) => observer.observe(el))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  const structuredData = [
    createOrganizationSchema({
      name: 'OverX AI',
      url: 'https://overx.ai',
      logo: 'https://overx.ai/logo.png',
      sameAs: [
        'https://twitter.com/overxai',
        'https://linkedin.com/company/overxai',
        'https://github.com/overxai'
      ],
      contactPoint: {
        telephone: '+1-555-123-4567',
        contactType: 'customer service',
        areaServed: 'US',
        availableLanguage: ['en', 'es']
      }
    }),
    createWebSiteSchema({
      name: 'OverX AI',
      url: 'https://overx.ai',
      potentialAction: true
    })
  ]

  return (
    <>
      <BaseSEO
        title="OverX AI - Get Your Time Back with Smart AI Solutions"
        description="OverX AI creates intelligent solutions that automate repetitive tasks and give you more free time. From productivity tools to AI assistants, we make life better through smart automation."
        canonical="https://overx.ai"
        openGraph={{
          type: 'website',
          title: 'OverX AI - Pioneering AI Solutions',
          description: 'Transform your business with cutting-edge AI solutions',
          image: {
            url: 'https://overx.ai/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'OverX.ai Platform Overview'
          },
          siteName: 'OverX AI',
          locale: 'en_US',
          url: 'https://overx.ai'
        }}
        twitter={{
          card: 'summary_large_image',
          site: '@overxai',
          title: 'OverX AI - Pioneering AI Solutions',
          description: 'Transform your business with cutting-edge AI solutions',
          image: 'https://overx.ai/twitter-card.jpg'
        }}
        structuredData={structuredData}
      />
      
      <PreconnectLink origins={['https://cdn.overx.ai', 'https://api.overx.ai']} />
      
      <div className="min-h-screen bg-black text-white light:bg-gray-50 light:text-gray-900 overflow-x-hidden transition-colors duration-300">
        {/* Horizon line with sunrise */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Dynamic sun glow that follows the sun */}
          <div 
            className="absolute bottom-0 left-0 w-full h-full transition-all duration-300"
            style={{
              background: `radial-gradient(ellipse at ${15 + (scrollY * 0.026)}% 100%, rgba(255, 255, 255, 0.15) 0%, transparent 35%)`,
            }}
          />
          
          {/* Main horizon atmosphere */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[70vh]"
            style={{
              background: 'radial-gradient(ellipse at bottom center, rgba(255,255,255,0.05) 0%, transparent 60%)',
            }}
          />
          
          <svg 
            className="absolute bottom-0 left-0 right-0 w-full"
            style={{ height: '60vh' }}
            viewBox="0 0 1920 600"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="sunGlow">
                <stop offset="0%" stopColor="rgba(255,255,255,1)" />
                <stop offset="40%" stopColor="rgba(255,255,255,0.8)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
              <filter id="rayGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Dynamic sun position following a curved path */}
            {(() => {
              const sunX = 300 + (scrollY * 0.5);
              // Create a parabolic arc: sun rises and then sets
              const scrollProgress = Math.min(scrollY / 2000, 1);
              const sunY = Math.pow((scrollProgress - 0.5) * 2, 2) * 200 - 200; // Much larger arc - 200px peak
              
              return (
                <g transform={`translate(${sunX}, ${sunY})`}>
              {/* Sun glow */}
              <circle
                cx="0"
                cy="280"
                r="40"
                fill="url(#sunGlow)"
                opacity="0.3"
              />
              {/* Sun core */}
              <circle
                cx="0"
                cy="280"
                r="12"
                fill="rgba(255,255,255,0.7)"
              />
              
              {/* Dynamic rays that change direction as sun moves */}
              <g filter="url(#rayGlow)">
                {/* Calculate progress (0 to 1) based on sun position */}
                {(() => {
                  const sunProgress = Math.min(scrollY / 2000, 1); // Normalize scroll to 0-1
                  
                  // Rays with wider angles - all falling to y=400
                  const leftRayEndX = 600 - (sunProgress * 1200); // 600 to -600
                  const centerRayEndX = 300 - (sunProgress * 600); // 300 to -300
                  const rightRayEndX = 1200 - (sunProgress * 2400); // 1200 to -1200 (much wider)
                  
                  return (
                    <>
                      {/* Left ray - wide angle */}
                      <line 
                        x1="0" 
                        y1="280" 
                        x2={leftRayEndX} 
                        y2={400 - sunY} 
                        stroke="rgba(255,255,255,0.3)" 
                        strokeWidth="2"
                      />
                      {/* Center ray */}
                      <line 
                        x1="0" 
                        y1="280" 
                        x2={centerRayEndX} 
                        y2={400 - sunY} 
                        stroke="rgba(255,255,255,0.35)" 
                        strokeWidth="2.5"
                      />
                      {/* Right ray - extra wide angle */}
                      <line 
                        x1="0" 
                        y1="280" 
                        x2={rightRayEndX} 
                        y2={400 - sunY} 
                        stroke="rgba(255,255,255,0.3)" 
                        strokeWidth="2"
                      />
                    </>
                  );
                })()}
              </g>
              </g>
              );
            })()}
            
            {/* Horizon curve - simple and clean */}
            <path
              d="M0,400 Q960,370 1920,400 L1920,600 L0,600 Z"
              fill="rgba(255,255,255,0.02)"
            />
            <path
              d="M0,400 Q960,370 1920,400"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>
        
        {/* Animated background gradient */}
        <div 
          className="fixed inset-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
            transition: 'background 0.3s ease'
          }}
        />

        <header className="fixed top-0 w-full bg-black/50 light:bg-white/70 backdrop-blur-xl border-b border-white/10 light:border-gray-200 z-50 transition-all duration-300"
          style={{
            backgroundColor: scrollY > 50 
              ? (theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)') 
              : (theme === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.3)'),
          }}>
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
                <SmartLink href="/products" className="text-gray-300 light:text-gray-700 hover:text-white light:hover:text-gray-900 transition-colors duration-300 relative group">
                  <span>{t('navigation.products')}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                </SmartLink>
                <SmartLink href="https://blog.overx.ai" className="text-gray-300 light:text-gray-700 hover:text-white light:hover:text-gray-900 transition-colors duration-300 relative group" external>
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
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
            </div>
          </nav>
        </header>
        
        <main className="pt-16">
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated particles background */}
            <div className="absolute inset-0">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/20 light:bg-gray-900/20 rounded-full animate-pulse"
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
                <div className="mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <h1 className="text-6xl md:text-8xl font-bold mb-4">
                    <span className="block bg-gradient-to-r from-white via-gray-200 to-white light:from-gray-900 light:via-gray-700 light:to-gray-900 bg-clip-text text-transparent animate-gradient-x">{t('hero.title')}</span>
                  </h1>
                  <div className="mt-4">
                    <span className="text-xl md:text-2xl text-gray-500 font-light">{t('hero.subtitle')}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <SmartLink 
                    href="/products" 
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-lg font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30"
                  >
                    <span className="relative z-10">{t('hero.cta1')}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </SmartLink>
                  <SmartLink 
                    href="/consultancy" 
                    className="group relative px-8 py-4 border border-white/20 light:border-gray-300 rounded-full text-lg font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:border-white/40 light:hover:border-gray-500 hover:shadow-2xl hover:shadow-white/10 light:hover:shadow-gray-900/10"
                  >
                    <span className="relative z-10">{t('hero.cta2')}</span>
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </SmartLink>
                </div>
              </div>
            </div>
            
            {/* Scroll indicator */}
            <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-opacity duration-500 ${scrollY > 100 ? 'opacity-0 pointer-events-none' : 'opacity-100 animate-fade-in'}`} style={{ animationDelay: '1s' }}>
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-500 mb-2">{t('hero.scrollPrompt')}</span>
                <div className="w-6 h-10 border border-white/20 rounded-full relative">
                  <div className="absolute w-1 h-3 bg-white/60 rounded-full left-1/2 transform -translate-x-1/2 top-2 animate-scroll-down"></div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-24 relative overflow-hidden" id="products-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 opacity-0 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">{t('products.title')}</span>
                </h2>
                <p className="text-xl text-gray-500 light:text-gray-600">{t('products.subtitle')}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Productivity Tools */}
                <div className="group relative bg-gradient-to-br from-gray-900 to-black light:from-white light:to-gray-100 p-8 rounded-2xl border border-white/10 light:border-gray-200 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-white/20 light:hover:border-gray-300 light:shadow-lg" style={{ willChange: 'transform' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 light:from-blue-100/50 light:to-cyan-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300">{t('productList.blockWebsite.title')}</h3>
                    <p className="text-gray-400 light:text-gray-600 mb-6 leading-relaxed">
                      {t('productList.blockWebsite.description')}
                    </p>
                    <SmartLink 
                      href="/products#productivity" 
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium group/link transition-colors duration-300"
                    >
                      <span>{t('products.learnMore')}</span>
                      <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </SmartLink>
                  </div>
                </div>
                {/* AI Assistants */}
                <div className="group relative bg-gradient-to-br from-gray-900 to-black light:from-white light:to-gray-100 p-8 rounded-2xl border border-white/10 light:border-gray-200 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-white/20 light:hover:border-gray-300 light:shadow-lg" style={{ willChange: 'transform' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-teal-600/10 light:from-cyan-100/50 light:to-teal-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-teal-400 transition-all duration-300">{t('productList.claudeCodeBot.title')}</h3>
                    <p className="text-gray-400 light:text-gray-600 mb-6 leading-relaxed">
                      {t('productList.claudeCodeBot.description')}
                    </p>
                    <SmartLink 
                      href="/products#communication" 
                      className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium group/link transition-colors duration-300"
                    >
                      <span>{t('products.learnMore')}</span>
                      <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </SmartLink>
                  </div>
                </div>
                {/* Legal Services */}
                <div className="group relative bg-gradient-to-br from-gray-900 to-black light:from-white light:to-gray-100 p-8 rounded-2xl border border-white/10 light:border-gray-200 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-white/20 light:hover:border-gray-300 light:shadow-lg" style={{ willChange: 'transform' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-600/10 to-emerald-600/10 light:from-teal-100/50 light:to-emerald-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-emerald-400 transition-all duration-300">{t('productList.consultBy.title')}</h3>
                    <p className="text-gray-400 light:text-gray-600 mb-6 leading-relaxed">
                      {t('productList.consultBy.description')}
                    </p>
                    <SmartLink 
                      href="/products#legal" 
                      className="inline-flex items-center text-teal-400 hover:text-teal-300 font-medium group/link transition-colors duration-300"
                    >
                      <span>{t('products.learnMore')}</span>
                      <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </SmartLink>
                  </div>
                </div>
              </div>
              {/* View All Products CTA */}
              <div className="text-center mt-12">
                <SmartLink 
                  href="/products" 
                  className="inline-flex items-center px-8 py-3 border border-white/20 rounded-full text-lg font-medium hover:bg-white/5 transition-all duration-300"
                >
                  <span>{t('products.viewAll')}</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </SmartLink>
              </div>
            </div>
          </section>

          {/* Featured Product - Learn Words Bot */}
          <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-emerald-600/10 to-teal-600/10"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="opacity-0 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                  <div className="inline-flex items-center px-4 py-2 bg-green-600/20 border border-green-600/30 rounded-full mb-6">
                    <span className="text-green-400 font-medium">{t('featuredProduct.label')}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                      {t('productList.learnWords.title')}
                    </span>
                  </h2>
                  <p className="text-xl text-gray-400 light:text-gray-600 mb-8">
                    {t('productList.learnWords.description')}
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{t('featuredProduct.feature1')}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{t('featuredProduct.feature2')}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{t('featuredProduct.feature3')}</span>
                    </div>
                  </div>
                  <SmartLink 
                    href="https://learn.overx.ai" 
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30"
                    external
                  >
                    <span>{t('featuredProduct.cta')}</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </SmartLink>
                </div>
                <div className="opacity-0 animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20 blur-3xl"></div>
                    <div className="relative bg-gradient-to-br from-gray-900 to-black light:from-white light:to-gray-100 p-8 rounded-2xl border border-white/10 light:border-gray-200 light:shadow-lg">
                      <div className="space-y-4">
                        <div className="flex justify-end">
                          <div className="bg-green-600/20 border border-green-600/30 rounded-2xl rounded-br-none px-6 py-3 max-w-xs">
                            <p className="text-green-400 font-medium">despertar</p>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-gray-800 rounded-2xl rounded-bl-none px-6 py-4 max-w-md">
                            <p className="text-white mb-2">🇪🇸 despertar → 🇬🇧 to wake up</p>
                            <p className="text-gray-400 light:text-gray-600 text-sm">Wake up, awaken, rouse from sleep</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose OverX Section */}
          <section className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-gray-900/50 to-black light:from-gray-50 light:via-gray-100/50 light:to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 opacity-0 animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">{t('values.title')}</span>
                </h2>
                <p className="text-xl text-gray-500 light:text-gray-600">{t('values.subtitle')}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="opacity-0 animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
                  <div className="space-y-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{t('values.card1.title')}</h3>
                        <p className="text-gray-400 light:text-gray-600">{t('values.card1.description')}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{t('values.card2.title')}</h3>
                        <p className="text-gray-400 light:text-gray-600">{t('values.card2.description')}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{t('values.card3.title')}</h3>
                        <p className="text-gray-400 light:text-gray-600">{t('values.card3.description')}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="opacity-0 animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-3xl"></div>
                    <div className="relative bg-gradient-to-br from-gray-900 to-black light:from-white light:to-gray-100 p-8 rounded-2xl border border-white/10 light:border-gray-200 light:shadow-lg">
                      <div className="text-center">
                        <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">98%</div>
                        <p className="text-gray-400 light:text-gray-600">Customer Satisfaction</p>
                        <div className="mt-6 space-y-2">
                          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '98%' }}></div>
                          </div>
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>Performance</span>
                            <span>98%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="py-24 bg-gradient-to-b from-gray-900/50 to-black light:from-gray-100/50 light:to-gray-50" id="consultation-form">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    {t('consultancy.cta.bookConsultation')}
                  </span>
                </h2>
                <p className="text-xl text-gray-400 light:text-gray-600">{t('consultancy.form.heading')}</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900 to-black light:from-white light:to-gray-100 p-10 rounded-2xl border border-white/10 light:border-gray-200 light:shadow-xl">
                <form onSubmit={(e) => {
                  e.preventDefault()
                  // Handle form submission
                  console.log('Form submitted')
                }} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        {t('consultancy.form.name')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 bg-black/50 light:bg-white border border-white/10 light:border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 light:focus:border-blue-400 transition-colors text-white light:text-gray-900"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        {t('consultancy.form.email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 bg-black/50 light:bg-white border border-white/10 light:border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 light:focus:border-blue-400 transition-colors text-white light:text-gray-900"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('consultancy.form.company')}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('consultancy.form.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full px-4 py-3 bg-black/50 light:bg-white border border-white/10 light:border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 light:focus:border-blue-400 transition-colors resize-none text-white light:text-gray-900"
                    />
                  </div>
                  
                  <div className="text-center">
                    <button
                      type="submit"
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30"
                    >
                      <span>{t('consultancy.form.submit')}</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </main>
        
        <footer className="relative bg-black border-t border-white/10 py-16">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/5 to-transparent"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">{t('footer.navigation.products')}</h4>
                <ul className="space-y-2">
                  <li><SmartLink href="/products#productivity" className="text-gray-400 light:text-gray-600 hover:text-white light:hover:text-gray-900 transition-colors duration-300">{t('products.categories.productivity')}</SmartLink></li>
                  <li><SmartLink href="/products#communication" className="text-gray-400 light:text-gray-600 hover:text-white light:hover:text-gray-900 transition-colors duration-300">{t('products.categories.communication')}</SmartLink></li>
                  <li><SmartLink href="/products#legal" className="text-gray-400 light:text-gray-600 hover:text-white light:hover:text-gray-900 transition-colors duration-300">{t('products.categories.legal')}</SmartLink></li>
                  <li><SmartLink href="/products#education" className="text-gray-400 light:text-gray-600 hover:text-white light:hover:text-gray-900 transition-colors duration-300">{t('products.categories.education')}</SmartLink></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">{t('footer.company')}</h4>
                <ul className="space-y-2">
                  <li><SmartLink href="/about" className="text-gray-400 light:text-gray-600 hover:text-white light:hover:text-gray-900 transition-colors duration-300">{t('footer.navigation.about')}</SmartLink></li>
                  <li><SmartLink href="/careers" className="text-gray-400 light:text-gray-600 hover:text-white light:hover:text-gray-900 transition-colors duration-300">{t('footer.navigation.careers')}</SmartLink></li>
                  <li><SmartLink href="/contact" className="text-gray-400 light:text-gray-600 hover:text-white light:hover:text-gray-900 transition-colors duration-300">Contact</SmartLink></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">{t('footer.resources')}</h4>
                <ul className="space-y-2">
                  <li><SmartLink href="https://blog.overx.ai" className="text-gray-400 light:text-gray-600 hover:text-white light:hover:text-gray-900 transition-colors duration-300" external>{t('footer.navigation.blog')}</SmartLink></li>
                  <li><SmartLink href="/docs" className="text-gray-400 light:text-gray-600 hover:text-white light:hover:text-gray-900 transition-colors duration-300">{t('footer.documentation')}</SmartLink></li>
                  <li><SmartLink href="/support" className="text-gray-400 light:text-gray-600 hover:text-white light:hover:text-gray-900 transition-colors duration-300">{t('footer.support')}</SmartLink></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">{t('footer.legal')}</h4>
                <ul className="space-y-2">
                  <li><SmartLink href="/privacy" className="text-gray-400 light:text-gray-600 hover:text-white light:hover:text-gray-900 transition-colors duration-300">{t('footer.privacyPolicy')}</SmartLink></li>
                  <li><SmartLink href="/terms" className="text-gray-400 light:text-gray-600 hover:text-white light:hover:text-gray-900 transition-colors duration-300">{t('footer.termsOfService')}</SmartLink></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-gray-400 light:text-gray-600">&copy; 2024 {t('companyName')}. {t('footer.rights')}.</p>
                </div>
                <div className="flex space-x-6">
                  <a href="https://twitter.com/overxai" className="text-gray-400 light:text-gray-600 hover:text-white light:hover:text-gray-900 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com/company/overxai" className="text-gray-400 light:text-gray-600 hover:text-white light:hover:text-gray-900 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://github.com/overxai" className="text-gray-400 light:text-gray-600 hover:text-white light:hover:text-gray-900 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      lastModified: new Date().toISOString()
    }
  }
}