import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { PermissionGuard } from '../../components/guards/PermissionGuard'
import { DynamicTable } from '../../components/dynamic/DynamicTable'
import { TicketFilters } from './TicketFilters'
import { CreateTicketModal } from './CreateTicketModal'
import { dataService } from '../../services/mockAdapter'
import type { Ticket } from '../../types/ticket.types'

interface Filters {
  status: string
  priority: string
  channel: string
  type: string
}

export function TicketListPage() {
  const navigate = useNavigate()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [filters, setFilters] = useState<Filters>({ status: '', priority: '', channel: '', type: '' })

  const loadTickets = async () => {
    setLoading(true)
    const result = await dataService.getTickets({
      status: filters.status || undefined,
      priority: filters.priority || undefined,
      channels: filters.channel ? [filters.channel] : undefined,
      pageSize: 50,
    })
    setTickets(result.data)
    setTotal(result.total)
    setLoading(false)
  }

  useEffect(() => { loadTickets() }, [filters])

  const updateFilters = (partial: Partial<Filters>) => setFilters((prev) => ({ ...prev, ...partial }))

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Ticket Management</h1>
            <p className="text-sm text-gray-500 mt-1">{total} tickets total</p>
          </div>
          <PermissionGuard moduleId="ticketManagement" action="create">
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 bg-brand-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-800"
            >
              <Plus className="w-4 h-4" />
              New Ticket
            </button>
          </PermissionGuard>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <TicketFilters filters={filters} onChange={updateFilters} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <DynamicTable
            configKey="ticket.list"
            data={tickets as unknown as Record<string, unknown>[]}
            loading={loading}
            onRowClick={(row) => navigate(`/tickets/${row.ticket_id}`)}
            keyField="ticket_id"
          />
        </div>

        <CreateTicketModal
          isOpen={showCreate}
          onClose={() => setShowCreate(false)}
          onCreated={() => loadTickets()}
        />
      </div>
    </AppShell>
  )
}
