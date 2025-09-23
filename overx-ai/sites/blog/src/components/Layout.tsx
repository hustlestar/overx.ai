import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { SmartLink, ThemeToggle, GradientLink } from '@overx-ai/shared'
import { useTheme, useLanguageSync } from '@overx-ai/shared'
import { LanguageSwitcher } from './LanguageSwitcher'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { locale } = router
  const { theme } = useTheme()
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Use language sync hook
  useLanguageSync()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const changeLanguage = (newLocale: string) => {
    router.push(router.pathname, router.asPath, { locale: newLocale })
  }

  const headerAnimation = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5, ease: 'easeOut' as const }
  }

  const navCategories = [
    { key: 'aiTechnology', slug: 'ai-technology' },
    { key: 'productUpdates', slug: 'product-updates' },
    { key: 'tutorials', slug: 'tutorials' },
    { key: 'industryInsights', slug: 'industry-insights' }
  ]

  return (
    <div className="min-h-screen bg-black text-white light:bg-gray-50 light:text-gray-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-cyan-900/10 light:from-blue-100/40 light:via-purple-100/40 light:to-cyan-100/40" />
        {mounted && (
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </div>

      {/* Header */}
      <motion.header
        {...headerAnimation}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50
            ? 'bg-black/90 backdrop-blur-xl shadow-lg shadow-black/50 light:bg-white/90 light:shadow-gray-300/50'
            : 'bg-black/50 backdrop-blur-md light:bg-white/50'
        } border-b border-white/10 light:border-gray-200/50`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <SmartLink href="/" className="group">
                <motion.div
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    OverX AI
                  </span>
                  <span className="text-xs text-gray-400 font-light">Blog</span>
                </motion.div>
              </SmartLink>

              <div className="hidden md:flex items-center space-x-6">
                <SmartLink
                  href="/"
                  className="text-gray-300 hover:text-white light:text-gray-700 light:hover:text-gray-900 transition-colors relative group"
                >
                  <span>{t('navigation.allPosts')}</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </SmartLink>

                {navCategories.map((category) => (
                  <SmartLink
                    key={category.key}
                    href={`/category/${category.slug}`}
                    className="text-gray-300 hover:text-white light:text-gray-700 light:hover:text-gray-900 transition-colors"
                  >
                    {t(`navigation.${category.key}`)}
                  </SmartLink>
                ))}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <GradientLink
                href="https://overx.ai"
                className="hidden md:block text-sm font-medium"
              >
                OverX AI
              </GradientLink>

              <ThemeToggle />

              <LanguageSwitcher />

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 light:text-gray-700 light:hover:text-gray-900 light:hover:bg-gray-200/50"
              >
                <motion.svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                >
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </motion.svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 light:bg-white/95 light:border-gray-200/50"
            >
              <div className="px-4 py-4 space-y-2">
                <div onClick={() => setMobileMenuOpen(false)}>
                  <SmartLink
                    href="/"
                    className="block py-2 text-gray-300 hover:text-white light:text-gray-700 light:hover:text-gray-900 transition-colors"
                  >
                    {t('navigation.allPosts')}
                  </SmartLink>
                </div>
                {navCategories.map((category) => (
                  <div key={category.key} onClick={() => setMobileMenuOpen(false)}>
                    <SmartLink
                      href={`/category/${category.slug}`}
                      className="block py-2 text-gray-300 hover:text-white light:text-gray-700 light:hover:text-gray-900 transition-colors"
                    >
                      {t(`navigation.${category.key}`)}
                    </SmartLink>
                  </div>
                ))}
                <div onClick={() => setMobileMenuOpen(false)}>
                  <GradientLink
                    href="https://overx.ai"
                    className="block py-2 text-sm font-medium"
                  >
                    OverX AI
                  </GradientLink>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content with Animation */}
      <main className="pt-16 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={router.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <motion.footer
        className="bg-black border-t border-white/10 light:bg-gray-50 light:border-gray-200/50 py-12 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {t('footer.blogDescription')}
              </h4>
              <p className="text-gray-400 light:text-gray-600 text-sm">
                {t('footer.blogSubtitle')}
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-3 text-gray-200 light:text-gray-800">{t('footer.categories')}</h5>
              <ul className="space-y-2">
                {navCategories.map((category) => (
                  <li key={category.key}>
                    <SmartLink
                      href={`/category/${category.slug}`}
                      className="text-gray-400 hover:text-white light:text-gray-600 light:hover:text-gray-900 text-sm transition-colors"
                    >
                      {t(`navigation.${category.key}`)}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-3 text-gray-200 light:text-gray-800">{t('footer.company')}</h5>
              <ul className="space-y-2">
                <li>
                  <SmartLink href="https://overx.ai" className="text-gray-400 hover:text-white light:text-gray-600 light:hover:text-gray-900 text-sm transition-colors">
                    {t('footer.mainSite')}
                  </SmartLink>
                </li>
                <li>
                  <SmartLink href="https://overx.ai/products" className="text-gray-400 hover:text-white light:text-gray-600 light:hover:text-gray-900 text-sm transition-colors">
                    {t('footer.products')}
                  </SmartLink>
                </li>
                <li>
                  <SmartLink href="https://overx.ai/about" className="text-gray-400 hover:text-white light:text-gray-600 light:hover:text-gray-900 text-sm transition-colors">
                    {t('footer.aboutUs')}
                  </SmartLink>
                </li>
                <li>
                  <SmartLink href="https://overx.ai/contact" className="text-gray-400 hover:text-white light:text-gray-600 light:hover:text-gray-900 text-sm transition-colors">
                    {t('footer.contact')}
                  </SmartLink>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-3 text-gray-200 light:text-gray-800">{t('footer.subscribe')}</h5>
              <p className="text-gray-400 light:text-gray-600 text-sm mb-3">
                {t('footer.subscribeDescription')}
              </p>
              <GradientLink
                href="/subscribe"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
              >
                {t('footer.subscribeNow')}
              </GradientLink>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 light:text-gray-600 text-sm">{t('footer.copyright')}</p>
            </div>
            <div className="flex space-x-6">
              <SmartLink href="/rss.xml" className="text-gray-400 hover:text-white light:text-gray-600 light:hover:text-gray-900 text-sm transition-colors">
                {t('footer.rss')}
              </SmartLink>
              <SmartLink href="/sitemap.xml" className="text-gray-400 hover:text-white light:text-gray-600 light:hover:text-gray-900 text-sm transition-colors">
                {t('footer.sitemap')}
              </SmartLink>
              <SmartLink href="https://overx.ai/privacy" className="text-gray-400 hover:text-white light:text-gray-600 light:hover:text-gray-900 text-sm transition-colors">
                {t('footer.privacy')}
              </SmartLink>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}