import type { TrendDataPoint } from '../types/dashboard.types'
import { format, subDays } from 'date-fns'

function generateTrends(): TrendDataPoint[] {
  const today = new Date('2026-04-13')
  const data: TrendDataPoint[] = []
  let backlog = 200

  for (let i = 89; i >= 0; i--) {
    const date = subDays(today, i)
    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

    // Weekday peaks, weekend dips
    const baseVolume = isWeekend ? 180 : 280
    const variance = Math.floor(Math.random() * 60) - 30
    const tickets_opened = Math.max(100, baseVolume + variance)

    // Resolution rate ~88-95%
    const resolutionRate = 0.88 + Math.random() * 0.07
    const tickets_resolved = Math.floor(tickets_opened * resolutionRate)

    backlog = Math.max(50, backlog + (tickets_opened - tickets_resolved))

    // CSAT 3.8-4.5
    const csat_avg = parseFloat((3.8 + Math.random() * 0.7).toFixed(2))

    // AHT 12-22 minutes
    const aht_minutes = Math.floor(12 + Math.random() * 10)

    data.push({
      date: format(date, 'yyyy-MM-dd'),
      tickets_opened,
      tickets_resolved,
      csat_avg,
      aht_minutes,
      backlog: Math.min(500, backlog),
    })
  }

  return data
}

export const TREND_DATA: TrendDataPoint[] = generateTrends()
