/**
 * React hook for form submissions to the OverX Forms API.
 *
 * This hook provides a unified way to submit forms across all OverX sites
 * with loading states, error handling, and success feedback.
 */

import { useState, useCallback, useMemo } from 'react'

// Types matching the API client
export type FormType = 'contact' | 'newsletter' | 'support' | 'quote' | 'feedback' | 'app_feedback'
export type SourceSite = 'main' | 'blog' | 'converter' | 'words'
export type Locale = 'en' | 'es' | 'ru'
export type FeedbackSource = 'bot' | 'extension' | 'ios' | 'android' | 'web'

export interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
}

export interface NewsletterFormData {
  email: string
  name?: string
}

export interface SupportFormData {
  name: string
  email: string
  subject: string
  category?: string
  message: string
}

export interface QuoteFormData {
  name: string
  email: string
  company?: string
  project_type: string
  budget_range?: string
  timeline?: string
  description: string
}

export interface FeedbackFormData {
  email?: string
  rating: 1 | 2 | 3 | 4 | 5
  message: string
  page_url?: string
}

export interface AppFeedbackFormData {
  source: FeedbackSource
  app_name: string
  email?: string
  text: string
}

export interface AppFeedbackUserInput {
  email: string
  text: string
}

export interface UseAppFeedbackOptions extends Omit<UseFormSubmissionOptions, 'formType'> {
  source: FeedbackSource
  appName: string
}

export interface FormSubmissionResponse {
  success: boolean
  message: string
  submission_id?: string
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export interface UseFormSubmissionOptions {
  sourceSite: SourceSite
  locale?: Locale
  baseUrl?: string
  onSuccess?: (response: FormSubmissionResponse) => void
  onError?: (error: Error) => void
}

export interface UseFormSubmissionResult<T> {
  status: FormStatus
  error: string | null
  response: FormSubmissionResponse | null
  submit: (data: T, options?: { pageUrl?: string }) => Promise<void>
  reset: () => void
  isSubmitting: boolean
  isSuccess: boolean
  isError: boolean
}

// Helper to get env variable from window or process.env
function getApiUrl(): string {
  if (typeof window !== 'undefined') {
    const windowEnv = (window as unknown as Record<string, string | undefined>).NEXT_PUBLIC_FORMS_API_URL
    if (windowEnv) return windowEnv
  }
  return process.env.NEXT_PUBLIC_FORMS_API_URL || 'https://api.overx.ai'
}

/**
 * Hook for submitting forms to the OverX Forms API
 */
export function useFormSubmission<T extends object>(
  formType: FormType,
  options: UseFormSubmissionOptions
): UseFormSubmissionResult<T> {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const [response, setResponse] = useState<FormSubmissionResponse | null>(null)

  const baseUrl = options.baseUrl || getApiUrl()

  const submit = useCallback(
    async (data: T, submitOptions?: { pageUrl?: string }) => {
      setStatus('submitting')
      setError(null)
      setResponse(null)

      try {
        const requestBody = {
          form_type: formType,
          data,
          source_site: options.sourceSite,
          locale: options.locale || 'en',
          page_url: submitOptions?.pageUrl || (typeof window !== 'undefined' ? window.location.href : undefined),
          website: '', // Honeypot field - always empty
        }

        const res = await fetch(`${baseUrl}/api/v1/forms/submit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({ detail: 'Submission failed' }))
          throw new Error(
            typeof errorData.detail === 'string'
              ? errorData.detail
              : 'Form submission failed. Please try again.'
          )
        }

        const responseData: FormSubmissionResponse = await res.json()
        setResponse(responseData)
        setStatus('success')
        options.onSuccess?.(responseData)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
        setError(errorMessage)
        setStatus('error')
        options.onError?.(err instanceof Error ? err : new Error(errorMessage))
      }
    },
    [formType, options, baseUrl]
  )

  const reset = useCallback(() => {
    setStatus('idle')
    setError(null)
    setResponse(null)
  }, [])

  return useMemo(
    () => ({
      status,
      error,
      response,
      submit,
      reset,
      isSubmitting: status === 'submitting',
      isSuccess: status === 'success',
      isError: status === 'error',
    }),
    [status, error, response, submit, reset]
  )
}

// ==================== Typed Hooks ====================

/**
 * Hook for contact form submissions
 */
export function useContactForm(options: Omit<UseFormSubmissionOptions, 'formType'>): UseFormSubmissionResult<ContactFormData> {
  return useFormSubmission<ContactFormData>('contact', options)
}

/**
 * Hook for newsletter form submissions
 */
export function useNewsletterForm(options: Omit<UseFormSubmissionOptions, 'formType'>): UseFormSubmissionResult<NewsletterFormData> {
  return useFormSubmission<NewsletterFormData>('newsletter', options)
}

/**
 * Hook for support form submissions
 */
export function useSupportForm(options: Omit<UseFormSubmissionOptions, 'formType'>): UseFormSubmissionResult<SupportFormData> {
  return useFormSubmission<SupportFormData>('support', options)
}

/**
 * Hook for quote form submissions
 */
export function useQuoteForm(options: Omit<UseFormSubmissionOptions, 'formType'>): UseFormSubmissionResult<QuoteFormData> {
  return useFormSubmission<QuoteFormData>('quote', options)
}

/**
 * Hook for feedback form submissions
 */
export function useFeedbackForm(options: Omit<UseFormSubmissionOptions, 'formType'>): UseFormSubmissionResult<FeedbackFormData> {
  return useFormSubmission<FeedbackFormData>('feedback', options)
}

/**
 * Hook for app feedback form submissions (bot, extension, iOS, Android, web)
 * source and appName are hidden from UI, only email and text are user inputs
 */
export function useAppFeedbackForm(options: UseAppFeedbackOptions): UseFormSubmissionResult<AppFeedbackUserInput> {
  const { source, appName, ...baseOptions } = options
  const baseResult = useFormSubmission<AppFeedbackFormData>('app_feedback', baseOptions)

  const submit = useCallback(
    async (data: AppFeedbackUserInput, submitOptions?: { pageUrl?: string }) => {
      const fullData: AppFeedbackFormData = {
        source,
        app_name: appName,
        ...data,
      }
      return baseResult.submit(fullData, submitOptions)
    },
    [source, appName, baseResult.submit]
  )

  return useMemo(
    () => ({
      ...baseResult,
      submit,
    }),
    [baseResult, submit]
  )
}
