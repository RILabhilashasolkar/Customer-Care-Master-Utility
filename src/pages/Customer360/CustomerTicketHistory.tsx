import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DynamicTable } from '../../components/dynamic/DynamicTable'
import type { Ticket } from '../../types/ticket.types'

interface CustomerTicketHistoryProps {
  tickets: Ticket[]
  loading?: boolean
}

export function CustomerTicketHistory({ tickets, loading }: CustomerTicketHistoryProps) {
  const navigate = useNavigate()
  return (
    <DynamicTable
      configKey="customer.ticket"
      data={tickets as unknown as Record<string, unknown>[]}
      loading={loading}
      onRowClick={(row) => navigate(`/tickets/${row.ticket_id}`)}
      keyField="ticket_id"
    />
  )
}
