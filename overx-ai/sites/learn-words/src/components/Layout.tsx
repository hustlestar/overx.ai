import { ReactNode } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { SmartLink } from '@overx-ai/shared'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useState, useEffect } from 'react'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const { t } = useTranslation('common')
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-black/90 backdrop-blur-xl' : 'bg-black/30 backdrop-blur-md'
      } border-b border-white/10`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="group">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    Learn Words
                  </span>
                  <span className="text-xs text-gray-500 font-light tracking-wider">AI Bot</span>
                </div>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                <span>{t('navigation.home')}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/features" className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                <span>{t('navigation.features')}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                <span>{t('navigation.pricing')}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/blog" className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                <span>{t('navigation.blog')}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <a 
                href="https://t.me/learn_words_bot" 
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden px-6 py-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
              >
                <span className="relative z-10">{t('navigation.getStarted')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <LanguageSwitcher />
            </div>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
            <div className="px-4 py-4 space-y-3">
              <Link href="/" className="block text-gray-300 hover:text-white transition-colors duration-300">
                {t('navigation.home')}
              </Link>
              <Link href="/features" className="block text-gray-300 hover:text-white transition-colors duration-300">
                {t('navigation.features')}
              </Link>
              <Link href="/pricing" className="block text-gray-300 hover:text-white transition-colors duration-300">
                {t('navigation.pricing')}
              </Link>
              <Link href="/blog" className="block text-gray-300 hover:text-white transition-colors duration-300">
                {t('navigation.blog')}
              </Link>
              <a 
                href="https://t.me/learn_words_bot" 
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium"
              >
                {t('navigation.getStarted')}
              </a>
              <div className="pt-2">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </header>
      
      <main className="pt-16">{children}</main>
      
      <footer className="relative bg-black border-t border-white/10 py-16 mt-24">
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.product')}</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-400 hover:text-white transition-colors">{t('footer.links.features')}</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">{t('footer.links.pricing')}</Link></li>
                <li><a href="https://t.me/learn_words_bot" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">{t('footer.links.telegram')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.company')}</h4>
              <ul className="space-y-2">
                <li><SmartLink href="https://overx.ai/about" className="text-gray-400 hover:text-white transition-colors" external>{t('footer.links.about')}</SmartLink></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">{t('footer.links.blog')}</Link></li>
                <li><SmartLink href="https://overx.ai/careers" className="text-gray-400 hover:text-white transition-colors" external>{t('footer.links.careers')}</SmartLink></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.support')}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.links.help')}</a></li>
                <li><SmartLink href="https://overx.ai/contact" className="text-gray-400 hover:text-white transition-colors" external>{t('footer.links.contact')}</SmartLink></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.legal')}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.links.privacy')}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.links.terms')}</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-sm text-gray-400">
              © 2024 OverX AI. {t('footer.rights')}
            </p>
            <p className="text-xs text-gray-500 mt-2">{t('footer.tagline')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}