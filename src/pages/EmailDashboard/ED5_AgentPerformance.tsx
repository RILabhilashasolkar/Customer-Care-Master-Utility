import React from 'react'
import { AGENT_PERFORMANCE_EMAIL } from '../../data/emailDashboard.mock'
import { BarChartWidget } from '../../components/charts/BarChartWidget'

export function ED5_AgentPerformance() {
  const chartData = AGENT_PERFORMANCE_EMAIL.map(a => ({
    name: a.agent.split(' ')[0],
    assigned: a.assigned,
    resolved: a.resolved,
    pending:  a.pending,
  }))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Agent Wise Performance</h2>
        <p className="text-sm text-gray-500 mt-0.5">Individual agent email handling metrics</p>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <BarChartWidget
          data={chartData}
          xKey="name"
          title="Assigned vs Resolved vs Pending"
          bars={[
            { key: 'assigned', label: 'Assigned', color: '#1a237e' },
            { key: 'resolved', label: 'Resolved', color: '#4caf50' },
            { key: 'pending',  label: 'Pending',  color: '#f59e0b' },
          ]}
          height={250}
        />
      </div>

      {/* Detail Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead>
            <tr className="bg-[#1a237e] text-white">
              <th className="text-left px-4 py-3 text-xs font-semibold">Agent Name (BP ID)</th>
              <th className="text-center px-3 py-3 text-xs font-semibold">Assigned</th>
              <th className="text-center px-3 py-3 text-xs font-semibold">Pending</th>
              <th className="text-center px-3 py-3 text-xs font-semibold">Resolved</th>
              <th className="text-center px-3 py-3 text-xs font-semibold">Actioned</th>
              <th className="text-center px-3 py-3 text-xs font-semibold">Transferred</th>
              <th className="text-center px-3 py-3 text-xs font-semibold">Fresh</th>
              <th className="text-center px-3 py-3 text-xs font-semibold">Repeat</th>
              <th className="text-center px-3 py-3 text-xs font-semibold">AHT (min)</th>
              <th className="text-center px-3 py-3 text-xs font-semibold">Res. Rate</th>
            </tr>
          </thead>
          <tbody>
            {AGENT_PERFORMANCE_EMAIL.map((a, i) => {
              const resRate = Math.round((a.resolved / a.assigned) * 100)
              return (
                <tr key={a.agent} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{a.agent}</p>
                    <p className="text-xs text-gray-400">{a.bpId}</p>
                  </td>
                  <td className="px-3 py-3 text-center font-semibold text-gray-800">{a.assigned}</td>
                  <td className="px-3 py-3 text-center text-amber-600 font-semibold">{a.pending}</td>
                  <td className="px-3 py-3 text-center text-green-600 font-semibold">{a.resolved}</td>
                  <td className="px-3 py-3 text-center text-blue-700 font-semibold">{a.actioned}</td>
                  <td className="px-3 py-3 text-center text-gray-500">{a.transferred}</td>
                  <td className="px-3 py-3 text-center text-sky-600">{a.fresh}</td>
                  <td className="px-3 py-3 text-center text-rose-500">{a.repeat}</td>
                  <td className="px-3 py-3 text-center text-indigo-600 font-semibold">{a.aht}m</td>
                  <td className="px-3 py-3 text-center">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${resRate >= 65 ? 'bg-green-100 text-green-700' : resRate >= 55 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600'}`}>
                      {resRate}%
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
