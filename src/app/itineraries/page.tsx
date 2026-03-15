'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { createClient } from '@/lib/supabase/client'
import { Itinerary } from '@/types'
import { formatPrice, formatDuration } from '@/lib/data'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const STATUS_CONFIG = {
  draft: { label: 'Draft', color: 'bg-slate-100 text-slate-600' },
  saved: { label: 'Saved', color: 'bg-amber-100 text-amber-700' },
  booked: { label: 'Booked', color: 'bg-blue-100 text-blue-700' },
  confirmed: { label: 'Confirmed', color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700' },
}

// Mock itineraries for demo purposes (shown when not signed in)
const DEMO_ITINERARIES: Itinerary[] = [
  {
    id: '1',
    user_id: 'demo',
    title: 'Pink City Getaway',
    from_city: 'Delhi',
    to_city: 'Jaipur',
    travel_date: '2024-11-15',
    total_cost: 1510,
    total_duration_minutes: 270,
    status: 'confirmed',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    user_id: 'demo',
    title: 'Weekend in Mumbai',
    from_city: 'Delhi',
    to_city: 'Mumbai',
    travel_date: '2024-12-08',
    total_cost: 9198,
    total_duration_minutes: 135,
    status: 'saved',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    user_id: 'demo',
    title: 'Gujarat Heritage Tour',
    from_city: 'Mumbai',
    to_city: 'Ahmedabad',
    travel_date: '2024-10-20',
    total_cost: 4100,
    total_duration_minutes: 405,
    status: 'confirmed',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

const EMOJIS: Record<string, string> = {
  Delhi: '🏛️', Mumbai: '🌊', Jaipur: '🏰', Patna: '🕌',
  Ahmedabad: '🏗️', Pune: '🎓', Udaipur: '⛵', Nagpur: '🌳',
}

type Tab = 'upcoming' | 'past' | 'shared'

export default function ItinerariesPage() {
  const [itineraries, setItineraries] = useState<Itinerary[]>(DEMO_ITINERARIES)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('upcoming')
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

      const { data } = await supabase
        .from('itineraries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (data && data.length > 0) setItineraries(data)
      setLoading(false)
    }
    load()
  }, [supabase])

  const now = new Date()
  const upcoming = itineraries.filter(i => new Date(i.travel_date) >= now)
  const past = itineraries.filter(i => new Date(i.travel_date) < now)
  const displayed = activeTab === 'upcoming' ? upcoming : activeTab === 'past' ? past : []

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col w-56 shrink-0 gap-4">
            <nav className="flex flex-col gap-1">
              {[
                { href: '/', icon: '🏠', label: 'Home' },
                { href: '/itineraries', icon: '🗺️', label: 'My Trips', active: true },
                { href: '/search', icon: '🔍', label: 'Search Routes' },
              ].map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all',
                    item.active
                      ? 'bg-primary/10 text-primary'
                      : 'text-slate-600 hover:bg-slate-100'
                  )}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <p className="text-xs font-bold text-primary uppercase mb-2">💡 Pro Tip</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Combine a train + taxi for the best value on routes like Delhi → Jaipur.
              </p>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900">My Itineraries</h1>
                <p className="text-slate-500 mt-1 text-sm">Manage your travel adventures</p>
              </div>
              <Link href="/search" className="btn-primary text-sm py-2.5 px-5">
                + Plan New Trip
              </Link>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Total Trips', value: itineraries.length, icon: '✈️', color: 'text-primary' },
                { label: 'Confirmed', value: itineraries.filter(i => i.status === 'confirmed').length, icon: '✅', color: 'text-green-600' },
                { label: 'Total Spent', value: formatPrice(itineraries.reduce((s, i) => s + i.total_cost, 0)), icon: '💰', color: 'text-amber-600' },
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-xl border border-slate-100 p-4 text-center shadow-card">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className={`text-lg font-black ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-slate-400 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6">
              {([
                { key: 'upcoming', label: `Upcoming (${upcoming.length})` },
                { key: 'past', label: `Past (${past.length})` },
                { key: 'shared', label: 'Shared With Me' },
              ] as { key: Tab; label: string }[]).map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    'flex-1 py-2.5 rounded-lg text-sm font-bold transition-all',
                    activeTab === tab.key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Trips */}
            {loading ? (
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-36 bg-white rounded-2xl border border-slate-100 animate-pulse" />
                ))}
              </div>
            ) : displayed.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                <div className="text-5xl mb-4">🗺️</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">No trips here yet</h3>
                <p className="text-slate-500 mb-6">Start planning your next Indian adventure</p>
                <Link href="/search" className="btn-primary inline-flex">
                  Search Routes
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {displayed.map(trip => {
                  const statusCfg = STATUS_CONFIG[trip.status]
                  const emoji = EMOJIS[trip.to_city] || '🗺️'
                  const isPast = new Date(trip.travel_date) < now

                  return (
                    <div
                      key={trip.id}
                      className={cn(
                        'bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden hover:shadow-card-hover transition-all',
                        isPast && 'opacity-75'
                      )}
                    >
                      <div className="flex flex-col sm:flex-row">
                        {/* Emoji Tile */}
                        <div className="w-full sm:w-24 h-20 sm:h-auto bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-4xl shrink-0">
                          {emoji}
                        </div>

                        <div className="flex-1 p-5">
                          <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className={cn('badge', statusCfg.color)}>{statusCfg.label}</span>
                                {isPast && <span className="badge bg-slate-100 text-slate-500">Past</span>}
                              </div>
                              <h3 className="font-black text-slate-900 text-lg">{trip.title}</h3>
                              <p className="text-sm text-slate-500 font-semibold">
                                {trip.from_city} → {trip.to_city}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-2xl font-black text-primary">{formatPrice(trip.total_cost)}</p>
                              <p className="text-xs text-slate-400">total cost</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 flex-wrap text-sm text-slate-500 mb-4">
                            <span className="flex items-center gap-1">
                              📅 {new Date(trip.travel_date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                            </span>
                            <span className="flex items-center gap-1">
                              ⏱️ {formatDuration(trip.total_duration_minutes)}
                            </span>
                          </div>

                          <div className="flex items-center justify-end gap-2">
                            <button className="px-4 py-2 rounded-lg text-slate-500 hover:bg-slate-50 text-sm font-bold transition-colors flex items-center gap-1">
                              🗑 Delete
                            </button>
                            {isPast ? (
                              <Link href="/search" className="px-5 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold hover:bg-primary/10 hover:text-primary transition-colors">
                                🔁 Re-book
                              </Link>
                            ) : (
                              <Link href={`/checkout?itinerary=${trip.id}`} className="btn-primary text-sm py-2 px-5">
                                ✏️ View & Book
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}

                {/* Load More */}
                <div className="text-center pt-4">
                  <button className="px-6 py-3 border-2 border-slate-200 rounded-full text-sm font-bold text-slate-500 hover:border-primary hover:text-primary transition-all">
                    Load More ↓
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
