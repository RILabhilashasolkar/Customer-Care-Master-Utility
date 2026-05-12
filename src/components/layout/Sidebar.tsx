import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import {
  LayoutDashboard, Users, Store, Package, Ticket, MapPin, Settings, ChevronDown, ChevronRight,
} from 'lucide-react'
import { useRbac } from '../../context/RbacContext'
import { useAuth } from '../../context/AuthContext'
import { MODULES_CONFIG } from '../../config/modules.config'

const ICON_MAP: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  Store: <Store className="w-4 h-4" />,
  Package: <Package className="w-4 h-4" />,
  Ticket: <Ticket className="w-4 h-4" />,
  MapPin: <MapPin className="w-4 h-4" />,
  Settings: <Settings className="w-4 h-4" />,
}

const ROLE_LABELS: Record<string, string> = {
  callCentreAgent: 'CC Agent',
  callCentreLead: 'CC Lead',
  nhqCustomerCare: 'NHQ CC',
  nhqScm: 'NHQ SCM',
  nhqFinance: 'NHQ Finance',
  ccHead: 'CC Head',
  scmHead: 'SCM Head',
  csProductManager: 'CS PM',
  financeHead: 'Finance Head',
  businessHead: 'Business Head',
  admin: 'Admin',
}

export function Sidebar() {
  const { getAccessibleModules, getDashboardSubModules } = useRbac()
  const { user } = useAuth()
  const location = useLocation()
  const [dashboardOpen, setDashboardOpen] = useState(true)

  const accessibleModules = getAccessibleModules()
  const dashboardSubModules = getDashboardSubModules()

  const dashboardModule = MODULES_CONFIG.find((m) => m.id === 'dashboard')
  const accessibleSubModules = dashboardModule?.subModules.filter((s) => dashboardSubModules.includes(s.id)) ?? []

  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-brand-900 flex flex-col z-30">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-brand-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center text-white font-bold text-sm">R</div>
          <div>
            <p className="text-white text-xs font-bold leading-tight">Reliance Retailer One</p>
            <p className="text-brand-300 text-xs leading-tight">NHQ Master Utility</p>
          </div>
        </div>
        <div className="mt-2">
          <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded font-medium">v1.0.0</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin">
        {accessibleModules.map((module) => {
          if (module.id === 'dashboard') {
            return (
              <div key="dashboard" className="mb-1">
                <button
                  onClick={() => setDashboardOpen((p) => !p)}
                  className={clsx(
                    'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    location.pathname.startsWith('/dashboard')
                      ? 'bg-brand-700 text-white'
                      : 'text-brand-200 hover:bg-brand-800 hover:text-white'
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    {ICON_MAP[module.icon]}
                    {module.label}
                  </span>
                  {dashboardOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>
                {dashboardOpen && (
                  <div className="ml-4 mt-1 space-y-0.5">
                    {accessibleSubModules.map((sub) => (
                      <NavLink
                        key={sub.id}
                        to={sub.path}
                        className={({ isActive }) =>
                          clsx(
                            'block px-3 py-1.5 text-xs rounded-md transition-colors',
                            isActive ? 'bg-amber-500 text-white font-medium' : 'text-brand-300 hover:bg-brand-800 hover:text-white'
                          )
                        }
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          return (
            <NavLink
              key={module.id}
              to={module.path}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium mb-0.5 transition-colors',
                  isActive ? 'bg-brand-700 text-white' : 'text-brand-200 hover:bg-brand-800 hover:text-white'
                )
              }
            >
              {ICON_MAP[module.icon]}
              {module.label}
            </NavLink>
          )
        })}
      </nav>

      {/* User footer */}
      <div className="px-4 py-4 border-t border-brand-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white text-sm font-bold">
            {user?.name?.charAt(0) ?? 'U'}
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-xs font-medium truncate">{user?.name}</p>
            <span className="bg-brand-700 text-brand-200 text-xs px-1.5 py-0.5 rounded">
              {ROLE_LABELS[user?.role ?? ''] ?? user?.role}
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}
