import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { Layout } from '../components/Layout'
import { EnhancedSEO, NewsletterForm, type Locale } from '@overx-ai/shared'

export default function SubscribePage() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const locale = (router.locale || 'en') as Locale

  return (
    <Layout>
      <EnhancedSEO
        title={t('subscribe.seo.title', 'Subscribe to OverX AI Blog - AI Insights & Updates')}
        description={t('subscribe.seo.description', 'Subscribe to the OverX AI blog newsletter for the latest insights on AI, productivity, and automation. Get expert tips and product updates delivered to your inbox.')}
        canonical="https://blog.overx.ai/subscribe"
      />

      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-16 px-4">
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl"
            animate={{
              x: [0, -50, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl mb-6"
            >
              <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t('subscribe.title', 'Subscribe to Our Newsletter')}
              </span>
            </h1>

            <p className="text-xl text-gray-300 light:text-gray-600 max-w-xl mx-auto">
              {t('subscribe.subtitle', 'Get the latest insights on AI, productivity tips, and exclusive updates delivered straight to your inbox.')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 light:from-white/80 light:to-gray-50/60 backdrop-blur-sm border border-gray-800 light:border-gray-200 rounded-2xl p-8"
          >
            <NewsletterForm
              sourceSite="blog"
              locale={locale}
              translations={{
                emailPlaceholder: t('subscribe.form.emailPlaceholder', 'Enter your email address'),
                namePlaceholder: t('subscribe.form.namePlaceholder', 'Your name (optional)'),
                submitButton: t('subscribe.form.submit', 'Subscribe Now'),
                submittingButton: t('subscribe.form.submitting', 'Subscribing...'),
                successMessage: t('subscribe.form.success', "Thanks for subscribing! Check your inbox for a confirmation email."),
                errorMessage: t('subscribe.form.error', 'Subscription failed. Please try again.'),
                nameLabel: t('subscribe.form.nameLabel', 'Name'),
                emailLabel: t('subscribe.form.emailLabel', 'Email'),
              }}
            />

            <div className="mt-8 pt-6 border-t border-gray-800 light:border-gray-200">
              <h3 className="text-sm font-medium text-gray-400 light:text-gray-600 mb-4">
                {t('subscribe.benefits.title', 'What you will get:')}
              </h3>
              <ul className="space-y-3">
                {[
                  t('subscribe.benefits.item1', 'Weekly AI insights and productivity tips'),
                  t('subscribe.benefits.item2', 'Early access to new features and products'),
                  t('subscribe.benefits.item3', 'Exclusive tutorials and case studies'),
                  t('subscribe.benefits.item4', 'No spam, unsubscribe anytime'),
                ].map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3 text-gray-300 light:text-gray-600"
                  >
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-sm text-gray-500 light:text-gray-600 mt-6"
          >
            {t('subscribe.privacy', 'We respect your privacy. Read our')}{' '}
            <a href="https://overx.ai/privacy" className="text-blue-400 hover:text-blue-300 light:text-blue-600 light:hover:text-blue-500 underline">
              {t('subscribe.privacyLink', 'Privacy Policy')}
            </a>
          </motion.p>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }
}
