'use client'

import { Transport } from '@/types'
import { formatDuration, formatPrice, getCityById } from '@/lib/data'
import { MODE_CONFIG } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface TripBuilderProps {
  segments: Transport[]
  onRemove: (id: string) => void
  onClear: () => void
}

export default function TripBuilder({ segments, onRemove, onClear }: TripBuilderProps) {
  const router = useRouter()
  const totalCost = segments.reduce((sum, s) => sum + s.cost, 0)
  const totalDuration = segments.reduce((sum, s) => sum + s.duration_minutes, 0)
  const totalCo2 = segments.reduce((sum, s) => sum + s.co2_kg, 0)
  const taxes = Math.round(totalCost * 0.05)

  const handleCheckout = () => {
    const ids = segments.map(s => s.id).join(',')
    router.push(`/checkout?segments=${ids}`)
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden sticky top-24">
      {/* Header */}
      <div className="bg-slate-50 px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-slate-900">Trip Builder</h2>
          <p className="text-xs text-slate-500 mt-0.5">{segments.length} segment{segments.length !== 1 ? 's' : ''} added</p>
        </div>
        {segments.length > 0 && (
          <span className="badge bg-primary/10 text-primary">Active</span>
        )}
      </div>

      <div className="p-4">
        {segments.length === 0 ? (
          <div className="py-10 text-center">
            <div className="text-4xl mb-3">🗺️</div>
            <p className="text-sm font-semibold text-slate-600">No segments yet</p>
            <p className="text-xs text-slate-400 mt-1">Select a route to build your trip</p>
          </div>
        ) : (
          <>
            {/* Timeline */}
            <div className="flex flex-col gap-0 mb-4">
              {segments.map((seg, i) => {
                const from = getCityById(seg.from_city_id)
                const to = getCityById(seg.to_city_id)
                const config = MODE_CONFIG[seg.mode]
                return (
                  <div key={seg.id} className="relative pl-7 pb-4">
                    <div className="absolute left-[7px] top-0 w-3 h-3 rounded-full bg-primary ring-4 ring-primary/10" />
                    {i < segments.length - 1 && (
                      <div className="absolute left-[12px] top-3 bottom-0 w-0.5 bg-primary/20" />
                    )}
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {seg.depart_time} → {seg.arrive_time}
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          {from?.name} → {to?.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {config.icon} {seg.operator} · {formatDuration(seg.duration_minutes)}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemove(seg.id)}
                        className="text-slate-300 hover:text-red-400 transition-colors ml-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )
              })}
              {/* Add more placeholder */}
              <div className="relative pl-7">
                <div className="absolute left-[7px] top-0 w-3 h-3 rounded-full border-2 border-slate-200 bg-white" />
                <button className="w-full py-2.5 border-2 border-dashed border-slate-200 rounded-lg text-xs font-bold text-slate-400 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1">
                  + Add another segment
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-2 mb-4">
              <div className="flex-1 bg-slate-50 rounded-lg p-2 text-center">
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Duration</p>
                <p className="text-sm font-bold">{formatDuration(totalDuration)}</p>
              </div>
              <div className="flex-1 bg-slate-50 rounded-lg p-2 text-center">
                <p className="text-[10px] text-slate-400 font-semibold uppercase">CO₂</p>
                <p className="text-sm font-bold text-green-600">{totalCo2}kg</p>
              </div>
            </div>

            {/* Totals */}
            <div className="border-t border-slate-100 pt-3 space-y-1.5 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Transport subtotal</span>
                <span className="font-semibold">{formatPrice(totalCost)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Taxes & fees (5%)</span>
                <span className="font-semibold">{formatPrice(taxes)}</span>
              </div>
              <div className="flex justify-between items-center mt-2 p-3 bg-primary/5 rounded-xl">
                <span className="font-bold">Total</span>
                <span className="text-xl font-black text-primary">{formatPrice(totalCost + taxes)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="btn-primary w-full mb-2"
            >
              Confirm & Book Trip
            </button>
            <button
              onClick={onClear}
              className="w-full text-xs text-slate-400 hover:text-red-400 transition-colors py-1 flex items-center justify-center gap-1"
            >
              🗑 Clear all segments
            </button>
          </>
        )}
      </div>
    </div>
  )
}
