import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { EnhancedSEO } from '@overx-ai/shared'
import { Layout } from '@/components/Layout'
import { useRouter } from 'next/router'

export default function FeaturesPage() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { locale } = router

  const detailedFeatures = [
    {
      category: 'AI-Powered Learning',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      features: [
        {
          title: 'Smart Context Detection',
          description: 'AI understands word context and provides relevant translations'
        },
        {
          title: 'Cultural Notes',
          description: 'Learn not just words, but cultural nuances and usage'
        },
        {
          title: 'Auto Language Detection',
          description: 'Send words in any language, get instant recognition'
        },
        {
          title: '3 Detail Levels',
          description: 'Quick, standard, or comprehensive translations based on your needs'
        }
      ]
    },
    {
      category: 'Practice & Retention',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      features: [
        {
          title: 'Spaced Repetition Algorithm',
          description: 'Scientifically proven method for long-term memory retention'
        },
        {
          title: '4 Exercise Types',
          description: 'Varied practice keeps learning engaging and effective'
        },
        {
          title: 'Smart Prioritization',
          description: 'Focus on words you struggle with most'
        },
        {
          title: 'Mark as Known',
          description: 'Skip words you\'ve already mastered'
        }
      ]
    },
    {
      category: 'Personalization',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      features: [
        {
          title: 'Custom Notifications',
          description: 'Set your preferred learning schedule'
        },
        {
          title: 'Timezone Support',
          description: 'Perfect timing no matter where you are'
        },
        {
          title: 'Learning Pace Control',
          description: '5-10 words daily (free) or unlimited (Plus)'
        },
        {
          title: 'Interface Languages',
          description: 'Navigate in English, Spanish, Russian, or Polish'
        }
      ]
    },
    {
      category: 'Progress & Analytics',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: [
        {
          title: 'Success Rate Tracking',
          description: 'Monitor your performance on each word'
        },
        {
          title: 'Daily Streaks',
          description: 'Build consistency with gamification (Plus)'
        },
        {
          title: 'Vocabulary Growth',
          description: 'Watch your word count increase over time'
        },
        {
          title: 'Advanced Statistics',
          description: 'Detailed insights into your learning patterns (Plus)'
        }
      ]
    }
  ]

  const languages = [
    { name: 'English', flag: '🇬🇧' },
    { name: 'Spanish', flag: '🇪🇸' },
    { name: 'French', flag: '🇫🇷' },
    { name: 'German', flag: '🇩🇪' },
    { name: 'Italian', flag: '🇮🇹' },
    { name: 'Portuguese', flag: '🇵🇹' },
    { name: 'Russian', flag: '🇷🇺' },
    { name: 'Polish', flag: '🇵🇱' },
    { name: 'Chinese', flag: '🇨🇳' },
    { name: 'Japanese', flag: '🇯🇵' },
    { name: 'Korean', flag: '🇰🇷' },
    { name: 'Arabic', flag: '🇸🇦' },
    { name: 'Hindi', flag: '🇮🇳' }
  ]

  return (
    <>
      <EnhancedSEO
        title={`Features - ${t('site.title')}`}
        description="Explore WWW Words Bot features: AI translations, spaced repetition, 13 languages, and personalized learning through daily messaging."
        canonical={`https://words.overx.ai${locale === 'en' ? '' : `/${locale}`}/features/`}
      />
      
      <Layout>
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Powerful Features
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Everything you need to master vocabulary in any language, powered by cutting-edge AI technology
              </p>
            </div>
          </div>
        </section>
        
        {/* Detailed Features Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {detailedFeatures.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-20">
                <div className="flex items-center mb-12">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white mr-6">
                    {category.icon}
                  </div>
                  <h2 className="text-3xl font-bold">{category.category}</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {category.features.map((feature, index) => (
                    <div 
                      key={index}
                      className="group relative bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-white/10 hover:border-green-500/20 transition-all duration-300"
                    >
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-green-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Languages Section */}
        <section className="py-24 bg-gradient-to-b from-black via-gray-900/30 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  13 Languages Supported
                </span>
              </h2>
              <p className="text-xl text-gray-500">
                Learn any combination of languages with full cross-language support
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {languages.map((lang, index) => (
                <div 
                  key={index}
                  className="group bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-white/10 text-center hover:border-green-500/20 hover:scale-105 transition-all duration-300"
                >
                  <div className="text-4xl mb-3">{lang.flag}</div>
                  <p className="font-medium group-hover:text-green-400 transition-colors">{lang.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Example Interaction Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  See It In Action
                </span>
              </h2>
              <p className="text-xl text-gray-500">
                Experience the power of AI-driven language learning
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10">
              <div className="space-y-6">
                <div className="flex justify-end">
                  <div className="bg-green-600/20 border border-green-600/30 rounded-2xl rounded-br-none px-6 py-3 max-w-xs">
                    <p className="text-green-400 font-medium">despertar</p>
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <div className="bg-gray-800 rounded-2xl rounded-bl-none px-6 py-4 max-w-md space-y-3">
                    <p className="text-white">🇪🇸 despertar → 🇬🇧 to wake up</p>
                    <p className="text-gray-400">📝 Wake up, awaken, rouse from sleep</p>
                    <div className="text-gray-400 text-sm space-y-1">
                      <p>💡 Examples:</p>
                      <p>• Me gusta despertar temprano - I like to wake up early</p>
                      <p>• El ruido me despertó - The noise woke me up</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <div className="bg-green-600/20 border border-green-600/30 rounded-2xl rounded-br-none px-6 py-3 max-w-xs">
                    <p className="text-green-400 font-medium">/practice</p>
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <div className="bg-gray-800 rounded-2xl rounded-bl-none px-6 py-4 max-w-md">
                    <p className="text-white mb-3">🎯 Translate: &ldquo;to wake up&rdquo;</p>
                    <div className="space-y-2">
                      <button className="w-full text-left px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                        A) dormir
                      </button>
                      <button className="w-full text-left px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                        B) despertar
                      </button>
                      <button className="w-full text-left px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                        C) soñar
                      </button>
                      <button className="w-full text-left px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                        D) levantarse
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-emerald-600/10 to-teal-600/10"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Ready to Experience These Features?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Start learning with the most advanced language bot on Telegram
            </p>
            <a 
              href="https://t.me/world_word_war_bot" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30"
            >
              <span>Try All Features Free</span>
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