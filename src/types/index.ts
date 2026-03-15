export type TransportMode = 'flight' | 'train' | 'bus' | 'taxi'

export interface City {
  id: string
  name: string
  code: string
  state: string
  latitude: number
  longitude: number
  image?: string
  popular?: boolean
}

export interface Transport {
  id: string
  mode: TransportMode
  from_city_id: string
  to_city_id: string
  from_city?: City
  to_city?: City
  operator: string
  depart_time: string
  arrive_time: string
  duration_minutes: number
  cost: number
  co2_kg: number
  available_seats: number
  class?: string
}

export interface RouteOption {
  id: string
  segments: Transport[]
  total_cost: number
  total_duration_minutes: number
  total_co2_kg: number
  transfers: number
  label?: string
  badge?: string
}

export interface ItinerarySegment {
  id: string
  itinerary_id: string
  transport_id: string
  transport?: Transport
  order_index: number
  passenger_name?: string
  seat?: string
}

export interface Itinerary {
  id: string
  user_id: string
  title: string
  from_city: string
  to_city: string
  travel_date: string
  return_date?: string
  segments?: ItinerarySegment[]
  total_cost: number
  total_duration_minutes: number
  status: 'draft' | 'saved' | 'booked' | 'confirmed' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  user_id: string
  itinerary_id: string
  paypal_order_id: string
  amount: number
  currency: string
  status: 'pending' | 'paid' | 'failed' | 'refunded'
  paid_at?: string
  created_at: string
}

export interface SearchParams {
  from: string
  to: string
  date: string
  passengers: number
  sort: 'fastest' | 'cheapest' | 'eco'
}
