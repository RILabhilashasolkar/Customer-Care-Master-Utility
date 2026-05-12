import React from 'react'
import { Routes, Route, Navigate, NavLink, useLocation } from 'react-router-dom'
import { ED1_Overview }        from './ED1_Overview'
import { ED2_LiveQueueMonitor } from './ED2_LiveQueueMonitor'
import { ED3_LiveAgentMonitor } from './ED3_LiveAgentMonitor'
import { ED4_QueuePerformance } from './ED4_QueuePerformance'
import { ED5_AgentPerformance } from './ED5_AgentPerformance'
import { ED6_VolumeCategory }   from './ED6_VolumeCategory'
import { ED7_DailyEmailFlow }   from './ED7_DailyEmailFlow'
import { ED8_BreakReport }      from './ED8_BreakReport'

const TABS = [
  { path: 'overview',       label: 'Overview'         },
  { path: 'live-queue',     label: 'Live Queue'       },
  { path: 'live-agents',    label: 'Live Agents'      },
  { path: 'queue-perf',     label: 'Queue Perf.'      },
  { path: 'agent-perf',     label: 'Agent Perf.'      },
  { path: 'volume-category',label: 'Volume & Category'},
  { path: 'email-flow',     label: 'Email Flow'       },
  { path: 'break-report',   label: 'Breaks'           },
]

export function EmailDashboardPage() {
  const location = useLocation()

  return (
    <div className="space-y-0">
      {/* Tab Bar */}
      <div className="bg-white border-b border-gray-200 -mx-6 px-6 mb-6">
        <nav className="flex gap-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {TABS.map(tab => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? 'border-[#1a237e] text-[#1a237e]'
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Routed Sub-pages */}
      <Routes>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview"        element={<ED1_Overview />} />
        <Route path="live-queue"      element={<ED2_LiveQueueMonitor />} />
        <Route path="live-agents"     element={<ED3_LiveAgentMonitor />} />
        <Route path="queue-perf"      element={<ED4_QueuePerformance />} />
        <Route path="agent-perf"      element={<ED5_AgentPerformance />} />
        <Route path="volume-category" element={<ED6_VolumeCategory />} />
        <Route path="email-flow"      element={<ED7_DailyEmailFlow />} />
        <Route path="break-report"    element={<ED8_BreakReport />} />
        <Route path="*"               element={<Navigate to="overview" replace />} />
      </Routes>
    </div>
  )
}
