import React from 'react'
import { format } from 'date-fns'
import clsx from 'clsx'
import { Plus, UserCheck, ArrowRight, StickyNote, AlertTriangle, CheckCircle } from 'lucide-react'
import type { TicketEvent } from '../../types/ticket.types'

const EVENT_CONFIG: Record<string, { icon: React.ReactNode; color: string; bg: string; label: string }> = {
  created: { icon: <Plus className="w-4 h-4" />, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Created' },
  assigned: { icon: <UserCheck className="w-4 h-4" />, color: 'text-green-600', bg: 'bg-green-100', label: 'Assigned' },
  status_changed: { icon: <ArrowRight className="w-4 h-4" />, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Status Changed' },
  note_added: { icon: <StickyNote className="w-4 h-4" />, color: 'text-gray-600', bg: 'bg-gray-100', label: 'Note Added' },
  escalated: { icon: <AlertTriangle className="w-4 h-4" />, color: 'text-red-600', bg: 'bg-red-100', label: 'Escalated' },
  resolved: { icon: <CheckCircle className="w-4 h-4" />, color: 'text-green-600', bg: 'bg-green-100', label: 'Resolved' },
}

interface TicketTimelineProps {
  events: TicketEvent[]
}

export function TicketTimeline({ events }: TicketTimelineProps) {
  return (
    <div className="space-y-1">
      {events.map((event, i) => {
        const config = EVENT_CONFIG[event.event_type] ?? EVENT_CONFIG.note_added

        return (
          <div key={event.event_id} className="flex gap-3">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div className={clsx('w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0', config.bg, config.color)}>
                {config.icon}
              </div>
              {i < events.length - 1 && <div className="w-px flex-1 bg-gray-200 my-1" />}
            </div>

            <div className="pb-4 flex-1">
              <div className="flex items-center justify-between">
                <span className={clsx('text-xs font-semibold uppercase tracking-wide', config.color)}>{config.label}</span>
                <span className="text-xs text-gray-400">{format(new Date(event.timestamp), 'dd MMM yyyy, HH:mm')}</span>
              </div>
              {event.agent_name && (
                <p className="text-sm font-medium text-gray-700 mt-0.5">{event.agent_name}</p>
              )}
              {event.from_status && event.to_status && (
                <p className="text-xs text-gray-500 mt-1">
                  {event.from_status} → {event.to_status}
                </p>
              )}
              {event.notes && (
                <p className="text-sm text-gray-600 mt-1 bg-gray-50 rounded px-3 py-2">{event.notes}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
