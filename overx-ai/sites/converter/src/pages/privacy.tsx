import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout } from '@/components/Layout'
import { EnhancedSEO } from '@overx-ai/shared'

export default function PrivacyPage() {
  const { t } = useTranslation('common')

  return (
    <>
      <EnhancedSEO
        title="Privacy Policy - Exchange Rates Pro"
        description="Exchange Rates Pro privacy policy. Learn how we protect your data and respect your privacy while providing free currency conversion services."
        canonical="https://rates.overx.ai/privacy"
      />
      
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">
              Privacy Policy
            </h1>
            
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-400 mb-6">
                <strong>Effective Date:</strong> January 1, 2024
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                <p className="text-gray-300">
                  Exchange Rates Pro (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
                  This Privacy Policy explains how we handle information when you use our website 
                  and Chrome extension.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">Automatically Collected</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                  <li>IP address (for geographic currency preferences)</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent</li>
                  <li>Currency pairs viewed and converted</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">User Preferences</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Preferred base currency</li>
                  <li>Favorite currency pairs</li>
                  <li>Display preferences (stored locally)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Information</h2>
                <p className="text-gray-300 mb-4">We use collected information to:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Provide accurate exchange rates based on your location</li>
                  <li>Remember your currency preferences</li>
                  <li>Improve our service and user experience</li>
                  <li>Analyze usage patterns to optimize performance</li>
                  <li>Prevent abuse and ensure service availability</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. Chrome Extension Privacy</h2>
                <p className="text-gray-300 mb-4">
                  Our Chrome extension:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Does NOT track your browsing history</li>
                  <li>Does NOT collect personal information</li>
                  <li>Only activates when you explicitly use it</li>
                  <li>Stores preferences locally on your device</li>
                  <li>Requires minimal permissions to function</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">5. Cookies</h2>
                <p className="text-gray-300">
                  We use essential cookies to remember your preferences and improve your experience. 
                  These cookies do not contain personally identifiable information. You can disable 
                  cookies in your browser settings, but some features may not work properly.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">6. Data Sharing</h2>
                <p className="text-gray-300">
                  We do NOT sell, trade, or rent your information. We do not share your data with 
                  third parties except as required by law or to protect our rights.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">7. Data Security</h2>
                <p className="text-gray-300">
                  We use industry-standard security measures to protect your information. All data 
                  transmission is encrypted using HTTPS. However, no method of transmission over the 
                  Internet is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">8. Data Retention</h2>
                <p className="text-gray-300">
                  We retain anonymous usage data for up to 90 days for analytics purposes. User 
                  preferences stored locally on your device are retained until you clear them.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">9. Your Rights</h2>
                <p className="text-gray-300 mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Access information we have about you</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of analytics tracking</li>
                  <li>Clear your locally stored preferences</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">10. Children&apos;s Privacy</h2>
                <p className="text-gray-300">
                  Our service is not intended for children under 13. We do not knowingly collect 
                  information from children under 13.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">11. Changes to This Policy</h2>
                <p className="text-gray-300">
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  changes by posting the new policy on this page.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">12. Contact Us</h2>
                <p className="text-gray-300">
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-gray-300 mt-4">
                  Email: privacy@rates.overx.ai<br />
                  Website: https://rates.overx.ai/contact
                </p>
              </section>
            </div>
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