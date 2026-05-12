import React, { useState } from 'react'
import { MOCK_AGENT_PERFORMANCE } from '../../data/kpiSnapshots.mock'

const BUCKET_COLORS = ['#4caf50', '#8bc34a', '#ffeb3b', '#ff9800', '#f44336']
const BUCKETS = ['0-4h', '4-8h', '8-24h', '24-48h', '48h+']

type AgentAgingRow = { agent_name: string; [key: string]: string | number }

function generateAgentAgingData(): AgentAgingRow[] {
  // Use seeded-like values (not random) so no re-renders flicker
  const seeds = [8,3,2,1,0, 6,4,1,0,0, 7,2,3,0,0, 5,3,1,1,0, 9,2,0,0,0, 4,5,2,1,0, 6,1,2,0,0, 7,3,0,1,0, 3,2,1,0,0, 5,4,2,0,0]
  return MOCK_AGENT_PERFORMANCE.slice(0, 10).map((a, ai) => ({
    agent_name: a.agent_name.split(' ')[0],
    '0-4h':   seeds[ai * 5 + 0],
    '4-8h':   seeds[ai * 5 + 1],
    '8-24h':  seeds[ai * 5 + 2],
    '24-48h': seeds[ai * 5 + 3],
    '48h+':   seeds[ai * 5 + 4],
  }))
}

function StackedBarChart({ data, xKey }: { data: Record<string, unknown>[]; xKey: string }) {
  const [tooltip, setTooltip] = useState<{ idx: number } | null>(null)
  if (!data.length) return null

  const pL = 44; const pR = 20; const pT = 12; const pB = 24
  const W = 700; const H = 280
  const plotW = W - pL - pR; const plotH = H - pT - pB

  const totals = data.map(row => BUCKETS.reduce((s, b) => s + (Number(row[b]) || 0), 0))
  const maxVal = Math.max(...totals, 1)
  const yMax = Math.ceil(maxVal / 5) * 5

  const barW = (plotW / data.length) * 0.55
  const slotW = plotW / data.length

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
        const cx = pL + di * slotW + (slotW - barW) / 2
        let currentY = pT + plotH
        const hovered = tooltip?.idx === di
        return (
          <g key={di} onMouseEnter={() => setTooltip({ idx: di })} onMouseLeave={() => setTooltip(null)} style={{ cursor: 'pointer' }}>
            {BUCKETS.map((b, bi) => {
              const val = Number(row[b]) || 0
              const bh = (val / yMax) * plotH
              const by = currentY - bh
              currentY = by
              return <rect key={b} x={cx} y={by} width={barW} height={Math.max(bh, 0.5)} fill={BUCKET_COLORS[bi]} opacity={hovered ? 1 : 0.85} rx={bi === BUCKETS.length - 1 ? 2 : 0} />
            })}
            <text x={cx + barW / 2} y={pT + plotH + 14} textAnchor="middle" fontSize={9} fill="#6b7280">
              {String(row[xKey] ?? '')}
            </text>
            {hovered && (
              <g>
                <rect x={Math.min(cx + barW + 4, W - 120)} y={pT + 2} width={110} height={BUCKETS.length * 15 + 18} rx={4} fill="white" stroke="#e5e7eb" strokeWidth={1} />
                <text x={Math.min(cx + barW + 10, W - 114)} y={pT + 16} fontSize={10} fill="#374151" fontWeight={600}>{String(row[xKey])}</text>
                {BUCKETS.map((b, bi) => (
                  <text key={b} x={Math.min(cx + barW + 10, W - 114)} y={pT + 28 + bi * 14} fontSize={10} fill={BUCKET_COLORS[bi]}>{b}: {Number(row[b]) || 0}</text>
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

export function D6_SlaAgingAgent() {
  const [data] = useState(generateAgentAgingData)

  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold text-gray-800">SLA Aging by Agent</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Aging Buckets per Agent (open tickets)</h4>
        <StackedBarChart data={data} xKey="agent_name" />
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
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Agent</th>
              {BUCKETS.map((b) => <th key={b} className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">{b}</th>)}
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const total = BUCKETS.reduce((s, b) => s + (Number(row[b]) || 0), 0)
              return (
                <tr key={String(row.agent_name)} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{String(row.agent_name)}</td>
                  {BUCKETS.map((b, i) => (
                    <td key={b} className="px-4 py-3 text-center">
                      <span style={{ color: Number(row[b]) > 3 ? BUCKET_COLORS[i] : undefined, fontWeight: Number(row[b]) > 3 ? 600 : undefined }}>
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
