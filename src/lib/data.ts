import { City, Transport } from '@/types'

export const CITIES: City[] = [
  // Delhi
  { id: 'del', name: 'Delhi', code: 'DEL', state: 'Delhi', latitude: 28.6139, longitude: 77.2090, popular: true, image: '/images/delhi.jpg' },
  { id: 'ndls', name: 'New Delhi', code: 'NDLS', state: 'Delhi', latitude: 28.6448, longitude: 77.2167 },

  // Maharashtra
  { id: 'bom', name: 'Mumbai', code: 'BOM', state: 'Maharashtra', latitude: 19.0760, longitude: 72.8777, popular: true, image: '/images/mumbai.jpg' },
  { id: 'pnq', name: 'Pune', code: 'PNQ', state: 'Maharashtra', latitude: 18.5204, longitude: 73.8567, popular: true },
  { id: 'nag', name: 'Nagpur', code: 'NAG', state: 'Maharashtra', latitude: 21.1458, longitude: 79.0882 },
  { id: 'aur', name: 'Aurangabad', code: 'IXU', state: 'Maharashtra', latitude: 19.8762, longitude: 75.3433 },
  { id: 'nas', name: 'Nashik', code: 'ISK', state: 'Maharashtra', latitude: 19.9975, longitude: 73.7898 },

  // Gujarat
  { id: 'amd', name: 'Ahmedabad', code: 'AMD', state: 'Gujarat', latitude: 23.0225, longitude: 72.5714, popular: true, image: '/images/ahmedabad.jpg' },
  { id: 'sur', name: 'Surat', code: 'STV', state: 'Gujarat', latitude: 21.1702, longitude: 72.8311 },
  { id: 'raj', name: 'Rajkot', code: 'RAJ', state: 'Gujarat', latitude: 22.3039, longitude: 70.8022 },
  { id: 'vdr', name: 'Vadodara', code: 'BDQ', state: 'Gujarat', latitude: 22.3072, longitude: 73.1812 },
  { id: 'bvn', name: 'Bhavnagar', code: 'BHU', state: 'Gujarat', latitude: 21.7645, longitude: 72.1519 },

  // Rajasthan
  { id: 'jai', name: 'Jaipur', code: 'JAI', state: 'Rajasthan', latitude: 26.9124, longitude: 75.7873, popular: true, image: '/images/jaipur.jpg' },
  { id: 'jod', name: 'Jodhpur', code: 'JDH', state: 'Rajasthan', latitude: 26.2389, longitude: 73.0243 },
  { id: 'udp', name: 'Udaipur', code: 'UDR', state: 'Rajasthan', latitude: 24.5854, longitude: 73.7125, popular: true },
  { id: 'bkn', name: 'Bikaner', code: 'BKB', state: 'Rajasthan', latitude: 28.0229, longitude: 73.3119 },
  { id: 'aja', name: 'Ajmer', code: 'AII', state: 'Rajasthan', latitude: 26.4499, longitude: 74.6399 },
  { id: 'kota', name: 'Kota', code: 'KOTA', state: 'Rajasthan', latitude: 25.2138, longitude: 75.8648 },

  // Bihar
  { id: 'pat', name: 'Patna', code: 'PAT', state: 'Bihar', latitude: 25.5941, longitude: 85.1376, popular: true, image: '/images/patna.jpg' },
  { id: 'gay', name: 'Gaya', code: 'GAY', state: 'Bihar', latitude: 24.7955, longitude: 85.0002 },
  { id: 'muz', name: 'Muzaffarpur', code: 'MFP', state: 'Bihar', latitude: 26.1197, longitude: 85.3910 },
  { id: 'bgl', name: 'Bhagalpur', code: 'BGP', state: 'Bihar', latitude: 25.2425, longitude: 86.9842 },
]

export const STATES = ['All States', 'Delhi', 'Maharashtra', 'Gujarat', 'Rajasthan', 'Bihar']

export const POPULAR_ROUTES = [
  { from: 'del', to: 'jai', label: 'Delhi → Jaipur' },
  { from: 'del', to: 'bom', label: 'Delhi → Mumbai' },
  { from: 'bom', to: 'pnq', label: 'Mumbai → Pune' },
  { from: 'amd', to: 'bom', label: 'Ahmedabad → Mumbai' },
  { from: 'del', to: 'pat', label: 'Delhi → Patna' },
  { from: 'jai', to: 'udp', label: 'Jaipur → Udaipur' },
  { from: 'bom', to: 'nag', label: 'Mumbai → Nagpur' },
  { from: 'del', to: 'amd', label: 'Delhi → Ahmedabad' },
]

export const SAMPLE_TRANSPORTS: Transport[] = [
  // Delhi - Jaipur
  {
    id: 't1', mode: 'flight', from_city_id: 'del', to_city_id: 'jai',
    operator: 'IndiGo', depart_time: '06:00', arrive_time: '07:05',
    duration_minutes: 65, cost: 2499, co2_kg: 58, available_seats: 12, class: 'Economy'
  },
  {
    id: 't2', mode: 'train', from_city_id: 'del', to_city_id: 'jai',
    operator: 'Shatabdi Express', depart_time: '06:05', arrive_time: '10:35',
    duration_minutes: 270, cost: 755, co2_kg: 12, available_seats: 40, class: 'CC'
  },
  {
    id: 't3', mode: 'bus', from_city_id: 'del', to_city_id: 'jai',
    operator: 'RSRTC Volvo', depart_time: '22:00', arrive_time: '05:30',
    duration_minutes: 450, cost: 450, co2_kg: 18, available_seats: 20, class: 'Sleeper'
  },

  // Delhi - Mumbai
  {
    id: 't4', mode: 'flight', from_city_id: 'del', to_city_id: 'bom',
    operator: 'Air India', depart_time: '07:00', arrive_time: '09:15',
    duration_minutes: 135, cost: 4599, co2_kg: 134, available_seats: 8, class: 'Economy'
  },
  {
    id: 't5', mode: 'train', from_city_id: 'del', to_city_id: 'bom',
    operator: 'Rajdhani Express', depart_time: '16:55', arrive_time: '08:15',
    duration_minutes: 920, cost: 1845, co2_kg: 35, available_seats: 25, class: '3A'
  },
  {
    id: 't6', mode: 'flight', from_city_id: 'del', to_city_id: 'bom',
    operator: 'IndiGo', depart_time: '14:00', arrive_time: '16:10',
    duration_minutes: 130, cost: 3899, co2_kg: 130, available_seats: 18, class: 'Economy'
  },

  // Mumbai - Pune
  {
    id: 't7', mode: 'train', from_city_id: 'bom', to_city_id: 'pnq',
    operator: 'Deccan Queen', depart_time: '07:15', arrive_time: '10:25',
    duration_minutes: 190, cost: 280, co2_kg: 8, available_seats: 60, class: 'FC'
  },
  {
    id: 't8', mode: 'bus', from_city_id: 'bom', to_city_id: 'pnq',
    operator: 'MSRTC Shivneri', depart_time: '06:30', arrive_time: '09:30',
    duration_minutes: 180, cost: 200, co2_kg: 10, available_seats: 15, class: 'AC'
  },
  {
    id: 't9', mode: 'taxi', from_city_id: 'bom', to_city_id: 'pnq',
    operator: 'Ola Outstation', depart_time: '08:00', arrive_time: '11:30',
    duration_minutes: 210, cost: 1800, co2_kg: 22, available_seats: 4, class: 'Sedan'
  },

  // Ahmedabad - Mumbai
  {
    id: 't10', mode: 'flight', from_city_id: 'amd', to_city_id: 'bom',
    operator: 'SpiceJet', depart_time: '08:30', arrive_time: '09:45',
    duration_minutes: 75, cost: 3199, co2_kg: 55, available_seats: 22, class: 'Economy'
  },
  {
    id: 't11', mode: 'train', from_city_id: 'amd', to_city_id: 'bom',
    operator: 'Shatabdi Express', depart_time: '06:25', arrive_time: '13:10',
    duration_minutes: 405, cost: 1005, co2_kg: 18, available_seats: 35, class: 'CC'
  },

  // Delhi - Patna
  {
    id: 't12', mode: 'flight', from_city_id: 'del', to_city_id: 'pat',
    operator: 'IndiGo', depart_time: '07:30', arrive_time: '09:10',
    duration_minutes: 100, cost: 3899, co2_kg: 88, available_seats: 15, class: 'Economy'
  },
  {
    id: 't13', mode: 'train', from_city_id: 'del', to_city_id: 'pat',
    operator: 'Rajdhani Express', depart_time: '18:25', arrive_time: '06:40',
    duration_minutes: 735, cost: 1625, co2_kg: 28, available_seats: 30, class: '3A'
  },

  // Jaipur - Udaipur
  {
    id: 't14', mode: 'train', from_city_id: 'jai', to_city_id: 'udp',
    operator: 'Chetak Express', depart_time: '10:25', arrive_time: '17:40',
    duration_minutes: 435, cost: 390, co2_kg: 11, available_seats: 45, class: 'SL'
  },
  {
    id: 't15', mode: 'bus', from_city_id: 'jai', to_city_id: 'udp',
    operator: 'RSRTC Deluxe', depart_time: '06:00', arrive_time: '13:30',
    duration_minutes: 450, cost: 350, co2_kg: 14, available_seats: 25, class: 'AC'
  },

  // Delhi - Ahmedabad
  {
    id: 't16', mode: 'flight', from_city_id: 'del', to_city_id: 'amd',
    operator: 'Vistara', depart_time: '06:15', arrive_time: '08:00',
    duration_minutes: 105, cost: 4299, co2_kg: 98, available_seats: 10, class: 'Economy'
  },
  {
    id: 't17', mode: 'train', from_city_id: 'del', to_city_id: 'amd',
    operator: 'Rajdhani Express', depart_time: '19:55', arrive_time: '09:55',
    duration_minutes: 840, cost: 1595, co2_kg: 32, available_seats: 20, class: '2A'
  },

  // Mumbai - Nagpur
  {
    id: 't18', mode: 'flight', from_city_id: 'bom', to_city_id: 'nag',
    operator: 'Air India', depart_time: '09:00', arrive_time: '10:10',
    duration_minutes: 70, cost: 2799, co2_kg: 62, available_seats: 16, class: 'Economy'
  },
  {
    id: 't19', mode: 'train', from_city_id: 'bom', to_city_id: 'nag',
    operator: 'Vidarbha Express', depart_time: '22:00', arrive_time: '12:15',
    duration_minutes: 855, cost: 875, co2_kg: 26, available_seats: 35, class: 'SL'
  },
]

export function getCityById(id: string): City | undefined {
  return CITIES.find(c => c.id === id)
}

export function searchRoutes(fromId: string, toId: string) {
  return SAMPLE_TRANSPORTS.filter(t => t.from_city_id === fromId && t.to_city_id === toId)
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}
