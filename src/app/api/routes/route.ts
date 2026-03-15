import { NextRequest, NextResponse } from 'next/server'
import { searchRoutes, formatDuration } from '@/lib/data'
import { Transport } from '@/types'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const sort = searchParams.get('sort') || 'fastest'
  const mode = searchParams.get('mode')

  if (!from || !to) {
    return NextResponse.json({ error: 'from and to are required' }, { status: 400 })
  }

  let results: Transport[] = searchRoutes(from, to)

  if (mode && mode !== 'all') {
    results = results.filter(r => r.mode === mode)
  }

  const sorted = [...results].sort((a, b) => {
    if (sort === 'cheapest') return a.cost - b.cost
    if (sort === 'eco') return a.co2_kg - b.co2_kg
    return a.duration_minutes - b.duration_minutes
  })

  const withBadges = sorted.map((r, i) => ({
    ...r,
    duration_label: formatDuration(r.duration_minutes),
    badge: i === 0 ? (sort === 'fastest' ? 'Fastest' : sort === 'cheapest' ? 'Cheapest' : 'Eco Pick') : null,
  }))

  return NextResponse.json({ routes: withBadges, count: withBadges.length })
}
