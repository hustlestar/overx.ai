import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useContactForm, type Locale } from '@overx-ai/shared'

interface ContactFormProps {
  className?: string
  onSuccess?: () => void
}

export function ContactForm({ className = '', onSuccess }: ContactFormProps) {
  const { t, i18n } = useTranslation('common')
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  // Honeypot field - hidden from users, bots fill it
  const [website, setWebsite] = useState('')

  const { submit, isSubmitting, isSuccess, isError, error, reset } = useContactForm({
    sourceSite: 'main',
    locale: (router.locale || i18n.language || 'en') as Locale,
    onSuccess: () => {
      setFormData({ name: '', email: '', company: '', message: '' })
      onSuccess?.()
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // If honeypot is filled, silently "succeed" without submitting
    if (website) {
      return
    }
    await submit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Reset status when user starts typing again
    if (isSuccess || isError) {
      reset()
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
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

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 light:text-gray-700 dark:text-gray-300 mb-2">
            {t('consultancy.form.name')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-white dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors text-gray-900 dark:text-white disabled:opacity-50"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 light:text-gray-700 dark:text-gray-300 mb-2">
            {t('consultancy.form.email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-white dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors text-gray-900 dark:text-white disabled:opacity-50"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 light:text-gray-700 dark:text-gray-300 mb-2">
          {t('consultancy.form.company')}
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-full px-4 py-3 bg-white dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors text-gray-900 dark:text-white disabled:opacity-50"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 light:text-gray-700 dark:text-gray-300 mb-2">
          {t('consultancy.form.message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-full px-4 py-3 bg-white dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors resize-none text-gray-900 dark:text-white disabled:opacity-50"
        />
      </div>

      {isSuccess && (
        <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 rounded-lg">
          <p className="text-green-700 dark:text-green-300 text-center">
            {t('consultancy.form.success', "Thank you! We'll get back to you within 24 hours.")}
          </p>
        </div>
      )}

      {isError && (
        <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 rounded-lg">
          <p className="text-red-700 dark:text-red-300 text-center">
            {error || t('consultancy.form.error', 'Something went wrong. Please try again or email us directly.')}
          </p>
        </div>
      )}

      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-lg font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <span>
            {isSubmitting
              ? t('consultancy.form.submitting', 'Sending...')
              : t('consultancy.form.submit')}
          </span>
          {!isSubmitting && (
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          )}
          {isSubmitting && (
            <svg className="animate-spin h-5 w-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
        </button>
      </div>
    </form>
  )
}
