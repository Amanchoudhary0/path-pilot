import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('itineraries')
    .select('*, itinerary_segments(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ itineraries: data })
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { title, from_city, to_city, travel_date, segments, total_cost, total_duration_minutes } = body

  // Create itinerary
  const { data: itinerary, error: itinError } = await supabase
    .from('itineraries')
    .insert({
      user_id: user.id,
      title,
      from_city,
      to_city,
      travel_date,
      total_cost,
      total_duration_minutes,
      status: 'saved',
    })
    .select()
    .single()

  if (itinError) return NextResponse.json({ error: itinError.message }, { status: 500 })

  // Insert segments
  if (segments && segments.length > 0) {
    const segRows = segments.map((s: { transport_id: string }, i: number) => ({
      itinerary_id: itinerary.id,
      transport_id: s.transport_id,
      order_index: i,
    }))
    const { error: segError } = await supabase.from('itinerary_segments').insert(segRows)
    if (segError) return NextResponse.json({ error: segError.message }, { status: 500 })
  }

  return NextResponse.json({ itinerary }, { status: 201 })
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  const { error } = await supabase
    .from('itineraries')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
