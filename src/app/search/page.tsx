'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SearchForm from '@/components/search/SearchForm'
import RouteCard from '@/components/search/RouteCard'
import TripBuilder from '@/components/itinerary/TripBuilder'
import { CITIES, searchRoutes, formatPrice, getCityById } from '@/lib/data'
import { Transport } from '@/types'
import { cn } from '@/lib/utils'

type SortMode = 'fastest' | 'cheapest' | 'eco'

export default function SearchPage() {
  const params = useSearchParams()
  const fromId = params.get('from') || ''
  const toId = params.get('to') || ''
  const date = params.get('date') || ''

  const fromCity = getCityById(fromId)
  const toCity = getCityById(toId)

  const [sortMode, setSortMode] = useState<SortMode>('fastest')
  const [modeFilter, setModeFilter] = useState<string>('all')
  const [selectedSegments, setSelectedSegments] = useState<Transport[]>([])
  const [routes, setRoutes] = useState<Transport[]>([])

  useEffect(() => {
    if (fromId && toId) {
      const results = searchRoutes(fromId, toId)
      setRoutes(results)
    }
  }, [fromId, toId])

  const sortedRoutes = [...routes]
    .filter(r => modeFilter === 'all' || r.mode === modeFilter)
    .sort((a, b) => {
      if (sortMode === 'fastest') return a.duration_minutes - b.duration_minutes
      if (sortMode === 'cheapest') return a.cost - b.cost
      return a.co2_kg - b.co2_kg
    })

  const getBadge = (t: Transport): string | undefined => {
    if (routes.length === 0) return undefined
    const fastest = [...routes].sort((a, b) => a.duration_minutes - b.duration_minutes)[0]
    const cheapest = [...routes].sort((a, b) => a.cost - b.cost)[0]
    const greenest = [...routes].sort((a, b) => a.co2_kg - b.co2_kg)[0]
    if (t.id === fastest.id) return '⚡ Fastest'
    if (t.id === cheapest.id) return '💰 Cheapest'
    if (t.id === greenest.id) return '🌿 Eco Pick'
    return undefined
  }

  const handleSelect = (t: Transport) => {
    setSelectedSegments(prev => {
      const exists = prev.find(s => s.id === t.id)
      if (exists) return prev.filter(s => s.id !== t.id)
      return [...prev, t]
    })
  }

  const modeFilters = [
    { value: 'all', label: '🔀 All Modes' },
    { value: 'flight', label: '✈️ Flights' },
    { value: 'train', label: '🚆 Trains' },
    { value: 'bus', label: '🚌 Buses' },
    { value: 'taxi', label: '🚕 Taxi' },
  ]

  const hasSearch = fromId && toId

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-bg-light">
        {/* Search Bar */}
        <div className="bg-white border-b border-slate-100 px-4 py-4">
          <div className="max-w-7xl mx-auto">
            <SearchForm
              compact
              defaultFrom={fromCity?.name}
              defaultTo={toCity?.name}
              defaultDate={date}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
          {/* Left: Results */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-5">
              {hasSearch ? (
                <>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <span>Search Results</span>
                    <span>›</span>
                    <span className="text-slate-700 font-semibold">
                      {fromCity?.name || fromId} → {toCity?.name || toId}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <h1 className="text-xl font-black text-slate-900">
                      {fromCity?.name} to {toCity?.name}
                    </h1>
                    {date && <span className="text-sm text-slate-500">{new Date(date).toLocaleDateString('en-IN', { dateStyle: 'long' })}</span>}
                  </div>
                </>
              ) : (
                <h1 className="text-xl font-black text-slate-900">Search for Routes</h1>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-5">
              {/* Sort */}
              {(['fastest', 'cheapest', 'eco'] as SortMode[]).map(s => (
                <button
                  key={s}
                  onClick={() => setSortMode(s)}
                  className={cn(
                    'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all',
                    sortMode === s
                      ? 'bg-primary text-white shadow-primary'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
                  )}
                >
                  {s === 'fastest' && '⚡'}
                  {s === 'cheapest' && '💰'}
                  {s === 'eco' && '🌿'}
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
              <div className="w-px bg-slate-200 mx-1" />
              {/* Mode filters */}
              {modeFilters.map(f => (
                <button
                  key={f.value}
                  onClick={() => setModeFilter(f.value)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all',
                    modeFilter === f.value
                      ? 'bg-slate-900 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Results */}
            {!hasSearch ? (
              <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Search for a Route</h3>
                <p className="text-slate-500">Enter your origin and destination above to find routes</p>

                {/* Popular Routes */}
                <div className="mt-8">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Popular Routes</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {[
                      { from: 'del', to: 'jai', label: 'Delhi → Jaipur' },
                      { from: 'bom', to: 'pnq', label: 'Mumbai → Pune' },
                      { from: 'amd', to: 'bom', label: 'Ahmedabad → Mumbai' },
                      { from: 'del', to: 'pat', label: 'Delhi → Patna' },
                      { from: 'del', to: 'bom', label: 'Delhi → Mumbai' },
                      { from: 'jai', to: 'udp', label: 'Jaipur → Udaipur' },
                    ].map(r => (
                      <a
                        key={r.label}
                        href={`/search?from=${r.from}&to=${r.to}&date=${new Date().toISOString().split('T')[0]}`}
                        className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold hover:bg-primary hover:text-white transition-all"
                      >
                        {r.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : sortedRoutes.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                <div className="text-5xl mb-4">😕</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">No routes found</h3>
                <p className="text-slate-500">Try a different filter or another route combination</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
                  {sortedRoutes.length} route{sortedRoutes.length !== 1 ? 's' : ''} found
                </p>
                {sortedRoutes.map(t => (
                  <RouteCard
                    key={t.id}
                    transport={t}
                    fromName={fromCity?.name || fromId}
                    toName={toCity?.name || toId}
                    onSelect={handleSelect}
                    selected={!!selectedSegments.find(s => s.id === t.id)}
                    badge={getBadge(t)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Trip Builder */}
          <div className="w-full lg:w-80 shrink-0">
            <TripBuilder
              segments={selectedSegments}
              onRemove={id => setSelectedSegments(prev => prev.filter(s => s.id !== id))}
              onClear={() => setSelectedSegments([])}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
