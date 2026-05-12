export interface QueueHealthSnapshot {
  queue_id: string
  queue_name: string
  vertical: string
  total_tickets: number
  total_resolved: number
  total_backlog: number
  unassigned_backlog: number
  assigned_backlog: number
  sla_breached_open: number
  sla_at_risk_open: number
  oldest_ticket_age_hours: number
  agents_mapped: number
  agents_online: number
  agents_ready: number
  agents_working: number
  agents_on_break: number
  agents_offline: number
  backlog_per_ready_agent: number
}

export interface QueuePerformanceRow {
  queue_name: string
  tickets_handled: number
  tickets_resolved: number
  backlog: number
  avg_handle_time_minutes: number
  sla_compliance_pct: number
  first_reply_avg_minutes: number
}

export interface AgentPerformanceRow {
  agent_id: string
  agent_name: string
  team_lead: string
  tickets_handled: number
  tickets_resolved: number
  csat_avg: number
  aht_minutes: number
  resolution_rate_pct: number
  first_reply_avg_minutes: number
}

export interface TrendDataPoint {
  date: string
  tickets_opened: number
  tickets_resolved: number
  csat_avg: number
  aht_minutes: number
  backlog: number
}

export interface VolumeMixItem {
  name: string
  value: number
  pct: number
}

export interface VolumeMixData {
  by_channel: VolumeMixItem[]
  by_type: VolumeMixItem[]
  by_business_line: VolumeMixItem[]
  by_priority: VolumeMixItem[]
}

export interface DashboardFilters {
  date_from: string
  date_to: string
  queue_ids: string[]
  agent_ids: string[]
  channels: string[]
  priorities: string[]
  business_lines: string[]
}
