import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SearchForm from '@/components/search/SearchForm'
import Link from 'next/link'

const POPULAR_DESTINATIONS = [
  { id: 'bom', name: 'Mumbai', state: 'Maharashtra', from: 3299, emoji: '🌊', gradient: 'from-orange-400 to-red-500', desc: 'City of Dreams' },
  { id: 'del', name: 'Delhi', state: 'Delhi', from: 2499, emoji: '🏛️', gradient: 'from-blue-500 to-indigo-600', desc: 'Heart of India' },
  { id: 'jai', name: 'Jaipur', state: 'Rajasthan', from: 755, emoji: '🏰', gradient: 'from-pink-400 to-rose-500', desc: 'Pink City' },
  { id: 'amd', name: 'Ahmedabad', state: 'Gujarat', from: 3199, emoji: '🏗️', gradient: 'from-amber-400 to-orange-500', desc: 'Manchester of East' },
  { id: 'pat', name: 'Patna', state: 'Bihar', from: 3899, emoji: '🕌', gradient: 'from-green-400 to-teal-500', desc: 'Ancient Capital' },
  { id: 'udp', name: 'Udaipur', state: 'Rajasthan', from: 350, emoji: '⛵', gradient: 'from-cyan-400 to-blue-500', desc: 'City of Lakes' },
  { id: 'pnq', name: 'Pune', state: 'Maharashtra', from: 200, emoji: '🎓', gradient: 'from-violet-400 to-purple-500', desc: 'Oxford of the East' },
  { id: 'gay', name: 'Gaya', state: 'Bihar', from: 2800, emoji: '🪷', gradient: 'from-yellow-400 to-amber-500', desc: 'Pilgrimage City' },
]

const FEATURES = [
  { icon: '🔀', title: 'Multi-Modal Routing', desc: 'Combine flights, trains, and buses in one seamless itinerary. Get from any city to any city the smartest way.' },
  { icon: '💰', title: 'Best Price Always', desc: 'Compare all transport options side by side. Our algorithm finds split-ticketing opportunities to save up to 40%.' },
  { icon: '🌿', title: 'Eco Score', desc: 'See the CO₂ footprint of every route. Choose greener travel and offset your impact effortlessly.' },
  { icon: '🗺️', title: 'Smart Itinerary Builder', desc: 'Build complex multi-city trips in minutes. Save, edit, and share your itineraries with co-travelers.' },
]

const STATES = [
  { name: 'Maharashtra', emoji: '🌊', cities: 7, color: 'bg-orange-50 border-orange-200 text-orange-700' },
  { name: 'Delhi', emoji: '🏛️', cities: 2, color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { name: 'Rajasthan', emoji: '🏰', cities: 6, color: 'bg-pink-50 border-pink-200 text-pink-700' },
  { name: 'Gujarat', emoji: '🏗️', cities: 5, color: 'bg-amber-50 border-amber-200 text-amber-700' },
  { name: 'Bihar', emoji: '🕌', cities: 4, color: 'bg-green-50 border-green-200 text-green-700' },
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary-dark to-primary pt-16 pb-32 px-6">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute top-20 -left-20 w-72 h-72 bg-saffron/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-bold uppercase tracking-wider mb-8 animate-fade-up">
              <span>🇮🇳</span>
              <span>Maharashtra · Bihar · Gujarat · Delhi · Rajasthan</span>
            </div>
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tight mb-6 animate-fade-up animation-delay-100">
              Travel Smarter<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
                Across India
              </span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up animation-delay-200">
              Compare flights, trains, and buses across 5 states in one place. Find the fastest, cheapest, or greenest route — and book it instantly.
            </p>

            {/* Live Ticker */}
            <div className="flex items-center justify-center gap-6 flex-wrap mb-10 animate-fade-up animation-delay-300">
              {[
                { from: 'DEL', to: 'JAI', price: '₹755', mode: '🚆' },
                { from: 'BOM', to: 'PNQ', price: '₹200', mode: '🚌' },
                { from: 'AMD', to: 'BOM', price: '₹3,199', mode: '✈️' },
              ].map(r => (
                <div key={r.from} className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur rounded-full text-white text-sm">
                  <span>{r.mode}</span>
                  <span className="font-semibold">{r.from} → {r.to}</span>
                  <span className="font-black text-amber-300">{r.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Search Form (overlapping hero) */}
        <section className="relative -mt-16 px-4 sm:px-6 z-10 max-w-5xl mx-auto">
          <SearchForm />
        </section>

        {/* Popular States */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Explore by State</h2>
            <p className="text-slate-500">Discover the best routes across our featured destinations</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {STATES.map(state => (
              <Link
                key={state.name}
                href={`/search?state=${state.name}`}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-full border font-semibold text-sm transition-all hover:shadow-md hover:scale-105 ${state.color}`}
              >
                <span className="text-xl">{state.emoji}</span>
                <span>{state.name}</span>
                <span className="text-xs opacity-70">{state.cities} cities</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Destinations Grid */}
        <section className="py-8 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Popular Right Now</h2>
                <p className="text-slate-500 mt-1">Trending routes this season</p>
              </div>
              <Link href="/search" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
                All routes <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {POPULAR_DESTINATIONS.map((dest, i) => (
                <Link
                  key={dest.id}
                  href={`/search?to=${dest.id}`}
                  className="group cursor-pointer"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className={`relative h-52 rounded-2xl overflow-hidden bg-gradient-to-br ${dest.gradient} flex flex-col justify-end p-5`}>
                    <div className="absolute top-4 right-4 text-4xl opacity-60 group-hover:scale-125 group-hover:opacity-80 transition-all duration-300">
                      {dest.emoji}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="relative z-10">
                      <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-1">{dest.state}</p>
                      <p className="text-white text-xl font-black">{dest.name}</p>
                      <p className="text-white/70 text-xs">{dest.desc}</p>
                    </div>
                  </div>
                  <div className="mt-2.5 px-1 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700">{dest.name}</span>
                    <span className="text-sm font-black text-primary">from ₹{dest.from.toLocaleString('en-IN')}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">Why PathPilot?</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Built for Indian travelers who want more than just a booking engine.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-4">
                  {f.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="px-6 pb-20">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-white text-3xl md:text-4xl font-black mb-3">Ready for your next adventure?</h2>
                <p className="text-white/75 text-lg">Join 2 lakh+ travelers already saving time and money with PathPilot.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link href="/auth?mode=signup" className="px-8 py-4 bg-white text-primary font-black rounded-xl hover:bg-slate-100 transition-colors whitespace-nowrap text-center">
                  Get Started Free
                </Link>
                <Link href="/search" className="px-8 py-4 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-colors border border-white/30 whitespace-nowrap text-center">
                  Search Routes
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
