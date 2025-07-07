import React, { useState, useEffect } from 'react'
import { Heart, Calendar, TrendingUp, BookOpen, Mail, Menu, X } from 'lucide-react'
import CheckInForm from './components/CheckInForm'
import Dashboard from './components/Dashboard'
import Journal from './components/Journal'
import Newsletter from './components/Newsletter'

type View = 'home' | 'checkin' | 'dashboard' | 'journal' | 'newsletter'

function App() {
  const [currentView, setCurrentView] = useState<View>('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [checkIns, setCheckIns] = useState(() => {
    const saved = localStorage.getItem('clarity-checkins')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('clarity-checkins', JSON.stringify(checkIns))
  }, [checkIns])

  const addCheckIn = (checkIn: any) => {
    setCheckIns([...checkIns, { ...checkIn, id: Date.now(), date: new Date().toISOString() }])
  }

  const navigation = [
    { name: 'Home', view: 'home' as View, icon: Heart },
    { name: 'Check-in', view: 'checkin' as View, icon: Calendar },
    { name: 'Progress', view: 'dashboard' as View, icon: TrendingUp },
    { name: 'Journal', view: 'journal' as View, icon: BookOpen },
    { name: 'Newsletter', view: 'newsletter' as View, icon: Mail },
  ]

  const renderContent = () => {
    switch (currentView) {
      case 'checkin':
        return <CheckInForm onSubmit={addCheckIn} onBack={() => setCurrentView('home')} />
      case 'dashboard':
        return <Dashboard checkIns={checkIns} onBack={() => setCurrentView('home')} />
      case 'journal':
        return <Journal onBack={() => setCurrentView('home')} />
      case 'newsletter':
        return <Newsletter onBack={() => setCurrentView('home')} />
      default:
        return <HomePage onNavigate={setCurrentView} checkIns={checkIns} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-light text-slate-800">Clarity</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.name}
                    onClick={() => setCurrentView(item.view)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentView === item.view
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </button>
                )
              })}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setCurrentView(item.view)
                      setMobileMenuOpen(false)
                    }}
                    className={`flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                      currentView === item.view
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {renderContent()}
      </main>
    </div>
  )
}

function HomePage({ onNavigate, checkIns }: { onNavigate: (view: View) => void, checkIns: any[] }) {
  const lastCheckIn = checkIns[checkIns.length - 1]
  const daysSinceLastCheckIn = lastCheckIn 
    ? Math.floor((Date.now() - new Date(lastCheckIn.date).getTime()) / (1000 * 60 * 60 * 24))
    : null

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-light text-slate-800 mb-6">
          Welcome to <span className="text-blue-600">Clarity</span>
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          A mindful space for monthly check-ins with yourself. Track your emotional journey, 
          reflect on your growth, and nurture your mental wellness.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('checkin')}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Start Monthly Check-in
          </button>
          {checkIns.length > 0 && (
            <button
              onClick={() => onNavigate('dashboard')}
              className="bg-white text-slate-700 px-8 py-4 rounded-xl font-medium hover:bg-slate-50 transition-colors border border-slate-200 shadow-lg hover:shadow-xl"
            >
              View Progress
            </button>
          )}
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="h-8 w-8 text-blue-600" />
            <h3 className="text-lg font-medium text-slate-800">Check-ins</h3>
          </div>
          <p className="text-3xl font-light text-slate-800 mb-2">{checkIns.length}</p>
          <p className="text-sm text-slate-600">
            {daysSinceLastCheckIn !== null 
              ? `Last check-in ${daysSinceLastCheckIn} days ago`
              : 'No check-ins yet'
            }
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <h3 className="text-lg font-medium text-slate-800">Growth</h3>
          </div>
          <p className="text-3xl font-light text-slate-800 mb-2">
            {checkIns.length > 1 ? 'Tracking' : 'Ready'}
          </p>
          <p className="text-sm text-slate-600">
            {checkIns.length > 1 
              ? 'Progress insights available'
              : 'Complete 2+ check-ins to see trends'
            }
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="h-8 w-8 text-pink-600" />
            <h3 className="text-lg font-medium text-slate-800">Wellness</h3>
          </div>
          <p className="text-3xl font-light text-slate-800 mb-2">
            {lastCheckIn ? Math.round(lastCheckIn.overallWellbeing) : '--'}
          </p>
          <p className="text-sm text-slate-600">
            {lastCheckIn ? 'Current wellness score' : 'Complete a check-in'}
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
          <img 
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop&crop=center"
            alt="Peaceful mountain landscape"
            className="w-full h-48 object-cover rounded-xl mb-6"
          />
          <h3 className="text-xl font-medium text-slate-800 mb-3">Mindful Reflection</h3>
          <p className="text-slate-600 leading-relaxed">
            Answer thoughtfully crafted questions designed by mental health professionals 
            to help you understand your emotional patterns and growth areas.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center"
            alt="Data visualization and charts"
            className="w-full h-48 object-cover rounded-xl mb-6"
          />
          <h3 className="text-xl font-medium text-slate-800 mb-3">Progress Tracking</h3>
          <p className="text-slate-600 leading-relaxed">
            Visualize your emotional journey over time with beautiful charts and insights 
            that help you celebrate progress and identify areas for growth.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-medium mb-4">Ready to begin your journey?</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Take a few minutes each month to check in with yourself. Your future self will thank you.
        </p>
        <button
          onClick={() => onNavigate('checkin')}
          className="bg-white text-blue-600 px-8 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors"
        >
          Start Your First Check-in
        </button>
      </div>
    </div>
  )
}

export default App
