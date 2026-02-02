import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import { BaseSEO, SmartLink, OptimizedImage, PreconnectLink } from '../components/NextSEO'
import { Breadcrumbs, createOrganizationSchema, createWebSiteSchema, useTheme } from '@overx-ai/shared'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Navigation } from '../components/Navigation'
import { Footer } from '../components/Footer'
import { ContactForm } from '../components/ContactForm'

interface HomePageProps {
  lastModified: string
}

export default function HomePage({ lastModified }: HomePageProps) {
  const { t } = useTranslation('common')
  const { theme } = useTheme()
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check if should show animation (lg screens and up, and landscape orientation)
    const checkShowAnimation = () => {
      const isLargeScreen = window.innerWidth >= 1024
      const isLandscape = window.innerWidth > window.innerHeight
      const shouldShow = isLargeScreen && isLandscape
      setIsMobile(!shouldShow)
      return shouldShow
    }
    
    checkShowAnimation()
    
    const handleScroll = () => {
      if (checkShowAnimation()) {
        setScrollY(window.scrollY)
      }
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    const handleResize = () => {
      const shouldShow = checkShowAnimation()
      // Reset scrollY when animation should be hidden
      if (!shouldShow) {
        setScrollY(0)
      }
    }

    if (checkShowAnimation()) {
      window.addEventListener('scroll', handleScroll)
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

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
      window.removeEventListener('resize', handleResize)
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  const structuredData = [
    createOrganizationSchema({
      name: 'OverX AI',
      url: 'https://overx.ai',
      logo: 'https://overx.ai/og-image.png',
      sameAs: [],
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
        title="OverX AI - Custom AI Agents & Automation Solutions | Save 10+ Hours/Week"
        description="Build custom AI agents, Chrome extensions & automation tools with OverX AI. Free currency converter, AI consultancy, and SaaS solutions. Transform your workflow today."
        canonical="https://overx.ai"
        openGraph={{
          type: 'website',
          title: 'OverX AI - Custom AI Agents & Automation Solutions',
          description: 'Build custom AI agents & automation tools. Save 10+ hours/week with our AI consultancy, Chrome extensions, and SaaS solutions.',
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
      
      <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white overflow-x-hidden transition-colors duration-300">
        {/* Horizon line with sunrise - only visible on large landscape screens */}
        <div className="fixed inset-0 pointer-events-none hidden lg:block portrait:hidden z-0">
          {/* Dynamic sun glow that follows the sun */}
          <div 
            className="absolute bottom-0 left-0 w-full h-full transition-all duration-300"
            style={{
              background: theme === 'light'
                ? `radial-gradient(ellipse at ${15 + (scrollY * 0.026)}% 100%, rgba(59, 130, 246, 0.1) 0%, rgba(249, 250, 251, 0) 35%)`
                : `radial-gradient(ellipse at ${15 + (scrollY * 0.026)}% 100%, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0) 35%)`,
            }}
          />
          
          {/* Main horizon atmosphere */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[70vh]"
            style={{
              background: theme === 'light'
                ? 'radial-gradient(ellipse at bottom center, rgba(59, 130, 246, 0.05) 0%, rgba(249, 250, 251, 0) 60%)'
                : 'radial-gradient(ellipse at bottom center, rgba(255,255,255,0.05) 0%, rgba(0, 0, 0, 0) 60%)',
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
                <stop offset="0%" stopColor={theme === 'light' ? "rgba(0,0,0,1)" : "rgba(255,255,255,1)"} />
                <stop offset="40%" stopColor={theme === 'light' ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.8)"} />
                <stop offset="100%" stopColor={theme === 'light' ? "rgba(0,0,0,0)" : "rgba(255,255,255,0)"} />
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
                fill={theme === 'light' ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)"}
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
                        stroke={theme === 'light' ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)"} 
                        strokeWidth="2"
                      />
                      {/* Center ray */}
                      <line 
                        x1="0" 
                        y1="280" 
                        x2={centerRayEndX} 
                        y2={400 - sunY} 
                        stroke={theme === 'light' ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.35)"} 
                        strokeWidth="2.5"
                      />
                      {/* Right ray - extra wide angle */}
                      <line 
                        x1="0" 
                        y1="280" 
                        x2={rightRayEndX} 
                        y2={400 - sunY} 
                        stroke={theme === 'light' ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)"} 
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
              fill={theme === 'light' ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.02)"}
            />
            <path
              d="M0,400 Q960,370 1920,400"
              stroke={theme === 'light' ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)"}
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>
        
        {/* Animated background gradient */}
        <div 
          className="fixed inset-0 opacity-30 pointer-events-none"
          style={{
            background: theme === 'light' 
              ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15) 0%, rgba(249, 250, 251, 0) 50%)`
              : `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15) 0%, rgba(0, 0, 0, 0) 50%)`,
            transition: 'background 0.3s ease'
          }}
        />

        <Navigation />
        
        <main className="pt-16">
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated particles background */}
            {mounted && (
              <div className="absolute inset-0">
                {[...Array(50)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-gray-900/20 dark:bg-white/20 rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                      animationDuration: `${3 + Math.random() * 4}s`
                    }}
                  />
                ))}
              </div>
            )}
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center">
                <div className="mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <h1 className="text-6xl md:text-8xl font-bold mb-4 text-gray-900 dark:text-white">
                    <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent animate-gradient-x">{t('hero.title')}</span>
                  </h1>
                  <div className="mt-4">
                    <span className="text-xl md:text-2xl text-gray-600 dark:text-gray-500 font-light">{t('hero.subtitle')}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <SmartLink 
                    href="/products" 
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-lg font-medium text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30"
                  >
                    <span className="relative z-10">{t('hero.cta1')}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </SmartLink>
                  <SmartLink 
                    href="/consultancy" 
                    className="group relative px-8 py-4 border border-gray-300 dark:border-white/20 rounded-full text-lg font-medium text-gray-900 dark:text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:border-gray-500 dark:hover:border-white/40 hover:shadow-2xl hover:shadow-gray-900/10 dark:hover:shadow-white/10"
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
                  <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">{t('products.title')}</span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-500">{t('products.subtitle')}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Productivity Tools */}
                <a href="https://chromewebstore.google.com/detail/block-website-self-contro/obfpjaknohmdgkhambgdkfhnijccdhfa" target="_blank" rel="noopener noreferrer" className="block group">
                  <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black p-8 rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-gray-300 dark:hover:border-white/20 shadow-lg hover:shadow-xl" style={{ willChange: 'transform' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-cyan-100/50 dark:from-blue-600/10 dark:to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300">{t('productList.blockWebsite.title')}</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {t('productList.blockWebsite.description')}
                      </p>
                    </div>
                  </div>
                </a>
                {/* AI Assistants */}
                <a href="https://rates.overx.ai/" className="block group">
                  <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black p-8 rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-gray-300 dark:hover:border-white/20 shadow-lg hover:shadow-xl" style={{ willChange: 'transform' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/50 to-teal-100/50 dark:from-cyan-600/10 dark:to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-teal-400 transition-all duration-300">{t('productList.currencyConverter.title')}</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {t('productList.currencyConverter.description')}
                      </p>
                    </div>
                  </div>
                </a>
                {/* Legal Services */}
                <SmartLink href="/products#legal" className="block group">
                  <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black p-8 rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-gray-300 dark:hover:border-white/20 shadow-lg hover:shadow-xl" style={{ willChange: 'transform' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-100/50 to-emerald-100/50 dark:from-teal-600/10 dark:to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-emerald-400 transition-all duration-300">{t('productList.consultBy.title')}</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {t('productList.consultBy.description')}
                      </p>
                    </div>
                  </div>
                </SmartLink>
              </div>
              {/* View All Products CTA */}
              <div className="text-center mt-12">
                <SmartLink 
                  href="/products" 
                  className="inline-flex items-center px-8 py-3 border border-gray-300 dark:border-white/20 rounded-full text-lg font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300"
                >
                  <span>{t('products.viewAll')}</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </SmartLink>
              </div>
            </div>
          </section>

          {/* Featured Product - WWW Words */}
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
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                    {t('productList.learnWords.description')}
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{t('featuredProduct.feature1')}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{t('featuredProduct.feature2')}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{t('featuredProduct.feature3')}</span>
                    </div>
                  </div>
                  <SmartLink 
                    href="https://words.overx.ai" 
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full text-lg font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30"
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
                    <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-none">
                      <div className="space-y-4">
                        <div className="flex justify-end">
                          <div className="bg-green-600/20 border border-green-600/30 rounded-2xl rounded-br-none px-6 py-3 max-w-xs">
                            <p className="text-green-400 font-medium">despertar</p>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-gray-800 light:bg-gray-100 rounded-2xl rounded-bl-none px-6 py-4 max-w-md">
                            <p className="text-white light:text-gray-900 mb-2">🇪🇸 despertar → 🇬🇧 to wake up</p>
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
          <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-900/50 dark:to-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 opacity-0 animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">{t('values.title')}</span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-500">{t('values.subtitle')}</p>
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
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{t('values.card1.title')}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{t('values.card1.description')}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{t('values.card2.title')}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{t('values.card2.description')}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{t('values.card3.title')}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{t('values.card3.description')}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="opacity-0 animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-3xl"></div>
                    <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-none">
                      <div className="text-center">
                        <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">98%</div>
                        <p className="text-gray-600 dark:text-gray-400">Customer Satisfaction</p>
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

          {/* About OverX AI Section */}
          <section className="py-24 relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                    {t('about.title')}
                  </span>
                </h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                <p>{t('about.paragraph1')}</p>
                <p>{t('about.paragraph2')}</p>
                <p>{t('about.paragraph3')}</p>
                <p>{t('about.paragraph4')}</p>
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-black" id="consultation-form">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                    {t('consultancy.cta.bookConsultation')}
                  </span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">{t('consultancy.form.heading')}</p>
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

export const getStaticProps: GetStaticProps<HomePageProps> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      lastModified: new Date().toISOString()
    }
  }
}