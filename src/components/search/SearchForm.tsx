'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CITIES } from '@/lib/data'
import { cn } from '@/lib/utils'

interface SearchFormProps {
  compact?: boolean
  defaultFrom?: string
  defaultTo?: string
  defaultDate?: string
}

export default function SearchForm({ compact, defaultFrom, defaultTo, defaultDate }: SearchFormProps) {
  const router = useRouter()
  const [from, setFrom] = useState(defaultFrom || '')
  const [to, setTo] = useState(defaultTo || '')
  const [date, setDate] = useState(defaultDate || '')
  const [passengers, setPassengers] = useState(1)
  const [fromOpen, setFromOpen] = useState(false)
  const [toOpen, setToOpen] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  const filteredFrom = CITIES.filter(c =>
    c.name.toLowerCase().includes(from.toLowerCase()) ||
    c.code.toLowerCase().includes(from.toLowerCase())
  ).slice(0, 8)

  const filteredTo = CITIES.filter(c =>
    c.name.toLowerCase().includes(to.toLowerCase()) ||
    c.code.toLowerCase().includes(to.toLowerCase())
  ).slice(0, 8)

  const handleSwap = () => {
    setFrom(to)
    setTo(from)
  }

  const handleSearch = () => {
    if (!from || !to) return
    const fromCity = CITIES.find(c => c.name.toLowerCase() === from.toLowerCase())
    const toCity = CITIES.find(c => c.name.toLowerCase() === to.toLowerCase())
    const params = new URLSearchParams({
      from: fromCity?.id || from.toLowerCase(),
      to: toCity?.id || to.toLowerCase(),
      date: date || today,
      passengers: passengers.toString(),
    })
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className={cn('bg-white rounded-2xl shadow-lg border border-slate-100', compact ? 'p-4' : 'p-6')}>
      {!compact && (
        <div className="flex gap-4 mb-5 border-b border-slate-100 pb-4">
          {['✈️ Multi-Modal', '✈️ Flights', '🚆 Trains', '🚌 Buses'].map((tab, i) => (
            <button
              key={tab}
              className={cn(
                'text-sm font-semibold pb-1',
                i === 0
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-slate-500 hover:text-slate-900'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      <div className={cn('grid gap-3', compact ? 'grid-cols-1 sm:grid-cols-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4')}>
        {/* From */}
        <div className="relative">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">From</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary text-sm">📍</span>
            <input
              value={from}
              onChange={e => { setFrom(e.target.value); setFromOpen(true) }}
              onFocus={() => setFromOpen(true)}
              onBlur={() => setTimeout(() => setFromOpen(false), 200)}
              placeholder="City or station"
              className="input pl-9"
            />
          </div>
          {fromOpen && from.length > 0 && filteredFrom.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-30 overflow-hidden">
              {filteredFrom.map(city => (
                <button
                  key={city.id}
                  onMouseDown={() => { setFrom(city.name); setFromOpen(false) }}
                  className="w-full px-3 py-2.5 text-left hover:bg-slate-50 flex items-center justify-between gap-2"
                >
                  <div>
                    <span className="text-sm font-semibold text-slate-900">{city.name}</span>
                    <span className="text-xs text-slate-400 ml-1.5">{city.code}</span>
                  </div>
                  <span className="text-xs text-slate-400">{city.state}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Swap + To */}
        <div className="relative">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">To</label>
          <div className="relative">
            <button
              onClick={handleSwap}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center text-xs shadow-sm hover:border-primary transition-colors hidden md:flex"
              title="Swap cities"
            >
              ⇄
            </button>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary text-sm">🗺️</span>
            <input
              value={to}
              onChange={e => { setTo(e.target.value); setToOpen(true) }}
              onFocus={() => setToOpen(true)}
              onBlur={() => setTimeout(() => setToOpen(false), 200)}
              placeholder="Where to?"
              className="input pl-9"
            />
          </div>
          {toOpen && to.length > 0 && filteredTo.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-30 overflow-hidden">
              {filteredTo.map(city => (
                <button
                  key={city.id}
                  onMouseDown={() => { setTo(city.name); setToOpen(false) }}
                  className="w-full px-3 py-2.5 text-left hover:bg-slate-50 flex items-center justify-between gap-2"
                >
                  <div>
                    <span className="text-sm font-semibold text-slate-900">{city.name}</span>
                    <span className="text-xs text-slate-400 ml-1.5">{city.code}</span>
                  </div>
                  <span className="text-xs text-slate-400">{city.state}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Date</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary text-sm">📅</span>
            <input
              type="date"
              value={date}
              min={today}
              onChange={e => setDate(e.target.value)}
              className="input pl-9"
            />
          </div>
        </div>

        {/* Search Button */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 opacity-0">Search</label>
          <button
            onClick={handleSearch}
            disabled={!from || !to}
            className="btn-primary w-full h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🔍 Search
          </button>
        </div>
      </div>
    </div>
  )
}
