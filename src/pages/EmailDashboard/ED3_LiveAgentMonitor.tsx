import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { LIVE_AGENT_MONITOR } from '../../data/emailDashboard.mock'

const STATUS_CONFIG = {
  busy:      { label: 'Busy',      class: 'bg-blue-100 text-blue-700' },
  available: { label: 'Available', class: 'bg-green-100 text-green-700' },
  break:     { label: 'On Break',  class: 'bg-amber-100 text-amber-700' },
}

export function ED3_LiveAgentMonitor() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')

  const filtered = LIVE_AGENT_MONITOR.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
                        a.empCode.includes(search) ||
                        a.queue.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || a.status === statusFilter.toLowerCase().replace(' ', '')
    return matchSearch && matchStatus
  })

  const counts = { All: LIVE_AGENT_MONITOR.length, Busy: 0, Available: 0, 'On Break': 0 }
  LIVE_AGENT_MONITOR.forEach(a => {
    if (a.status === 'busy') counts['Busy']++
    if (a.status === 'available') counts['Available']++
    if (a.status === 'break') counts['On Break']++
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Live Agent Monitor</h2>
        <p className="text-sm text-gray-500 mt-0.5">Real-time agent status across all email queues</p>
      </div>

      {/* Status Filter Chips */}
      <div className="flex items-center gap-3 flex-wrap">
        {Object.entries(counts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              statusFilter === status
                ? 'bg-[#1a237e] text-white border-[#1a237e]'
                : 'bg-white text-gray-600 border-gray-300 hover:border-[#1a237e]'
            }`}
          >
            {status} ({count})
          </button>
        ))}
        <div className="ml-auto relative">
          <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search agent / queue..."
            className="pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a237e] w-56"
          />
        </div>
      </div>

      {/* Agent Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#1a237e] text-white">
              <th className="text-left px-4 py-3 text-xs font-semibold">Emp Code</th>
              <th className="text-left px-4 py-3 text-xs font-semibold">Agent Name</th>
              <th className="text-center px-4 py-3 text-xs font-semibold">Status</th>
              <th className="text-center px-4 py-3 text-xs font-semibold">Login Hours</th>
              <th className="text-left px-4 py-3 text-xs font-semibold">TL Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold">Designation</th>
              <th className="text-center px-4 py-3 text-xs font-semibold">Break Reason</th>
              <th className="text-center px-4 py-3 text-xs font-semibold">Assigned Tickets</th>
              <th className="text-left px-4 py-3 text-xs font-semibold">Queue</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => {
              const sc = STATUS_CONFIG[a.status as keyof typeof STATUS_CONFIG]
              return (
                <tr key={a.empCode} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{a.empCode}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{a.name}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${sc.class}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${a.status === 'busy' ? 'bg-blue-500' : a.status === 'available' ? 'bg-green-500' : 'bg-amber-500'}`} />
                      {sc.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700">{a.loginHrs}</td>
                  <td className="px-4 py-3 text-gray-700">{a.tl}</td>
                  <td className="px-4 py-3 text-gray-600">{a.designation}</td>
                  <td className="px-4 py-3 text-center">
                    {a.breakReason ? (
                      <span className="bg-amber-50 text-amber-700 text-xs px-2 py-0.5 rounded-full">{a.breakReason}</span>
                    ) : <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-4 py-3 text-center font-semibold text-[#1a237e]">{a.assigned}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{a.queue}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-400 text-sm">No agents match the current filter</div>
        )}
      </div>
    </div>
  )
}
