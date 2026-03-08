import { useState } from 'react'
import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout } from '@/components/Layout'
import { EnhancedSEO } from '@overx-ai/shared'
import { LegalLanguageTabs } from '@/components/LegalLanguageTabs'
import { privacyContent } from '@/content/privacy'

export default function PrivacyPage() {
  const [lang, setLang] = useState<'en' | 'ru' | 'es'>('en')
  const content = privacyContent[lang]

  return (
    <>
      <EnhancedSEO
        title="Privacy Policy — Refresher: Meditation & Focus"
        description="Refresher collects no personal data. Learn how we protect your privacy — no servers, no tracking, no ads."
        canonical="https://refresher.overx.ai/privacy"
      />
      <Layout>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <LegalLanguageTabs selectedLang={lang} onSelect={setLang} />

          {/* Medical disclaimer notice */}
          <div className="mb-10 p-4 rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 text-sm">
            <strong>{content.disclaimerTitle}:</strong>{' '}
            <span dangerouslySetInnerHTML={{ __html: content.disclaimerText }} />
          </div>

          <h1 className="text-4xl font-bold mb-2">{content.pageTitle}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">{content.lastUpdated}</p>

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
