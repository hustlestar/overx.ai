import React from 'react'
import { NextPage } from 'next'
import { EnhancedSEO } from '@overx-ai/shared'

const TermsPage: NextPage = () => {
  return (
    <>
      <EnhancedSEO
        title="Terms of Service - OverX AI"
        description="Read OverX AI's terms of service for using our AI solutions, Chrome extensions, and consulting services. Clear terms for business partnerships."
        canonical="https://overx.ai/terms"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Terms of Service
            </h1>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 prose prose-invert max-w-none">
              <p className="text-gray-200 mb-6">
                <strong>Effective Date:</strong> January 1, 2024
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-200">
                  By accessing or using OverX AI's services, including our website, AI solutions, Chrome extensions, 
                  and consulting services, you agree to be bound by these Terms of Service. If you do not agree to 
                  these terms, please do not use our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">2. Services Description</h2>
                <p className="text-gray-200 mb-4">
                  OverX AI provides:
                </p>
                <ul className="list-disc list-inside text-gray-200 space-y-2 ml-4">
                  <li>Custom AI agent development</li>
                  <li>Chrome browser extensions</li>
                  <li>Automation solutions</li>
                  <li>AI consulting services</li>
                  <li>Related software and technical services</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. User Responsibilities</h2>
                <p className="text-gray-200 mb-4">You agree to:</p>
                <ul className="list-disc list-inside text-gray-200 space-y-2 ml-4">
                  <li>Provide accurate information when using our services</li>
                  <li>Use our services in compliance with all applicable laws</li>
                  <li>Not misuse or attempt to harm our services or infrastructure</li>
                  <li>Respect intellectual property rights</li>
                  <li>Maintain the confidentiality of any account credentials</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
                <p className="text-gray-200">
                  All content, features, and functionality of our services are owned by OverX AI and are protected 
                  by international copyright, trademark, and other intellectual property laws. Custom solutions 
                  developed for clients are subject to separate licensing agreements.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">5. Privacy</h2>
                <p className="text-gray-200">
                  Your use of our services is also governed by our Privacy Policy. By using our services, you 
                  consent to the collection and use of information as described in our Privacy Policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">6. Payment Terms</h2>
                <p className="text-gray-200">
                  For paid services, you agree to pay all fees according to the pricing and payment terms 
                  presented to you. All payments are non-refundable unless otherwise specified in writing.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
                <p className="text-gray-200">
                  To the maximum extent permitted by law, OverX AI shall not be liable for any indirect, 
                  incidental, special, consequential, or punitive damages resulting from your use or inability 
                  to use our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">8. Indemnification</h2>
                <p className="text-gray-200">
                  You agree to indemnify and hold OverX AI harmless from any claims, losses, damages, 
                  liabilities, and expenses arising from your use of our services or violation of these terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">9. Modifications</h2>
                <p className="text-gray-200">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately 
                  upon posting. Your continued use of our services constitutes acceptance of the modified terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">10. Termination</h2>
                <p className="text-gray-200">
                  We may terminate or suspend your access to our services at any time, with or without cause 
                  or notice. Upon termination, your right to use our services will immediately cease.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law</h2>
                <p className="text-gray-200">
                  These terms shall be governed by and construed in accordance with the laws of the jurisdiction 
                  in which OverX AI operates, without regard to conflict of law principles.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">12. Contact Information</h2>
                <p className="text-gray-200">
                  For questions about these Terms of Service, please contact us at:
                </p>
                <p className="text-gray-200 mt-4">
                  Email: legal@overx.ai<br />
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

export default TermsPage