/**
 * Floating feedback widget component.
 *
 * A floating button that expands to show a feedback form.
 * Uses useFeedbackForm hook for submission.
 */

import React, { useState, useEffect } from 'react'
import { useFeedbackForm, type SourceSite, type Locale } from '../../hooks/useFormSubmission'

export interface FeedbackWidgetProps {
  sourceSite: SourceSite
  locale?: Locale
  translations?: {
    buttonLabel?: string
    title?: string
    ratingLabel?: string
    messagePlaceholder?: string
    emailPlaceholder?: string
    emailLabel?: string
    submitButton?: string
    submittingButton?: string
    successMessage?: string
    errorMessage?: string
    closeLabel?: string
  }
  onSuccess?: () => void
  onError?: (error: Error) => void
}

const defaultTranslations = {
  buttonLabel: 'Feedback',
  title: 'Send Feedback',
  ratingLabel: 'How was your experience?',
  messagePlaceholder: 'Tell us what you think...',
  emailPlaceholder: 'Your email (optional)',
  emailLabel: 'Email',
  submitButton: 'Send Feedback',
  submittingButton: 'Sending...',
  successMessage: 'Thanks for your feedback!',
  errorMessage: 'Failed to send. Please try again.',
  closeLabel: 'Close',
}

export function FeedbackWidget({
  sourceSite,
  locale = 'en',
  translations = {},
  onSuccess,
  onError,
}: FeedbackWidgetProps) {
  const t = { ...defaultTranslations, ...translations }

  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5 | null>(null)
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)

  const { submit, isSubmitting, isSuccess, isError, error, reset } = useFeedbackForm({
    sourceSite,
    locale,
    onSuccess: () => {
      setRating(null)
      setMessage('')
      setEmail('')
      onSuccess?.()
      // Close widget after success with delay
      setTimeout(() => {
        setIsOpen(false)
        reset()
      }, 2000)
    },
    onError: (err) => {
      onError?.(err)
    },
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!rating || !message.trim()) return

    await submit({
      rating,
      message: message.trim(),
      email: email.trim() || undefined,
    })
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
    if (isSuccess || isError) {
      reset()
    }
  }

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Feedback Form Panel */}
      <div
        className={`absolute bottom-14 right-0 w-80 bg-gray-900 light:bg-white rounded-xl shadow-2xl border border-gray-700 light:border-gray-200 overflow-hidden transition-all duration-300 ease-out ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600">
          <h3 className="text-white font-semibold">{t.title}</h3>
          <button
            onClick={handleToggle}
            className="text-white/80 hover:text-white transition-colors"
            aria-label={t.closeLabel}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Star Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-300 light:text-gray-700 mb-2">
              {t.ratingLabel}
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star as 1 | 2 | 3 | 4 | 5)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(null)}
                  className="p-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                >
                  <svg
                    className={`w-8 h-8 transition-colors ${
                      (hoveredStar !== null ? star <= hoveredStar : rating !== null && star <= rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-500 light:text-gray-300'
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
          </div>

          {/* Message */}
          <div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.messagePlaceholder}
              required
              rows={3}
              disabled={isSubmitting}
              className="w-full px-3 py-2 bg-gray-800 light:bg-gray-100 border border-gray-700 light:border-gray-300 rounded-lg text-white light:text-gray-900 placeholder-gray-500 light:placeholder-gray-400 focus:outline-none focus:border-blue-400 resize-none disabled:opacity-50"
            />
          </div>

          {/* Email (optional) */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              disabled={isSubmitting}
              className="w-full px-3 py-2 bg-gray-800 light:bg-gray-100 border border-gray-700 light:border-gray-300 rounded-lg text-white light:text-gray-900 placeholder-gray-500 light:placeholder-gray-400 focus:outline-none focus:border-blue-400 disabled:opacity-50"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !rating || !message.trim()}
            className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t.submittingButton}
              </>
            ) : (
              t.submitButton
            )}
          </button>

          {/* Status Messages */}
          {isSuccess && (
            <p className="text-green-400 text-sm text-center">{t.successMessage}</p>
          )}
          {isError && (
            <p className="text-red-400 text-sm text-center">{error || t.errorMessage}</p>
          )}
        </form>
      </div>

      {/* Floating Button */}
      <button
        onClick={handleToggle}
        className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? 'bg-gray-700 light:bg-gray-200 text-white light:text-gray-900'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105'
        }`}
        aria-label={t.buttonLabel}
        aria-expanded={isOpen}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          )}
        </svg>
        <span className="text-sm font-medium">{t.buttonLabel}</span>
      </button>
    </div>
  )
}
