import type { TicketEvent } from '../types/ticket.types'

export const MOCK_TICKET_EVENTS: TicketEvent[] = [
  // TKT-2026-001
  { event_id: 'EVT001', ticket_id: 'TKT-2026-001', event_type: 'created', timestamp: '2026-04-12T09:15:00Z', agent_name: 'System', notes: 'Ticket created via CALL channel' },
  { event_id: 'EVT002', ticket_id: 'TKT-2026-001', event_type: 'assigned', timestamp: '2026-04-12T09:20:00Z', agent_id: 'AGT001', agent_name: 'Rahul Sharma', notes: 'Auto-assigned to Customer Support resQ' },
  { event_id: 'EVT003', ticket_id: 'TKT-2026-001', event_type: 'note_added', timestamp: '2026-04-12T09:45:00Z', agent_id: 'AGT001', agent_name: 'Rahul Sharma', notes: 'Checked order status - ROMS shows shipped but AWB tracking shows delivered to hub, not to customer. Escalated to logistics team.' },
  { event_id: 'EVT004', ticket_id: 'TKT-2026-001', event_type: 'status_changed', from_status: 'Open', to_status: 'On Hold', timestamp: '2026-04-12T10:00:00Z', agent_id: 'AGT001', agent_name: 'Rahul Sharma', notes: 'Waiting for logistics team response' },
  { event_id: 'EVT005', ticket_id: 'TKT-2026-001', event_type: 'status_changed', from_status: 'On Hold', to_status: 'Open', timestamp: '2026-04-12T14:30:00Z', agent_id: 'AGT001', agent_name: 'Rahul Sharma', notes: 'Logistics team confirmed delivery hub issue. Rescheduling delivery.' },
  // TKT-2026-002
  { event_id: 'EVT006', ticket_id: 'TKT-2026-002', event_type: 'created', timestamp: '2026-04-11T11:30:00Z', agent_name: 'System', notes: 'Ticket created via Email channel' },
  { event_id: 'EVT007', ticket_id: 'TKT-2026-002', event_type: 'assigned', timestamp: '2026-04-11T11:45:00Z', agent_id: 'AGT005', agent_name: 'Deepa Nair', notes: 'Assigned to Refund Processing Queue' },
  { event_id: 'EVT008', ticket_id: 'TKT-2026-002', event_type: 'note_added', timestamp: '2026-04-11T12:45:00Z', agent_id: 'AGT005', agent_name: 'Deepa Nair', notes: 'Order cancellation confirmed. Initiating refund process. Need customer to verify bank account.' },
  { event_id: 'EVT009', ticket_id: 'TKT-2026-002', event_type: 'status_changed', from_status: 'Open', to_status: 'Pending Customer', timestamp: '2026-04-12T10:20:00Z', agent_id: 'AGT005', agent_name: 'Deepa Nair', notes: 'Email sent to customer to confirm bank details for refund' },
  // TKT-2026-003
  { event_id: 'EVT010', ticket_id: 'TKT-2026-003', event_type: 'created', timestamp: '2026-04-10T08:45:00Z', agent_name: 'System', notes: 'Ticket created via Chat channel' },
  { event_id: 'EVT011', ticket_id: 'TKT-2026-003', event_type: 'assigned', timestamp: '2026-04-10T08:50:00Z', agent_id: 'AGT001', agent_name: 'Rahul Sharma', notes: 'Initial assignment - Customer Support resQ' },
  { event_id: 'EVT012', ticket_id: 'TKT-2026-003', event_type: 'escalated', timestamp: '2026-04-10T09:15:00Z', agent_id: 'AGT001', agent_name: 'Rahul Sharma', notes: 'Escalated to Escalation Queue - P1 complaint, product defect, customer threatening chargeback' },
  { event_id: 'EVT013', ticket_id: 'TKT-2026-003', event_type: 'assigned', timestamp: '2026-04-10T09:20:00Z', agent_id: 'AGT010', agent_name: 'Vikram Singh', notes: 'Reassigned to Vikram Singh - Senior escalation handler' },
  { event_id: 'EVT014', ticket_id: 'TKT-2026-003', event_type: 'status_changed', from_status: 'Open', to_status: 'On Hold', timestamp: '2026-04-12T09:00:00Z', agent_id: 'AGT010', agent_name: 'Vikram Singh', notes: 'Waiting for brand service team inspection appointment' },
  // TKT-2026-004
  { event_id: 'EVT015', ticket_id: 'TKT-2026-004', event_type: 'created', timestamp: '2026-04-12T13:00:00Z', agent_name: 'System', notes: 'Ticket created via Web/App channel' },
  { event_id: 'EVT016', ticket_id: 'TKT-2026-004', event_type: 'note_added', timestamp: '2026-04-12T13:30:00Z', agent_name: 'System', notes: 'Auto-response sent acknowledging inquiry' },
  // TKT-2026-005
  { event_id: 'EVT017', ticket_id: 'TKT-2026-005', event_type: 'created', timestamp: '2026-04-09T15:20:00Z', agent_name: 'System', notes: 'Ticket created via CALL channel' },
  { event_id: 'EVT018', ticket_id: 'TKT-2026-005', event_type: 'assigned', timestamp: '2026-04-09T15:30:00Z', agent_id: 'AGT012', agent_name: 'Anita Krishnamurthy', notes: 'Assigned to Installation Support Queue' },
  { event_id: 'EVT019', ticket_id: 'TKT-2026-005', event_type: 'note_added', timestamp: '2026-04-09T15:45:00Z', agent_id: 'AGT012', agent_name: 'Anita Krishnamurthy', notes: 'Installation not booked during delivery. Coordinating with Jio Signature service team for premium customer experience.' },
  { event_id: 'EVT020', ticket_id: 'TKT-2026-005', event_type: 'status_changed', from_status: 'Open', to_status: 'On Hold', timestamp: '2026-04-10T09:00:00Z', agent_id: 'AGT012', agent_name: 'Anita Krishnamurthy', notes: 'Waiting for service team to confirm appointment slot' },
  { event_id: 'EVT021', ticket_id: 'TKT-2026-005', event_type: 'status_changed', from_status: 'On Hold', to_status: 'Resolved', timestamp: '2026-04-12T11:45:00Z', agent_id: 'AGT012', agent_name: 'Anita Krishnamurthy', notes: 'Service team completed product setup. Customer expressed satisfaction.' },
  // TKT-2026-006
  { event_id: 'EVT022', ticket_id: 'TKT-2026-006', event_type: 'created', timestamp: '2026-04-08T10:30:00Z', agent_name: 'System', notes: 'Ticket created via Social channel - Twitter mention' },
  { event_id: 'EVT023', ticket_id: 'TKT-2026-006', event_type: 'escalated', timestamp: '2026-04-08T11:00:00Z', agent_id: 'AGT003', agent_name: 'Priya Patel', notes: 'Social media complaint - escalated to CCHead for P1 handling' },
  { event_id: 'EVT024', ticket_id: 'TKT-2026-006', event_type: 'assigned', timestamp: '2026-04-08T11:15:00Z', agent_id: 'AGT015', agent_name: 'Suresh Menon', notes: 'CCHead taking personal ownership' },
  { event_id: 'EVT025', ticket_id: 'TKT-2026-006', event_type: 'note_added', timestamp: '2026-04-09T10:00:00Z', agent_id: 'AGT015', agent_name: 'Suresh Menon', notes: 'Personally spoke to regional manager. Store manager investigation initiated. Twitter DM sent to customer.' },
  { event_id: 'EVT026', ticket_id: 'TKT-2026-006', event_type: 'status_changed', from_status: 'Open', to_status: 'Resolved', timestamp: '2026-04-10T16:00:00Z', agent_id: 'AGT015', agent_name: 'Suresh Menon', notes: 'Resolution: Warranty claim honored. Rs.5000 goodwill voucher issued. Customer replied positively on Twitter.' },
  { event_id: 'EVT027', ticket_id: 'TKT-2026-006', event_type: 'status_changed', from_status: 'Resolved', to_status: 'Closed', timestamp: '2026-04-10T16:30:00Z', agent_id: 'AGT015', agent_name: 'Suresh Menon', notes: 'Customer confirmed satisfaction. Ticket closed.' },
  // TKT-2026-007
  { event_id: 'EVT028', ticket_id: 'TKT-2026-007', event_type: 'created', timestamp: '2026-04-11T08:00:00Z', agent_name: 'System', notes: 'Ticket created via CALL channel' },
  { event_id: 'EVT029', ticket_id: 'TKT-2026-007', event_type: 'assigned', timestamp: '2026-04-11T08:10:00Z', agent_id: 'AGT018', agent_name: 'Meena Iyer', notes: 'Assigned to B2B Support Queue - Finance specialist' },
  { event_id: 'EVT030', ticket_id: 'TKT-2026-007', event_type: 'note_added', timestamp: '2026-04-11T08:30:00Z', agent_id: 'AGT018', agent_name: 'Meena Iyer', notes: 'Reviewed invoice and GST filing. HS code discrepancy found. Escalating to finance team for credit note approval.' },
  { event_id: 'EVT031', ticket_id: 'TKT-2026-007', event_type: 'status_changed', from_status: 'Open', to_status: 'Pending Customer', timestamp: '2026-04-11T17:30:00Z', agent_id: 'AGT018', agent_name: 'Meena Iyer', notes: 'Finance approving credit note. Awaiting retailer account details for adjustment.' },
  // TKT-2026-008
  { event_id: 'EVT032', ticket_id: 'TKT-2026-008', event_type: 'created', timestamp: '2026-04-12T07:30:00Z', agent_name: 'System', notes: 'Ticket created via Web/App channel' },
  { event_id: 'EVT033', ticket_id: 'TKT-2026-008', event_type: 'assigned', timestamp: '2026-04-12T08:00:00Z', agent_id: 'AGT003', agent_name: 'Priya Patel', notes: 'Assigned to feedback queue' },
  { event_id: 'EVT034', ticket_id: 'TKT-2026-008', event_type: 'status_changed', from_status: 'Open', to_status: 'Resolved', timestamp: '2026-04-12T12:00:00Z', agent_id: 'AGT003', agent_name: 'Priya Patel', notes: 'Feedback acknowledged and logged. Bug filed with product team (BUG-2026-0345). Thank you note sent to customer.' },
  { event_id: 'EVT035', ticket_id: 'TKT-2026-008', event_type: 'status_changed', from_status: 'Resolved', to_status: 'Closed', timestamp: '2026-04-12T12:30:00Z', agent_id: 'AGT003', agent_name: 'Priya Patel', notes: 'Auto-closed after resolution.' },
  // TKT-2026-009
  { event_id: 'EVT036', ticket_id: 'TKT-2026-009', event_type: 'created', timestamp: '2026-04-07T14:15:00Z', agent_name: 'System', notes: 'Ticket created via Email channel' },
  { event_id: 'EVT037', ticket_id: 'TKT-2026-009', event_type: 'assigned', timestamp: '2026-04-07T14:30:00Z', agent_id: 'AGT020', agent_name: 'Arjun Gupta', notes: 'Assigned to B2B Support - Critical payment issue' },
  { event_id: 'EVT038', ticket_id: 'TKT-2026-009', event_type: 'escalated', timestamp: '2026-04-07T15:00:00Z', agent_id: 'AGT020', agent_name: 'Arjun Gupta', notes: 'SLA at risk. Escalated to Finance Head for immediate resolution. NEFT reference: NEFT0001234567.' },
  { event_id: 'EVT039', ticket_id: 'TKT-2026-009', event_type: 'note_added', timestamp: '2026-04-09T10:00:00Z', agent_id: 'AGT020', agent_name: 'Arjun Gupta', notes: 'Finance team confirmed receipt. Payment reconciliation in process. ETA: 2 business days.' },
  { event_id: 'EVT040', ticket_id: 'TKT-2026-009', event_type: 'note_added', timestamp: '2026-04-11T11:00:00Z', agent_id: 'AGT020', agent_name: 'Arjun Gupta', notes: 'Payment still not credited. Finance team escalated to banking team. Distributor getting impatient.' },
  // TKT-2026-010
  { event_id: 'EVT041', ticket_id: 'TKT-2026-010', event_type: 'created', timestamp: '2026-04-12T11:45:00Z', agent_name: 'System', notes: 'Walk-in ticket created at store' },
  { event_id: 'EVT042', ticket_id: 'TKT-2026-010', event_type: 'note_added', timestamp: '2026-04-12T12:00:00Z', agent_name: 'Store Agent', notes: 'Customer at Ahmedabad outlet. Product purchased 8 days ago. Within 10-day exchange window. Checking stock availability of same model.' },
]
