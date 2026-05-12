import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { DataTable } from '../../components/core/DataTable'
import { StatusPill } from '../../components/core/StatusPill'
import { dataService } from '../../services/mockAdapter'
import { useInterval } from '../../hooks/useInterval'
import type { AgentStatusSnapshot } from '../../types/agent.types'

export function D2_LiveAgentMonitor() {
  const [data, setData] = useState<AgentStatusSnapshot[]>([])
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const refresh = async () => {
    const result = await dataService.getAgentStatusSnapshot()
    setData(result)
    setLastRefresh(new Date())
  }

  useEffect(() => { refresh() }, [])
  useInterval(refresh, 30000)

  const columns = [
    { id: 'agent_name', label: 'Agent', sortable: true, render: (row: AgentStatusSnapshot) => (
      <div>
        <p className="font-medium text-sm">{row.agent_name}</p>
        <p className="text-xs text-gray-400">{row.team_lead}</p>
      </div>
    )},
    { id: 'current_status', label: 'Status', sortable: true, render: (row: AgentStatusSnapshot) => <StatusPill status={row.current_status} /> },
    { id: 'status_duration_minutes', label: 'Duration', sortable: true, render: (row: AgentStatusSnapshot) => (
      <span className={clsx('text-sm', row.current_status === 'Tea Break' && row.status_duration_minutes > 15 ? 'text-red-600 font-semibold' : '')}>
        {row.status_duration_minutes}m
      </span>
    )},
    { id: 'login_duration_minutes', label: 'Login Time', render: (row: AgentStatusSnapshot) => {
      const h = Math.floor(row.login_duration_minutes / 60); const m = row.login_duration_minutes % 60
      return `${h}h ${m}m`
    }},
    { id: 'open_assigned_tickets', label: 'Open', sortable: true, render: (row: AgentStatusSnapshot) => <span className="font-semibold">{row.open_assigned_tickets}</span> },
    { id: 'tickets_resolved_today', label: 'Resolved Today', sortable: true, render: (row: AgentStatusSnapshot) => row.tickets_resolved_today },
    { id: 'aht_today_minutes', label: 'AHT (mins)', sortable: true, render: (row: AgentStatusSnapshot) => row.aht_today_minutes },
  ]

  const statusCounts = data.reduce((acc, a) => {
    acc[a.current_status] = (acc[a.current_status] ?? 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">Live Agent Monitor</h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-gray-500">Auto-refreshes · Last: {lastRefresh.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Status summary */}
      <div className="flex flex-wrap gap-3">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div key={status} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-100 shadow-sm">
            <StatusPill status={status} />
            <span className="text-sm font-bold">{count}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <DataTable columns={columns} data={data} keyField="agent_id" />
      </div>
    </div>
  )
}
