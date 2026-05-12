import React, { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'
import { LIVE_QUEUE_MONITOR } from '../../data/emailDashboard.mock'

export function ED2_LiveQueueMonitor() {
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const [data, setData] = useState(LIVE_QUEUE_MONITOR)

  useEffect(() => {
    const id = setInterval(() => {
      setLastRefresh(new Date())
      setData(LIVE_QUEUE_MONITOR.map(q => ({
        ...q,
        pendingAssign: q.pendingAssign + Math.floor(Math.random() * 5) - 2,
        available: Math.max(0, q.available + Math.floor(Math.random() * 3) - 1),
      })))
    }, 30000)
    return () => clearInterval(id)
  }, [])

  const totalPending = data.reduce((s, q) => s + q.pendingAssign, 0)
  const totalAgents  = data.reduce((s, q) => s + q.loggedIn, 0)
  const totalBreak   = data.reduce((s, q) => s + q.onBreak, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Live Queue Monitor</h2>
          <p className="text-sm text-gray-500 mt-0.5">Real-time email queue status · Auto-refreshes every 30s</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <RefreshCw size={13} className="animate-spin" style={{ animationDuration: '3s' }} />
          Updated {lastRefresh.toLocaleTimeString()}
        </div>
      </div>

      {/* Summary Tiles */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Pending to Assign', value: totalPending, color: 'text-amber-600 bg-amber-50' },
          { label: 'Agents Logged In',         value: totalAgents,  color: 'text-green-600 bg-green-50' },
          { label: 'Agents on Break',           value: totalBreak,   color: 'text-rose-600 bg-rose-50' },
        ].map(({ label, value, color }) => (
          <div key={label} className={`rounded-xl p-4 border ${color} border-opacity-30 border-current`}>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-sm mt-1 opacity-80">{label}</p>
          </div>
        ))}
      </div>

      {/* Queue Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#1a237e] text-white">
              <th className="text-left px-4 py-3 text-xs font-semibold">Queue Name</th>
              <th className="text-center px-4 py-3 text-xs font-semibold">Pending to Assign</th>
              <th className="text-center px-4 py-3 text-xs font-semibold">Agents in Queue</th>
              <th className="text-center px-4 py-3 text-xs font-semibold">Logged In</th>
              <th className="text-center px-4 py-3 text-xs font-semibold">Logged Out</th>
              <th className="text-center px-4 py-3 text-xs font-semibold">Available</th>
              <th className="text-center px-4 py-3 text-xs font-semibold">Productive Break</th>
              <th className="text-center px-4 py-3 text-xs font-semibold">On Break</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.queue} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                <td className="px-4 py-3 font-medium text-gray-900">{row.queue}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${row.pendingAssign > 100 ? 'bg-red-100 text-red-700' : row.pendingAssign > 50 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                    {row.pendingAssign}
                  </span>
                </td>
                <td className="px-4 py-3 text-center font-medium">{row.agentsInQueue}</td>
                <td className="px-4 py-3 text-center text-green-600 font-semibold">{row.loggedIn}</td>
                <td className="px-4 py-3 text-center text-gray-400">{row.loggedOut}</td>
                <td className="px-4 py-3 text-center text-blue-600 font-semibold">{row.available}</td>
                <td className="px-4 py-3 text-center text-indigo-600">{row.productiveBreak}</td>
                <td className="px-4 py-3 text-center text-amber-600 font-semibold">{row.onBreak}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 font-semibold text-gray-700 text-sm">
              <td className="px-4 py-3">Total</td>
              <td className="px-4 py-3 text-center">{data.reduce((s,q)=>s+q.pendingAssign,0)}</td>
              <td className="px-4 py-3 text-center">{data.reduce((s,q)=>s+q.agentsInQueue,0)}</td>
              <td className="px-4 py-3 text-center">{data.reduce((s,q)=>s+q.loggedIn,0)}</td>
              <td className="px-4 py-3 text-center">{data.reduce((s,q)=>s+q.loggedOut,0)}</td>
              <td className="px-4 py-3 text-center">{data.reduce((s,q)=>s+q.available,0)}</td>
              <td className="px-4 py-3 text-center">{data.reduce((s,q)=>s+q.productiveBreak,0)}</td>
              <td className="px-4 py-3 text-center">{data.reduce((s,q)=>s+q.onBreak,0)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
