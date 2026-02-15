import React, { useState } from 'react'
import { NextPage, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { EnhancedSEO, useContactForm, type Locale } from '@overx-ai/shared'

const ContactPage: NextPage = () => {
  const { t, i18n } = useTranslation('common')
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  // Honeypot field - hidden from users, bots fill it
  const [website, setWebsite] = useState('')

  const { submit, isSubmitting, isSuccess, isError, error, reset } = useContactForm({
    sourceSite: 'main',
    locale: (router.locale || i18n.language || 'en') as Locale,
    onSuccess: () => {
      setFormData({ name: '', email: '', company: '', message: '' })
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Reset status when user starts typing again
    if (isSuccess || isError) {
      reset()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // If honeypot is filled, silently "succeed" without submitting
    if (website) {
      return
    }
    await submit(formData)
  }

  return (
    <>
      <EnhancedSEO
        title={t('contact.seo.title', 'Contact OverX AI - Get Custom AI Solutions for Your Business')}
        description={t('contact.seo.description', 'Contact OverX AI to discuss custom AI agents, automation solutions, and consulting services. Get a free consultation and see how we can transform your business.')}
        canonical="https://overx.ai/contact"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 text-center">
              {t('contact.title', 'Contact OverX AI')}
            </h1>
            <p className="text-xl text-gray-200 text-center mb-6">
              {t('contact.subtitle', "Ready to transform your business with AI? Let's discuss your needs.")}
            </p>
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <p className="text-gray-300 mb-4">
                {t('contact.description1', "Whether you're looking to automate repetitive tasks, build custom AI agents, develop Chrome extensions, or integrate intelligent solutions into your existing workflows, our team is here to help you achieve your goals. We specialize in creating practical AI solutions that deliver measurable results.")}
              </p>
              <p className="text-gray-300">
                {t('contact.description2', 'From initial consultation to full implementation and ongoing support, we partner with you at every stage. Our expertise spans conversational AI, automation tools, productivity applications, and custom software development. Every project starts with understanding your unique challenges and objectives.')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {t('contact.form.heading', 'Get in Touch')}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field - hidden from users */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
                      {t('contact.form.name', 'Your Name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 disabled:opacity-50"
                      placeholder={t('contact.form.namePlaceholder', 'John Doe')}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                      {t('contact.form.email', 'Email Address')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 disabled:opacity-50"
                      placeholder={t('contact.form.emailPlaceholder', 'john@company.com')}
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-200 mb-2">
                      {t('contact.form.company', 'Company Name')}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 disabled:opacity-50"
                      placeholder={t('contact.form.companyPlaceholder', 'Acme Inc.')}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2">
                      {t('contact.form.message', 'How can we help?')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 disabled:opacity-50"
                      placeholder={t('contact.form.messagePlaceholder', 'Tell us about your project or challenges...')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
                      {t('contact.form.success', "Thank you! We'll get back to you within 24 hours.")}
                    </p>
                  )}
                  {isError && (
                    <p className="text-red-400 text-center">
                      {error || t('contact.form.error', 'Something went wrong. Please try again or email us directly.')}
                    </p>
                  )}
                </form>
              </div>

              <div className="space-y-8">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {t('contact.directContact.title', 'Direct Contact')}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    {t('contact.directContact.description', "Prefer to reach out directly? We're always happy to hear from potential clients and partners. Our team monitors inquiries around the clock to ensure timely responses.")}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{t('contact.directContact.emailLabel', 'Email')}</p>
                      <a href="mailto:hello@overx.ai" className="text-blue-400 hover:text-blue-300">
                        hello@overx.ai
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{t('contact.directContact.responseTimeLabel', 'Response Time')}</p>
                      <p className="text-white">{t('contact.directContact.responseTime', 'Within 24 hours')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{t('contact.directContact.hoursLabel', 'Business Hours')}</p>
                      <p className="text-white">{t('contact.directContact.hours', 'Monday - Friday, 9:00 AM - 6:00 PM (CET)')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {t('contact.nextSteps.title', 'What Happens Next?')}
                  </h3>
                  <ol className="space-y-3 text-gray-200">
                    <li className="flex items-start">
                      <span className="text-blue-400 font-bold mr-2">1.</span>
                      <span>{t('contact.nextSteps.step1', "We'll review your message and understand your needs")}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 font-bold mr-2">2.</span>
                      <span>{t('contact.nextSteps.step2', 'Schedule a free consultation call within 48 hours')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 font-bold mr-2">3.</span>
                      <span>{t('contact.nextSteps.step3', 'Discuss your challenges and potential solutions')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 font-bold mr-2">4.</span>
                      <span>{t('contact.nextSteps.step4', 'Receive a custom proposal tailored to your needs')}</span>
                    </li>
                  </ol>
                </div>

                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/30 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {t('contact.quickLinks.title', 'Quick Links')}
                  </h3>
                  <div className="space-y-2">
                    <a href="/products" className="block text-blue-400 hover:text-blue-300">
                      {t('contact.quickLinks.products', 'View Our Products')}
                    </a>
                    <a href="/consultancy" className="block text-blue-400 hover:text-blue-300">
                      {t('contact.quickLinks.consultancy', 'AI Consulting Services')}
                    </a>
                    <a href="/about" className="block text-blue-400 hover:text-blue-300">
                      {t('contact.quickLinks.about', 'Learn About Us')}
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

export default ContactPage
