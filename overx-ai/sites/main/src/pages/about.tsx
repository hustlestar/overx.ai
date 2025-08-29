import React from 'react'
import { NextPage } from 'next'
import { EnhancedSEO } from '@overx-ai/shared'
import { GradientLink } from '@overx-ai/shared'

const AboutPage: NextPage = () => {
  return (
    <>
      <EnhancedSEO
        title="About OverX AI - Leading AI Automation & Custom Solutions"
        description="Learn about OverX AI's mission to revolutionize businesses with custom AI agents, automation tools, and consulting services. Trusted by companies worldwide."
        canonical="https://overx.ai/about"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-12 text-center">
              About OverX AI
            </h1>

            <section className="mb-16 bg-white/10 backdrop-blur-md rounded-2xl p-10">
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-200 text-lg mb-6">
                At OverX AI, we're on a mission to give businesses their time back. We believe that artificial 
                intelligence should work for you, not the other way around. By creating custom AI agents and 
                automation solutions, we help companies eliminate repetitive tasks, streamline operations, and 
                focus on what truly matters - growth and innovation.
              </p>
              <p className="text-gray-200 text-lg">
                We're not just another AI company. We're your partners in transformation, building solutions 
                that integrate seamlessly into your existing workflows and deliver measurable results from day one.
              </p>
            </section>

            <section className="mb-16 bg-white/10 backdrop-blur-md rounded-2xl p-10">
              <h2 className="text-3xl font-bold text-white mb-6">What We Do</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Custom AI Agents</h3>
                  <p className="text-gray-200">
                    We build intelligent agents tailored to your specific business needs. From customer service 
                    bots to data analysis assistants, our AI agents work 24/7 to enhance your operations.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Chrome Extensions</h3>
                  <p className="text-gray-200">
                    Our powerful browser extensions automate web-based tasks, from data extraction to form filling, 
                    saving hours of manual work every week.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Automation Solutions</h3>
                  <p className="text-gray-200">
                    We create end-to-end automation workflows that connect your tools, eliminate manual processes, 
                    and ensure data flows seamlessly across your organization.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">AI Consulting</h3>
                  <p className="text-gray-200">
                    Our expert consultants help you identify AI opportunities, develop implementation strategies, 
                    and ensure successful adoption across your teams.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-16 bg-white/10 backdrop-blur-md rounded-2xl p-10">
              <h2 className="text-3xl font-bold text-white mb-6">Our Values</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-4"></div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Innovation First</h3>
                    <p className="text-gray-200">
                      We stay at the forefront of AI technology, constantly exploring new ways to solve problems 
                      and deliver value to our clients.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-4"></div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Results-Driven</h3>
                    <p className="text-gray-200">
                      Every solution we build is measured by its impact. We focus on delivering tangible ROI 
                      and measurable improvements to your business.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-4"></div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Transparency</h3>
                    <p className="text-gray-200">
                      We believe in clear communication, honest pricing, and keeping you informed every step 
                      of the way. No black boxes, no surprises.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-4"></div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Human-Centered</h3>
                    <p className="text-gray-200">
                      AI should augment human capabilities, not replace them. We design solutions that empower 
                      your team and enhance their productivity.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-16 bg-white/10 backdrop-blur-md rounded-2xl p-10">
              <h2 className="text-3xl font-bold text-white mb-6">Why Choose OverX AI</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">10+</div>
                  <p className="text-gray-200">Hours saved per week per client</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">500+</div>
                  <p className="text-gray-200">Custom solutions deployed</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">98%</div>
                  <p className="text-gray-200">Client satisfaction rate</p>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Business?</h2>
              <p className="text-white text-lg mb-8">
                Let's discuss how AI can give you back your time and accelerate your growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GradientLink 
                  href="/consultancy" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Book a Consultation
                </GradientLink>
                <GradientLink 
                  href="/products" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                >
                  Explore Solutions
                </GradientLink>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage