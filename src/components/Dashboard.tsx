import React from 'react'
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface DashboardProps {
  checkIns: any[]
  onBack: () => void
}

export default function Dashboard({ checkIns, onBack }: DashboardProps) {
  if (checkIns.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>
        
        <div className="text-center py-16">
          <h2 className="text-2xl font-light text-slate-800 mb-4">No Check-ins Yet</h2>
          <p className="text-slate-600 mb-8">Complete your first check-in to see your progress here.</p>
        </div>
      </div>
    )
  }

  const latest = checkIns[checkIns.length - 1]
  const previous = checkIns.length > 1 ? checkIns[checkIns.length - 2] : null

  const metrics = [
    { key: 'mood', label: 'Mood', current: latest.mood, previous: previous?.mood },
    { key: 'stress', label: 'Stress Management', current: latest.stress, previous: previous?.stress },
    { key: 'sleep', label: 'Sleep Quality', current: latest.sleep, previous: previous?.sleep },
    { key: 'relationships', label: 'Relationships', current: latest.relationships, previous: previous?.relationships },
    { key: 'purpose', label: 'Sense of Purpose', current: latest.purpose, previous: previous?.purpose },
    { key: 'selfCare', label: 'Self Care', current: latest.selfCare, previous: previous?.selfCare },
  ]

  const getTrend = (current: number, previous: number | undefined) => {
    if (!previous) return 'neutral'
    if (current > previous) return 'up'
    if (current < previous) return 'down'
    return 'neutral'
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />
      default: return <Minus className="h-4 w-4 text-slate-400" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600'
      case 'down': return 'text-red-600'
      default: return 'text-slate-400'
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>
        
        <h1 className="text-3xl font-light text-slate-800 mb-2">Your Progress</h1>
        <p className="text-slate-600">
          Tracking your wellness journey across {checkIns.length} check-in{checkIns.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Overall Wellness Score */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 mb-8">
        <h2 className="text-xl font-medium text-slate-800 mb-6">Overall Wellness Score</h2>
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#e2e8f0"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#3b82f6"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(latest.overallWellbeing / 10) * 314} 314`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-light text-slate-800">
                {latest.overallWellbeing.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        <p className="text-center text-slate-600 mt-4">
          {previous && (
            <span className={getTrendColor(getTrend(latest.overallWellbeing, previous.overallWellbeing))}>
              {latest.overallWellbeing > previous.overallWellbeing ? '+' : ''}
              {(latest.overallWellbeing - previous.overallWellbeing).toFixed(1)} from last month
            </span>
          )}
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric) => {
          const trend = getTrend(metric.current, metric.previous)
          return (
            <div key={metric.key} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-slate-800">{metric.label}</h3>
                {getTrendIcon(trend)}
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-light text-slate-800">{metric.current}</span>
                <span className="text-sm text-slate-500">/10</span>
              </div>
              {metric.previous && (
                <p className={`text-sm mt-2 ${getTrendColor(trend)}`}>
                  {metric.current > metric.previous ? '+' : ''}
                  {metric.current - metric.previous} from last check-in
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* Recent Reflections */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
        <h2 className="text-xl font-medium text-slate-800 mb-6">Recent Reflections</h2>
        <div className="space-y-6">
          {latest.gratitude && (
            <div>
              <h3 className="font-medium text-slate-700 mb-2">Gratitude</h3>
              <p className="text-slate-600 leading-relaxed">{latest.gratitude}</p>
            </div>
          )}
          {latest.growth && (
            <div>
              <h3 className="font-medium text-slate-700 mb-2">Personal Growth</h3>
              <p className="text-slate-600 leading-relaxed">{latest.growth}</p>
            </div>
          )}
          {latest.goals && (
            <div>
              <h3 className="font-medium text-slate-700 mb-2">Next Month's Focus</h3>
              <p className="text-slate-600 leading-relaxed">{latest.goals}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
