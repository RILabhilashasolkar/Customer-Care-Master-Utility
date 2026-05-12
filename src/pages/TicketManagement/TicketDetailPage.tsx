import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { Card } from '../../components/core/Card'
import { Tabs } from '../../components/core/Tabs'
import { Badge } from '../../components/core/Badge'
import { StatusPill } from '../../components/core/StatusPill'
import { LoadingSpinner } from '../../components/core/LoadingSpinner'
import { DynamicFieldRenderer } from '../../components/dynamic/DynamicFieldRenderer'
import { TicketTimeline } from './TicketTimeline'
import { dataService } from '../../services/mockAdapter'
import type { Ticket } from '../../types/ticket.types'
import type { TicketEvent } from '../../types/ticket.types'
import { format } from 'date-fns'

const DETAIL_TABS = [
  { id: 'details', label: 'Details' },
  { id: 'timeline', label: 'Timeline' },
]

export function TicketDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [events, setEvents] = useState<TicketEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('details')

  useEffect(() => {
    if (!id) return
    setLoading(true)
    Promise.all([
      dataService.getTicketById(id),
      dataService.getTicketEvents(id),
    ]).then(([t, ev]) => {
      setTicket(t)
      setEvents(ev)
      setLoading(false)
    })
  }, [id])

  if (loading) return <AppShell><LoadingSpinner message="Loading ticket..." size="lg" /></AppShell>
  if (!ticket) return <AppShell><div className="text-red-500">Ticket not found</div></AppShell>

  const slaBreached = ticket.sla_breached
  const slaClass = slaBreached ? 'text-red-600 font-semibold' : 'text-green-600'

  return (
    <AppShell>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-gray-100">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-bold text-gray-900">{ticket.ticket_id}</h1>
              <StatusPill status={ticket.current_status} />
              <Badge status={ticket.priority} />
              <Badge status={ticket.channel} />
            </div>
            <p className="text-sm text-gray-500 mt-0.5">{ticket.category} — {ticket.subcategory}</p>
          </div>
          <div className="text-right text-sm">
            <p className="text-gray-500">Created {format(new Date(ticket.created_at), 'dd MMM yyyy, HH:mm')}</p>
            <p className={`mt-0.5 ${slaClass}`}>SLA: {format(new Date(ticket.sla_due_at), 'dd MMM HH:mm')} {slaBreached ? '(BREACHED)' : ''}</p>
          </div>
        </div>

        {/* Description */}
        <Card title="Issue Description">
          <p className="text-sm text-gray-700 leading-relaxed">{ticket.description}</p>
          {ticket.resolution_notes && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">Resolution</p>
              <p className="text-sm text-gray-700">{ticket.resolution_notes}</p>
            </div>
          )}
        </Card>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-5 pt-4">
            <Tabs tabs={DETAIL_TABS} activeTab={activeTab} onChange={setActiveTab} />
          </div>
          <div className="p-5">
            {activeTab === 'details' && (
              <DynamicFieldRenderer configKey="ticket.detail" data={ticket as unknown as Record<string, unknown>} layout="grid-3" />
            )}
            {activeTab === 'timeline' && (
              events.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">No timeline events yet</p>
              ) : (
                <TicketTimeline events={events} />
              )
            )}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
