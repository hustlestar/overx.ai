import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout } from '@/components/Layout'
import { EnhancedSEO } from '@overx-ai/shared'

export default function PrivacyPage() {
  return (
    <>
      <EnhancedSEO
        title="Privacy Policy — Refresher: Meditation & Focus"
        description="Refresher collects no personal data. Learn how we protect your privacy — no servers, no tracking, no ads."
        canonical="https://refresher.overx.ai/privacy"
      />
      <Layout>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Medical disclaimer notice */}
          <div className="mb-10 p-4 rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 text-sm">
            <strong>Note:</strong> Refresher is not a medical device and is not intended to diagnose, treat, cure, or prevent any medical condition. Consult a healthcare professional before beginning any breathing practice if you have a health condition.
          </div>

          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-12">Last Updated: February 2026</p>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-10">

            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                OverX AI (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains our data practices for the Refresher: Meditation &amp; Focus iOS application and the refresher.overx.ai website. Our approach is simple: we designed Refresher to work entirely on your device, without collecting or transmitting your personal data to our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                <strong>We collect no personal information from the iOS app.</strong> Specifically:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>HealthKit data</strong> (breathing sessions, mindfulness minutes, heart rate) is stored on your device and, if you enable iCloud sync, in your private iCloud account. This data is never transmitted to OverX AI servers and we have no access to it.
                </li>
                <li>
                  <strong>iCloud sync</strong> is entirely opt-in and user-controlled. Synced data resides in your personal iCloud account governed by Apple&apos;s privacy policy, not ours.
                </li>
                <li>
                  <strong>In-app purchases</strong> are processed exclusively by Apple via StoreKit. We receive only confirmation that a purchase was completed — no payment card details or billing information.
                </li>
                <li>
                  <strong>Live Activities, Widgets, and Siri shortcuts</strong> operate entirely locally on your device. No data is sent to our servers.
                </li>
                <li>
                  <strong>Session history and preferences</strong> are stored locally using SwiftData and UserDefaults. They are not transmitted to us.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Third-Party Services</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Refresher contains <strong>no third-party analytics or advertising SDKs</strong>. We do not integrate Firebase, Amplitude, Mixpanel, Facebook SDK, Google Analytics, or any advertising network into the app.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The app interacts with Apple&apos;s own services — App Store, HealthKit, iCloud, StoreKit — which are governed by <a href="https://www.apple.com/legal/privacy/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Apple&apos;s Privacy Policy</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Website Analytics</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                When you visit refresher.overx.ai, our web server may log:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Your IP address</li>
                <li>Pages visited and referrer URL</li>
                <li>Browser type and operating system</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                These server logs are retained for a maximum of 30 days and are used solely for security and performance monitoring. We also store a language preference cookie (<code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">overx-locale</code>) on the <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">.overx.ai</code> domain to remember your preferred language across OverX AI sites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Your Privacy Rights</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                <strong>GDPR (European Union):</strong> Since we do not store personal data on our servers, most GDPR rights (access, erasure, portability) are satisfied by your device and Apple&apos;s infrastructure. For any website data (server logs), you may contact us to request deletion.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                <strong>CCPA (California):</strong> We do not sell personal information, as defined by the CCPA.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Children:</strong> Refresher is rated 4+ on the App Store. We do not knowingly collect personal data from users of any age, and our privacy-by-design approach means no data collection occurs regardless of user age.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Your breathing session data, HealthKit records, and preferences remain on your device or within Apple&apos;s encrypted iCloud infrastructure. We have no access to this data, which means there is nothing for us to protect on our end — or for bad actors to steal from us. All data transmission to iCloud uses Apple&apos;s end-to-end encryption where applicable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. When we do, we will update the &ldquo;Last Updated&rdquo; date at the top of this page. For material changes, we may also post a notice within the app. Continued use of Refresher after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                For privacy-related questions or requests, please email us at{' '}
                <a href="mailto:privacy@overx.ai" className="text-blue-500 hover:underline">
                  privacy@overx.ai
                </a>
                .
              </p>
            </section>

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
