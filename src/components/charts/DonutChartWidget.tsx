import React, { useState } from 'react'

interface DonutChartWidgetProps {
  data: { name: string; value: number; pct?: number }[]
  title?: string
  colors?: string[]
  height?: number
}

const DEFAULT_COLORS = [
  '#1a237e', '#3f51b5', '#7986cb', '#f59e0b',
  '#4caf50', '#e91e63', '#00bcd4', '#ff5722', '#9c27b0'
]

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function arcPath(cx: number, cy: number, outerR: number, innerR: number, startDeg: number, endDeg: number) {
  const o1 = polarToCartesian(cx, cy, outerR, startDeg)
  const o2 = polarToCartesian(cx, cy, outerR, endDeg)
  const i1 = polarToCartesian(cx, cy, innerR, endDeg)
  const i2 = polarToCartesian(cx, cy, innerR, startDeg)
  const large = endDeg - startDeg > 180 ? 1 : 0
  return [
    `M ${o1.x} ${o1.y}`,
    `A ${outerR} ${outerR} 0 ${large} 1 ${o2.x} ${o2.y}`,
    `L ${i1.x} ${i1.y}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${i2.x} ${i2.y}`,
    'Z',
  ].join(' ')
}

export function DonutChartWidget({ data, title, colors = DEFAULT_COLORS }: DonutChartWidgetProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const total = data.reduce((s, d) => s + d.value, 0)
  if (total === 0) return null

  const cx = 80; const cy = 75; const outerR = 65; const innerR = 40
  const gap = 1.5 // degrees gap between slices

  let currentAngle = 0
  const slices = data.map((item, i) => {
    const sliceDeg = (item.value / total) * (360 - gap * data.length)
    const start = currentAngle + (i === 0 ? 0 : gap)
    const end = start + sliceDeg
    currentAngle = end
    return { ...item, start, end, color: colors[i % colors.length], pct: ((item.value / total) * 100).toFixed(1) }
  })

  const hovered = hoveredIndex !== null ? slices[hoveredIndex] : null

  return (
    <div className="flex flex-col items-center w-full">
      {title && <h4 className="text-sm font-semibold text-gray-700 mb-2 self-start">{title}</h4>}

      <div className="relative" style={{ width: 160, height: 150 }}>
        <svg width={160} height={150}>
          {slices.map((s, i) => (
            <path
              key={i}
              d={arcPath(cx, cy, hoveredIndex === i ? outerR + 4 : outerR, innerR, s.start, s.end)}
              fill={s.color}
              opacity={hoveredIndex !== null && hoveredIndex !== i ? 0.55 : 1}
              style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
          {/* Center label */}
          <text x={cx} y={cy - 7} textAnchor="middle" fontSize={11} fill="#374151" fontWeight={500}>
            {hovered ? hovered.name.split(' ')[0] : 'Total'}
          </text>
          <text x={cx} y={cy + 10} textAnchor="middle" fontSize={16} fill="#111827" fontWeight={700}>
            {hovered ? `${hovered.pct}%` : total.toLocaleString()}
          </text>
          <text x={cx} y={cy + 24} textAnchor="middle" fontSize={10} fill="#9ca3af">
            {hovered ? `${hovered.value.toLocaleString()} tickets` : 'tickets'}
          </text>
        </svg>
      </div>

      {/* Compact legend */}
      <div className="w-full grid grid-cols-2 gap-x-3 gap-y-1 mt-1">
        {slices.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-1 text-xs cursor-pointer"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-gray-600 truncate" title={s.name}>{s.name}</span>
            <span className="text-gray-400 ml-auto flex-shrink-0">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
