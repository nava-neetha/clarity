import React, { useState, useEffect } from 'react'
import { ArrowLeft, Plus, Calendar, Heart } from 'lucide-react'

interface JournalProps {
  onBack: () => void
}

interface JournalEntry {
  id: number
  date: string
  title: string
  content: string
  mood: number
}

export default function Journal({ onBack }: JournalProps) {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('clarity-journal')
    return saved ? JSON.parse(saved) : []
  })
  const [showForm, setShowForm] = useState(false)
  const [newEntry, setNewEntry] = useState({ title: '', content: '', mood: 5 })

  useEffect(() => {
    localStorage.setItem('clarity-journal', JSON.stringify(entries))
  }, [entries])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEntry.title.trim() || !newEntry.content.trim()) return

    const entry: JournalEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      title: newEntry.title,
      content: newEntry.content,
      mood: newEntry.mood
    }

    setEntries([entry, ...entries])
    setNewEntry({ title: '', content: '', mood: 5 })
    setShowForm(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getMoodColor = (mood: number) => {
    if (mood <= 3) return 'text-red-500'
    if (mood <= 6) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getMoodEmoji = (mood: number) => {
    if (mood <= 2) return '😢'
    if (mood <= 4) return '😕'
    if (mood <= 6) return '😐'
    if (mood <= 8) return '😊'
    return '😄'
  }

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
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light text-slate-800 mb-2">Personal Journal</h1>
            <p className="text-slate-600">
              A private space for your thoughts and reflections
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg"
          >
            <Plus className="h-4 w-4" />
            <span>New Entry</span>
          </button>
        </div>
      </div>

      {/* New Entry Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 mb-8">
          <h2 className="text-xl font-medium text-slate-800 mb-6">New Journal Entry</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={newEntry.title}
                onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                placeholder="What's on your mind today?"
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                How are you feeling? ({newEntry.mood}/10)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newEntry.mood}
                  onChange={(e) => setNewEntry({ ...newEntry, mood: parseInt(e.target.value) })}
                  className="flex-1"
                />
                <span className="text-2xl">{getMoodEmoji(newEntry.mood)}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Your thoughts
              </label>
              <textarea
                value={newEntry.content}
                onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                placeholder="Write about your day, your feelings, your dreams..."
                rows={8}
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Save Entry
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-medium hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Journal Entries */}
      {entries.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-light text-slate-800 mb-4">Your journal is empty</h2>
          <p className="text-slate-600 mb-8">Start writing to capture your thoughts and feelings.</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            Write Your First Entry
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {entries.map((entry) => (
            <div key={entry.id} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-medium text-slate-800 mb-2">{entry.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-slate-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(entry.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>Mood:</span>
                      <span className={getMoodColor(entry.mood)}>{entry.mood}/10</span>
                      <span>{getMoodEmoji(entry.mood)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{entry.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
