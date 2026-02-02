import { ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'
import { GradientLink, NewsletterForm, FeedbackWidget, type Locale } from '@overx-ai/shared'
import { useTheme } from '@/hooks/useTheme'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { theme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  console.log('[Converter Layout] Theme from hook:', theme)

  const navigation = [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.converter'), href: '/simple' },
    { name: t('navigation.apis'), href: '/sources' },
    { name: t('navigation.blog'), href: '/blog' },
    { name: t('navigation.about'), href: '/about' },
  ]

  return (
    <div className="min-h-screen bg-black text-white light:bg-gray-50 light:text-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect light:bg-white/90 light:backdrop-blur-md light:border-b light:border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-bold gradient-text light:text-gray-900">
                Exchange Rates Pro
              </Link>
              <div className="hidden md:flex space-x-6">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`transition-colors duration-200 ${
                      router.pathname === item.href
                        ? 'text-blue-500 light:text-blue-600'
                        : 'text-gray-400 hover:text-white light:text-gray-600 light:hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                <ThemeToggle />
                <LanguageSwitcher />
                <GradientLink href="https://www.overx.ai">
                  OverX AI
                </GradientLink>
              </div>
              
              {/* Mobile menu button */}
              <div className="md:hidden flex items-center space-x-2">
                <ThemeToggle />
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-md text-gray-400 hover:text-white light:text-gray-600 light:hover:text-gray-900 hover:bg-white/10 light:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
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
          </div>
          
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-black light:bg-white border-t border-gray-800 light:border-gray-200">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      router.pathname === item.href
                        ? 'text-blue-500 light:text-blue-600 bg-blue-500/10 light:bg-blue-50'
                        : 'text-gray-400 light:text-gray-600 hover:text-white light:hover:text-gray-900 hover:bg-white/10 light:hover:bg-gray-100'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-3 py-2 flex items-center justify-between">
                  <LanguageSwitcher />
                  <GradientLink 
                    href="https://www.overx.ai" 
                    className="block px-3 py-2"
                  >
                    OverX AI
                  </GradientLink>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-800 light:border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            <div className="col-span-2">
              <p className="text-sm text-gray-400 light:text-gray-600 mb-4">{t('footer.poweredBy')}</p>
              <p className="text-xs text-gray-600 light:text-gray-500 max-w-md">
                Real-time currency conversion with transparent exchange rates and triangulation calculations.
              </p>
            </div>
            <div>
              <Link href="/about" className="text-sm text-gray-400 hover:text-white light:text-gray-600 light:hover:text-gray-900 block mb-2">
                {t('footer.about')}
              </Link>
            </div>
            <div>
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white light:text-gray-600 light:hover:text-gray-900 block mb-2">
                {t('footer.privacy')}
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white light:text-gray-600 light:hover:text-gray-900 block mb-2">
                {t('footer.terms')}
              </Link>
            </div>
            <div>
              <Link href="/contact" className="text-sm text-gray-400 hover:text-white light:text-gray-600 light:hover:text-gray-900 block mb-2">
                {t('footer.contact')}
              </Link>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300 light:text-gray-700 mb-3">{t('footer.newsletter', 'Newsletter')}</p>
              <NewsletterForm
                sourceSite="converter"
                locale={(router.locale || 'en') as Locale}
                compact
                translations={{
                  emailPlaceholder: t('footer.emailPlaceholder', 'Your email'),
                  submitButton: t('footer.subscribe', 'Subscribe'),
                  submittingButton: t('footer.subscribing', 'Subscribing...'),
                  successMessage: t('footer.subscribeSuccess', 'Subscribed!'),
                  errorMessage: t('footer.subscribeError', 'Try again'),
                }}
              />
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 light:border-gray-200 text-center text-xs text-gray-600 light:text-gray-500">
            © {new Date().getFullYear()} OverX AI. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Feedback Widget */}
      <FeedbackWidget
        sourceSite="converter"
        locale={(router.locale || 'en') as Locale}
        translations={{
          buttonLabel: t('feedback.button', 'Feedback'),
          title: t('feedback.title', 'Send Feedback'),
          ratingLabel: t('feedback.ratingLabel', 'How was your experience?'),
          messagePlaceholder: t('feedback.messagePlaceholder', 'Tell us what you think...'),
          emailPlaceholder: t('feedback.emailPlaceholder', 'Your email (optional)'),
          submitButton: t('feedback.submit', 'Send Feedback'),
          submittingButton: t('feedback.submitting', 'Sending...'),
          successMessage: t('feedback.success', 'Thanks for your feedback!'),
          errorMessage: t('feedback.error', 'Failed to send. Please try again.'),
        }}
      />
    </div>
  )
}