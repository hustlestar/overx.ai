/**
 * Newsletter subscription form component.
 *
 * Can be used inline (compact mode) or as a standalone form.
 */

import React, { useState } from 'react'

export interface NewsletterFormProps {
  sourceSite: 'main' | 'blog' | 'converter' | 'words'
  locale?: 'en' | 'es' | 'ru'
  compact?: boolean
  className?: string
  translations?: {
    emailPlaceholder?: string
    namePlaceholder?: string
    submitButton?: string
    submittingButton?: string
    successMessage?: string
    errorMessage?: string
    nameLabel?: string
    emailLabel?: string
  }
  onSuccess?: () => void
  onError?: (error: Error) => void
}

const defaultTranslations = {
  emailPlaceholder: 'Enter your email',
  namePlaceholder: 'Your name (optional)',
  submitButton: 'Subscribe',
  submittingButton: 'Subscribing...',
  successMessage: "Thanks! You're now subscribed.",
  errorMessage: 'Subscription failed. Please try again.',
  nameLabel: 'Name',
  emailLabel: 'Email',
}

export function NewsletterForm({
  sourceSite,
  locale = 'en',
  compact = false,
  className = '',
  translations = {},
  onSuccess,
  onError,
}: NewsletterFormProps) {
  const t = { ...defaultTranslations, ...translations }

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [website, setWebsite] = useState('') // Honeypot
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Helper to get env variable from window or process.env
  const getApiUrl = (): string => {
    if (typeof window !== 'undefined') {
      const windowEnv = (window as unknown as Record<string, string | undefined>).NEXT_PUBLIC_FORMS_API_URL
      if (windowEnv) return windowEnv
    }
    return process.env.NEXT_PUBLIC_FORMS_API_URL || 'https://api.overx.ai'
  }

  const baseUrl = getApiUrl()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot check
    if (website) {
      setStatus('success')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch(`${baseUrl}/api/v1/forms/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form_type: 'newsletter',
          data: { email, name: name || undefined },
          source_site: sourceSite,
          locale,
          page_url: typeof window !== 'undefined' ? window.location.href : undefined,
          website: '', // Honeypot field - always empty
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          typeof errorData.detail === 'string'
            ? errorData.detail
            : t.errorMessage
        )
      }

      setStatus('success')
      setEmail('')
      setName('')
      onSuccess?.()
    } catch (err) {
      const error = err instanceof Error ? err : new Error(t.errorMessage)
      setErrorMessage(error.message)
      setStatus('error')
      onError?.(error)
    }
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-2 ${className}`}>
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

        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'success' || status === 'error') setStatus('idle')
          }}
          placeholder={t.emailPlaceholder}
          required
          disabled={status === 'submitting'}
          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === 'submitting' ? t.submittingButton : t.submitButton}
        </button>

        {status === 'success' && (
          <span className="text-green-400 text-sm flex items-center">{t.successMessage}</span>
        )}
        {status === 'error' && (
          <span className="text-red-400 text-sm flex items-center">{errorMessage || t.errorMessage}</span>
        )}
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
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
        <label htmlFor="newsletter-email" className="block text-sm font-medium text-gray-200 mb-2">
          {t.emailLabel} *
        </label>
        <input
          type="email"
          id="newsletter-email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'success' || status === 'error') setStatus('idle')
          }}
          placeholder={t.emailPlaceholder}
          required
          disabled={status === 'submitting'}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 disabled:opacity-50"
        />
      </div>

      <div>
        <label htmlFor="newsletter-name" className="block text-sm font-medium text-gray-200 mb-2">
          {t.nameLabel}
        </label>
        <input
          type="text"
          id="newsletter-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            if (status === 'success' || status === 'error') setStatus('idle')
          }}
          placeholder={t.namePlaceholder}
          disabled={status === 'submitting'}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 disabled:opacity-50"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {status === 'submitting' ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {t.submittingButton}
          </>
        ) : (
          t.submitButton
        )}
      </button>

      {status === 'success' && (
        <p className="text-green-400 text-center">{t.successMessage}</p>
      )}
      {status === 'error' && (
        <p className="text-red-400 text-center">{errorMessage || t.errorMessage}</p>
      )}
    </form>
  )
}
