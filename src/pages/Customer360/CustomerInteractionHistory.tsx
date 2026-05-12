import React from 'react'
import { format } from 'date-fns'
import { Phone, Mail, MessageSquare, MapPin, Share2 } from 'lucide-react'
import type { InteractionEvent } from '../../types/customer.types'

const EVENT_ICONS: Record<string, React.ReactNode> = {
  call: <Phone className="w-4 h-4" />,
  email: <Mail className="w-4 h-4" />,
  chat: <MessageSquare className="w-4 h-4" />,
  'walk-in': <MapPin className="w-4 h-4" />,
  social: <Share2 className="w-4 h-4" />,
}

const EVENT_COLORS: Record<string, string> = {
  call: 'bg-blue-100 text-blue-600',
  email: 'bg-purple-100 text-purple-600',
  chat: 'bg-green-100 text-green-600',
  'walk-in': 'bg-orange-100 text-orange-600',
  social: 'bg-pink-100 text-pink-600',
}

// Generate mock interactions for display
const MOCK_INTERACTIONS: InteractionEvent[] = [
  { event_id: 'INT001', event_type: 'call', channel: 'CALL', agent_name: 'Rahul Sharma', timestamp: '2026-04-12T09:15:00Z', notes: 'Customer called regarding delivery delay. Issue escalated.', ticket_id: 'TKT-2026-001' },
  { event_id: 'INT002', event_type: 'chat', channel: 'Chat', agent_name: 'Priya Patel', timestamp: '2026-04-10T14:30:00Z', notes: 'Chat session: Product query about warranty terms.' },
  { event_id: 'INT003', event_type: 'email', channel: 'Email', agent_name: 'Amit Verma', timestamp: '2026-04-08T11:00:00Z', notes: 'Email received: Refund request for cancelled order.' },
  { event_id: 'INT004', event_type: 'call', channel: 'CALL', agent_name: 'Sunita Gupta', timestamp: '2026-04-05T16:45:00Z', notes: 'Outbound call: Follow-up on delivery satisfaction. Customer satisfied.' },
]

interface CustomerInteractionHistoryProps {
  customerId: string
}

export function CustomerInteractionHistory({ customerId: _customerId }: CustomerInteractionHistoryProps) {
  return (
    <div className="space-y-3">
      {MOCK_INTERACTIONS.map((event) => (
        <div key={event.event_id} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${EVENT_COLORS[event.event_type] ?? 'bg-gray-100 text-gray-600'}`}>
            {EVENT_ICONS[event.event_type] ?? <MessageSquare className="w-4 h-4" />}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-800">{event.channel} — {event.agent_name}</p>
              <p className="text-xs text-gray-400">{format(new Date(event.timestamp), 'dd MMM yyyy, HH:mm')}</p>
            </div>
            <p className="text-sm text-gray-600 mt-1">{event.notes}</p>
            {event.ticket_id && (
              <p className="text-xs text-brand-600 mt-1">Ticket: {event.ticket_id}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
