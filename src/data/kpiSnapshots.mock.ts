import type { QueuePerformanceRow, AgentPerformanceRow } from '../types/dashboard.types'

export const MOCK_QUEUE_PERFORMANCE: QueuePerformanceRow[] = [
  { queue_name: 'Customer Support resQ', tickets_handled: 1245, tickets_resolved: 1148, backlog: 97, avg_handle_time_minutes: 9, sla_compliance_pct: 91.5, first_reply_avg_minutes: 12 },
  { queue_name: 'Technical Support', tickets_handled: 456, tickets_resolved: 421, backlog: 35, avg_handle_time_minutes: 18, sla_compliance_pct: 87.3, first_reply_avg_minutes: 25 },
  { queue_name: 'Escalation Queue', tickets_handled: 234, tickets_resolved: 198, backlog: 36, avg_handle_time_minutes: 42, sla_compliance_pct: 78.5, first_reply_avg_minutes: 15 },
  { queue_name: 'Refund Processing', tickets_handled: 678, tickets_resolved: 634, backlog: 44, avg_handle_time_minutes: 22, sla_compliance_pct: 88.9, first_reply_avg_minutes: 30 },
  { queue_name: 'Installation Support', tickets_handled: 189, tickets_resolved: 172, backlog: 17, avg_handle_time_minutes: 35, sla_compliance_pct: 94.2, first_reply_avg_minutes: 20 },
  { queue_name: 'B2B Support', tickets_handled: 345, tickets_resolved: 298, backlog: 47, avg_handle_time_minutes: 28, sla_compliance_pct: 82.1, first_reply_avg_minutes: 35 },
  { queue_name: 'VIP Support', tickets_handled: 123, tickets_resolved: 118, backlog: 5, avg_handle_time_minutes: 15, sla_compliance_pct: 98.4, first_reply_avg_minutes: 8 },
  { queue_name: 'Distribution Support', tickets_handled: 234, tickets_resolved: 208, backlog: 26, avg_handle_time_minutes: 32, sla_compliance_pct: 85.7, first_reply_avg_minutes: 28 },
]

export const MOCK_AGENT_PERFORMANCE: AgentPerformanceRow[] = [
  { agent_id: 'AGT004', agent_name: 'Sunita Gupta', team_lead: 'Priya Patel', tickets_handled: 89, tickets_resolved: 82, csat_avg: 4.5, aht_minutes: 9, resolution_rate_pct: 92.1, first_reply_avg_minutes: 11 },
  { agent_id: 'AGT001', agent_name: 'Rahul Sharma', team_lead: 'Priya Patel', tickets_handled: 76, tickets_resolved: 68, csat_avg: 4.2, aht_minutes: 8, resolution_rate_pct: 89.5, first_reply_avg_minutes: 12 },
  { agent_id: 'AGT008', agent_name: 'Rajiv Kumar', team_lead: 'Priya Patel', tickets_handled: 72, tickets_resolved: 65, csat_avg: 4.3, aht_minutes: 10, resolution_rate_pct: 90.3, first_reply_avg_minutes: 13 },
  { agent_id: 'AGT017', agent_name: 'Geeta Raghavan', team_lead: 'Kavita Reddy', tickets_handled: 68, tickets_resolved: 61, csat_avg: 4.4, aht_minutes: 13, resolution_rate_pct: 89.7, first_reply_avg_minutes: 16 },
  { agent_id: 'AGT020', agent_name: 'Nisha Desai', team_lead: 'Arjun Gupta', tickets_handled: 65, tickets_resolved: 58, csat_avg: 4.1, aht_minutes: 19, resolution_rate_pct: 89.2, first_reply_avg_minutes: 22 },
  { agent_id: 'AGT003', agent_name: 'Amit Verma', team_lead: 'Priya Patel', tickets_handled: 63, tickets_resolved: 55, csat_avg: 4.0, aht_minutes: 7, resolution_rate_pct: 87.3, first_reply_avg_minutes: 10 },
  { agent_id: 'AGT011', agent_name: 'Pooja Sharma', team_lead: 'Arjun Gupta', tickets_handled: 61, tickets_resolved: 53, csat_avg: 4.2, aht_minutes: 14, resolution_rate_pct: 86.9, first_reply_avg_minutes: 18 },
  { agent_id: 'AGT007', agent_name: 'Neha Singh', team_lead: 'Kavita Reddy', tickets_handled: 59, tickets_resolved: 51, csat_avg: 4.3, aht_minutes: 18, resolution_rate_pct: 86.4, first_reply_avg_minutes: 20 },
  { agent_id: 'AGT018', agent_name: 'Meena Chandran', team_lead: 'Meena Iyer', tickets_handled: 52, tickets_resolved: 44, csat_avg: 4.1, aht_minutes: 28, resolution_rate_pct: 84.6, first_reply_avg_minutes: 32 },
  { agent_id: 'AGT014', agent_name: 'Rekha Bose', team_lead: 'Suresh Menon', tickets_handled: 48, tickets_resolved: 41, csat_avg: 4.4, aht_minutes: 25, resolution_rate_pct: 85.4, first_reply_avg_minutes: 22 },
  { agent_id: 'AGT010', agent_name: 'Vikram Reddy', team_lead: 'Suresh Menon', tickets_handled: 46, tickets_resolved: 38, csat_avg: 4.0, aht_minutes: 20, resolution_rate_pct: 82.6, first_reply_avg_minutes: 25 },
  { agent_id: 'AGT016', agent_name: 'Tanvir Khan', team_lead: 'Kavita Reddy', tickets_handled: 44, tickets_resolved: 37, csat_avg: 3.9, aht_minutes: 16, resolution_rate_pct: 84.1, first_reply_avg_minutes: 19 },
  { agent_id: 'AGT005', agent_name: 'Deepa Nair', team_lead: 'Priya Patel', tickets_handled: 42, tickets_resolved: 36, csat_avg: 4.5, aht_minutes: 22, resolution_rate_pct: 85.7, first_reply_avg_minutes: 28 },
  { agent_id: 'AGT006', agent_name: 'Kiran Joshi', team_lead: 'Arjun Gupta', tickets_handled: 41, tickets_resolved: 34, csat_avg: 4.2, aht_minutes: 15, resolution_rate_pct: 82.9, first_reply_avg_minutes: 20 },
  { agent_id: 'AGT013', agent_name: 'Sanjay Pillai', team_lead: 'Priya Patel', tickets_handled: 40, tickets_resolved: 33, csat_avg: 3.8, aht_minutes: 11, resolution_rate_pct: 82.5, first_reply_avg_minutes: 14 },
  { agent_id: 'AGT009', agent_name: 'Asha Menon', team_lead: 'Suresh Menon', tickets_handled: 38, tickets_resolved: 30, csat_avg: 4.3, aht_minutes: 30, resolution_rate_pct: 78.9, first_reply_avg_minutes: 35 },
  { agent_id: 'AGT012', agent_name: 'Anita Krishnan', team_lead: 'Suresh Menon', tickets_handled: 32, tickets_resolved: 28, csat_avg: 4.6, aht_minutes: 35, resolution_rate_pct: 87.5, first_reply_avg_minutes: 18 },
  { agent_id: 'AGT002', agent_name: 'Priya Patel', team_lead: 'Suresh Menon', tickets_handled: 28, tickets_resolved: 22, csat_avg: 4.4, aht_minutes: 12, resolution_rate_pct: 78.6, first_reply_avg_minutes: 10 },
  { agent_id: 'AGT015', agent_name: 'Suresh Menon', team_lead: 'Rajesh Khanna', tickets_handled: 22, tickets_resolved: 18, csat_avg: 4.7, aht_minutes: 45, resolution_rate_pct: 81.8, first_reply_avg_minutes: 8 },
  { agent_id: 'AGT019', agent_name: 'Ravi Thakur', team_lead: 'Priya Patel', tickets_handled: 0, tickets_resolved: 0, csat_avg: 0, aht_minutes: 0, resolution_rate_pct: 0, first_reply_avg_minutes: 0 },
]

export const SLA_AGING_BUCKETS = [
  { queue_name: 'Customer Support resQ', '0-4h': 45, '4-8h': 28, '8-24h': 15, '24-48h': 6, '48h+': 3 },
  { queue_name: 'Technical Support', '0-4h': 15, '4-8h': 8, '8-24h': 7, '24-48h': 4, '48h+': 1 },
  { queue_name: 'Escalation Queue', '0-4h': 8, '4-8h': 10, '8-24h': 12, '24-48h': 4, '48h+': 2 },
  { queue_name: 'Refund Processing', '0-4h': 20, '4-8h': 12, '8-24h': 8, '24-48h': 3, '48h+': 1 },
  { queue_name: 'Installation Support', '0-4h': 8, '4-8h': 5, '8-24h': 3, '24-48h': 1, '48h+': 0 },
  { queue_name: 'B2B Support', '0-4h': 18, '4-8h': 14, '8-24h': 10, '24-48h': 4, '48h+': 1 },
  { queue_name: 'VIP Support', '0-4h': 3, '4-8h': 1, '8-24h': 1, '24-48h': 0, '48h+': 0 },
  { queue_name: 'Distribution Support', '0-4h': 10, '4-8h': 8, '8-24h': 5, '24-48h': 2, '48h+': 1 },
]

export const BREAK_ADHERENCE_DATA = [
  { agent_name: 'Rahul Sharma', team_lead: 'Priya Patel', tea_taken_mins: 10, tea_allowed_mins: 15, lunch_taken_mins: 30, lunch_allowed_mins: 45, bio_taken_mins: 5, bio_allowed_mins: 10, adherent: true },
  { agent_name: 'Amit Verma', team_lead: 'Priya Patel', tea_taken_mins: 18, tea_allowed_mins: 15, lunch_taken_mins: 50, lunch_allowed_mins: 45, bio_taken_mins: 8, bio_allowed_mins: 10, adherent: false },
  { agent_name: 'Sunita Gupta', team_lead: 'Priya Patel', tea_taken_mins: 12, tea_allowed_mins: 15, lunch_taken_mins: 40, lunch_allowed_mins: 45, bio_taken_mins: 6, bio_allowed_mins: 10, adherent: true },
  { agent_name: 'Deepa Nair', team_lead: 'Priya Patel', tea_taken_mins: 15, tea_allowed_mins: 15, lunch_taken_mins: 45, lunch_allowed_mins: 45, bio_taken_mins: 9, bio_allowed_mins: 10, adherent: true },
  { agent_name: 'Kiran Joshi', team_lead: 'Arjun Gupta', tea_taken_mins: 20, tea_allowed_mins: 15, lunch_taken_mins: 55, lunch_allowed_mins: 45, bio_taken_mins: 12, bio_allowed_mins: 10, adherent: false },
  { agent_name: 'Neha Singh', team_lead: 'Kavita Reddy', tea_taken_mins: 14, tea_allowed_mins: 15, lunch_taken_mins: 42, lunch_allowed_mins: 45, bio_taken_mins: 7, bio_allowed_mins: 10, adherent: true },
  { agent_name: 'Rajiv Kumar', team_lead: 'Priya Patel', tea_taken_mins: 10, tea_allowed_mins: 15, lunch_taken_mins: 38, lunch_allowed_mins: 45, bio_taken_mins: 5, bio_allowed_mins: 10, adherent: true },
  { agent_name: 'Asha Menon', team_lead: 'Suresh Menon', tea_taken_mins: 8, tea_allowed_mins: 15, lunch_taken_mins: 35, lunch_allowed_mins: 45, bio_taken_mins: 4, bio_allowed_mins: 10, adherent: true },
  { agent_name: 'Vikram Reddy', team_lead: 'Suresh Menon', tea_taken_mins: 16, tea_allowed_mins: 15, lunch_taken_mins: 48, lunch_allowed_mins: 45, bio_taken_mins: 4, bio_allowed_mins: 10, adherent: false },
  { agent_name: 'Pooja Sharma', team_lead: 'Arjun Gupta', tea_taken_mins: 13, tea_allowed_mins: 15, lunch_taken_mins: 44, lunch_allowed_mins: 45, bio_taken_mins: 8, bio_allowed_mins: 10, adherent: true },
]
