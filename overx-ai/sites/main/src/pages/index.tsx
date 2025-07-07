import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import { BaseSEO, SmartLink, OptimizedImage, PreconnectLink } from '../components/NextSEO'
import { Breadcrumbs } from '@overx-ai/shared/seo'
import { createOrganizationSchema, createWebSiteSchema } from '@overx-ai/shared/lib/schema'

interface HomePageProps {
  lastModified: string
}

export default function HomePage({ lastModified }: HomePageProps) {
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
        title="OverX AI - Over the Xorizon"
        description="Step beyond the horizon with OverX AI. Pioneering artificial intelligence solutions that transform businesses through cutting-edge technology and visionary innovation."
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
      
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* Animated background gradient */}
        <div 
          className="fixed inset-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
            transition: 'background 0.3s ease'
          }}
        />

        <header className="fixed top-0 w-full bg-black/50 backdrop-blur-xl border-b border-white/10 z-50 transition-all duration-300"
          style={{
            backgroundColor: scrollY > 50 ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.3)',
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
                <SmartLink href="/products" className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                  <span>Products</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                </SmartLink>
                <SmartLink href="/about" className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                  <span>About</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                </SmartLink>
                <SmartLink href="https://blog.overx.ai" className="text-gray-300 hover:text-white transition-colors duration-300 relative group" external>
                  <span>Blog</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                </SmartLink>
                <SmartLink href="/cv" className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                  <span>CV</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                </SmartLink>
                <SmartLink 
                  href="/contact" 
                  className="relative overflow-hidden px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </SmartLink>
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
                  className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
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
                  <div className="mb-6">
                    <span className="text-lg md:text-xl text-gray-500 font-light tracking-widest uppercase">Welcome to</span>
                  </div>
                  <h1 className="text-6xl md:text-8xl font-bold mb-4">
                    <span className="block bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent animate-gradient-x">OverX AI</span>
                  </h1>
                  <div className="mt-4">
                    <span className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400 animate-gradient-x font-light italic">Over the Xorizon</span>
                  </div>
                </div>
                <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  Step beyond conventional boundaries. Pioneer the future with AI solutions that transform possibilities into reality.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <SmartLink 
                    href="/demo" 
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-lg font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30"
                  >
                    <span className="relative z-10">Experience the Future</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </SmartLink>
                  <SmartLink 
                    href="/products" 
                    className="group relative px-8 py-4 border border-white/20 rounded-full text-lg font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:border-white/40 hover:shadow-2xl hover:shadow-white/10"
                  >
                    <span className="relative z-10">Explore Solutions</span>
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </SmartLink>
                </div>
              </div>
              
              {/* Scroll indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
                <div className="flex flex-col items-center">
                  <span className="text-sm text-gray-500 mb-2">Scroll to explore</span>
                  <div className="w-6 h-10 border border-white/20 rounded-full relative">
                    <div className="absolute w-1 h-3 bg-white/60 rounded-full left-1/2 transform -translate-x-1/2 top-2 animate-scroll-down"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-24 relative overflow-hidden" id="products-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 opacity-0 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Pioneering Solutions</span>
                </h2>
                <p className="text-xl text-gray-500">Technologies that transcend traditional boundaries</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="group relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300"></div>
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300">Neural Interface</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      Advanced language models that understand context, intent, and nuance like never before
                    </p>
                    <SmartLink 
                      href="https://producta.overx.ai" 
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium group/link transition-colors duration-300"
                      external
                    >
                      <span>Discover More</span>
                      <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </SmartLink>
                  </div>
                </div>
                <div className="group relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300"></div>
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-teal-400 transition-all duration-300">Quantum Flow</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      Intelligent automation that learns, adapts, and evolves with your business ecosystem
                    </p>
                    <SmartLink 
                      href="https://productb.overx.ai" 
                      className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium group/link transition-colors duration-300"
                      external
                    >
                      <span>Discover More</span>
                      <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </SmartLink>
                  </div>
                </div>
                <div className="group relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-600/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300"></div>
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-emerald-400 transition-all duration-300">Infinite Vision</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      Predictive intelligence that sees beyond data, revealing patterns invisible to traditional analytics
                    </p>
                    <SmartLink 
                      href="https://productc.overx.ai" 
                      className="inline-flex items-center text-teal-400 hover:text-teal-300 font-medium group/link transition-colors duration-300"
                      external
                    >
                      <span>Discover More</span>
                      <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </SmartLink>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose OverX Section */}
          <section className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-gray-900/50 to-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 opacity-0 animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Why Choose OverX AI</span>
                </h2>
                <p className="text-xl text-gray-500">Experience the future of AI-driven innovation</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="opacity-0 animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
                  <div className="space-y-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex-shrink-0"></div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Cutting-Edge Technology</h3>
                        <p className="text-gray-400">Leverage the latest AI advancements with our continuously evolving platform</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg flex-shrink-0"></div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Enterprise Ready</h3>
                        <p className="text-gray-400">Built for scale with robust security, compliance, and performance</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg flex-shrink-0"></div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                        <p className="text-gray-400">Expert assistance whenever you need it, ensuring smooth operations</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="opacity-0 animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-3xl"></div>
                    <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
                      <div className="text-center">
                        <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">98%</div>
                        <p className="text-gray-400">Customer Satisfaction</p>
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

          {/* CTA Section */}
          <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-teal-600/10"></div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <div className="opacity-0 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">Ready to Transform Your Business?</span>
                </h2>
                <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                  Join thousands of companies already leveraging OverX AI to stay ahead of the competition
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <SmartLink 
                    href="/demo" 
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-lg font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30"
                  >
                    <span className="relative z-10">Start Free Trial</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </SmartLink>
                  <SmartLink 
                    href="/contact" 
                    className="group relative px-8 py-4 border border-white/20 rounded-full text-lg font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:border-white/40 hover:shadow-2xl hover:shadow-white/10"
                  >
                    <span className="relative z-10">Talk to Sales</span>
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </SmartLink>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <footer className="relative bg-black border-t border-white/10 py-16 mt-24">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/5 to-transparent"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Products</h4>
                <ul className="space-y-2">
                  <li><SmartLink href="/products/neural-interface" className="text-gray-400 hover:text-white transition-colors duration-300">Neural Interface</SmartLink></li>
                  <li><SmartLink href="/products/quantum-flow" className="text-gray-400 hover:text-white transition-colors duration-300">Quantum Flow</SmartLink></li>
                  <li><SmartLink href="/products/infinite-vision" className="text-gray-400 hover:text-white transition-colors duration-300">Infinite Vision</SmartLink></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><SmartLink href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">About</SmartLink></li>
                  <li><SmartLink href="/careers" className="text-gray-400 hover:text-white transition-colors duration-300">Careers</SmartLink></li>
                  <li><SmartLink href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</SmartLink></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><SmartLink href="https://blog.overx.ai" className="text-gray-400 hover:text-white transition-colors duration-300" external>Blog</SmartLink></li>
                  <li><SmartLink href="/docs" className="text-gray-400 hover:text-white transition-colors duration-300">Documentation</SmartLink></li>
                  <li><SmartLink href="/support" className="text-gray-400 hover:text-white transition-colors duration-300">Support</SmartLink></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><SmartLink href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</SmartLink></li>
                  <li><SmartLink href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</SmartLink></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-gray-400">&copy; 2024 OverX AI. All rights reserved.</p>
                </div>
                <div className="flex space-x-6">
                  <a href="https://twitter.com/overxai" className="text-gray-400 hover:text-white transition-colors duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com/company/overxai" className="text-gray-400 hover:text-white transition-colors duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://github.com/overxai" className="text-gray-400 hover:text-white transition-colors duration-300">
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

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  return {
    props: {
      lastModified: new Date().toISOString()
    },
    revalidate: 60 * 60 * 24 // Revalidate once per day
  }
}