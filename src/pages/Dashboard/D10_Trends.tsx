import React, { useState, useEffect } from 'react'
import { AreaChartWidget } from '../../components/charts/AreaChartWidget'
import { dataService } from '../../services/mockAdapter'
import { useDashboardFilters } from '../../context/DashboardFilterContext'
import { format } from 'date-fns'
import type { TrendDataPoint } from '../../types/dashboard.types'

const METRICS = [
  { id: 'volume', label: 'Volume', areas: [{ key: 'tickets_opened', label: 'Opened', color: '#1a237e' }, { key: 'tickets_resolved', label: 'Resolved', color: '#4caf50' }] },
  { id: 'csat', label: 'CSAT', areas: [{ key: 'csat_avg', label: 'CSAT Score', color: '#f59e0b' }] },
  { id: 'aht', label: 'AHT', areas: [{ key: 'aht_minutes', label: 'AHT (mins)', color: '#9c27b0' }] },
  { id: 'backlog', label: 'Backlog', areas: [{ key: 'backlog', label: 'Backlog', color: '#f44336' }] },
]

export function D10_Trends() {
  const { filters } = useDashboardFilters()
  const [data, setData] = useState<TrendDataPoint[]>([])
  const [metric, setMetric] = useState('volume')
  const [granularity, setGranularity] = useState<'daily' | 'weekly'>('daily')

  useEffect(() => { dataService.getTrends(filters).then(setData) }, [filters])

  const currentMetric = METRICS.find((m) => m.id === metric) ?? METRICS[0]

  const displayData: Record<string, unknown>[] = granularity === 'weekly'
    ? data.filter((_, i) => i % 7 === 0).map((d) => ({ ...d, date: format(new Date(d.date), 'MMM dd') }))
    : data.slice(-30).map((d) => ({ ...d, date: format(new Date(d.date), 'MMM dd') }))

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">Trends (90 Days)</h2>
        <div className="flex gap-2">
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            {(['daily', 'weekly'] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGranularity(g)}
                className={`px-3 py-1.5 text-xs font-medium capitalize ${granularity === g ? 'bg-brand-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {METRICS.map((m) => (
          <button
            key={m.id}
            onClick={() => setMetric(m.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border ${metric === m.id ? 'bg-brand-900 text-white border-brand-900' : 'border-gray-200 text-gray-600 hover:border-brand-400'}`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <AreaChartWidget
          data={displayData}
          xKey="date"
          areas={currentMetric.areas}
          title={currentMetric.label + ' Trend'}
          height={320}
        />
      </div>
    </div>
  )
}
