import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white">🧭</span>
              </div>
              <span className="text-white text-lg font-extrabold">Path<span className="text-primary">Pilot</span></span>
            </div>
            <p className="text-sm leading-relaxed">
              India&apos;s first multi-modal travel platform. Compare flights, trains, and buses across Maharashtra, Bihar, Gujarat, Delhi & Rajasthan.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Destinations</h4>
            <ul className="space-y-2 text-sm">
              {['Mumbai', 'Delhi', 'Jaipur', 'Patna', 'Ahmedabad', 'Pune'].map(city => (
                <li key={city}>
                  <Link href={`/search?to=${city.toLowerCase()}`} className="hover:text-primary transition-colors">{city}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Travel Modes</h4>
            <ul className="space-y-2 text-sm">
              {['Flights', 'Trains', 'Buses', 'Taxis'].map(mode => (
                <li key={mode}>
                  <Link href="/search" className="hover:text-primary transition-colors">{mode}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm">
              {['About Us', 'Help Center', 'Privacy Policy', 'Terms of Service'].map(item => (
                <li key={item}>
                  <Link href="#" className="hover:text-primary transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs">© 2024 PathPilot India. All rights reserved.</p>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-saffron">🇮🇳</span>
            <span>Made for Indian Travelers</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
