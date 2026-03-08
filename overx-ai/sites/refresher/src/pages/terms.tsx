import { useState } from 'react'
import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout } from '@/components/Layout'
import { EnhancedSEO } from '@overx-ai/shared'
import { LegalLanguageTabs } from '@/components/LegalLanguageTabs'
import { termsContent } from '@/content/terms'

export default function TermsPage() {
  const [lang, setLang] = useState<'en' | 'ru' | 'es'>('en')
  const content = termsContent[lang]

  return (
    <>
      <EnhancedSEO
        title="Terms of Service — Refresher: Meditation & Focus"
        description="Terms of Service for the Refresher: Meditation & Focus iOS app by OverX AI."
        canonical="https://refresher.overx.ai/terms"
      />
      <Layout>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Medical Disclaimer — prominent */}
          <div className="mb-10 p-6 rounded-xl border-2 border-red-400 dark:border-red-700 bg-red-50 dark:bg-red-950/30">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h2 className="text-lg font-bold text-red-700 dark:text-red-400 mb-2">{content.disclaimerTitle}</h2>
                <p
                  className="text-red-700 dark:text-red-300 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: content.disclaimerText }}
                />
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-2">{content.pageTitle}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">{content.lastUpdated}</p>

          <LegalLanguageTabs selectedLang={lang} onSelect={setLang} />

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-10">
            {content.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                <div
                  className="text-gray-700 dark:text-gray-300 leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mt-4 [&_p]:mb-4 [&_a]:text-blue-500 [&_a:hover]:underline [&_code]:bg-gray-100 [&_code]:dark:bg-gray-800 [&_code]:px-1 [&_code]:rounded"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </section>
            ))}
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
