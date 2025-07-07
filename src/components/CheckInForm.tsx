import React, { useState } from 'react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

interface CheckInFormProps {
  onSubmit: (data: any) => void
  onBack: () => void
}

const questions = [
  {
    id: 'mood',
    question: 'How would you describe your overall mood this month?',
    type: 'scale',
    scale: { min: 1, max: 10, labels: ['Very Low', 'Excellent'] }
  },
  {
    id: 'stress',
    question: 'How have you been managing stress lately?',
    type: 'scale',
    scale: { min: 1, max: 10, labels: ['Very Poorly', 'Very Well'] }
  },
  {
    id: 'sleep',
    question: 'How satisfied are you with your sleep quality?',
    type: 'scale',
    scale: { min: 1, max: 10, labels: ['Very Dissatisfied', 'Very Satisfied'] }
  },
  {
    id: 'relationships',
    question: 'How connected do you feel to the people in your life?',
    type: 'scale',
    scale: { min: 1, max: 10, labels: ['Very Disconnected', 'Very Connected'] }
  },
  {
    id: 'purpose',
    question: 'How meaningful and purposeful has your life felt recently?',
    type: 'scale',
    scale: { min: 1, max: 10, labels: ['Not Meaningful', 'Very Meaningful'] }
  },
  {
    id: 'selfCare',
    question: 'How well have you been taking care of yourself?',
    type: 'scale',
    scale: { min: 1, max: 10, labels: ['Very Poorly', 'Very Well'] }
  },
  {
    id: 'gratitude',
    question: 'What are three things you\'re grateful for this month?',
    type: 'textarea',
    placeholder: 'Take a moment to reflect on the positive aspects of your life...'
  },
  {
    id: 'challenges',
    question: 'What has been your biggest challenge this month, and how did you handle it?',
    type: 'textarea',
    placeholder: 'Reflecting on challenges helps us grow and learn...'
  },
  {
    id: 'growth',
    question: 'What is one thing you learned about yourself this month?',
    type: 'textarea',
    placeholder: 'Self-discovery is a continuous journey...'
  },
  {
    id: 'goals',
    question: 'What would you like to focus on improving next month?',
    type: 'textarea',
    placeholder: 'Setting intentions helps guide our actions...'
  }
]

export default function CheckInForm({ onSubmit, onBack }: CheckInFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Calculate overall wellbeing score
    const scaleQuestions = questions.filter(q => q.type === 'scale')
    const scaleAnswers = scaleQuestions.map(q => answers[q.id] || 5)
    const overallWellbeing = scaleAnswers.reduce((sum, score) => sum + score, 0) / scaleAnswers.length

    const checkInData = {
      ...answers,
      overallWellbeing,
      completedAt: new Date().toISOString()
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onSubmit(checkInData)
    setIsSubmitting(false)
  }

  const currentQ = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1
  const currentAnswer = answers[currentQ.id]
  const canProceed = currentAnswer !== undefined && currentAnswer !== ''

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-slate-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 mb-8">
        <h2 className="text-2xl font-light text-slate-800 mb-8 leading-relaxed">
          {currentQ.question}
        </h2>

        {currentQ.type === 'scale' && (
          <div className="space-y-6">
            <div className="flex justify-between text-sm text-slate-600 mb-4">
              <span>{currentQ.scale?.labels[0]}</span>
              <span>{currentQ.scale?.labels[1]}</span>
            </div>
            
            <div className="flex justify-between items-center">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                <button
                  key={value}
                  onClick={() => handleAnswer(currentQ.id, value)}
                  className={`w-12 h-12 rounded-full border-2 font-medium transition-all ${
                    currentAnswer === value
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-110'
                      : 'border-slate-300 text-slate-600 hover:border-blue-400 hover:text-blue-600'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
            
            <div className="text-center">
              {currentAnswer && (
                <p className="text-sm text-slate-600 mt-4">
                  You selected: <span className="font-medium">{currentAnswer}</span>
                </p>
              )}
            </div>
          </div>
        )}

        {currentQ.type === 'textarea' && (
          <textarea
            value={currentAnswer || ''}
            onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
            placeholder={currentQ.placeholder}
            rows={6}
            className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-700 leading-relaxed"
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors ${
            currentQuestion === 0
              ? 'text-slate-400 cursor-not-allowed'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>

        {isLastQuestion ? (
          <button
            onClick={handleSubmit}
            disabled={!canProceed || isSubmitting}
            className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-medium transition-colors ${
              canProceed && !isSubmitting
                ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                <span>Complete Check-in</span>
              </>
            )}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors ${
              canProceed
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>Next</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
