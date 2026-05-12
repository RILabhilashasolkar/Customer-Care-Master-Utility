import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Bell, LogOut, Search } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const BREADCRUMB_MAP: Record<string, string> = {
  dashboard: 'Dashboard',
  'queue-health': 'Queue Health',
  'live-agents': 'Live Agents',
  'queue-performance': 'Queue Performance',
  'agent-performance': 'Agent Performance',
  'sla-aging-queue': 'SLA Aging by Queue',
  'sla-aging-agent': 'SLA Aging by Agent',
  'breaks-adherence': 'Breaks Adherence',
  'ticket-aging': 'Ticket Aging',
  'volume-mix': 'Volume Mix',
  trends: 'Trends',
  'daily-report': 'Daily Activity Report',
  customer360: 'Customer 360',
  retailer360: 'Retailer 360',
  orders: 'Order Tracker',
  tickets: 'Ticket Management',
  'store-locator': 'Store Locator',
  admin: 'Admin Panel',
}

const ROLE_LABELS: Record<string, string> = {
  callCentreAgent: 'Call Centre Agent',
  callCentreLead: 'Call Centre Lead',
  nhqCustomerCare: 'NHQ Customer Care',
  nhqScm: 'NHQ SCM',
  nhqFinance: 'NHQ Finance',
  ccHead: 'CC Head',
  scmHead: 'SCM Head',
  csProductManager: 'CS Product Manager',
  financeHead: 'Finance Head',
  businessHead: 'Business Head',
  admin: 'Admin',
}

export function TopBar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const segments = location.pathname.split('/').filter(Boolean)
  const breadcrumbs = segments.map((s, i) => ({
    label: BREADCRUMB_MAP[s] ?? s,
    path: '/' + segments.slice(0, i + 1).join('/'),
  }))

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="fixed top-0 left-60 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-6 z-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm flex-1">
        {breadcrumbs.map((crumb, i) => (
          <React.Fragment key={crumb.path}>
            {i > 0 && <span className="text-gray-300">/</span>}
            <span className={i === breadcrumbs.length - 1 ? 'text-gray-800 font-medium' : 'text-gray-400'}>
              {crumb.label}
            </span>
          </React.Fragment>
        ))}
      </nav>

      {/* Global search (placeholder) */}
      <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 w-56 mr-4">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Quick search..."
          className="bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none w-full"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg hover:bg-gray-100 relative">
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-900 flex items-center justify-center text-white text-sm font-bold">
            {user?.name?.charAt(0) ?? 'U'}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800 leading-tight">{user?.name}</p>
            <p className="text-xs text-gray-400 leading-tight">{ROLE_LABELS[user?.role ?? ''] ?? user?.role}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
