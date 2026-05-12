import React from 'react'
import { Download } from 'lucide-react'
import { MOCK_QUEUE_SNAPSHOTS } from '../../data/queues.mock'

export function DailyActivityReport() {
  const handleExport = () => {
    alert('Export functionality: In production, this would generate and download a CSV/Excel report.')
  }

  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-800">Daily Activity Report</h2>
          <p className="text-xs text-gray-500 mt-0.5">As of: {today}</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-brand-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-800"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Queue</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Opened Today</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Resolved Today</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Current Backlog</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">SLA Breached</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">SLA At Risk</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Agents Online</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_QUEUE_SNAPSHOTS.map((q) => {
              const openedToday = Math.floor(q.total_tickets * 0.08)
              const resolvedToday = Math.floor(q.total_resolved * 0.09)
              return (
                <tr key={q.queue_id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{q.queue_name}</td>
                  <td className="px-4 py-3 text-center">{openedToday}</td>
                  <td className="px-4 py-3 text-center text-green-600 font-semibold">{resolvedToday}</td>
                  <td className="px-4 py-3 text-center font-semibold">{q.total_backlog}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={q.sla_breached_open > 5 ? 'text-red-600 font-semibold' : q.sla_breached_open > 0 ? 'text-yellow-600' : 'text-green-600'}>
                      {q.sla_breached_open}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-yellow-600">{q.sla_at_risk_open}</td>
                  <td className="px-4 py-3 text-center">{q.agents_online}/{q.agents_mapped}</td>
                </tr>
              )
            })}
            <tr className="bg-gray-50 font-semibold border-t-2 border-gray-300">
              <td className="px-4 py-3">TOTAL</td>
              <td className="px-4 py-3 text-center">{MOCK_QUEUE_SNAPSHOTS.reduce((s, q) => s + Math.floor(q.total_tickets * 0.08), 0)}</td>
              <td className="px-4 py-3 text-center text-green-600">{MOCK_QUEUE_SNAPSHOTS.reduce((s, q) => s + Math.floor(q.total_resolved * 0.09), 0)}</td>
              <td className="px-4 py-3 text-center">{MOCK_QUEUE_SNAPSHOTS.reduce((s, q) => s + q.total_backlog, 0)}</td>
              <td className="px-4 py-3 text-center text-red-600">{MOCK_QUEUE_SNAPSHOTS.reduce((s, q) => s + q.sla_breached_open, 0)}</td>
              <td className="px-4 py-3 text-center text-yellow-600">{MOCK_QUEUE_SNAPSHOTS.reduce((s, q) => s + q.sla_at_risk_open, 0)}</td>
              <td className="px-4 py-3 text-center">{MOCK_QUEUE_SNAPSHOTS.reduce((s, q) => s + q.agents_online, 0)}/{MOCK_QUEUE_SNAPSHOTS.reduce((s, q) => s + q.agents_mapped, 0)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
