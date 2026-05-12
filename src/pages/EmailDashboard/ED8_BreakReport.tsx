import React from 'react'
import { BREAK_REPORT } from '../../data/emailDashboard.mock'
import { Coffee, Utensils, Brain, Droplets } from 'lucide-react'

export function ED8_BreakReport() {
  const toMinutes = (s: string) => {
    const hm = s.match(/(\d+)h\s*(\d+)m/)
    const m  = s.match(/^(\d+)m$/)
    if (hm) return parseInt(hm[1]) * 60 + parseInt(hm[2])
    if (m)  return parseInt(m[1])
    return 0
  }

  const totalTeaMins        = BREAK_REPORT.reduce((s,a)=>s+toMinutes(a.teaBreak),0)
  const totalLunchMins      = BREAK_REPORT.reduce((s,a)=>s+toMinutes(a.lunchBreak),0)
  const totalProductiveMins = BREAK_REPORT.reduce((s,a)=>s+toMinutes(a.productiveBreak),0)
  const totalBioMins        = BREAK_REPORT.reduce((s,a)=>s+toMinutes(a.bioBreak),0)

  const fmtMins = (m: number) => m >= 60 ? `${Math.floor(m/60)}h ${m%60}m` : `${m}m`

  const breakSummary = [
    { label: 'Tea Break',        total: fmtMins(totalTeaMins),        avg: fmtMins(Math.round(totalTeaMins/BREAK_REPORT.length)),        icon: Coffee,    color: 'bg-amber-50 text-amber-600' },
    { label: 'Lunch Break',      total: fmtMins(totalLunchMins),      avg: fmtMins(Math.round(totalLunchMins/BREAK_REPORT.length)),      icon: Utensils,  color: 'bg-orange-50 text-orange-600' },
    { label: 'Productive Break', total: fmtMins(totalProductiveMins), avg: fmtMins(Math.round(totalProductiveMins/BREAK_REPORT.length)), icon: Brain,     color: 'bg-purple-50 text-purple-600' },
    { label: 'Bio Break',        total: fmtMins(totalBioMins),        avg: fmtMins(Math.round(totalBioMins/BREAK_REPORT.length)),        icon: Droplets,  color: 'bg-sky-50 text-sky-600' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Break Report</h2>
        <p className="text-sm text-gray-500 mt-0.5">Agent-wise break time tracking for today</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {breakSummary.map(({ label, total, avg, icon: Icon, color }) => (
          <div key={label} className={`rounded-xl border p-4 ${color} border-opacity-20 border-current`}>
            <div className="flex items-center gap-2 mb-2">
              <Icon size={16} />
              <span className="text-sm font-semibold">{label}</span>
            </div>
            <p className="text-xl font-bold">{total}</p>
            <p className="text-xs opacity-70 mt-0.5">Avg: {avg}/agent</p>
          </div>
        ))}
      </div>

      {/* Detail Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#1a237e] text-white">
              <th className="text-left px-4 py-3 text-xs font-semibold">Agent Name</th>
              <th className="text-center px-4 py-3 text-xs font-semibold">☕ Tea Break</th>
              <th className="text-center px-4 py-3 text-xs font-semibold">🍽️ Lunch Break</th>
              <th className="text-center px-4 py-3 text-xs font-semibold">🧠 Productive Break</th>
              <th className="text-center px-4 py-3 text-xs font-semibold">💧 Bio Break</th>
              <th className="text-center px-4 py-3 text-xs font-semibold">Total Login</th>
              <th className="text-center px-4 py-3 text-xs font-semibold">Total Break</th>
              <th className="text-center px-4 py-3 text-xs font-semibold">Break %</th>
            </tr>
          </thead>
          <tbody>
            {BREAK_REPORT.map((a, i) => {
              const breakMins = toMinutes(a.teaBreak) + toMinutes(a.lunchBreak) + toMinutes(a.productiveBreak) + toMinutes(a.bioBreak)
              const loginMins = toMinutes(a.totalLogin)
              const breakPct  = loginMins > 0 ? Math.round((breakMins / loginMins) * 100) : 0
              return (
                <tr key={a.agent} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                  <td className="px-4 py-3 font-medium text-gray-900">{a.agent}</td>
                  <td className="px-4 py-3 text-center text-amber-700">{a.teaBreak}</td>
                  <td className="px-4 py-3 text-center text-orange-700">{a.lunchBreak}</td>
                  <td className="px-4 py-3 text-center text-purple-700">{a.productiveBreak === '0m' ? <span className="text-gray-300">—</span> : a.productiveBreak}</td>
                  <td className="px-4 py-3 text-center text-sky-600">{a.bioBreak}</td>
                  <td className="px-4 py-3 text-center font-semibold text-green-700">{a.totalLogin}</td>
                  <td className="px-4 py-3 text-center font-semibold text-gray-700">{a.totalBreak}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${breakPct > 25 ? 'bg-red-100 text-red-600' : breakPct > 18 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                      {breakPct}%
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
