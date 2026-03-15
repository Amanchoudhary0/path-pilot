'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import { SAMPLE_TRANSPORTS, getCityById, formatPrice, formatDuration } from '@/lib/data'
import { Transport } from '@/types'
import { MODE_CONFIG } from '@/lib/utils'
import Link from 'next/link'

type Step = 'review' | 'passenger' | 'payment'

export default function CheckoutPage() {
  const params = useSearchParams()
  const router = useRouter()
  const segmentIds = params.get('segments')?.split(',') || []

  const [segments, setSegments] = useState<Transport[]>([])
  const [step, setStep] = useState<Step>('review')
  const [passenger, setPassenger] = useState({ name: '', email: '', phone: '' })
  const [payLoading, setPayLoading] = useState(false)
  const [paySuccess, setPaySuccess] = useState(false)

  useEffect(() => {
    const found = segmentIds
      .map(id => SAMPLE_TRANSPORTS.find(t => t.id === id))
      .filter(Boolean) as Transport[]
    setSegments(found)
  }, [])

  const subtotal = segments.reduce((s, t) => s + t.cost, 0)
  const taxes = Math.round(subtotal * 0.05)
  const total = subtotal + taxes

  const handlePayPal = async () => {
    setPayLoading(true)
    // Simulate PayPal payment
    await new Promise(r => setTimeout(r, 2500))
    setPayLoading(false)
    setPaySuccess(true)
  }

  if (paySuccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="text-7xl mb-6">🎉</div>
            <h1 className="text-3xl font-black text-slate-900 mb-3">Booking Confirmed!</h1>
            <p className="text-slate-500 mb-2">Your trip is booked and confirmed.</p>
            <p className="text-slate-400 text-sm mb-8">A confirmation has been sent to {passenger.email || 'your email'}.</p>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8 text-left">
              <p className="text-xs font-bold text-green-600 uppercase mb-3">Booking Summary</p>
              {segments.map(s => {
                const from = getCityById(s.from_city_id)
                const to = getCityById(s.to_city_id)
                const cfg = MODE_CONFIG[s.mode]
                return (
                  <div key={s.id} className="flex items-center gap-3 py-2 border-b border-green-100 last:border-0">
                    <span>{cfg.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900">{from?.name} → {to?.name}</p>
                      <p className="text-xs text-slate-500">{s.operator} · {s.depart_time}</p>
                    </div>
                    <p className="text-sm font-bold text-slate-700">{formatPrice(s.cost)}</p>
                  </div>
                )
              })}
              <div className="flex justify-between items-center pt-3 mt-1">
                <span className="font-black text-slate-900">Total Paid</span>
                <span className="text-xl font-black text-primary">{formatPrice(total)}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/itineraries" className="btn-primary flex-1 justify-center">View My Trips</Link>
              <Link href="/" className="btn-secondary flex-1 justify-center">Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const STEPS = [
    { key: 'review', label: 'Review', num: 1 },
    { key: 'passenger', label: 'Passenger', num: 2 },
    { key: 'payment', label: 'Payment', num: 3 },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-bg-light py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Checkout</h1>
              <p className="text-slate-500 text-sm">Complete your booking securely</p>
            </div>
            <div className="flex items-center gap-2">
              {STEPS.map((s, i) => (
                <div key={s.key} className="flex items-center gap-2">
                  <button
                    onClick={() => step !== 'payment' && setStep(s.key as Step)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      step === s.key
                        ? 'bg-primary text-white'
                        : STEPS.findIndex(x => x.key === step) > i
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-white/30 flex items-center justify-center text-[10px]">
                      {STEPS.findIndex(x => x.key === step) > i ? '✓' : s.num}
                    </span>
                    {s.label}
                  </button>
                  {i < STEPS.length - 1 && <div className="w-4 h-px bg-slate-200" />}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-4">

              {/* Step 1: Review */}
              {step === 'review' && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                    <span>🗺️</span>
                    <h2 className="font-bold text-slate-900">Itinerary Segments</h2>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {segments.length === 0 ? (
                      <div className="p-8 text-center">
                        <p className="text-slate-500">No segments found.</p>
                        <Link href="/search" className="text-primary font-semibold hover:underline mt-2 inline-block">← Go back to search</Link>
                      </div>
                    ) : segments.map(seg => {
                      const from = getCityById(seg.from_city_id)
                      const to = getCityById(seg.to_city_id)
                      const cfg = MODE_CONFIG[seg.mode]
                      return (
                        <div key={seg.id} className="flex items-start gap-4 p-5 hover:bg-slate-50/50 transition-colors">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${cfg.bg}`}>
                            {cfg.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2 flex-wrap">
                              <p className="font-bold text-slate-900">{from?.name} → {to?.name}</p>
                              <span className="badge bg-green-100 text-green-700">Confirmed</span>
                            </div>
                            <p className="text-sm text-slate-500 mt-0.5">
                              {seg.operator} · {cfg.label} · {seg.depart_time} – {seg.arrive_time}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                              <span>⏱️ {formatDuration(seg.duration_minutes)}</span>
                              <span>🌱 {seg.co2_kg}kg CO₂</span>
                              {seg.class && <span>💺 {seg.class}</span>}
                            </div>
                          </div>
                          <p className="text-lg font-black text-primary shrink-0">{formatPrice(seg.cost)}</p>
                        </div>
                      )
                    })}
                  </div>
                  <div className="px-6 py-4 border-t border-slate-100">
                    <button onClick={() => setStep('passenger')} className="btn-primary w-full">
                      Continue to Passenger Details →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Passenger */}
              {step === 'passenger' && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                    <span>👤</span>
                    <h2 className="font-bold text-slate-900">Passenger Details</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name (as per ID)</label>
                      <input
                        value={passenger.name}
                        onChange={e => setPassenger(p => ({ ...p, name: e.target.value }))}
                        placeholder="e.g. Rajesh Kumar"
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={passenger.email}
                        onChange={e => setPassenger(p => ({ ...p, email: e.target.value }))}
                        placeholder="you@example.com"
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mobile Number</label>
                      <input
                        type="tel"
                        value={passenger.phone}
                        onChange={e => setPassenger(p => ({ ...p, phone: e.target.value }))}
                        placeholder="+91 98765 43210"
                        className="input"
                      />
                    </div>
                  </div>
                  <div className="px-6 py-4 border-t border-slate-100 flex gap-3">
                    <button onClick={() => setStep('review')} className="btn-secondary px-4">← Back</button>
                    <button
                      onClick={() => setStep('payment')}
                      disabled={!passenger.name || !passenger.email}
                      className="btn-primary flex-1 disabled:opacity-50"
                    >
                      Continue to Payment →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 'payment' && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                    <span>💳</span>
                    <h2 className="font-bold text-slate-900">Payment Method</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    {/* PayPal */}
                    <button
                      onClick={handlePayPal}
                      disabled={payLoading}
                      className="w-full h-14 bg-[#FFC439] hover:bg-[#f0b429] rounded-xl flex items-center justify-center gap-2 font-bold text-[#003087] text-lg transition-all disabled:opacity-70"
                    >
                      {payLoading ? (
                        <span className="animate-pulse">Processing payment...</span>
                      ) : (
                        <>
                          <span className="italic font-black">Pay</span>
                          <span className="font-black text-[#009cde]">Pal</span>
                          <span className="ml-2">{formatPrice(total)}</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-slate-100" />
                      <span className="text-xs font-bold text-slate-400 uppercase">or pay with card</span>
                      <div className="flex-1 h-px bg-slate-100" />
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Card Number</label>
                        <div className="relative">
                          <input placeholder="0000 0000 0000 0000" className="input pr-10" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">💳</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Expiry</label>
                          <input placeholder="MM / YY" className="input" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">CVV</label>
                          <input placeholder="•••" className="input" type="password" maxLength={4} />
                        </div>
                      </div>
                      <button
                        onClick={handlePayPal}
                        disabled={payLoading}
                        className="btn-primary w-full h-12 text-base disabled:opacity-70"
                      >
                        {payLoading ? '⏳ Processing...' : `Pay ${formatPrice(total)} →`}
                      </button>
                    </div>

                    <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1">
                      🔒 Secured by PathPilot · SSL Encrypted
                    </p>
                  </div>
                  <div className="px-6 pb-4">
                    <button onClick={() => setStep('passenger')} className="btn-secondary w-full text-sm">← Back to Passenger</button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
                <h3 className="font-bold text-slate-900 mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  {segments.map(s => {
                    const from = getCityById(s.from_city_id)
                    const to = getCityById(s.to_city_id)
                    return (
                      <div key={s.id} className="flex justify-between items-start gap-2">
                        <span className="text-sm text-slate-500 flex-1">
                          {MODE_CONFIG[s.mode].icon} {from?.name} → {to?.name}
                        </span>
                        <span className="text-sm font-semibold text-slate-900 shrink-0">{formatPrice(s.cost)}</span>
                      </div>
                    )
                  })}
                </div>
                <div className="border-t border-slate-100 pt-3 space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Taxes (5%)</span>
                    <span className="font-semibold">{formatPrice(taxes)}</span>
                  </div>
                  <div className="flex justify-between items-end pt-2 mt-1 border-t border-slate-100">
                    <span className="font-black text-slate-900">Total</span>
                    <span className="text-2xl font-black text-primary">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl border border-primary/10 p-4 flex items-start gap-3">
                <span className="text-xl">🛡️</span>
                <div>
                  <p className="text-xs font-black text-slate-900 mb-1">Price Guarantee</p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Your price is locked for 24 hours. No hidden charges will be added at checkout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
