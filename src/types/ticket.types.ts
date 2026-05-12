import type { BusinessLine } from './order.types'

export type TicketChannel = 'Email' | 'Chat' | 'Web/App' | 'CALL' | 'Social' | 'Walk-in'

export type TicketType = 'Enquiry' | 'Complaint' | 'Request' | 'Feedback'

export type TicketPriority = 'P1' | 'P2' | 'P3' | 'P4'

export type TicketStatus =
  | 'Open'
  | 'Pending Customer'
  | 'On Hold'
  | 'Resolved'
  | 'Closed'

export interface Ticket {
  ticket_id: string
  created_at: string
  updated_at: string
  channel: TicketChannel
  vertical: BusinessLine
  ticket_type: TicketType
  category: string
  subcategory: string
  priority: TicketPriority
  current_queue_id: string
  current_queue_name: string
  current_status: TicketStatus
  current_assignee_id?: string
  current_assignee_name?: string
  first_reply_at?: string
  resolved_at?: string
  sla_due_at: string
  sla_breached: boolean
  customer_id?: string
  customer_name?: string
  order_id?: string
  description: string
  resolution_notes?: string
  csat_score?: number
}

export interface TicketEvent {
  event_id: string
  ticket_id: string
  event_type: 'created' | 'assigned' | 'status_changed' | 'note_added' | 'escalated' | 'resolved'
  from_status?: TicketStatus
  to_status?: TicketStatus
  agent_id?: string
  agent_name?: string
  timestamp: string
  notes?: string
}
