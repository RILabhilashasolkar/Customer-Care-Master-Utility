import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Eye, EyeOff, ChevronDown } from 'lucide-react'

const DEMO_CREDENTIALS = [
  { role: 'Call Centre Agent', username: 'agent.sharma', password: 'Demo@123' },
  { role: 'Call Centre Lead', username: 'lead.patel', password: 'Demo@123' },
  { role: 'NHQ Customer Care', username: 'nhq.care', password: 'Demo@123' },
  { role: 'NHQ SCM', username: 'nhq.scm', password: 'Demo@123' },
  { role: 'NHQ Finance', username: 'nhq.finance', password: 'Demo@123' },
  { role: 'CC Head', username: 'cc.head', password: 'Demo@123' },
  { role: 'SCM Head', username: 'scm.head', password: 'Demo@123' },
  { role: 'CS Product Manager', username: 'pm.cs', password: 'Demo@123' },
  { role: 'Finance Head', username: 'finance.head', password: 'Demo@123' },
  { role: 'Business Head', username: 'biz.head', password: 'Demo@123' },
  { role: 'Admin', username: 'admin', password: 'Admin@123' },
]

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [demoOpen, setDemoOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await login({ username, password })
    setLoading(false)
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error ?? 'Login failed')
    }
  }

  const autofill = (cred: { username: string; password: string }) => {
    setUsername(cred.username)
    setPassword(cred.password)
    setError('')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-brand-900 p-12 text-white">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold text-lg">R</div>
            <div>
              <p className="font-bold text-lg leading-tight">Reliance Retailer One</p>
              <p className="text-brand-300 text-sm">Electronics Customer Care</p>
            </div>
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            NHQ Master<br />Utility
          </h1>
          <p className="text-brand-200 text-lg leading-relaxed">
            Role-based access control platform for end-to-end customer care operations across all Reliance retail channels.
          </p>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Customer 360', desc: 'Full customer profile with order & ticket history' },
            { label: 'Order Tracker', desc: 'Real-time shipment tracking across all business lines' },
            { label: 'Live Dashboards', desc: '11 configurable dashboards for every role' },
          ].map((feat) => (
            <div key={feat.label} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium text-sm">{feat.label}</p>
                <p className="text-brand-300 text-xs">{feat.desc}</p>
              </div>
            </div>
          ))}
          <p className="text-brand-400 text-xs mt-6">v1.0.0 — For internal use only. © 2026 Reliance Retail Ltd.</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 bg-gray-50">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Sign in</h2>
            <p className="text-gray-500 text-sm mt-1">Enter your credentials to access the platform</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent pr-10"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-900 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-brand-800 disabled:opacity-60 transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setDemoOpen((p) => !p)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-600 transition-colors"
            >
              <span>Demo Credentials (click to expand)</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${demoOpen ? 'rotate-180' : ''}`} />
            </button>
            {demoOpen && (
              <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
                {DEMO_CREDENTIALS.map((cred) => (
                  <button
                    key={cred.username}
                    onClick={() => autofill(cred)}
                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-brand-50 text-sm text-left transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{cred.role}</p>
                      <p className="text-xs text-gray-400">{cred.username}</p>
                    </div>
                    <span className="text-xs text-brand-600 font-mono bg-brand-50 px-2 py-1 rounded">{cred.password}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
