import React, { useState } from 'react'
import { NextPage, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  EnhancedSEO,
  useFormSubmission,
  type Locale,
  type AppFeedbackFormData,
  type FeedbackSource,
} from '@overx-ai/shared'

interface Product {
  id: string
  name: string
  description: string
  icon: string
  source: FeedbackSource
}

const FeedbackPage: NextPage = () => {
  const { t, i18n } = useTranslation('common')
  const router = useRouter()
  const locale = (router.locale || i18n.language || 'en') as Locale

  // Product list with their feedback sources
  const products: Product[] = [
    {
      id: 'general',
      name: t('feedback.products.general', 'General / OverX AI Website'),
      description: t('feedback.products.generalDesc', 'Feedback about the OverX AI website or company'),
      icon: '🌐',
      source: 'web',
    },
    {
      id: 'exchangeRatesPro',
      name: t('productList.currencyConverter.title', 'Exchange Rates Pro'),
      description: t('productList.currencyConverter.description'),
      icon: '💱',
      source: 'extension',
    },
    {
      id: 'wwwWordsBot',
      name: t('productList.learnWords.title', 'WWW Words Bot'),
      description: t('productList.learnWords.description'),
      icon: '📚',
      source: 'bot',
    },
    {
      id: 'blockWebsite',
      name: t('productList.blockWebsite.title', 'Block Website: Self Control'),
      description: t('productList.blockWebsite.description'),
      icon: '🛡️',
      source: 'extension',
    },
    {
      id: 'claudeCodeBot',
      name: t('productList.claudeCodeBot.title', 'Claude Code Telegram Bot'),
      description: t('productList.claudeCodeBot.description'),
      icon: '🤖',
      source: 'bot',
    },
    {
      id: 'privetBot',
      name: t('productList.privetBot.title', 'Privet Bot'),
      description: t('productList.privetBot.description'),
      icon: '👋',
      source: 'bot',
    },
    {
      id: 'yourLawyer',
      name: t('productList.yourLawyer.title', 'Your Lawyer Bot'),
      description: t('productList.yourLawyer.description'),
      icon: '⚖️',
      source: 'bot',
    },
    {
      id: 'consultBy',
      name: t('productList.consultBy.title', 'Consult.by'),
      description: t('productList.consultBy.description'),
      icon: '📋',
      source: 'web',
    },
    {
      id: 'languageFocus',
      name: t('productList.languageFocus.title', 'Language Focus Bot'),
      description: t('productList.languageFocus.description'),
      icon: '🎯',
      source: 'bot',
    },
    {
      id: 'yourLearner',
      name: t('productList.yourLearner.title', 'Your Learner Bot'),
      description: t('productList.yourLearner.description'),
      icon: '📖',
      source: 'bot',
    },
    {
      id: 'memeBuyBot',
      name: t('productList.memeBuyBot.title', 'Meme Telegram Buy Bot'),
      description: t('productList.memeBuyBot.description'),
      icon: '🚀',
      source: 'bot',
    },
    {
      id: 'instagramSaver',
      name: t('productList.instagramSaver.title', 'Instagram Description Saver'),
      description: t('productList.instagramSaver.description'),
      icon: '📸',
      source: 'extension',
    },
    {
      id: 'reelSaver',
      name: t('productList.reelSaver.title', 'Instagram Reel/Post Saver'),
      description: t('productList.reelSaver.description'),
      icon: '🎬',
      source: 'extension',
    },
  ]

  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0])
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5 | null>(null)
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // Honeypot

  const { submit, isSubmitting, isSuccess, isError, error, reset } = useFormSubmission<AppFeedbackFormData>(
    'app_feedback',
    {
      sourceSite: 'main',
      locale,
      onSuccess: () => {
        setRating(null)
        setMessage('')
        setEmail('')
      },
    }
  )

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const product = products.find((p) => p.id === e.target.value)
    if (product) {
      setSelectedProduct(product)
      if (isSuccess || isError) {
        reset()
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (website) return // Honeypot check
    if (!rating || !message.trim()) return

    await submit({
      source: selectedProduct.source,
      app_name: selectedProduct.name,
      email: email.trim() || undefined,
      text: `[Rating: ${rating}/5]\n\n${message.trim()}`,
    })
  }

  return (
    <>
      <EnhancedSEO
        title={t('feedback.seo.title', 'Product Feedback - Help Us Improve | OverX AI')}
        description={t('feedback.seo.description', 'Share your feedback about OverX AI products. Help us improve our AI tools, Chrome extensions, and Telegram bots. Your input shapes our development.')}
        canonical="https://overx.ai/feedback"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 text-center">
              {t('feedback.title', 'Product Feedback')}
            </h1>
            <p className="text-xl text-gray-200 text-center mb-6">
              {t('feedback.subtitle', 'Your feedback helps us build better products')}
            </p>
            <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
              {t('feedback.description', 'Select the product you want to provide feedback for, rate your experience, and share your thoughts. Every piece of feedback is reviewed by our team.')}
            </p>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Feedback Form */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {t('feedback.form.heading', 'Share Your Feedback')}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Product Selector */}
                  <div>
                    <label htmlFor="product" className="block text-sm font-medium text-gray-200 mb-2">
                      {t('feedback.form.product', 'Select Product')} *
                    </label>
                    <select
                      id="product"
                      value={selectedProduct.id}
                      onChange={handleProductChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 disabled:opacity-50"
                    >
                      {products.map((product) => (
                        <option key={product.id} value={product.id} className="bg-gray-900">
                          {product.icon} {product.name}
                        </option>
                      ))}
                    </select>
                    <p className="mt-2 text-sm text-gray-400">{selectedProduct.description}</p>
                  </div>

                  {/* Star Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      {t('feedback.form.rating', 'Your Rating')} *
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => {
                            setRating(star as 1 | 2 | 3 | 4 | 5)
                            if (isSuccess || isError) reset()
                          }}
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(null)}
                          disabled={isSubmitting}
                          className="p-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded disabled:opacity-50"
                        >
                          <svg
                            className={`w-10 h-10 transition-colors ${
                              (hoveredStar !== null ? star <= hoveredStar : rating !== null && star <= rating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-500'
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        </button>
                      ))}
                    </div>
                    {rating && (
                      <p className="mt-2 text-sm text-gray-400">
                        {rating === 5 && t('feedback.ratings.5', 'Excellent!')}
                        {rating === 4 && t('feedback.ratings.4', 'Great!')}
                        {rating === 3 && t('feedback.ratings.3', 'Good')}
                        {rating === 2 && t('feedback.ratings.2', 'Could be better')}
                        {rating === 1 && t('feedback.ratings.1', 'Needs improvement')}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2">
                      {t('feedback.form.message', 'Your Feedback')} *
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value)
                        if (isSuccess || isError) reset()
                      }}
                      required
                      rows={5}
                      maxLength={2000}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 resize-none disabled:opacity-50"
                      placeholder={t('feedback.form.messagePlaceholder', 'Tell us what you liked, what could be improved, or any features you\'d like to see...')}
                    />
                    <p className="mt-1 text-xs text-gray-400 text-right">{message.length}/2000</p>
                  </div>

                  {/* Email (optional) */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                      {t('feedback.form.email', 'Email')} <span className="text-gray-400">({t('feedback.form.optional', 'optional')})</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (isSuccess || isError) reset()
                      }}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 disabled:opacity-50"
                      placeholder={t('feedback.form.emailPlaceholder', 'your@email.com (for follow-up)')}
                    />
                    <p className="mt-2 text-sm text-gray-400">
                      {t('feedback.form.emailHint', 'Provide your email if you\'d like us to follow up on your feedback')}
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !rating || !message.trim()}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('feedback.form.submitting', 'Sending...')}
                      </>
                    ) : (
                      t('feedback.form.submit', 'Submit Feedback')
                    )}
                  </button>

                  {/* Status Messages */}
                  {isSuccess && (
                    <div className="p-4 bg-green-500/20 border border-green-400/30 rounded-lg">
                      <p className="text-green-400 text-center">
                        {t('feedback.form.success', 'Thank you for your feedback! We appreciate you taking the time to help us improve.')}
                      </p>
                    </div>
                  )}
                  {isError && (
                    <div className="p-4 bg-red-500/20 border border-red-400/30 rounded-lg">
                      <p className="text-red-400 text-center">
                        {error || t('feedback.form.error', 'Something went wrong. Please try again.')}
                      </p>
                    </div>
                  )}
                </form>
              </div>

              {/* Info Section */}
              <div className="space-y-8">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {t('feedback.whyFeedback.title', 'Why Your Feedback Matters')}
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">✓</span>
                      <span>{t('feedback.whyFeedback.item1', 'Shapes our product roadmap and priorities')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">✓</span>
                      <span>{t('feedback.whyFeedback.item2', 'Helps us identify and fix issues faster')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">✓</span>
                      <span>{t('feedback.whyFeedback.item3', 'Inspires new features you actually need')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">✓</span>
                      <span>{t('feedback.whyFeedback.item4', 'Every submission is reviewed by our team')}</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {t('feedback.whatToShare.title', 'What to Share')}
                  </h3>
                  <div className="space-y-4 text-gray-300 text-sm">
                    <div>
                      <p className="font-medium text-white mb-1">{t('feedback.whatToShare.bugs', 'Bug Reports')}</p>
                      <p className="text-gray-400">{t('feedback.whatToShare.bugsDesc', 'Describe what went wrong and steps to reproduce')}</p>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">{t('feedback.whatToShare.features', 'Feature Requests')}</p>
                      <p className="text-gray-400">{t('feedback.whatToShare.featuresDesc', 'Tell us what functionality would help you')}</p>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">{t('feedback.whatToShare.experience', 'User Experience')}</p>
                      <p className="text-gray-400">{t('feedback.whatToShare.experienceDesc', 'Share what you love or find confusing')}</p>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">{t('feedback.whatToShare.general', 'General Thoughts')}</p>
                      <p className="text-gray-400">{t('feedback.whatToShare.generalDesc', 'Any ideas or suggestions are welcome')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/30 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {t('feedback.otherWays.title', 'Other Ways to Reach Us')}
                  </h3>
                  <div className="space-y-3">
                    <Link href="/contact" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{t('feedback.otherWays.contact', 'Contact Form')}</span>
                    </Link>
                    <a href="mailto:hello@overx.ai" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                      <span>hello@overx.ai</span>
                    </a>
                    <a href="https://twitter.com/overxai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      <span>@overxai</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }
}

export default FeedbackPage
