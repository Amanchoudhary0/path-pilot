'use client'

import { Transport } from '@/types'
import { formatDuration, formatPrice } from '@/lib/data'
import { MODE_CONFIG, cn, getEcoLabel } from '@/lib/utils'

interface RouteCardProps {
  transport: Transport
  fromName: string
  toName: string
  onSelect: (t: Transport) => void
  selected?: boolean
  badge?: string
}

export default function RouteCard({ transport, fromName, toName, onSelect, selected, badge }: RouteCardProps) {
  const config = MODE_CONFIG[transport.mode]
  const eco = getEcoLabel(transport.co2_kg)

  return (
    <div
      onClick={() => onSelect(transport)}
      className={cn(
        'route-card',
        selected && 'border-primary ring-2 ring-primary/20'
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Mode + Operator */}
        <div className="flex items-center gap-3 min-w-0">
          <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0', config.bg)}>
            {config.icon}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-slate-900 text-sm truncate">{transport.operator}</h3>
              {badge && (
                <span className="badge bg-primary/10 text-primary">{badge}</span>
              )}
            </div>
            <p className={cn('text-xs font-semibold uppercase tracking-wide', config.color)}>
              {config.label}
              {transport.class && ` · ${transport.class}`}
            </p>
          </div>
        </div>

        {/* Middle: Route Timeline */}
        <div className="flex items-center gap-3 flex-1 justify-center min-w-0">
          <div className="text-center shrink-0">
            <p className="text-lg font-bold text-slate-900">{transport.depart_time}</p>
            <p className="text-xs text-slate-400 font-medium">{fromName}</p>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1 min-w-[80px]">
            <p className="text-xs font-semibold text-slate-500">{formatDuration(transport.duration_minutes)}</p>
            <div className="w-full flex items-center gap-1">
              <div className="w-2 h-2 rounded-full border-2 border-slate-300 shrink-0" />
              <div className="flex-1 border-t-2 border-dashed border-slate-200" />
              <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
            </div>
            <p className="text-[10px] text-slate-400">Direct</p>
          </div>
          <div className="text-center shrink-0">
            <p className="text-lg font-bold text-slate-900">{transport.arrive_time}</p>
            <p className="text-xs text-slate-400 font-medium">{toName}</p>
          </div>
        </div>

        {/* Right: Price + CO2 */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
          <div className="text-right">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Per person</p>
            <p className="text-2xl font-black text-primary">{formatPrice(transport.cost)}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className={cn('text-xs font-bold', eco.color)}>🌱 {transport.co2_kg}kg CO₂</p>
            <p className="text-[10px] text-slate-400">{transport.available_seats} seats left</p>
          </div>
          <button
            onClick={e => { e.stopPropagation(); onSelect(transport) }}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-bold transition-all',
              selected
                ? 'bg-primary text-white'
                : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
            )}
          >
            {selected ? '✓ Added' : '+ Select'}
          </button>
        </div>
      </div>
    </div>
  )
}
