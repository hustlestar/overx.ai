import { useEffect, useState } from 'react'
import { SmartLink } from '../components/NextSEO'
import { ThemeToggle, useTheme } from '@overx-ai/shared'
import { useTranslation } from 'next-i18next'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Navigation() {
  const { t } = useTranslation('common')
  const { theme } = useTheme()
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 w-full backdrop-blur-xl border-b border-gray-200 dark:border-white/10 z-50 transition-all duration-300"
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
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">OverX AI</span>
                <span className="text-xs text-gray-700 dark:text-gray-400 font-light tracking-wider transform -translate-y-1">Over the Xorizon</span>
              </div>
            </SmartLink>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <SmartLink href="/products" className="text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 relative group">
              <span>{t('navigation.products')}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
            </SmartLink>
            <SmartLink href="https://blog.overx.ai" className="text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 relative group">
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
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
              <div onClick={() => setMobileMenuOpen(false)}>
                <SmartLink 
                  href="/products" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {t('navigation.products')}
                </SmartLink>
              </div>
              <div onClick={() => setMobileMenuOpen(false)}>
                <SmartLink 
                  href="https://blog.overx.ai" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800" 
                  external
                >
                  {t('navigation.blog')}
                </SmartLink>
              </div>
              <div onClick={() => setMobileMenuOpen(false)}>
                <SmartLink 
                  href="/consultancy" 
                  className="block mx-3 my-2 px-4 py-2 text-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-medium"
                >
                  {t('navigation.bookConsultation')}
                </SmartLink>
              </div>
              <div className="px-3 py-2 flex items-center space-x-4">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}