import React, { useState, useEffect } from 'react'
import { dataService } from '../../services/mockAdapter'
import { useDashboardFilters } from '../../context/DashboardFilterContext'

const BUCKET_COLORS = ['#4caf50', '#8bc34a', '#ffeb3b', '#ff9800', '#f44336']
const BUCKETS = ['0-4h', '4-8h', '8-24h', '24-48h', '48h+']

function StackedBarChart({ data }: { data: Record<string, unknown>[] }) {
  const [tooltip, setTooltip] = useState<{ idx: number } | null>(null)
  if (!data.length) return null

  const pL = 120; const pR = 20; const pT = 12; const pB = 24
  const W = 760; const H = 300
  const plotW = W - pL - pR; const plotH = H - pT - pB

  const totals = data.map(row => BUCKETS.reduce((s, b) => s + (Number(row[b]) || 0), 0))
  const maxVal = Math.max(...totals, 1)
  const yMax = Math.ceil(maxVal / 10) * 10

  const barW = (plotW / data.length) * 0.6
  const barGap = (plotW / data.length) * 0.4

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(t => ({ val: Math.round(yMax * t), y: pT + plotH - plotH * t }))

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ display: 'block', minHeight: H }}>
      {yTicks.map(t => (
        <g key={t.val}>
          <line x1={pL} y1={t.y} x2={W - pR} y2={t.y} stroke="#f0f0f0" strokeWidth={1} />
          <text x={pL - 6} y={t.y + 4} textAnchor="end" fontSize={10} fill="#9ca3af">{t.val}</text>
        </g>
      ))}
      {data.map((row, di) => {
        const cx = pL + di * (plotW / data.length) + barGap / 2
        let currentY = pT + plotH
        const hovered = tooltip?.idx === di
        return (
          <g key={di} onMouseEnter={() => setTooltip({ idx: di })} onMouseLeave={() => setTooltip(null)}>
            {BUCKETS.map((b, bi) => {
              const val = Number(row[b]) || 0
              const bh = (val / yMax) * plotH
              const by = currentY - bh
              currentY = by
              return (
                <rect key={b} x={cx} y={by} width={barW} height={Math.max(bh, 0.5)}
                  fill={BUCKET_COLORS[bi]} opacity={hovered ? 1 : 0.85} rx={bi === BUCKETS.length - 1 ? 2 : 0} />
              )
            })}
            <text x={cx + barW / 2} y={pT + plotH + 14} textAnchor="middle" fontSize={9} fill="#6b7280">
              {String(row.queue_name ?? '').split(' ')[0]}
            </text>
            {hovered && (
              <g>
                <rect x={cx + barW + 4} y={pT} width={110} height={BUCKETS.length * 15 + 18} rx={4} fill="white" stroke="#e5e7eb" strokeWidth={1} />
                <text x={cx + barW + 10} y={pT + 13} fontSize={10} fill="#374151" fontWeight={600}>{String(row.queue_name)}</text>
                {BUCKETS.map((b, bi) => (
                  <text key={b} x={cx + barW + 10} y={pT + 25 + bi * 14} fontSize={10} fill={BUCKET_COLORS[bi]}>
                    {b}: {Number(row[b]) || 0}
                  </text>
                ))}
              </g>
            )}
          </g>
        )
      })}
      <line x1={pL} y1={pT + plotH} x2={W - pR} y2={pT + plotH} stroke="#e5e7eb" strokeWidth={1} />
    </svg>
  )
}

export function D5_SlaAgingQueue() {
  const { filters } = useDashboardFilters()
  const [data, setData] = useState<Record<string, unknown>[]>([])

  useEffect(() => { dataService.getSlaAging(filters).then(setData) }, [filters])

  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold text-gray-800">SLA Aging by Queue</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Aging Buckets per Queue (open tickets)</h4>
        <StackedBarChart data={data} />
        <div className="flex items-center justify-center gap-5 mt-3 flex-wrap">
          {BUCKETS.map((b, i) => (
            <div key={b} className="flex items-center gap-1.5 text-xs text-gray-600">
              <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: BUCKET_COLORS[i] }} />
              {b}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Queue</th>
              {BUCKETS.map((b) => <th key={b} className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">{b}</th>)}
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const total = BUCKETS.reduce((s, b) => s + (Number(row[b]) || 0), 0)
              return (
                <tr key={String(row.queue_name)} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{String(row.queue_name)}</td>
                  {BUCKETS.map((b, i) => (
                    <td key={b} className="px-4 py-3 text-center">
                      <span style={{ color: Number(row[b]) > 5 ? BUCKET_COLORS[i] : undefined, fontWeight: Number(row[b]) > 5 ? 600 : undefined }}>
                        {Number(row[b]) || 0}
                      </span>
                    </td>
                  ))}
                  <td className="px-4 py-3 text-center font-semibold">{total}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
