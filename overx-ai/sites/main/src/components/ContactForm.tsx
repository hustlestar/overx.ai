import { useState } from 'react'
import { useTranslation } from 'next-i18next'

interface ContactFormProps {
  className?: string
}

export function ContactForm({ className = '' }: ContactFormProps) {
  const { t } = useTranslation('common')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
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
            className="w-full px-4 py-3 bg-white dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors text-gray-900 dark:text-white"
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
            className="w-full px-4 py-3 bg-white dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors text-gray-900 dark:text-white"
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
          className="w-full px-4 py-3 bg-white dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors text-gray-900 dark:text-white"
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
          className="w-full px-4 py-3 bg-white dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors resize-none text-gray-900 dark:text-white"
        />
      </div>
      
      <div className="text-center">
        <button
          type="submit"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-lg font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30"
        >
          <span>{t('consultancy.form.submit')}</span>
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>
    </form>
  )
}