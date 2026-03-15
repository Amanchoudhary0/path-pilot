'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function AuthPage() {
  const router = useRouter()
  const params = useSearchParams()
  const mode = params.get('mode')
  const redirect = params.get('redirect') || '/'

  const [isSignUp, setIsSignUp] = useState(mode === 'signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const supabase = createClient()

  useEffect(() => {
    setIsSignUp(mode === 'signup')
  }, [mode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } }
        })
        if (error) throw error
        setSuccess('Account created! Please check your email to verify.')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.push(redirect)
        router.refresh()
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback?redirect=${redirect}` }
    })
    if (error) setError(error.message)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left: Illustration Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-slate-900 via-primary-dark to-primary flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-saffron/10 rounded-full blur-3xl" />
        </div>

        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-2">
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center">
            <span className="text-primary text-xl">🧭</span>
          </div>
          <span className="text-white text-xl font-extrabold">PathPilot</span>
        </Link>

        {/* Headline */}
        <div className="relative z-10">
          <h1 className="text-white text-4xl font-black leading-tight mb-5">
            Explore India<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
              The Smart Way
            </span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-8">
            Join lakhs of travelers comparing flights, trains, and buses across Maharashtra, Bihar, Gujarat, Delhi & Rajasthan.
          </p>
          <div className="flex flex-wrap gap-2">
            {['🌊 Maharashtra', '🏛️ Delhi', '🏰 Rajasthan', '🏗️ Gujarat', '🕌 Bihar'].map(s => (
              <span key={s} className="px-3 py-1.5 bg-white/15 rounded-full text-white text-sm font-semibold border border-white/20">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex -space-x-2">
            {['🧑', '👩', '🧔', '👧'].map((e, i) => (
              <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-dark border-2 border-white/30 flex items-center justify-center text-sm">
                {e}
              </div>
            ))}
          </div>
          <p className="text-white/80 text-sm font-medium">2 lakh+ travelers trust PathPilot</p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-bg-light">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white">🧭</span>
            </div>
            <span className="text-slate-900 font-extrabold text-lg">Path<span className="text-primary">Pilot</span></span>
          </Link>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
            <h2 className="text-2xl font-black text-slate-900 mb-1">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              {isSignUp ? 'Start planning your Indian adventure' : 'Sign in to access your itineraries'}
            </p>

            {/* Toggle */}
            <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
              <button
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${!isSignUp ? 'bg-white text-primary shadow-sm' : 'text-slate-500'}`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${isSignUp ? 'bg-white text-primary shadow-sm' : 'text-slate-500'}`}
              >
                Sign Up
              </button>
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
                ⚠️ {error}
              </div>
            )}
            {success && (
              <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
                ✅ {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">👤</span>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your full name"
                      required={isSignUp}
                      className="input pl-9"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">✉️</span>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="input pl-9"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-semibold text-slate-700">Password</label>
                  {!isSignUp && (
                    <Link href="/auth/forgot-password" className="text-xs text-primary font-semibold hover:underline">
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔒</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="input pl-9 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {isSignUp && (
                  <p className="text-xs text-slate-400 mt-1">Minimum 6 characters</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full h-12 text-base disabled:opacity-60"
              >
                {loading ? '⏳ Please wait...' : isSignUp ? 'Create Account →' : 'Sign In →'}
              </button>
            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs font-semibold text-slate-400 uppercase">or</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 h-12 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center text-xs text-slate-400 mt-6 leading-relaxed">
              By continuing, you agree to PathPilot&apos;s{' '}
              <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and{' '}
              <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
