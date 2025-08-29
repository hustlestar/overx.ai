import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout } from '@/components/Layout'
import { EnhancedSEO } from '@overx-ai/shared'

export default function TermsPage() {
  const { t } = useTranslation('common')

  return (
    <>
      <EnhancedSEO
        title="Terms of Service - Exchange Rates Pro"
        description="Terms of service for using Exchange Rates Pro currency converter and Chrome extension. Clear terms for fair use."
        canonical="https://rates.overx.ai/terms"
      />
      
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">
              Terms of Service
            </h1>
            
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-400 mb-6">
                <strong>Effective Date:</strong> January 1, 2024
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-300">
                  By using Exchange Rates Pro, including our website and Chrome extension, you agree to these 
                  Terms of Service. If you do not agree, please do not use our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">2. Service Description</h2>
                <p className="text-gray-300 mb-4">
                  Exchange Rates Pro provides:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Real-time currency exchange rate comparisons</li>
                  <li>Currency conversion calculator</li>
                  <li>Chrome browser extension for currency conversion</li>
                  <li>Exchange rate API comparisons</li>
                  <li>Historical rate data and charts</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. Free Service</h2>
                <p className="text-gray-300">
                  Exchange Rates Pro is provided free of charge. We reserve the right to introduce 
                  premium features in the future, which will be clearly marked and optional.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. Data Accuracy</h2>
                <p className="text-gray-300">
                  While we strive to provide accurate exchange rate data by aggregating from multiple 
                  reliable sources, we cannot guarantee 100% accuracy. Exchange rates are for informational 
                  purposes only and should not be used for actual financial transactions without verification.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">5. User Responsibilities</h2>
                <p className="text-gray-300 mb-4">You agree to:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Use the service for lawful purposes only</li>
                  <li>Not attempt to disrupt or overwhelm our servers</li>
                  <li>Not scrape or harvest data in violation of our robots.txt</li>
                  <li>Verify exchange rates before making financial decisions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">6. Chrome Extension</h2>
                <p className="text-gray-300">
                  Our Chrome extension operates with minimal permissions and does not collect personal 
                  browsing data. The extension only activates on pages where you explicitly invoke it.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
                <p className="text-gray-300">
                  Exchange Rates Pro is provided &quot;as is&quot; without warranties. We are not liable for any 
                  losses resulting from the use of our service, including but not limited to financial 
                  losses from exchange rate discrepancies.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">8. Privacy</h2>
                <p className="text-gray-300">
                  Your use of our service is also governed by our Privacy Policy. We respect your 
                  privacy and do not sell your data.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">9. Changes to Terms</h2>
                <p className="text-gray-300">
                  We may update these terms from time to time. Continued use of the service after 
                  changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">10. Contact</h2>
                <p className="text-gray-300">
                  For questions about these Terms of Service, please contact us at:
                </p>
                <p className="text-gray-300 mt-4">
                  Email: support@rates.overx.ai<br />
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