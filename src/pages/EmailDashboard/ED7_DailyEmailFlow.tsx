import React, { useState } from 'react'
import { DAILY_EMAIL_FLOW } from '../../data/emailDashboard.mock'
import { AreaChartWidget } from '../../components/charts/AreaChartWidget'

export function ED7_DailyEmailFlow() {
  const [view, setView] = useState<'90d' | '30d' | '7d'>('30d')

  const sliceMap = { '90d': 90, '30d': 30, '7d': 7 }
  const displayData = DAILY_EMAIL_FLOW.slice(-sliceMap[view])

  const totalReceived = displayData.reduce((s, d) => s + d.received, 0)
  const totalResolved = displayData.reduce((s, d) => s + d.resolved, 0)
  const totalPending  = displayData.reduce((s, d) => s + d.pending, 0)
  const avgDaily      = Math.round(totalReceived / displayData.length)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Daily Email Flow</h2>
          <p className="text-sm text-gray-500 mt-0.5">Email volume trends over time</p>
        </div>
        <div className="flex rounded-lg overflow-hidden border border-gray-300">
          {(['7d','30d','90d'] as const).map(v => (
            <button key={v} onClick={() => setView(v)}
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${view === v ? 'bg-[#1a237e] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
              {v === '7d' ? '7 Days' : v === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Summary tiles */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: `Total Received (${view})`, value: totalReceived.toLocaleString(), color: 'text-[#1a237e]' },
          { label: `Total Resolved (${view})`, value: totalResolved.toLocaleString(), color: 'text-green-600'  },
          { label: `Total Pending (${view})`,  value: totalPending.toLocaleString(),  color: 'text-amber-600'  },
          { label: 'Daily Avg Received',        value: avgDaily.toLocaleString(),       color: 'text-indigo-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Area Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <AreaChartWidget
          data={displayData}
          xKey="day"
          title={`Email Volume Trend — Last ${sliceMap[view]} Days`}
          areas={[
            { key: 'received', label: 'Received', color: '#1a237e' },
            { key: 'resolved', label: 'Resolved', color: '#4caf50' },
          ]}
          height={280}
        />
      </div>

      {/* Daily breakdown table (last 10 days) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-5 pt-4 pb-2">
          <h3 className="text-sm font-semibold text-gray-700">Recent Daily Breakdown (Last 10 Days)</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-600 uppercase">Date</th>
              <th className="text-center px-4 py-2.5 text-xs font-semibold text-gray-600 uppercase">Received</th>
              <th className="text-center px-4 py-2.5 text-xs font-semibold text-gray-600 uppercase">Resolved</th>
              <th className="text-center px-4 py-2.5 text-xs font-semibold text-gray-600 uppercase">Pending</th>
              <th className="text-center px-4 py-2.5 text-xs font-semibold text-gray-600 uppercase">Resolution Rate</th>
            </tr>
          </thead>
          <tbody>
            {[...DAILY_EMAIL_FLOW].reverse().slice(0, 10).map((d, i) => {
              const rate = Math.round((d.resolved / d.received) * 100)
              return (
                <tr key={d.day} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="px-4 py-2.5 font-medium text-gray-700">{d.day}</td>
                  <td className="px-4 py-2.5 text-center font-semibold text-[#1a237e]">{d.received}</td>
                  <td className="px-4 py-2.5 text-center text-green-600 font-semibold">{d.resolved}</td>
                  <td className="px-4 py-2.5 text-center text-amber-600">{d.pending}</td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${rate >= 85 ? 'bg-green-100 text-green-700' : rate >= 70 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600'}`}>{rate}%</span>
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
