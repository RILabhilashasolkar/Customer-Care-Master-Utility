import React, { useState, useEffect } from 'react'
import { BarChartWidget } from '../../components/charts/BarChartWidget'
import { DataTable } from '../../components/core/DataTable'
import { dataService } from '../../services/mockAdapter'
import { useDashboardFilters } from '../../context/DashboardFilterContext'
import type { AgentPerformanceRow } from '../../types/dashboard.types'

function StarRating({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-sm font-medium">{score.toFixed(1)}</span>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((s) => (
          <svg key={s} className={`w-3 h-3 ${s <= Math.round(score) ? 'text-amber-500' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </div>
  )
}

export function D4_AgentPerformance() {
  const { filters } = useDashboardFilters()
  const [data, setData] = useState<AgentPerformanceRow[]>([])

  useEffect(() => { dataService.getAgentPerformance(filters).then(setData) }, [filters])

  const top10 = data.slice(0, 10)

  const columns = [
    { id: 'agent_name', label: 'Agent', sortable: true, render: (row: AgentPerformanceRow) => (
      <div>
        <p className="font-medium text-sm">{row.agent_name}</p>
        <p className="text-xs text-gray-400">{row.team_lead}</p>
      </div>
    )},
    { id: 'tickets_handled', label: 'Handled', sortable: true, render: (row: AgentPerformanceRow) => row.tickets_handled },
    { id: 'tickets_resolved', label: 'Resolved', sortable: true, render: (row: AgentPerformanceRow) => row.tickets_resolved },
    { id: 'resolution_rate_pct', label: 'Res. Rate', sortable: true, render: (row: AgentPerformanceRow) => `${row.resolution_rate_pct.toFixed(1)}%` },
    { id: 'csat_avg', label: 'CSAT', sortable: true, render: (row: AgentPerformanceRow) => row.csat_avg > 0 ? <StarRating score={row.csat_avg} /> : '—' },
    { id: 'aht_minutes', label: 'AHT (mins)', sortable: true, render: (row: AgentPerformanceRow) => row.aht_minutes },
    { id: 'first_reply_avg_minutes', label: 'Avg 1st Reply', sortable: true, render: (row: AgentPerformanceRow) => `${row.first_reply_avg_minutes}m` },
  ]

  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold text-gray-800">Agent Performance</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <BarChartWidget
          data={top10 as unknown as Record<string, unknown>[]}
          xKey="agent_name"
          bars={[
            { key: 'tickets_handled', label: 'Handled', color: '#1a237e' },
            { key: 'tickets_resolved', label: 'Resolved', color: '#4caf50' },
          ]}
          title="Top 10 Agents by Volume"
          height={280}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <DataTable columns={columns} data={data} keyField="agent_id" />
      </div>
    </div>
  )
}
