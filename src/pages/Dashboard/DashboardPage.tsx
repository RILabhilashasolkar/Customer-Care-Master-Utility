import React from 'react'
import { Routes, Route, Navigate, NavLink, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { AppShell } from '../../components/layout/AppShell'
import { FilterBar } from '../../components/core/FilterBar'
import { useRbac } from '../../context/RbacContext'
import { D1_QueueHealthRealtime } from './D1_QueueHealthRealtime'
import { D2_LiveAgentMonitor } from './D2_LiveAgentMonitor'
import { D3_QueuePerformance } from './D3_QueuePerformance'
import { D4_AgentPerformance } from './D4_AgentPerformance'
import { D5_SlaAgingQueue } from './D5_SlaAgingQueue'
import { D6_SlaAgingAgent } from './D6_SlaAgingAgent'
import { D7_BreaksAdherence } from './D7_BreaksAdherence'
import { D8_TicketAgingByQueue } from './D8_TicketAgingByQueue'
import { D9_VolumeMix } from './D9_VolumeMix'
import { D10_Trends } from './D10_Trends'
import { DailyActivityReport } from './DailyActivityReport'

const ALL_TABS = [
  { id: 'd1', label: 'Queue Health', path: 'queue-health' },
  { id: 'd2', label: 'Live Agents', path: 'live-agents' },
  { id: 'd3', label: 'Queue Perf.', path: 'queue-performance' },
  { id: 'd4', label: 'Agent Perf.', path: 'agent-performance' },
  { id: 'd5', label: 'SLA Aging (Q)', path: 'sla-aging-queue' },
  { id: 'd6', label: 'SLA Aging (A)', path: 'sla-aging-agent' },
  { id: 'd7', label: 'Breaks', path: 'breaks-adherence' },
  { id: 'd8', label: 'Ticket Aging', path: 'ticket-aging' },
  { id: 'd9', label: 'Volume Mix', path: 'volume-mix' },
  { id: 'd10', label: 'Trends', path: 'trends' },
  { id: 'daily', label: 'Daily Report', path: 'daily-report' },
]

export function DashboardPage() {
  const { getDashboardSubModules } = useRbac()
  const accessibleSubModules = getDashboardSubModules()
  const location = useLocation()

  const tabs = ALL_TABS.filter((t) => accessibleSubModules.includes(t.id))
  const isRootDashboard = location.pathname === '/dashboard'

  return (
    <AppShell>
      <div className="space-y-5">
        {/* Tab bar */}
        <div className="overflow-x-auto">
          <div className="flex gap-1 border-b border-gray-200 min-w-max">
            {tabs.map((tab) => (
              <NavLink
                key={tab.id}
                to={`/dashboard/${tab.path}`}
                className={({ isActive }) =>
                  clsx(
                    'px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors relative',
                    isActive
                      ? 'text-brand-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-900'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-t'
                  )
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Filter bar (shown for non-live tabs) */}
        {!location.pathname.includes('queue-health') && !location.pathname.includes('live-agents') && (
          <FilterBar />
        )}

        {/* Routes */}
        <Routes>
          {isRootDashboard && tabs.length > 0 && (
            <Route index element={<Navigate to={tabs[0].path} replace />} />
          )}
          <Route path="queue-health" element={<D1_QueueHealthRealtime />} />
          <Route path="live-agents" element={<D2_LiveAgentMonitor />} />
          <Route path="queue-performance" element={<D3_QueuePerformance />} />
          <Route path="agent-performance" element={<D4_AgentPerformance />} />
          <Route path="sla-aging-queue" element={<D5_SlaAgingQueue />} />
          <Route path="sla-aging-agent" element={<D6_SlaAgingAgent />} />
          <Route path="breaks-adherence" element={<D7_BreaksAdherence />} />
          <Route path="ticket-aging" element={<D8_TicketAgingByQueue />} />
          <Route path="volume-mix" element={<D9_VolumeMix />} />
          <Route path="trends" element={<D10_Trends />} />
          <Route path="daily-report" element={<DailyActivityReport />} />
          <Route path="*" element={tabs.length > 0 ? <Navigate to={tabs[0].path} replace /> : null} />
        </Routes>
      </div>
    </AppShell>
  )
}
