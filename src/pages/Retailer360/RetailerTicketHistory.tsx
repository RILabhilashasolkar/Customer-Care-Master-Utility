import React from 'react'
import { DynamicTable } from '../../components/dynamic/DynamicTable'
import type { Ticket } from '../../types/ticket.types'

interface RetailerTicketHistoryProps {
  tickets: Ticket[]
}

export function RetailerTicketHistory({ tickets }: RetailerTicketHistoryProps) {
  return <DynamicTable configKey="customer.ticket" data={tickets as unknown as Record<string, unknown>[]} keyField="ticket_id" />
}
