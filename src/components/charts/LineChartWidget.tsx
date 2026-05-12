import React, { useState } from 'react'

interface LineConfig {
  key: string
  label: string
  color: string
}

interface LineChartWidgetProps {
  data: Record<string, unknown>[]
  xKey: string
  lines: LineConfig[]
  title?: string
  height?: number
}

export function LineChartWidget({ data, xKey, lines, title, height = 280 }: LineChartWidgetProps) {
  const [tooltip, setTooltip] = useState<{ idx: number } | null>(null)
  if (!data || data.length === 0) return null

  const pL = 44; const pR = 16; const pT = 10; const pB = 36
  const W = 700; const H = height
  const plotW = W - pL - pR; const plotH = H - pT - pB

  const allValues = data.flatMap(d => lines.map(l => Number(d[l.key] ?? 0)))
  const maxVal = Math.max(...allValues, 1)
  const yMax = Math.ceil(maxVal / 10) * 10

  const xStep = plotW / (data.length - 1 || 1)
  const getX = (i: number) => pL + i * xStep
  const getY = (val: number) => pT + plotH - (val / yMax) * plotH

  const buildLine = (key: string) =>
    data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getY(Number(d[key] ?? 0)).toFixed(1)}`).join(' ')

  const xLabelStep = Math.max(1, Math.floor(data.length / 8))
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(t => ({ val: Math.round(yMax * t), y: pT + plotH - plotH * t }))
  const hoveredRow = tooltip !== null ? data[tooltip.idx] : null

  return (
    <div>
      {title && <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>}
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ display: 'block', minHeight: height }}>
        {yTicks.map(t => (
          <g key={t.val}>
            <line x1={pL} y1={t.y} x2={W - pR} y2={t.y} stroke="#f0f0f0" strokeWidth={1} />
            <text x={pL - 6} y={t.y + 4} textAnchor="end" fontSize={10} fill="#9ca3af">{t.val}</text>
          </g>
        ))}
        {lines.map(l => (
          <path key={l.key} d={buildLine(l.key)} fill="none" stroke={l.color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        ))}
        {data.map((d, i) => {
          if (i % xLabelStep !== 0) return null
          return <text key={i} x={getX(i)} y={pT + plotH + 14} textAnchor="middle" fontSize={9} fill="#9ca3af">{String(d[xKey] ?? '')}</text>
        })}
        <line x1={pL} y1={pT + plotH} x2={W - pR} y2={pT + plotH} stroke="#e5e7eb" strokeWidth={1} />
        {data.map((_, i) => (
          <rect key={i} x={getX(i) - xStep / 2} y={pT} width={xStep} height={plotH} fill="transparent" style={{ cursor: 'crosshair' }}
            onMouseEnter={() => setTooltip({ idx: i })} onMouseLeave={() => setTooltip(null)} />
        ))}
        {tooltip && hoveredRow && (
          <g>
            <line x1={getX(tooltip.idx)} y1={pT} x2={getX(tooltip.idx)} y2={pT + plotH} stroke="#6b7280" strokeWidth={1} strokeDasharray="4 2" />
            {lines.map(l => <circle key={l.key} cx={getX(tooltip.idx)} cy={getY(Number(hoveredRow[l.key] ?? 0))} r={4} fill={l.color} stroke="white" strokeWidth={2} />)}
          </g>
        )}
      </svg>
      <div className="flex items-center gap-5 mt-1 ml-10">
        {lines.map(l => (
          <div key={l.key} className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="w-6 h-0.5 inline-block rounded" style={{ backgroundColor: l.color }} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  )
}
