import React from 'react'
import { QUEUE_VOLUME, EMAIL_CATEGORY_BREAKDOWN, EMAIL_QUEUES } from '../../data/emailDashboard.mock'

const CAT_COLORS = ['#1a237e', '#4caf50', '#f59e0b', '#ef4444']
const QUEUE_COLORS = ['#1a237e','#3949ab','#5c6bc0','#7986cb','#9fa8da','#c5cae9']

export function ED6_VolumeCategory() {
  // Build stacked bar chart for category breakdown
  const maxCatVal = Math.max(...EMAIL_CATEGORY_BREAKDOWN.map(c =>
    EMAIL_QUEUES.reduce((s, q) => s + (c[q as keyof typeof c] as number || 0), 0)
  ))

  const pL=60; const pR=20; const pT=10; const pB=60
  const W=700; const H=260
  const plotW=W-pL-pR; const plotH=H-pT-pB
  const slotW = plotW / EMAIL_CATEGORY_BREAKDOWN.length
  const barW  = slotW * 0.6
  const yMax  = Math.ceil(maxCatVal / 50) * 50

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Volume &amp; Category Mix</h2>
        <p className="text-sm text-gray-500 mt-0.5">Queue level volume and email category breakdown</p>
      </div>

      {/* Queue Level Volume Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <div className="px-5 pt-4 pb-2">
          <h3 className="text-sm font-semibold text-gray-700">Queue Level Volume</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-600 uppercase">Queue</th>
              <th className="text-center px-3 py-2.5 text-xs font-semibold text-gray-600 uppercase">Received</th>
              <th className="text-center px-3 py-2.5 text-xs font-semibold text-gray-600 uppercase">Open</th>
              <th className="text-center px-3 py-2.5 text-xs font-semibold text-gray-600 uppercase">Pending</th>
              <th className="text-center px-3 py-2.5 text-xs font-semibold text-gray-600 uppercase">Closed</th>
              <th className="text-center px-3 py-2.5 text-xs font-semibold text-gray-600 uppercase">Escalated</th>
              <th className="text-center px-3 py-2.5 text-xs font-semibold text-gray-600 uppercase">Within TAT</th>
              <th className="text-center px-3 py-2.5 text-xs font-semibold text-gray-600 uppercase">Out of TAT</th>
              <th className="text-center px-3 py-2.5 text-xs font-semibold text-gray-600 uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {QUEUE_VOLUME.map((q, i) => (
              <tr key={q.queue} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}>
                <td className="px-4 py-3 font-medium text-gray-900">{q.queue}</td>
                <td className="px-3 py-3 text-center font-semibold">{q.received}</td>
                <td className="px-3 py-3 text-center text-blue-600">{q.pendingAssign}</td>
                <td className="px-3 py-3 text-center text-amber-600 font-semibold">{q.unanswered}</td>
                <td className="px-3 py-3 text-center text-green-600 font-semibold">{q.resolved}</td>
                <td className="px-3 py-3 text-center text-red-500">{q.transferred}</td>
                <td className="px-3 py-3 text-center text-emerald-600">{q.withinSla}</td>
                <td className="px-3 py-3 text-center text-red-500 font-semibold">{q.outSla}</td>
                <td className="px-3 py-3 text-center">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${q.status === 'Healthy' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{q.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Category Breakdown Stacked Bar Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Queue Wise Email Category Breakdown</h3>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: H }}>
          {/* Y-axis grid */}
          {[0,0.25,0.5,0.75,1].map(t => {
            const y = pT + plotH - plotH * t
            const val = Math.round(yMax * t)
            return (
              <g key={t}>
                <line x1={pL} y1={y} x2={pL+plotW} y2={y} stroke="#f0f0f0" strokeWidth="1" />
                <text x={pL-6} y={y+4} textAnchor="end" fontSize="10" fill="#999">{val}</text>
              </g>
            )
          })}
          {/* Stacked bars per category */}
          {EMAIL_CATEGORY_BREAKDOWN.map((cat, ci) => {
            const x = pL + ci * slotW + (slotW - barW) / 2
            let stackY = pT + plotH
            return (
              <g key={cat.category}>
                {EMAIL_QUEUES.map((q, qi) => {
                  const val = (cat[q as keyof typeof cat] as number) || 0
                  const barH = (val / yMax) * plotH
                  stackY -= barH
                  return (
                    <rect key={q} x={x} y={stackY} width={barW} height={barH}
                      fill={QUEUE_COLORS[qi]} opacity={0.85} rx={qi === EMAIL_QUEUES.length - 1 ? 2 : 0} />
                  )
                })}
                <text x={x + barW/2} y={pT+plotH+14} textAnchor="middle" fontSize="9" fill="#666"
                  style={{ fontSize: '9px' }}>
                  {cat.category.replace(' Related','').replace('InstallatioN','Install.')}
                </text>
              </g>
            )
          })}
          <line x1={pL} y1={pT+plotH} x2={pL+plotW} y2={pT+plotH} stroke="#ddd" strokeWidth="1" />
        </svg>
        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-2">
          {EMAIL_QUEUES.map((q, i) => (
            <span key={q} className="flex items-center gap-1.5 text-xs text-gray-600">
              <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: QUEUE_COLORS[i] }} />
              {q}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
