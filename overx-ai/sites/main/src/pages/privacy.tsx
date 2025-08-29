import React from 'react'
import { NextPage } from 'next'
import { EnhancedSEO } from '@overx-ai/shared'

const PrivacyPage: NextPage = () => {
  return (
    <>
      <EnhancedSEO
        title="Privacy Policy - OverX AI"
        description="OverX AI's privacy policy explains how we collect, use, and protect your data. We're committed to transparency and your privacy."
        canonical="https://overx.ai/privacy"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Privacy Policy
            </h1>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 prose prose-invert max-w-none">
              <p className="text-gray-200 mb-6">
                <strong>Effective Date:</strong> January 1, 2024
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                <p className="text-gray-200">
                  OverX AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                  explains how we collect, use, disclose, and safeguard your information when you use our website, 
                  products, and services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-semibold text-white mb-3">Personal Information</h3>
                <p className="text-gray-200 mb-4">
                  We may collect personal information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside text-gray-200 space-y-2 ml-4 mb-4">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Company name and job title</li>
                  <li>Payment and billing information</li>
                  <li>Communications you send to us</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3 mt-6">Automatically Collected Information</h3>
                <p className="text-gray-200 mb-4">
                  When you use our services, we automatically collect:
                </p>
                <ul className="list-disc list-inside text-gray-200 space-y-2 ml-4">
                  <li>IP address and device information</li>
                  <li>Browser type and operating system</li>
                  <li>Usage data and analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-200 mb-4">We use your information to:</p>
                <ul className="list-disc list-inside text-gray-200 space-y-2 ml-4">
                  <li>Provide and maintain our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Respond to your comments and questions</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Communicate about products, services, and events</li>
                  <li>Monitor and analyze trends and usage</li>
                  <li>Detect, prevent, and address technical issues</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. Information Sharing</h2>
                <p className="text-gray-200 mb-4">
                  We do not sell, trade, or rent your personal information. We may share your information:
                </p>
                <ul className="list-disc list-inside text-gray-200 space-y-2 ml-4">
                  <li>With service providers who assist in our operations</li>
                  <li>To comply with legal obligations or requests</li>
                  <li>To protect rights, privacy, safety, or property</li>
                  <li>In connection with a business transaction (merger, acquisition)</li>
                  <li>With your consent or at your direction</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
                <p className="text-gray-200">
                  We implement appropriate technical and organizational measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. However, 
                  no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute 
                  security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">6. Data Retention</h2>
                <p className="text-gray-200">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined 
                  in this Privacy Policy, unless a longer retention period is required or permitted by law.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
                <p className="text-gray-200 mb-4">Depending on your location, you may have the right to:</p>
                <ul className="list-disc list-inside text-gray-200 space-y-2 ml-4">
                  <li>Access and receive a copy of your personal information</li>
                  <li>Correct or update your personal information</li>
                  <li>Delete your personal information</li>
                  <li>Object to or restrict processing of your information</li>
                  <li>Withdraw consent where processing is based on consent</li>
                  <li>Data portability</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">8. Cookies</h2>
                <p className="text-gray-200">
                  We use cookies and similar tracking technologies to track activity on our website and hold 
                  certain information. You can instruct your browser to refuse all cookies or to indicate when 
                  a cookie is being sent. However, if you do not accept cookies, you may not be able to use 
                  some portions of our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">9. Third-Party Links</h2>
                <p className="text-gray-200">
                  Our services may contain links to third-party websites. We are not responsible for the privacy 
                  practices or content of these third parties. We encourage you to review their privacy policies.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">10. Children's Privacy</h2>
                <p className="text-gray-200">
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect 
                  personal information from children under 18. If we become aware that we have collected personal 
                  information from a child under 18, we will take steps to delete such information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">11. International Data Transfers</h2>
                <p className="text-gray-200">
                  Your information may be transferred to and maintained on servers located outside of your state, 
                  province, country, or other governmental jurisdiction where data protection laws may differ. 
                  Your consent to this Privacy Policy followed by your submission of such information represents 
                  your agreement to that transfer.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">12. Changes to This Policy</h2>
                <p className="text-gray-200">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
                  the new Privacy Policy on this page and updating the "Effective Date" at the top.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">13. Contact Us</h2>
                <p className="text-gray-200">
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-gray-200 mt-4">
                  Email: privacy@overx.ai<br />
                  Website: https://overx.ai/contact
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PrivacyPage