import React, { useState } from 'react'
import { ArrowLeft, Mail, Check, BookOpen, Heart, Brain } from 'lucide-react'

interface NewsletterProps {
  onBack: () => void
}

export default function Newsletter({ onBack }: NewsletterProps) {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(() => {
    return localStorage.getItem('clarity-newsletter-subscribed') === 'true'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    localStorage.setItem('clarity-newsletter-subscribed', 'true')
    localStorage.setItem('clarity-newsletter-email', email)
    setIsSubscribed(true)
    setIsSubmitting(false)
  }

  const resources = [
    {
      title: "Understanding Emotional Patterns",
      description: "Learn to recognize and work with your emotional cycles for better mental health.",
      category: "Psychology",
      readTime: "5 min read",
      icon: Brain
    },
    {
      title: "The Science of Gratitude",
      description: "Research-backed benefits of gratitude practice and how to implement it daily.",
      category: "Wellness",
      readTime: "7 min read",
      icon: Heart
    },
    {
      title: "Mindful Self-Reflection Techniques",
      description: "Practical methods for deeper self-awareness and personal growth.",
      category: "Mindfulness",
      readTime: "6 min read",
      icon: BookOpen
    },
    {
      title: "Building Emotional Resilience",
      description: "Strategies to bounce back from challenges and maintain mental wellness.",
      category: "Psychology",
      readTime: "8 min read",
      icon: Brain
    },
    {
      title: "The Power of Monthly Check-ins",
      description: "Why regular self-assessment is crucial for long-term mental health.",
      category: "Wellness",
      readTime: "4 min read",
      icon: Heart
    },
    {
      title: "Creating Healthy Boundaries",
      description: "Learn to protect your mental energy and maintain healthy relationships.",
      category: "Relationships",
      readTime: "6 min read",
      icon: BookOpen
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>
        
        <h1 className="text-3xl font-light text-slate-800 mb-2">Wellness Resources</h1>
        <p className="text-slate-600">
          Monthly insights and evidence-based articles to support your mental wellness journey
        </p>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-12">
        <div className="max-w-2xl">
          <div className="flex items-center space-x-3 mb-4">
            <Mail className="h-8 w-8" />
            <h2 className="text-2xl font-medium">Monthly Wellness Newsletter</h2>
          </div>
          
          {isSubscribed ? (
            <div className="flex items-center space-x-3">
              <Check className="h-6 w-6 text-green-300" />
              <div>
                <p className="text-lg font-medium">You're subscribed!</p>
                <p className="text-blue-100">Thank you for joining our wellness community.</p>
              </div>
            </div>
          ) : (
            <>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Get curated mental health resources, research insights, and practical tips 
                delivered to your inbox each month. No spam, just valuable content to support your journey.
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl text-slate-800 placeholder-slate-500 focus:ring-2 focus:ring-white focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-white text-blue-600 px-8 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Featured Resources */}
      <div className="mb-8">
        <h2 className="text-2xl font-light text-slate-800 mb-6">Featured Articles</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {resources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-xl">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        {resource.category}
                      </span>
                      <span className="text-xs text-slate-500">{resource.readTime}</span>
                    </div>
                    <h3 className="font-medium text-slate-800 mb-2">{resource.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{resource.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
        <h2 className="text-xl font-medium text-slate-800 mb-6">What You'll Get</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-medium text-slate-800 mb-2">Evidence-Based Content</h3>
            <p className="text-sm text-slate-600">
              Articles backed by psychological research and clinical studies
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-medium text-slate-800 mb-2">Practical Tools</h3>
            <p className="text-sm text-slate-600">
              Actionable techniques you can implement in your daily life
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-pink-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-pink-600" />
            </div>
            <h3 className="font-medium text-slate-800 mb-2">Community Support</h3>
            <p className="text-sm text-slate-600">
              Join a community focused on mental wellness and growth
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
