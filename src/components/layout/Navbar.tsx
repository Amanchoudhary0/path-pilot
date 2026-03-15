'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/search', label: 'Search Routes' },
  { href: '/itineraries', label: 'My Trips' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white text-lg">🧭</span>
            </div>
            <span className="text-slate-900 text-lg font-extrabold tracking-tight">
              Path<span className="text-primary">Pilot</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-semibold transition-all',
                  pathname === link.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth" className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors px-3 py-2">
              Log In
            </Link>
            <Link
              href="/auth?mode=signup"
              className="btn-primary text-sm py-2 px-5"
            >
              Sign Up Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'px-3 py-2.5 rounded-lg text-sm font-semibold',
                pathname === link.href ? 'bg-primary/10 text-primary' : 'text-slate-600'
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 mt-2 pt-2 border-t border-slate-100">
            <Link href="/auth" className="flex-1 text-center py-2.5 rounded-lg border border-slate-200 text-sm font-bold text-slate-700">Log In</Link>
            <Link href="/auth?mode=signup" className="flex-1 text-center py-2.5 rounded-lg bg-primary text-white text-sm font-bold">Sign Up</Link>
          </div>
        </div>
      )}
    </header>
  )
}
