import React, { useState, useEffect } from 'react'
import { DonutChartWidget } from '../../components/charts/DonutChartWidget'
import { dataService } from '../../services/mockAdapter'
import { useDashboardFilters } from '../../context/DashboardFilterContext'
import type { VolumeMixData } from '../../types/dashboard.types'

const CHANNEL_COLORS   = ['#1a237e', '#3f51b5', '#7986cb', '#f59e0b', '#4caf50', '#e91e63']
const TYPE_COLORS      = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b']
const BL_COLORS        = ['#1a237e', '#3f51b5', '#7986cb', '#c5cae9', '#f59e0b', '#fbbf24', '#d97706']
const PRIORITY_COLORS  = ['#ef4444', '#f97316', '#eab308', '#22c55e']

export function D9_VolumeMix() {
  const { filters } = useDashboardFilters()
  const [data, setData] = useState<VolumeMixData | null>(null)

  useEffect(() => { dataService.getVolumeMix(filters).then(setData) }, [filters])

  if (!data) return <div className="flex items-center justify-center h-40 text-gray-400 text-sm">Loading...</div>

  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold text-gray-800">Volume Mix</h2>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <DonutChartWidget data={data.by_channel} title="By Channel" colors={CHANNEL_COLORS} />
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <DonutChartWidget data={data.by_type} title="By Ticket Type" colors={TYPE_COLORS} />
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <DonutChartWidget data={data.by_business_line} title="By Business Line" colors={BL_COLORS} />
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <DonutChartWidget data={data.by_priority} title="By Priority" colors={PRIORITY_COLORS} />
        </div>
      </div>

      {/* Summary table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Top Categories by Volume</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Highest Channel', value: data.by_channel[0]?.name, sub: `${data.by_channel[0]?.pct ?? 0}% of tickets` },
            { label: 'Top Ticket Type', value: data.by_type[0]?.name, sub: `${data.by_type[0]?.pct ?? 0}% of tickets` },
            { label: 'Top Business Line', value: data.by_business_line[0]?.name, sub: `${data.by_business_line[0]?.pct ?? 0}% of tickets` },
            { label: 'Dominant Priority', value: data.by_priority[0]?.name, sub: `${data.by_priority[0]?.pct ?? 0}% of tickets` },
          ].map((item) => (
            <div key={item.label} className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">{item.label}</p>
              <p className="text-sm font-bold text-brand-900">{item.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
