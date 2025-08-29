import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { EnhancedSEO } from '@overx-ai/shared'
import { Layout } from '@/components/Layout'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function PricingPage() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { locale } = router
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const pricingPlans = [
    {
      id: 'free',
      name: t('pricing.free.name'),
      price: t('pricing.free.price'),
      period: t('pricing.free.period'),
      features: t('pricing.free.features', { returnObjects: true }) as string[],
      cta: t('pricing.free.cta'),
      highlighted: false,
      color: 'gray'
    },
    {
      id: 'plus',
      name: t('pricing.plus.name'),
      price: billingPeriod === 'monthly' ? t('pricing.plus.price') : '$19.99',
      period: billingPeriod === 'monthly' ? t('pricing.plus.period') : '/year',
      badge: t('pricing.plus.badge'),
      features: t('pricing.plus.features', { returnObjects: true }) as string[],
      cta: t('pricing.plus.cta'),
      highlighted: true,
      color: 'green'
    }
  ]

  const comparisons = [
    { feature: 'AI Translations', free: '✓', plus: '✓' },
    { feature: 'All Exercise Types', free: '✓', plus: '✓' },
    { feature: 'Progress Tracking', free: '✓', plus: '✓' },
    { feature: 'Daily New Words', free: '5-10', plus: 'Unlimited' },
    { feature: 'Advertisements', free: 'Minimal', plus: 'None' },
    { feature: 'Daily Streaks', free: '✗', plus: '✓' },
    { feature: 'Priority AI Processing', free: '✗', plus: '✓' },
    { feature: 'Advanced Statistics', free: '✗', plus: '✓' },
    { feature: 'Export Progress Data', free: '✗', plus: '✓' },
    { feature: 'Early Access Features', free: '✗', plus: '✓' }
  ]

  const faqs = [
    {
      question: 'Can I switch between plans?',
      answer: 'Yes! You can upgrade to Plus anytime and downgrade back to Free at the end of your billing period.'
    },
    {
      question: 'Is there a free trial for Plus?',
      answer: 'Yes! We offer a 30-day free trial of Plus features for all new users.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and various regional payment methods through our payment processor.'
    },
    {
      question: 'Do you offer student discounts?',
      answer: 'Yes! Students can get 50% off Plus subscriptions with a valid student email.'
    },
    {
      question: 'Can I use the bot offline?',
      answer: 'The bot requires an internet connection to provide AI translations and sync your progress.'
    },
    {
      question: 'Is my data safe?',
      answer: 'Absolutely. We use industry-standard encryption and never sell your data. Your learning progress is private and secure.'
    }
  ]

  return (
    <>
      <EnhancedSEO
        title="Pricing - Language Learning Bot Plans | World Word War"
        description="Choose the perfect plan for your language learning journey with WWW Words Bot. Start free or unlock unlimited learning with Plus."
        canonical={`https://words.overx.ai${locale === 'en' ? '/' : `/${locale}/`}pricing/`}
      />
      
      <Layout>
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {t('pricing.title')}
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                {t('pricing.subtitle')}
              </p>
              
              {/* Billing Toggle */}
              <div className="mt-8 flex items-center justify-center space-x-4">
                <span className={`text-lg ${billingPeriod === 'monthly' ? 'text-white' : 'text-gray-500'}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
                  className="relative w-16 h-8 bg-gray-700 rounded-full transition-colors duration-300"
                >
                  <div className={`absolute top-1 ${billingPeriod === 'monthly' ? 'left-1' : 'left-9'} w-6 h-6 bg-green-500 rounded-full transition-all duration-300`}></div>
                </button>
                <span className={`text-lg ${billingPeriod === 'yearly' ? 'text-white' : 'text-gray-500'}`}>
                  Yearly
                  <span className="ml-2 text-green-400 text-sm">Save 17%</span>
                </span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Cards */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border ${
                    plan.highlighted
                      ? 'border-green-500/50 scale-105 shadow-2xl shadow-green-500/20'
                      : 'border-white/10'
                  } transition-all duration-300 hover:scale-105`}
                >
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        {plan.badge}
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold">{plan.price}</span>
                      <span className="text-gray-400 ml-2">{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className={`w-5 h-5 mr-3 mt-0.5 ${plan.highlighted ? 'text-green-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a
                    href="https://t.me/world_word_war_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full text-center py-3 rounded-full font-medium transition-all duration-300 ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/25'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              ))}
            </div>
            
            {/* Special Offer Banner */}
            <div className="mt-12 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">🎉 Limited Time Offer</h3>
              <p className="text-gray-300 mb-4">
                Get lifetime Plus access for early adopters - only $29.99!
              </p>
              <a
                href="https://t.me/world_word_war_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full font-medium transition-all duration-300 hover:scale-105"
              >
                Claim Lifetime Access
              </a>
            </div>
          </div>
        </section>
        
        {/* Comparison Table */}
        <section className="py-24 bg-gradient-to-b from-black via-gray-900/30 to-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Feature Comparison
              </span>
            </h2>
            
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-6">Feature</th>
                    <th className="text-center p-6">Free</th>
                    <th className="text-center p-6 bg-green-900/20">Plus</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((item, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="p-6 text-gray-300">{item.feature}</td>
                      <td className="p-6 text-center">
                        {item.free === '✓' ? (
                          <svg className="w-5 h-5 mx-auto text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : item.free === '✗' ? (
                          <svg className="w-5 h-5 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          <span className="text-gray-400">{item.free}</span>
                        )}
                      </td>
                      <td className="p-6 text-center bg-green-900/20">
                        {item.plus === '✓' ? (
                          <svg className="w-5 h-5 mx-auto text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="text-green-400 font-medium">{item.plus}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        
        {/* FAQs */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-white/10">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-emerald-600/10 to-teal-600/10"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Start Learning Today
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join 50,000+ learners mastering languages with AI
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a 
                href="https://t.me/world_word_war_bot" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30"
              >
                <span>Start Free</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </a>
              <a 
                href="https://t.me/world_word_war_bot" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 border border-white/20 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:border-white/40"
              >
                <span>Try Plus Free for 30 Days</span>
              </a>
            </div>
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