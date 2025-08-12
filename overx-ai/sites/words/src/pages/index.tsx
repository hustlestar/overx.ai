import React, { useState } from 'react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout } from '@/components/Layout'
import { EnhancedSEO } from '@overx-ai/shared'
import Link from 'next/link'

export default function HomePage() {
  const { t } = useTranslation('common')
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)

  const features = [
    {
      id: 'ai-translation',
      icon: '🤖',
      title: 'AI-Powered Intelligence',
      description: 'Smart translation with 3 detail levels, contextual learning, and auto language detection',
      details: ['Smart Translation with 3 detail levels', 'Contextual learning examples', 'Auto language detection', 'Base form recognition']
    },
    {
      id: 'adaptive-training',
      icon: '📚',
      title: 'Adaptive Training System', 
      description: '4 exercise types with spaced repetition and smart prioritization',
      details: ['4 exercise types', 'Spaced repetition', 'Smart prioritization', 'Progress tracking']
    },
    {
      id: 'multilingual',
      icon: '🌍',
      title: 'True Multi-Language Support',
      description: '13 learning languages with 4 interface languages and cross-language learning', 
      details: ['13 learning languages', '4 interface languages', 'Cross-language learning', 'Global community']
    },
    {
      id: 'personalized',
      icon: '⏰',
      title: 'Personalized Experience',
      description: 'Custom notifications, timezone support, and flexible learning plans',
      details: ['Custom notifications', 'Timezone support', 'Flexible plans', 'Mark as known feature']
    }
  ]

  const testimonials = [
    {
      quote: t('testimonials.items.1.text'),
      author: t('testimonials.items.1.author'),
      role: t('testimonials.items.1.role'),
      flag: "🎓"
    },
    {
      quote: t('testimonials.items.2.text'),
      author: t('testimonials.items.2.author'), 
      role: t('testimonials.items.2.role'),
      flag: "💼"
    },
    {
      quote: t('testimonials.items.3.text'),
      author: t('testimonials.items.3.author'),
      role: t('testimonials.items.3.role'), 
      flag: "✈️"
    }
  ]

  const stats = [
    { number: '50,000+', label: t('hero.stats.labels.users') },
    { number: '100+', label: t('hero.stats.labels.countries') },
    { number: '2M+', label: t('hero.stats.labels.words') },
    { number: '13', label: t('hero.stats.labels.languages') }
  ]

  return (
    <Layout>
      <EnhancedSEO
        title="World Word War Bot - AI-Powered Language Learning on Telegram"
        description="Master vocabulary with our AI-powered Telegram bot. Learn 13+ languages through intelligent spaced repetition, contextual examples, and personalized training. Join 50,000+ learners worldwide."
        canonical="https://words.overx.ai"
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20 light:from-blue-50 light:via-purple-50 light:to-cyan-50" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40z'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="mb-8 animate-bounce">
            <span className="text-6xl md:text-8xl">🤖</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 gradient-text light:text-gray-900 leading-tight">
            {t('site.title')}
          </h1>
          
          <p className="text-xl md:text-2xl mb-4 text-gray-300 light:text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('site.tagline')}
          </p>
          
          <p className="text-lg md:text-xl mb-12 text-gray-400 light:text-gray-500 max-w-3xl mx-auto">
            Break Language Barriers. Master Vocabulary. Connect Globally.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a 
              href="https://t.me/world_word_war_bot" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 light:bg-blue-500 light:hover:bg-blue-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 min-w-[200px] justify-center"
            >
              <span className="text-2xl">📱</span>
              Start Learning Free
            </a>
            <button className="px-8 py-4 border-2 border-blue-600 light:border-blue-500 text-blue-400 light:text-blue-600 hover:bg-blue-600/10 light:hover:bg-blue-50 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-3 min-w-[200px] justify-center">
              <span className="text-2xl">⭐</span>
              Try Plus Features
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-400 light:text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-400 light:text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 glass-card light:bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text light:text-gray-900">
                  Purpose & Vision
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-blue-400 light:text-blue-600">
                      🎯 Mission
                    </h3>
                    <p className="text-gray-300 light:text-gray-600 leading-relaxed">
                      Democratize language learning by making AI-powered vocabulary acquisition accessible to anyone with a smartphone, transforming daily messaging into powerful learning moments.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-purple-400 light:text-purple-600">
                      🌟 Vision
                    </h3>
                    <p className="text-gray-300 light:text-gray-600 leading-relaxed">
                      A world where language barriers dissolve, enabling billions to connect, learn, and thrive across cultures through intelligent, personalized education.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-gray-900/50 light:bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 light:border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 text-center gradient-text light:text-gray-900">
                    Your Transformation
                  </h3>
                  <div className="space-y-4">
                    {[
                      'Monolingual → Multilingual communicator',
                      'Vocabulary struggler → Word master', 
                      'Textbook learner → Natural language user',
                      'Isolated learner → Global citizen'
                    ].map((transformation, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm">
                        <span className="text-green-400 light:text-green-600">✨</span>
                        <span className="text-gray-300 light:text-gray-600">{transformation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text light:text-gray-900">
            Capabilities That Deliver Results
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature) => (
              <div 
                key={feature.id}
                className={`glass-card p-8 rounded-xl border transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  hoveredFeature === feature.id 
                    ? 'border-blue-500 light:border-blue-400 shadow-xl shadow-blue-500/20' 
                    : 'border-gray-700 light:border-gray-200'
                }`}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-blue-400 light:text-blue-600">
                  {feature.title}
                </h3>
                <p className="text-gray-300 light:text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                {hoveredFeature === feature.id && (
                  <div className="space-y-2 animate-fade-in">
                    {feature.details.map((detail, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm">
                        <span className="text-green-400 light:text-green-600">✓</span>
                        <span className="text-gray-400 light:text-gray-500">{detail}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 glass-card light:bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text light:text-gray-900">
            How It Works - Brilliantly Simple
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Send Any Word',
                  description: 'Just type any word in any language to get instant AI-powered translations with context',
                  icon: '💭',
                  example: 'You: despertar\nBot: 🇪🇸 despertar → 🇬🇧 to wake up\n\n💡 Examples:\n• Me gusta despertar temprano\n• El ruido me despertó'
                },
                {
                  step: '2', 
                  title: 'Practice Daily',
                  description: 'Receive smart notifications and complete quick exercises to build consistency',
                  icon: '📅',
                  example: 'Daily exercises:\n• Translation practice\n• Multiple choice\n• Reverse translation\n• Synonym matching'
                },
                {
                  step: '3',
                  title: 'Master Vocabulary', 
                  description: 'Track your progress and watch your vocabulary grow with intelligent spaced repetition',
                  icon: '🎯',
                  example: 'Progress tracking:\n• Success rates\n• Learning streaks\n• Vocabulary size\n• Fluency goals'
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 light:bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 mx-auto">
                    {step.step}
                  </div>
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-400 light:text-blue-600">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 light:text-gray-600 mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  <div className="bg-gray-900/50 light:bg-gray-100 rounded-lg p-4 text-sm text-left font-mono">
                    <pre className="text-gray-400 light:text-gray-600 whitespace-pre-wrap">
                      {step.example}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text light:text-gray-900">
            Real Success Stories
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card p-8 rounded-xl border border-gray-700 light:border-gray-200">
                <div className="text-3xl mb-4">{testimonial.flag}</div>
                <blockquote className="text-gray-300 light:text-gray-600 mb-6 italic leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div>
                  <div className="font-semibold text-blue-400 light:text-blue-600">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-400 light:text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 glass-card light:bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text light:text-gray-900">
            Pricing That Makes Sense
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="glass-card p-8 rounded-xl border border-gray-700 light:border-gray-200 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-600 light:bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  🆓 FREE FOREVER
                </span>
              </div>
              <h3 className="text-2xl font-bold text-center mb-6 text-green-400 light:text-green-600 mt-4">
                Free Plan
              </h3>
              <div className="space-y-4 mb-8">
                {[
                  'Full AI translations',
                  'All training exercises', 
                  '5-10 new words daily',
                  'Progress tracking',
                  'Basic notifications'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-green-400 light:text-green-600">✅</span>
                    <span className="text-gray-300 light:text-gray-600">{feature}</span>
                  </div>
                ))}
                <div className="flex items-center gap-3">
                  <span className="text-yellow-400 light:text-yellow-600">💚</span>
                  <span className="text-gray-300 light:text-gray-600">Supported by minimal ads</span>
                </div>
              </div>
              <button className="w-full py-3 border-2 border-green-600 light:border-green-500 text-green-400 light:text-green-600 hover:bg-green-600/10 light:hover:bg-green-50 rounded-xl font-semibold transition-all duration-300">
                Start Free
              </button>
            </div>

            {/* Plus Plan */}
            <div className="glass-card p-8 rounded-xl border border-blue-500 light:border-blue-400 relative shadow-xl shadow-blue-500/20">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 light:bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  ⭐ MOST POPULAR
                </span>
              </div>
              <h3 className="text-2xl font-bold text-center mb-2 text-blue-400 light:text-blue-600 mt-4">
                Plus Plan
              </h3>
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-blue-400 light:text-blue-600">$1.99</span>
                <span className="text-gray-400 light:text-gray-500">/month</span>
              </div>
              <div className="space-y-4 mb-8">
                {[
                  'Everything in Free',
                  'Unlimited new words',
                  'No advertisements', 
                  'Daily streak gamification',
                  'Priority AI processing',
                  'Advanced statistics'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-blue-400 light:text-blue-600">✅</span>
                    <span className="text-gray-300 light:text-gray-600">{feature}</span>
                  </div>
                ))}
                <div className="flex items-center gap-3">
                  <span className="text-purple-400 light:text-purple-600">🌍</span>
                  <span className="text-gray-300 light:text-gray-600">Regional pricing available</span>
                </div>
              </div>
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 light:bg-blue-500 light:hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                Try Plus Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 gradient-text light:text-gray-900">
            Start Your Journey Today
          </h2>
          <p className="text-xl text-gray-300 light:text-gray-600 mb-12 max-w-2xl mx-auto">
            Join 50,000+ language learners and transform the way you master vocabulary
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto mb-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 light:bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3 mx-auto">
                1
              </div>
              <p className="text-sm text-gray-400 light:text-gray-500">Open Telegram</p>
            </div>
            <div className="hidden sm:block text-blue-400 light:text-blue-600">→</div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 light:bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3 mx-auto">
                2
              </div>
              <p className="text-sm text-gray-400 light:text-gray-500">Find @world_word_war_bot</p>
            </div>
            <div className="hidden sm:block text-blue-400 light:text-blue-600">→</div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 light:bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3 mx-auto">
                3
              </div>
              <p className="text-sm text-gray-400 light:text-gray-500">Send your first word</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://t.me/world_word_war_bot" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 light:bg-blue-500 light:hover:bg-blue-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3"
            >
              <span className="text-2xl">🚀</span>
              Start Learning Free
            </a>
            <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 light:bg-purple-500 light:hover:bg-purple-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3">
              <span className="text-2xl">⭐</span>
              Try Plus Features
            </button>
          </div>
          
          <p className="text-sm text-gray-400 light:text-gray-500 mt-8">
            <strong>First Month Special:</strong> Try Plus features FREE for 30 days!
          </p>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common']))
    }
  }
}