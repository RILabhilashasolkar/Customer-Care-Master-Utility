import React, { useState, useCallback, useRef } from 'react'

interface AreaConfig {
  key: string
  label: string
  color: string
}

interface AreaChartWidgetProps {
  data: Record<string, unknown>[]
  xKey: string
  areas: AreaConfig[]
  title?: string
  height?: number
}

export function AreaChartWidget({ data, xKey, areas, title, height = 280 }: AreaChartWidgetProps) {
  const [tooltipIdx, setTooltipIdx] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const pL = 44; const pR = 16; const pT = 10; const pB = 36
  const W = 760; const H = height
  const plotW = W - pL - pR
  const plotH = H - pT - pB

  const xStep = data && data.length > 1 ? plotW / (data.length - 1) : plotW

  // Single mousemove handler on the SVG — much more performant than per-rect handlers
  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current || !data || data.length === 0) return
    const rect = svgRef.current.getBoundingClientRect()
    const svgW = rect.width
    const scaleX = W / svgW
    const mouseX = (e.clientX - rect.left) * scaleX
    const relX = mouseX - pL
    if (relX < 0 || relX > plotW) { setTooltipIdx(null); return }
    const idx = Math.round(relX / xStep)
    setTooltipIdx(Math.max(0, Math.min(idx, data.length - 1)))
  }, [data, xStep, plotW])

  if (!data || data.length === 0) return null

  const allValues = data.flatMap(d => areas.map(a => Number(d[a.key] ?? 0)))
  const maxVal = Math.max(...allValues, 1)
  const yMax = Math.ceil(maxVal / 50) * 50

  const getX = (i: number) => pL + i * xStep
  const getY = (val: number) => pT + plotH - (val / yMax) * plotH

  const buildPath = (areaKey: string) => {
    const pts = data.map((d, i) => ({ x: getX(i), y: getY(Number(d[areaKey] ?? 0)) }))
    const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
    const close = ` L ${pts[pts.length - 1].x.toFixed(1)} ${(pT + plotH).toFixed(1)} L ${pts[0].x.toFixed(1)} ${(pT + plotH).toFixed(1)} Z`
    return { line, fill: line + close }
  }

  const xLabelStep = Math.max(1, Math.floor(data.length / 8))
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(t => ({ val: Math.round(yMax * t), y: pT + plotH - plotH * t }))

  const hoveredRow = tooltipIdx !== null ? data[tooltipIdx] : null

  return (
    <div>
      {title && <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>}
      <div className="relative">
        <svg
          ref={svgRef}
          width="100%"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ display: 'block', minHeight: height, cursor: 'crosshair' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTooltipIdx(null)}
        >
          <defs>
            {areas.map(a => (
              <linearGradient key={a.key} id={`agrad_${a.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={a.color} stopOpacity={0.25} />
                <stop offset="100%" stopColor={a.color} stopOpacity={0.02} />
              </linearGradient>
            ))}
          </defs>

          {/* Y grid + labels */}
          {yTicks.map(t => (
            <g key={t.val}>
              <line x1={pL} y1={t.y} x2={W - pR} y2={t.y} stroke="#f0f0f0" strokeWidth={1} />
              <text x={pL - 6} y={t.y + 4} textAnchor="end" fontSize={10} fill="#9ca3af">{t.val}</text>
            </g>
          ))}

          {/* Area fills */}
          {areas.map(a => <path key={`fill_${a.key}`} d={buildPath(a.key).fill} fill={`url(#agrad_${a.key})`} />)}

          {/* Lines */}
          {areas.map(a => (
            <path key={`line_${a.key}`} d={buildPath(a.key).line} fill="none" stroke={a.color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          ))}

          {/* X axis ticks */}
          {data.map((d, i) => {
            if (i % xLabelStep !== 0) return null
            return (
              <text key={i} x={getX(i)} y={pT + plotH + 14} textAnchor="middle" fontSize={9} fill="#9ca3af">
                {String(d[xKey] ?? '').replace(/^\d{4}-/, '').replace('-', '/')}
              </text>
            )
          })}

          {/* X axis line */}
          <line x1={pL} y1={pT + plotH} x2={W - pR} y2={pT + plotH} stroke="#e5e7eb" strokeWidth={1} />

          {/* Tooltip vertical line + dots */}
          {tooltipIdx !== null && hoveredRow && (() => {
            const tx = getX(tooltipIdx)
            const boxX = tx + 8 > W - 130 ? tx - 126 : tx + 8
            return (
              <g>
                <line x1={tx} y1={pT} x2={tx} y2={pT + plotH} stroke="#6b7280" strokeWidth={1} strokeDasharray="4 2" />
                {areas.map(a => (
                  <circle key={a.key} cx={tx} cy={getY(Number(hoveredRow[a.key] ?? 0))} r={4} fill={a.color} stroke="white" strokeWidth={2} />
                ))}
                <rect x={boxX} y={pT + 2} width={118} height={areas.length * 16 + 22} rx={4} fill="white" stroke="#e5e7eb" strokeWidth={1} />
                <text x={boxX + 6} y={pT + 15} fontSize={10} fill="#374151" fontWeight={600}>
                  {String(hoveredRow[xKey] ?? '')}
                </text>
                {areas.map((a, ai) => (
                  <text key={a.key} x={boxX + 6} y={pT + 28 + ai * 15} fontSize={10} fill={a.color}>
                    {a.label}: {Number(hoveredRow[a.key] ?? 0)}
                  </text>
                ))}
              </g>
            )
          })()}
        </svg>

        {/* Legend */}
        <div className="flex items-center gap-5 mt-1 ml-10">
          {areas.map(a => (
            <div key={a.key} className="flex items-center gap-1.5 text-xs text-gray-600">
              <span className="w-6 h-0.5 inline-block rounded" style={{ backgroundColor: a.color }} />
              {a.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
