import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { Inbox, AlertTriangle, Users, Clock } from 'lucide-react'
import { KpiCard } from '../../components/core/KpiCard'
import { DataTable } from '../../components/core/DataTable'
import { StatusPill } from '../../components/core/StatusPill'
import { dataService } from '../../services/mockAdapter'
import { useInterval } from '../../hooks/useInterval'
import type { QueueHealthSnapshot } from '../../types/dashboard.types'

export function D1_QueueHealthRealtime() {
  const [data, setData] = useState<QueueHealthSnapshot[]>([])
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const refresh = async () => {
    const result = await dataService.getQueueHealthSnapshot()
    setData(result)
    setLastRefresh(new Date())
  }

  useEffect(() => { refresh() }, [])
  useInterval(refresh, 30000)

  const totalBacklog = data.reduce((s, q) => s + q.total_backlog, 0)
  const totalSlaBreached = data.reduce((s, q) => s + q.sla_breached_open, 0)
  const totalAgentsReady = data.reduce((s, q) => s + q.agents_ready, 0)
  const oldestAge = data.reduce((max, q) => Math.max(max, q.oldest_ticket_age_hours), 0)

  const columns = [
    { id: 'queue_name', label: 'Queue', sortable: true, render: (row: QueueHealthSnapshot) => <span className="font-medium">{row.queue_name}</span> },
    { id: 'total_backlog', label: 'Backlog', sortable: true, render: (row: QueueHealthSnapshot) => <span className={clsx('font-bold', row.total_backlog > 50 ? 'text-red-600' : row.total_backlog > 20 ? 'text-yellow-600' : 'text-green-600')}>{row.total_backlog}</span> },
    { id: 'unassigned_backlog', label: 'Unassigned', sortable: true, render: (row: QueueHealthSnapshot) => row.unassigned_backlog },
    { id: 'sla_breached_open', label: 'SLA Breached', sortable: true, render: (row: QueueHealthSnapshot) => <span className={clsx('font-semibold', row.sla_breached_open > 5 ? 'text-red-600' : row.sla_breached_open > 0 ? 'text-yellow-600' : 'text-green-600')}>{row.sla_breached_open}</span> },
    { id: 'agents', label: 'Agents (R/W/B/O)', render: (row: QueueHealthSnapshot) => (
      <div className="flex items-center gap-1 text-xs">
        <span className="text-green-600 font-semibold">{row.agents_ready}</span>
        <span className="text-gray-300">/</span>
        <span className="text-blue-600">{row.agents_working}</span>
        <span className="text-gray-300">/</span>
        <span className="text-yellow-600">{row.agents_on_break}</span>
        <span className="text-gray-300">/</span>
        <span className="text-gray-500">{row.agents_offline}</span>
      </div>
    )},
    { id: 'oldest_ticket_age_hours', label: 'Oldest (hrs)', sortable: true, render: (row: QueueHealthSnapshot) => <span className={clsx(row.oldest_ticket_age_hours > 48 ? 'text-red-600 font-semibold' : '')}>{row.oldest_ticket_age_hours}h</span> },
    { id: 'backlog_per_ready_agent', label: 'BL/Agent', sortable: true, render: (row: QueueHealthSnapshot) => row.backlog_per_ready_agent.toFixed(1) },
  ]

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">Queue Health — Live</h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-gray-500">Auto-refreshes every 30s · Last: {lastRefresh.toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KpiCard title="Total Backlog" value={totalBacklog} subtitle="All queues" icon={<Inbox className="w-5 h-5" />} color={totalBacklog > 200 ? 'red' : totalBacklog > 100 ? 'yellow' : 'green'} />
        <KpiCard title="SLA Breached" value={totalSlaBreached} subtitle="Open tickets" icon={<AlertTriangle className="w-5 h-5" />} color={totalSlaBreached > 20 ? 'red' : 'orange'} />
        <KpiCard title="Agents Ready" value={totalAgentsReady} subtitle="Across all queues" icon={<Users className="w-5 h-5" />} color="green" />
        <KpiCard title="Oldest Ticket" value={`${oldestAge}h`} subtitle="Queue age" icon={<Clock className="w-5 h-5" />} color={oldestAge > 48 ? 'red' : 'blue'} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <DataTable columns={columns} data={data} keyField="queue_id" />
      </div>
    </div>
  )
}
