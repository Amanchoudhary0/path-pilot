import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { TransportMode } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const MODE_CONFIG: Record<TransportMode, { icon: string; color: string; bg: string; label: string }> = {
  flight: { icon: '✈️', color: 'text-blue-600', bg: 'bg-blue-50', label: 'Flight' },
  train: { icon: '🚆', color: 'text-green-600', bg: 'bg-green-50', label: 'Train' },
  bus: { icon: '🚌', color: 'text-amber-600', bg: 'bg-amber-50', label: 'Bus' },
  taxi: { icon: '🚕', color: 'text-purple-600', bg: 'bg-purple-50', label: 'Taxi' },
}

export function getEcoLabel(co2_kg: number): { label: string; color: string } {
  if (co2_kg < 15) return { label: 'Excellent', color: 'text-green-600' }
  if (co2_kg < 40) return { label: 'Good', color: 'text-emerald-500' }
  if (co2_kg < 100) return { label: 'Moderate', color: 'text-amber-500' }
  return { label: 'High', color: 'text-red-500' }
}
