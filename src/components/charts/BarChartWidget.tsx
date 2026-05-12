import React, { useState, useCallback, useRef } from 'react'

interface BarConfig {
  key: string
  label: string
  color: string
}

interface BarChartWidgetProps {
  data: Record<string, unknown>[]
  xKey: string
  bars: BarConfig[]
  title?: string
  height?: number
}

export function BarChartWidget({ data, xKey, bars, title, height = 280 }: BarChartWidgetProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const pL = 40; const pR = 16; const pT = 10; const pB = 40
  const W = 700; const H = height
  const plotW = W - pL - pR
  const plotH = H - pT - pB

  const slotW = data && data.length > 0 ? plotW / data.length : 0

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current || !slotW) return
    const rect = svgRef.current.getBoundingClientRect()
    const scaleX = W / rect.width
    const mouseX = (e.clientX - rect.left) * scaleX - pL
    if (mouseX < 0 || mouseX > plotW) { setHoveredIdx(null); return }
    setHoveredIdx(Math.floor(mouseX / slotW))
  }, [slotW, plotW])

  if (!data || data.length === 0) return null

  const allValues = data.flatMap(d => bars.map(b => Number(d[b.key] ?? 0)))
  const maxVal = Math.max(...allValues, 1)
  const yMax = Math.ceil(maxVal / 10) * 10

  const barPad = slotW * 0.15
  const totalBarW = slotW - barPad * 2
  const barW = (totalBarW - (bars.length - 1)) / bars.length

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(t => ({
    val: Math.round(yMax * t),
    y: pT + plotH - plotH * t
  }))

  return (
    <div>
      {title && <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>}
      <svg
        ref={svgRef}
        width="100%"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block', minHeight: height, cursor: 'default' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {/* Y grid + labels */}
        {yTicks.map(t => (
          <g key={t.val}>
            <line x1={pL} y1={t.y} x2={W - pR} y2={t.y} stroke="#f0f0f0" strokeWidth={1} />
            <text x={pL - 6} y={t.y + 4} textAnchor="end" fontSize={10} fill="#9ca3af">{t.val}</text>
          </g>
        ))}

        {/* Bars */}
        {data.map((row, di) => {
          const slotX = pL + di * slotW + barPad
          const hovered = hoveredIdx === di
          return (
            <g key={di}>
              {bars.map((bar, bi) => {
                const val = Number(row[bar.key] ?? 0)
                const bh = Math.max((val / yMax) * plotH, val > 0 ? 1 : 0)
                const bx = slotX + bi * (barW + 1)
                const by = pT + plotH - bh
                return (
                  <rect
                    key={bi} x={bx} y={by}
                    width={Math.max(barW, 2)} height={bh}
                    fill={bar.color}
                    opacity={hoveredIdx !== null && !hovered ? 0.5 : 0.9}
                    rx={2} ry={2}
                    style={{ transition: 'opacity 0.1s' }}
                  />
                )
              })}
              {/* X axis label */}
              <text
                x={slotX + totalBarW / 2}
                y={pT + plotH + 16}
                textAnchor="middle" fontSize={9} fill="#6b7280"
              >
                {String(row[xKey] ?? '').split(' ')[0]}
              </text>
            </g>
          )
        })}

        {/* X axis line */}
        <line x1={pL} y1={pT + plotH} x2={W - pR} y2={pT + plotH} stroke="#e5e7eb" strokeWidth={1} />

        {/* Tooltip */}
        {hoveredIdx !== null && hoveredIdx < data.length && (() => {
          const row = data[hoveredIdx]
          const slotX = pL + hoveredIdx * slotW + barPad
          const tx = slotX + totalBarW / 2
          const boxX = tx + 6 > W - 120 ? tx - 120 : tx + 6
          const boxH = bars.length * 16 + 20
          return (
            <g>
              <rect x={boxX} y={pT + 4} width={112} height={boxH} rx={4}
                fill="white" stroke="#e5e7eb" strokeWidth={1}
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.08))' }} />
              <text x={boxX + 8} y={pT + 17} fontSize={10} fill="#374151" fontWeight={600}>
                {String(row[xKey] ?? '')}
              </text>
              {bars.map((bar, bi) => (
                <text key={bi} x={boxX + 8} y={pT + 30 + bi * 15} fontSize={10} fill={bar.color} fontWeight={500}>
                  {bar.label}: {Number(row[bar.key] ?? 0)}
                </text>
              ))}
            </g>
          )
        })()}
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 mt-1">
        {bars.map(b => (
          <div key={b.key} className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: b.color }} />
            {b.label}
          </div>
        ))}
      </div>
    </div>
  )
}
