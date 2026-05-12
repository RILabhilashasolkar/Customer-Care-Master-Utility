import React from 'react'

interface Filters {
  status: string
  priority: string
  channel: string
  type: string
}

interface TicketFiltersProps {
  filters: Filters
  onChange: (f: Partial<Filters>) => void
}

const STATUSES = ['', 'Open', 'Pending Customer', 'On Hold', 'Resolved', 'Closed']
const PRIORITIES = ['', 'P1', 'P2', 'P3', 'P4']
const CHANNELS = ['', 'CALL', 'Chat', 'Email', 'Web/App', 'Social', 'Walk-in']
const TYPES = ['', 'Complaint', 'Request', 'Enquiry', 'Feedback']

export function TicketFilters({ filters, onChange }: TicketFiltersProps) {
  const selectClass = 'border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500'

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <select value={filters.status} onChange={(e) => onChange({ status: e.target.value })} className={selectClass}>
        <option value="">All Status</option>
        {STATUSES.slice(1).map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <select value={filters.priority} onChange={(e) => onChange({ priority: e.target.value })} className={selectClass}>
        <option value="">All Priority</option>
        {PRIORITIES.slice(1).map((p) => <option key={p} value={p}>{p}</option>)}
      </select>
      <select value={filters.channel} onChange={(e) => onChange({ channel: e.target.value })} className={selectClass}>
        <option value="">All Channels</option>
        {CHANNELS.slice(1).map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={filters.type} onChange={(e) => onChange({ type: e.target.value })} className={selectClass}>
        <option value="">All Types</option>
        {TYPES.slice(1).map((t) => <option key={t} value={t}>{t}</option>)}
      </select>
    </div>
  )
}
