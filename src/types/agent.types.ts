export type AgentStatus =
  | 'Ready'
  | 'Working'
  | 'Tea Break'
  | 'Lunch Break'
  | 'Bio Break'
  | 'Offline Activity'
  | 'Offline'

export interface Agent {
  agent_id: string
  agent_name: string
  team_lead: string
  email: string
  role_label: string
  queue_skills: string[]
  active_flag: boolean
}

export interface AgentStatusSnapshot {
  agent_id: string
  agent_name: string
  team_lead: string
  current_status: AgentStatus
  status_duration_minutes: number
  login_duration_minutes: number
  open_assigned_tickets: number
  tickets_resolved_today: number
  aht_today_minutes: number
  last_action_at: string
}
