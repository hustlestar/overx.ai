import React from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { EnhancedSEO } from '@overx-ai/shared'
import { GradientLink } from '@overx-ai/shared'

const AboutPage: NextPage = () => {
  const { t } = useTranslation(['common', 'about'])

  return (
    <>
      <EnhancedSEO
        title="About World Word War Bot - AI Language Learning Revolution"
        description="Learn how World Word War Bot is revolutionizing language learning with AI. Our mission to make language learning accessible, effective, and enjoyable for everyone worldwide."
        canonical="https://words.overx.ai/about"
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
              About World Word War Bot
            </h1>

            <div className="prose prose-lg prose-invert max-w-none">
              <section className="mb-12 bg-white/10 backdrop-blur-md rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-gray-200 mb-4">
                  World Word War Bot is on a mission to democratize language learning through AI-powered technology. 
                  We believe that everyone should have access to personalized, effective language education regardless 
                  of their location, budget, or schedule.
                </p>
                <p className="text-gray-200">
                  By leveraging the power of artificial intelligence and the convenience of Telegram messaging, 
                  we've created a learning companion that adapts to your pace, remembers your progress, and 
                  delivers bite-sized lessons exactly when you need them.
                </p>
              </section>

              <section className="mb-12 bg-white/10 backdrop-blur-md rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
                <p className="text-gray-200 mb-4">
                  Founded in 2023, World Word War Bot emerged from a simple observation: traditional language 
                  learning apps require dedicated time and attention that busy people struggle to find. We asked 
                  ourselves - what if learning could happen in the moments between moments?
                </p>
                <p className="text-gray-200 mb-4">
                  That's when we turned to Telegram - a platform people already use daily. By integrating language 
                  learning into your existing messaging habits, we eliminated the friction that causes most learners 
                  to give up.
                </p>
                <p className="text-gray-200">
                  Today, we serve over 50,000 active learners across 100+ countries, helping them master vocabulary 
                  in 13 languages through intelligent spaced repetition and contextual learning.
                </p>
              </section>

              <section className="mb-12 bg-white/10 backdrop-blur-md rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Our Approach</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Personalization</h3>
                    <p className="text-gray-200">
                      Every learner is unique. Our AI analyzes your learning patterns, strengths, and areas for 
                      improvement to create a personalized curriculum that evolves with you.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Science-Based Methodology</h3>
                    <p className="text-gray-200">
                      We use proven techniques like spaced repetition, contextual learning, and active recall to 
                      ensure information moves from short-term to long-term memory effectively.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Seamless Integration</h3>
                    <p className="text-gray-200">
                      Learning happens in your messaging app - no need to switch contexts or remember to open 
                      another application. Education comes to you, not the other way around.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12 bg-white/10 backdrop-blur-md rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Our Values</h2>
                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span><strong>Accessibility:</strong> Language learning should be available to everyone, everywhere</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span><strong>Effectiveness:</strong> Every minute spent learning should count</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span><strong>Simplicity:</strong> Complex technology, simple experience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span><strong>Privacy:</strong> Your learning data stays yours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span><strong>Continuous Improvement:</strong> We evolve based on user feedback and learning science</span>
                  </li>
                </ul>
              </section>

              <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Join Our Global Learning Community</h2>
                <p className="text-white mb-6">
                  Start your language learning journey today with World Word War Bot
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://t.me/VocabularyLearningBot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Start Learning Free
                  </a>
                  <GradientLink href="/" className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                    Learn More
                  </GradientLink>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
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