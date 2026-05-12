import React from 'react'
import { QUEUE_PERFORMANCE } from '../../data/emailDashboard.mock'

export function ED4_QueuePerformance() {
  const totals = {
    received:     QUEUE_PERFORMANCE.reduce((s,q)=>s+q.received,0),
    pendingAssign:QUEUE_PERFORMANCE.reduce((s,q)=>s+q.pendingAssign,0),
    actioned:     QUEUE_PERFORMANCE.reduce((s,q)=>s+q.actioned,0),
    unanswered:   QUEUE_PERFORMANCE.reduce((s,q)=>s+q.unanswered,0),
    custReplied:  QUEUE_PERFORMANCE.reduce((s,q)=>s+q.custReplied,0),
    resolved:     QUEUE_PERFORMANCE.reduce((s,q)=>s+q.resolved,0),
    transferred:  QUEUE_PERFORMANCE.reduce((s,q)=>s+q.transferred,0),
    withinSla:    QUEUE_PERFORMANCE.reduce((s,q)=>s+q.withinSla,0),
    outSla:       QUEUE_PERFORMANCE.reduce((s,q)=>s+q.outSla,0),
    fresh:        QUEUE_PERFORMANCE.reduce((s,q)=>s+q.fresh,0),
    repeat:       QUEUE_PERFORMANCE.reduce((s,q)=>s+q.repeat,0),
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Queue Performance</h2>
        <p className="text-sm text-gray-500 mt-0.5">Email volume and SLA metrics per queue</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="bg-[#1a237e] text-white">
              <th className="text-left px-4 py-3 text-xs font-semibold sticky left-0 bg-[#1a237e]">Queue Name</th>
              <th className="text-center px-3 py-3 text-xs font-semibold">Total Received</th>
              <th className="text-center px-3 py-3 text-xs font-semibold">Pending Assign</th>
              <th className="text-center px-3 py-3 text-xs font-semibold">Total Actioned</th>
              <th className="text-center px-3 py-3 text-xs font-semibold">Unanswered</th>
              <th className="text-center px-3 py-3 text-xs font-semibold">Cust. Replied</th>
              <th className="text-center px-3 py-3 text-xs font-semibold">Resolved</th>
              <th className="text-center px-3 py-3 text-xs font-semibold">Transferred</th>
              <th className="text-center px-3 py-3 text-xs font-semibold">Within SLA</th>
              <th className="text-center px-3 py-3 text-xs font-semibold">Out of SLA</th>
              <th className="text-center px-3 py-3 text-xs font-semibold">Fresh</th>
              <th className="text-center px-3 py-3 text-xs font-semibold">Repeat</th>
            </tr>
          </thead>
          <tbody>
            {QUEUE_PERFORMANCE.map((row, i) => (
              <tr key={row.queue} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                <td className="px-4 py-3 font-medium text-gray-900 sticky left-0 bg-inherit">{row.queue}</td>
                <td className="px-3 py-3 text-center font-semibold text-gray-800">{row.received}</td>
                <td className="px-3 py-3 text-center">
                  <span className={`font-semibold ${row.pendingAssign > 100 ? 'text-red-600' : row.pendingAssign > 50 ? 'text-amber-600' : 'text-gray-700'}`}>{row.pendingAssign}</span>
                </td>
                <td className="px-3 py-3 text-center text-blue-700 font-semibold">{row.actioned}</td>
                <td className="px-3 py-3 text-center text-amber-600 font-semibold">{row.unanswered}</td>
                <td className="px-3 py-3 text-center text-indigo-600">{row.custReplied}</td>
                <td className="px-3 py-3 text-center text-green-600 font-semibold">{row.resolved}</td>
                <td className="px-3 py-3 text-center text-gray-500">{row.transferred}</td>
                <td className="px-3 py-3 text-center text-emerald-600 font-semibold">{row.withinSla}</td>
                <td className="px-3 py-3 text-center text-red-500 font-semibold">{row.outSla}</td>
                <td className="px-3 py-3 text-center text-sky-600">{row.fresh}</td>
                <td className="px-3 py-3 text-center text-rose-500">{row.repeat}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 font-semibold text-gray-700 text-sm border-t-2 border-gray-300">
              <td className="px-4 py-3 sticky left-0 bg-gray-100">Total</td>
              <td className="px-3 py-3 text-center">{totals.received}</td>
              <td className="px-3 py-3 text-center">{totals.pendingAssign}</td>
              <td className="px-3 py-3 text-center">{totals.actioned}</td>
              <td className="px-3 py-3 text-center">{totals.unanswered}</td>
              <td className="px-3 py-3 text-center">{totals.custReplied}</td>
              <td className="px-3 py-3 text-center">{totals.resolved}</td>
              <td className="px-3 py-3 text-center">{totals.transferred}</td>
              <td className="px-3 py-3 text-center">{totals.withinSla}</td>
              <td className="px-3 py-3 text-center">{totals.outSla}</td>
              <td className="px-3 py-3 text-center">{totals.fresh}</td>
              <td className="px-3 py-3 text-center">{totals.repeat}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* SLA per Queue mini bars */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">SLA Compliance per Queue</h3>
        <div className="space-y-3">
          {QUEUE_PERFORMANCE.map(q => {
            const slaRate = Math.round((q.withinSla / q.received) * 100)
            return (
              <div key={q.queue}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-600">{q.queue}</span>
                  <span className={`text-xs font-semibold ${slaRate >= 90 ? 'text-emerald-600' : slaRate >= 75 ? 'text-amber-600' : 'text-red-500'}`}>{slaRate}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${slaRate >= 90 ? 'bg-emerald-500' : slaRate >= 75 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${slaRate}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
