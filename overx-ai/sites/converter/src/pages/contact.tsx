import React, { useState } from 'react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Layout } from '@/components/Layout'
import { EnhancedSEO, useSupportForm, type Locale } from '@overx-ai/shared'

export default function ContactPage() {
  const { t, i18n } = useTranslation('common')
  const router = useRouter()
  const locale = (router.locale || i18n.language || 'en') as Locale

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
  })
  const [website, setWebsite] = useState('') // Honeypot

  const { submit, isSubmitting, isSuccess, isError, error, reset } = useSupportForm({
    sourceSite: 'converter',
    locale,
    onSuccess: () => {
      setFormData({ name: '', email: '', subject: '', category: 'general', message: '' })
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (isSuccess || isError) {
      reset()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (website) return // Honeypot check
    await submit(formData)
  }

  const categories = [
    { value: 'general', label: t('contact.categories.general', 'General Inquiry') },
    { value: 'bug', label: t('contact.categories.bug', 'Bug Report') },
    { value: 'feature', label: t('contact.categories.feature', 'Feature Request') },
    { value: 'api', label: t('contact.categories.api', 'API / Data Sources') },
    { value: 'extension', label: t('contact.categories.extension', 'Chrome Extension') },
  ]

  return (
    <>
      <EnhancedSEO
        title={t('contact.pageTitle', 'Contact Us - Exchange Rates Pro Support')}
        description={t('contact.pageDescription', 'Get help with Exchange Rates Pro. Contact our support team for questions about the currency converter, Chrome extension, or API integrations.')}
        canonical="https://rates.overx.ai/contact"
      />

      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center gradient-text light:text-gray-900">
              {t('contact.title', 'Contact Us')}
            </h1>
            <p className="text-xl text-gray-400 light:text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              {t('contact.subtitle', 'Have questions about Exchange Rates Pro? We\'re here to help.')}
            </p>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="glass-effect light:bg-white light:shadow-lg rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-white light:text-gray-900">
                  {t('contact.form.heading', 'Send us a message')}
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

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 light:text-gray-700 mb-2">
                      {t('contact.form.name', 'Name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white/10 light:bg-gray-100 border border-white/20 light:border-gray-300 rounded-lg text-white light:text-gray-900 placeholder-gray-500 light:placeholder-gray-400 focus:outline-none focus:border-blue-400 disabled:opacity-50"
                      placeholder={t('contact.form.namePlaceholder', 'Your name')}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 light:text-gray-700 mb-2">
                      {t('contact.form.email', 'Email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white/10 light:bg-gray-100 border border-white/20 light:border-gray-300 rounded-lg text-white light:text-gray-900 placeholder-gray-500 light:placeholder-gray-400 focus:outline-none focus:border-blue-400 disabled:opacity-50"
                      placeholder={t('contact.form.emailPlaceholder', 'your@email.com')}
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-300 light:text-gray-700 mb-2">
                      {t('contact.form.category', 'Category')}
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white/10 light:bg-gray-100 border border-white/20 light:border-gray-300 rounded-lg text-white light:text-gray-900 focus:outline-none focus:border-blue-400 disabled:opacity-50"
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value} className="bg-gray-900 light:bg-white">
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 light:text-gray-700 mb-2">
                      {t('contact.form.subject', 'Subject')} *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white/10 light:bg-gray-100 border border-white/20 light:border-gray-300 rounded-lg text-white light:text-gray-900 placeholder-gray-500 light:placeholder-gray-400 focus:outline-none focus:border-blue-400 disabled:opacity-50"
                      placeholder={t('contact.form.subjectPlaceholder', 'What is this about?')}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 light:text-gray-700 mb-2">
                      {t('contact.form.message', 'Message')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      maxLength={2000}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white/10 light:bg-gray-100 border border-white/20 light:border-gray-300 rounded-lg text-white light:text-gray-900 placeholder-gray-500 light:placeholder-gray-400 focus:outline-none focus:border-blue-400 resize-none disabled:opacity-50"
                      placeholder={t('contact.form.messagePlaceholder', 'Describe your question or issue...')}
                    />
                    <p className="mt-1 text-xs text-gray-500 text-right">{formData.message.length}/2000</p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('contact.form.submitting', 'Sending...')}
                      </>
                    ) : (
                      t('contact.form.submit', 'Send Message')
                    )}
                  </button>

                  {isSuccess && (
                    <p className="text-green-400 text-center">
                      {t('contact.form.success', 'Thanks! We\'ll get back to you soon.')}
                    </p>
                  )}
                  {isError && (
                    <p className="text-red-400 text-center">
                      {error || t('contact.form.error', 'Something went wrong. Please try again.')}
                    </p>
                  )}
                </form>
              </div>

              {/* Info Section */}
              <div className="space-y-8">
                <div className="glass-effect light:bg-white light:shadow-lg rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-white light:text-gray-900 mb-4">
                    {t('contact.quickLinks.title', 'Quick Links')}
                  </h3>
                  <div className="space-y-3">
                    <Link
                      href="/about"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 light:text-blue-600 light:hover:text-blue-700 transition-colors"
                    >
                      <span>{t('contact.quickLinks.about', 'About Exchange Rates Pro')}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link
                      href="/sources"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 light:text-blue-600 light:hover:text-blue-700 transition-colors"
                    >
                      <span>{t('contact.quickLinks.sources', 'Data Sources & APIs')}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <a
                      href="https://chromewebstore.google.com/detail/knpjpigjmagfflopamehjaminlbaflaa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 light:text-blue-600 light:hover:text-blue-700 transition-colors"
                    >
                      <span>{t('contact.quickLinks.extension', 'Chrome Extension')}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="glass-effect light:bg-white light:shadow-lg rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-white light:text-gray-900 mb-4">
                    {t('contact.responseTime.title', 'Response Time')}
                  </h3>
                  <p className="text-gray-400 light:text-gray-600 mb-4">
                    {t('contact.responseTime.description', 'We typically respond within 24-48 hours during business days.')}
                  </p>
                  <div className="flex items-center gap-2 text-gray-400 light:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>hello@overx.ai</span>
                  </div>
                </div>

                <div className="glass-effect light:bg-white light:shadow-lg rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-white light:text-gray-900 mb-4">
                    {t('contact.faq.title', 'Common Questions')}
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-gray-300 light:text-gray-700 font-medium mb-1">
                        {t('contact.faq.q1', 'Is the Chrome extension free?')}
                      </p>
                      <p className="text-gray-500 light:text-gray-500">
                        {t('contact.faq.a1', 'Yes, Exchange Rates Pro is completely free to use.')}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-300 light:text-gray-700 font-medium mb-1">
                        {t('contact.faq.q2', 'How often are rates updated?')}
                      </p>
                      <p className="text-gray-500 light:text-gray-500">
                        {t('contact.faq.a2', 'Rates are updated in real-time from multiple data sources.')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Background Elements */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </Layout>
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
