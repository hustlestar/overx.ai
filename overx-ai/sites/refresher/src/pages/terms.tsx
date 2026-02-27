import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout } from '@/components/Layout'
import { EnhancedSEO } from '@overx-ai/shared'

export default function TermsPage() {
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
                <h2 className="text-lg font-bold text-red-700 dark:text-red-400 mb-2">⚠️ Medical Disclaimer</h2>
                <p className="text-red-700 dark:text-red-300 text-sm leading-relaxed">
                  <strong>Refresher is not a medical device.</strong> These breathing techniques are wellness practices, not medical treatments. If you have cardiovascular disease, respiratory conditions, epilepsy, or are pregnant, <strong>consult your doctor before use</strong>. <strong>NEVER practice the Wim Hof Method or any breath-holding techniques in water or while operating a vehicle or machinery.</strong>
                </p>
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-12">Last Updated: February 2026</p>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-10">

            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                By downloading, installing, or using Refresher: Meditation &amp; Focus (&ldquo;the App&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, do not use the App. These Terms constitute a legal agreement between you and OverX AI.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. License</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Subject to these Terms, OverX AI grants you a limited, non-exclusive, non-transferable, revocable license to use the App on Apple-branded devices that you own or control, solely for your personal, non-commercial purposes, in accordance with the App Store Terms of Service. This license does not include the right to sublicense, distribute, or create derivative works.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. In-App Purchases</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Refresher may offer premium features available for purchase through Apple&apos;s in-app purchase system (StoreKit). All transactions are processed exclusively by Apple:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Prices are displayed in your local currency as set in the App Store.</li>
                <li>All refund requests must be submitted directly to Apple at <a href="https://reportaproblem.apple.com" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">reportaproblem.apple.com</a>. OverX AI cannot process refunds.</li>
                <li>To manage or cancel subscriptions: go to <strong>iPhone Settings → [Your Name] → Subscriptions</strong>.</li>
                <li>Unused portions of a free trial are forfeited when you purchase a subscription.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Reverse engineer, decompile, disassemble, or attempt to extract the source code of the App.</li>
                <li>Use the App or any knowledge derived from it to develop competing products or services.</li>
                <li>Attempt to bypass, disable, or circumvent any technical protections or limitations of the App.</li>
                <li>Use the App for any unlawful purpose or in violation of any applicable laws or regulations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                &ldquo;Refresher&rdquo; and associated logos, graphics, and trade dress are trademarks of OverX AI. All content, design, code, and materials in the App are protected by copyright and other intellectual property laws. You may not use our trademarks or copyrighted materials without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Disclaimer of Warranties</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                THE APP IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. OVERX AI DOES NOT WARRANT THAT THE APP WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. YOUR USE OF THE APP IS AT YOUR SOLE RISK.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, OVERX AI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF OR INABILITY TO USE THE APP.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THESE TERMS OR THE APP SHALL NOT EXCEED THE TOTAL AMOUNTS YOU HAVE PAID TO OVERX AI (VIA APPLE&apos;S IN-APP PURCHASE SYSTEM) IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Apple as Third-Party Beneficiary</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You acknowledge and agree that Apple, Inc. and its subsidiaries are third-party beneficiaries of these Terms of Service. Upon your acceptance of these Terms, Apple will have the right (and will be deemed to have accepted the right) to enforce these Terms of Service against you as a third-party beneficiary thereof.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                These Terms are governed by and construed in accordance with the laws of the Republic of Belarus, without regard to its conflict of law provisions. Any disputes arising from or related to these Terms or the App shall be subject to the exclusive jurisdiction of the courts of Minsk, Republic of Belarus.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We reserve the right to modify these Terms at any time. When we make changes, we will update the &ldquo;Last Updated&rdquo; date at the top of this page. For material changes, we may notify you within the App. Your continued use of Refresher after changes take effect constitutes your acceptance of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Contact</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                For questions about these Terms, please contact us at{' '}
                <a href="mailto:support@overx.ai" className="text-blue-500 hover:underline">
                  support@overx.ai
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
