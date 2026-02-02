/**
 * OverX AI Forms API Client
 *
 * TypeScript client for submitting forms to the unified OverX API.
 * Supports all form types across all OverX sites with full type safety.
 */

import axios, { AxiosInstance, AxiosError } from 'axios'

// ==================== Types ====================

export type FormType = 'contact' | 'newsletter' | 'support' | 'quote' | 'feedback' | 'app_feedback'

export type SourceSite = 'main' | 'blog' | 'converter' | 'words'

export type Locale = 'en' | 'es' | 'ru'

export type FeedbackSource = 'bot' | 'extension' | 'ios' | 'android' | 'web'

// Form-specific data types
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
  email: string
  text: string
}

export interface AppFeedbackUserInput {
  email: string
  text: string
}

// Union type for all form data
export type FormData =
  | { type: 'contact'; data: ContactFormData }
  | { type: 'newsletter'; data: NewsletterFormData }
  | { type: 'support'; data: SupportFormData }
  | { type: 'quote'; data: QuoteFormData }
  | { type: 'feedback'; data: FeedbackFormData }
  | { type: 'app_feedback'; data: AppFeedbackFormData }

// API Request/Response types
export interface FormSubmissionRequest {
  form_type: FormType
  data: Record<string, unknown>
  source_site: SourceSite
  locale?: Locale
  page_url?: string
  website?: string // Honeypot field - should always be empty
}

export interface FormSubmissionResponse {
  success: boolean
  message: string
  submission_id?: string
}

export interface HealthResponse {
  status: string
  version: string
  timestamp: string
}

export interface StatsResponse {
  total_submissions: number
  filters: {
    form_type?: string
    source_site?: string
  }
}

export interface ApiError {
  detail: string | Array<{ loc: string[]; msg: string; type: string }>
}

// ==================== Client Configuration ====================

export interface FormsApiClientConfig {
  baseUrl?: string
  timeout?: number
  sourceSite: SourceSite
  locale?: Locale
}

// ==================== API Client ====================

export class FormsApiClient {
  private client: AxiosInstance
  private sourceSite: SourceSite
  private locale: Locale

  constructor(config: FormsApiClientConfig) {
    const baseUrl = config.baseUrl || process.env.NEXT_PUBLIC_FORMS_API_URL || 'https://api.overx.ai'

    this.client = axios.create({
      baseURL: baseUrl,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.sourceSite = config.sourceSite
    this.locale = config.locale || 'en'
  }

  /**
   * Set the locale for subsequent requests
   */
  setLocale(locale: Locale): void {
    this.locale = locale
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<HealthResponse> {
    const response = await this.client.get<HealthResponse>('/api/v1/health')
    return response.data
  }

  /**
   * Generic form submission
   */
  async submitForm(
    formType: FormType,
    data: Record<string, unknown>,
    options?: {
      pageUrl?: string
    }
  ): Promise<FormSubmissionResponse> {
    const request: FormSubmissionRequest = {
      form_type: formType,
      data,
      source_site: this.sourceSite,
      locale: this.locale,
      page_url: options?.pageUrl,
      website: '', // Honeypot field - always empty for legitimate submissions
    }

    try {
      const response = await this.client.post<FormSubmissionResponse>(
        '/api/v1/forms/submit',
        request
      )
      return response.data
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const apiError = error.response.data as ApiError
        throw new FormSubmissionError(
          typeof apiError.detail === 'string'
            ? apiError.detail
            : 'Validation failed',
          error.response.status,
          apiError
        )
      }
      throw error
    }
  }

  // ==================== Typed Form Submission Methods ====================

  /**
   * Submit a contact form
   */
  async submitContactForm(
    data: ContactFormData,
    options?: { pageUrl?: string }
  ): Promise<FormSubmissionResponse> {
    return this.submitForm('contact', data, options)
  }

  /**
   * Submit a newsletter subscription
   */
  async submitNewsletterForm(
    data: NewsletterFormData,
    options?: { pageUrl?: string }
  ): Promise<FormSubmissionResponse> {
    return this.submitForm('newsletter', data, options)
  }

  /**
   * Submit a support request
   */
  async submitSupportForm(
    data: SupportFormData,
    options?: { pageUrl?: string }
  ): Promise<FormSubmissionResponse> {
    return this.submitForm('support', data, options)
  }

  /**
   * Submit a quote request
   */
  async submitQuoteForm(
    data: QuoteFormData,
    options?: { pageUrl?: string }
  ): Promise<FormSubmissionResponse> {
    return this.submitForm('quote', data, options)
  }

  /**
   * Submit feedback
   */
  async submitFeedbackForm(
    data: FeedbackFormData,
    options?: { pageUrl?: string }
  ): Promise<FormSubmissionResponse> {
    return this.submitForm('feedback', data, options)
  }

  /**
   * Submit app feedback (from bot, extension, iOS, Android, web)
   * @param source - Hidden field: where the feedback comes from
   * @param appName - Hidden field: name of the app
   * @param userInput - User-visible fields: email and text
   */
  async submitAppFeedbackForm(
    source: FeedbackSource,
    appName: string,
    userInput: AppFeedbackUserInput,
    options?: { pageUrl?: string }
  ): Promise<FormSubmissionResponse> {
    const data: AppFeedbackFormData = {
      source,
      app_name: appName,
      ...userInput,
    }
    return this.submitForm('app_feedback', data, options)
  }

  /**
   * Get submission statistics (admin endpoint)
   */
  async getStats(filters?: {
    formType?: FormType
    sourceSite?: SourceSite
  }): Promise<StatsResponse> {
    const params = new URLSearchParams()
    if (filters?.formType) params.append('form_type', filters.formType)
    if (filters?.sourceSite) params.append('source_site', filters.sourceSite)

    const response = await this.client.get<StatsResponse>(
      `/api/v1/forms/stats?${params.toString()}`
    )
    return response.data
  }
}

// ==================== Error Classes ====================

export class FormSubmissionError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: ApiError
  ) {
    super(message)
    this.name = 'FormSubmissionError'
  }
}

// ==================== Factory Functions ====================

/**
 * Create a forms API client for a specific site
 */
export function createFormsClient(
  sourceSite: SourceSite,
  options?: {
    baseUrl?: string
    locale?: Locale
    timeout?: number
  }
): FormsApiClient {
  return new FormsApiClient({
    sourceSite,
    ...options,
  })
}

// ==================== Pre-configured Clients ====================

let _mainClient: FormsApiClient | null = null
let _blogClient: FormsApiClient | null = null
let _converterClient: FormsApiClient | null = null
let _wordsClient: FormsApiClient | null = null

/**
 * Get the forms client for the main site (overx.ai)
 */
export function getMainFormsClient(locale?: Locale): FormsApiClient {
  if (!_mainClient) {
    _mainClient = createFormsClient('main')
  }
  if (locale) _mainClient.setLocale(locale)
  return _mainClient
}

/**
 * Get the forms client for the blog site (blog.overx.ai)
 */
export function getBlogFormsClient(locale?: Locale): FormsApiClient {
  if (!_blogClient) {
    _blogClient = createFormsClient('blog')
  }
  if (locale) _blogClient.setLocale(locale)
  return _blogClient
}

/**
 * Get the forms client for the converter site (rates.overx.ai)
 */
export function getConverterFormsClient(locale?: Locale): FormsApiClient {
  if (!_converterClient) {
    _converterClient = createFormsClient('converter')
  }
  if (locale) _converterClient.setLocale(locale)
  return _converterClient
}

/**
 * Get the forms client for the words site (words.overx.ai)
 */
export function getWordsFormsClient(locale?: Locale): FormsApiClient {
  if (!_wordsClient) {
    _wordsClient = createFormsClient('words')
  }
  if (locale) _wordsClient.setLocale(locale)
  return _wordsClient
}
