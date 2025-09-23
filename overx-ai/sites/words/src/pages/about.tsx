import React from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { EnhancedSEO } from '@overx-ai/shared'
import { GradientLink } from '@overx-ai/shared'
import { Layout } from '@/components/Layout'
import { useRouter } from 'next/router'

const AboutPage: NextPage = () => {
  const { t } = useTranslation(['common', 'about'])
  const router = useRouter()
  const { locale } = router

  return (
    <>
      <EnhancedSEO
        title={t('about:meta.title')}
        description={t('about:meta.description')}
        canonical={`https://words.overx.ai${locale === 'en' ? '/' : `/${locale}/`}about/`}
      />

      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
              {t('about:title')}
            </h1>

            <div className="prose prose-lg prose-invert max-w-none">
              <section className="mb-12 bg-white/10 backdrop-blur-md rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">{t('about:mission.title')}</h2>
                <p className="text-gray-200 mb-4">
                  {t('about:mission.description1')}
                </p>
                <p className="text-gray-200">
                  {t('about:mission.description2')}
                </p>
              </section>

              <section className="mb-12 bg-white/10 backdrop-blur-md rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">{t('about:story.title')}</h2>
                <p className="text-gray-200 mb-4">
                  {t('about:story.description1')}
                </p>
                <p className="text-gray-200">
                  {t('about:story.description2')}
                </p>
              </section>


              <section className="mb-12 bg-white/10 backdrop-blur-md rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">{t('about:values.title')}</h2>
                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span><strong>{t('about:values.items.accessibility.title')}:</strong> {t('about:values.items.accessibility.description')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span><strong>{t('about:values.items.science.title')}:</strong> {t('about:values.items.science.description')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span><strong>{t('about:values.items.privacy.title')}:</strong> {t('about:values.items.privacy.description')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span><strong>{t('about:values.items.continuous.title')}:</strong> {t('about:values.items.continuous.description')}</span>
                  </li>
                </ul>
              </section>

              <section className="mb-12 bg-white/10 backdrop-blur-md rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">{t('about:team.title')}</h2>
                <p className="text-gray-200 mb-6">
                  {t('about:team.description')}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🤖</div>
                    <p className="text-white font-semibold">{t('about:team.roles.ai')}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">📚</div>
                    <p className="text-white font-semibold">{t('about:team.roles.linguists')}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🎓</div>
                    <p className="text-white font-semibold">{t('about:team.roles.educators')}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🎨</div>
                    <p className="text-white font-semibold">{t('about:team.roles.designers')}</p>
                  </div>
                </div>
              </section>

              <section className="mb-12 bg-white/10 backdrop-blur-md rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">{t('about:impact.title')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">{t('about:impact.stats.learners.value')}</div>
                    <p className="text-gray-300">{t('about:impact.stats.learners.label')}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">{t('about:impact.stats.words.value')}</div>
                    <p className="text-gray-300">{t('about:impact.stats.words.label')}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">{t('about:impact.stats.countries.value')}</div>
                    <p className="text-gray-300">{t('about:impact.stats.countries.label')}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">{t('about:impact.stats.satisfaction.value')}</div>
                    <p className="text-gray-300">{t('about:impact.stats.satisfaction.label')}</p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">{t('about:cta.title')}</h2>
                <p className="text-white mb-6">
                  {t('about:cta.description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://t.me/VocabularyLearningBot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {t('about:cta.button')}
                  </a>
                  <GradientLink href="/" className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                    {t('about:cta.contact')}
                  </GradientLink>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      </Layout>
    </>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'about'])),
    },
  }
}

export default AboutPage