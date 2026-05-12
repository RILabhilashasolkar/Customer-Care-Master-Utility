import React, { useState, useEffect } from 'react'
import { BarChartWidget } from '../../components/charts/BarChartWidget'
import { DataTable } from '../../components/core/DataTable'
import { dataService } from '../../services/mockAdapter'
import { useDashboardFilters } from '../../context/DashboardFilterContext'
import type { QueuePerformanceRow } from '../../types/dashboard.types'

export function D3_QueuePerformance() {
  const { filters } = useDashboardFilters()
  const [data, setData] = useState<QueuePerformanceRow[]>([])

  useEffect(() => { dataService.getQueuePerformance(filters).then(setData) }, [filters])

  const columns = [
    { id: 'queue_name', label: 'Queue', sortable: true, render: (row: QueuePerformanceRow) => <span className="font-medium">{row.queue_name}</span> },
    { id: 'tickets_handled', label: 'Handled', sortable: true, render: (row: QueuePerformanceRow) => row.tickets_handled },
    { id: 'tickets_resolved', label: 'Resolved', sortable: true, render: (row: QueuePerformanceRow) => row.tickets_resolved },
    { id: 'backlog', label: 'Backlog', sortable: true, render: (row: QueuePerformanceRow) => row.backlog },
    { id: 'avg_handle_time_minutes', label: 'AHT (mins)', sortable: true, render: (row: QueuePerformanceRow) => row.avg_handle_time_minutes },
    { id: 'sla_compliance_pct', label: 'SLA %', sortable: true, render: (row: QueuePerformanceRow) => (
      <span className={row.sla_compliance_pct < 80 ? 'text-red-600 font-semibold' : row.sla_compliance_pct < 90 ? 'text-yellow-600' : 'text-green-600 font-semibold'}>
        {row.sla_compliance_pct.toFixed(1)}%
      </span>
    )},
    { id: 'first_reply_avg_minutes', label: 'Avg First Reply', sortable: true, render: (row: QueuePerformanceRow) => `${row.first_reply_avg_minutes}m` },
  ]

  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold text-gray-800">Queue Performance</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <BarChartWidget
          data={data as unknown as Record<string, unknown>[]}
          xKey="queue_name"
          bars={[
            { key: 'tickets_handled', label: 'Handled', color: '#1a237e' },
            { key: 'tickets_resolved', label: 'Resolved', color: '#4caf50' },
            { key: 'backlog', label: 'Backlog', color: '#f59e0b' },
          ]}
          title="Tickets by Queue"
          height={280}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <DataTable columns={columns} data={data} keyField="queue_name" />
      </div>
    </div>
  )
}
