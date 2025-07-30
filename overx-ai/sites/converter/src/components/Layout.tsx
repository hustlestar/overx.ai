import { ReactNode, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'
import { useThemeSync } from '@/hooks/useThemeSync'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { theme } = useThemeSync()
  
  console.log('[Converter Layout] Theme from hook:', theme)

  useEffect(() => {
    // Apply theme class to document root
    if (theme === 'light') {
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
    }
  }, [theme])

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
              <ThemeToggle />
              <LanguageSwitcher />
              <Link
                href="https://overx.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold animated-gradient-text"
              >
                OverX AI
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-800 light:border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
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
              <Link href="/api" className="text-sm text-gray-400 hover:text-white light:text-gray-600 light:hover:text-gray-900 block mb-2">
                {t('footer.api')}
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
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 light:border-gray-200 text-center text-xs text-gray-600 light:text-gray-500">
            © {new Date().getFullYear()} OverX AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}