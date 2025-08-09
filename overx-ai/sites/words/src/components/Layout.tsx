import React, { ReactNode, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useTheme } from '@overx-ai/shared'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { theme } = useTheme()
  
  console.log('[Words Layout] Theme from hook:', theme)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
  ]

  return (
    <div className="min-h-screen bg-black text-white light:bg-gray-50 light:text-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect light:bg-white/90 light:backdrop-blur-md light:border-b light:border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-bold gradient-text light:text-gray-900 flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                Learn Words Bot
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
              <a
                href="https://t.me/world_word_war_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 light:bg-blue-500 light:hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                <span className="mr-2">📱</span>
                Start Learning
              </a>
              <LanguageSwitcher />
              <button 
                className="md:hidden text-gray-400 hover:text-white light:text-gray-600 light:hover:text-gray-900"
                aria-label="Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="border-t border-gray-800 light:border-gray-200 bg-gray-900/50 light:bg-gray-100/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🤖</span>
                <h3 className="text-xl font-bold gradient-text light:text-gray-900">
                  Learn Words Bot
                </h3>
              </div>
              <p className="text-gray-400 light:text-gray-600 mb-6 max-w-md">
                Your AI-powered language learning companion. Master vocabulary through intelligent spaced repetition and contextual learning.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://t.me/world_word_war_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 light:text-gray-600 light:hover:text-blue-600 transition-colors"
                  aria-label="Telegram"
                >
                  <span className="text-2xl">💬</span>
                </a>
                <a 
                  href="https://twitter.com/overxai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 light:text-gray-600 light:hover:text-blue-600 transition-colors"
                  aria-label="Twitter"
                >
                  <span className="text-2xl">🐦</span>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white light:text-gray-900">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-400 hover:text-white light:text-gray-600 light:hover:text-gray-900 transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white light:text-gray-600 light:hover:text-gray-900 transition-colors">Pricing</Link></li>
                <li><a href="https://t.me/world_word_war_bot" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white light:text-gray-600 light:hover:text-gray-900 transition-colors">Try Bot</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white light:text-gray-900">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white light:text-gray-600 light:hover:text-gray-900 transition-colors">About</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white light:text-gray-600 light:hover:text-gray-900 transition-colors">Blog</Link></li>
                <li><a href="https://overx.ai" className="text-gray-400 hover:text-white light:text-gray-600 light:hover:text-gray-900 transition-colors">OverX AI</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 light:border-gray-200 mt-12 pt-8 text-center">
            <p className="text-gray-400 light:text-gray-600 text-sm">
              © 2024 OverX AI. All rights reserved. Built with ❤️ for language learners worldwide.
            </p>
            <p className="text-gray-500 light:text-gray-500 text-xs mt-2">
              AI-Powered • Scientifically-Proven • Community-Driven
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}