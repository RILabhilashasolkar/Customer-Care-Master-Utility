import type { DataService } from './dataService'
import type { Customer } from '../types/customer.types'
import type { Retailer } from '../types/retailer.types'
import type { Order } from '../types/order.types'
import type { Ticket, TicketEvent } from '../types/ticket.types'
import type { AgentStatusSnapshot } from '../types/agent.types'
import type { QueueHealthSnapshot, QueuePerformanceRow, AgentPerformanceRow, TrendDataPoint, VolumeMixData, DashboardFilters } from '../types/dashboard.types'
import type { Store } from '../types/store.types'
import { MOCK_CUSTOMERS } from '../data/customers.mock'
import { MOCK_RETAILERS } from '../data/retailers.mock'
import { MOCK_ORDERS } from '../data/orders.mock'
import { MOCK_TICKETS } from '../data/tickets.mock'
import { MOCK_TICKET_EVENTS } from '../data/ticketEvents.mock'
import { MOCK_AGENT_STATUS_SNAPSHOTS } from '../data/agents.mock'
import { MOCK_QUEUE_SNAPSHOTS } from '../data/queues.mock'
import { MOCK_QUEUE_PERFORMANCE, MOCK_AGENT_PERFORMANCE, SLA_AGING_BUCKETS, BREAK_ADHERENCE_DATA } from '../data/kpiSnapshots.mock'
import { TREND_DATA } from '../data/trends.mock'
import { MOCK_STORES } from '../data/stores.mock'

function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms + Math.random() * 200))
}

function applyRandomVariation(value: number, pct = 0.1): number {
  const variation = value * pct * (Math.random() * 2 - 1)
  return Math.max(0, Math.round(value + variation))
}

class MockAdapter implements DataService {
  private tickets: Ticket[] = [...MOCK_TICKETS]

  async getCustomer(id: string): Promise<Customer | null> {
    await delay()
    return MOCK_CUSTOMERS.find((c) => c.customer_id === id || c.phone === id || c.email.toLowerCase() === id.toLowerCase()) ?? null
  }

  async searchCustomers(query: string): Promise<Customer[]> {
    await delay()
    const q = query.toLowerCase()
    return MOCK_CUSTOMERS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.customer_id.toLowerCase().includes(q)
    )
  }

  async getRetailer(id: string): Promise<Retailer | null> {
    await delay()
    return MOCK_RETAILERS.find((r) => r.retailer_id === id || r.name.toLowerCase().includes(id.toLowerCase()) || r.gstin === id) ?? null
  }

  async searchRetailers(query: string): Promise<Retailer[]> {
    await delay()
    const q = query.toLowerCase()
    return MOCK_RETAILERS.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.retailer_id.toLowerCase().includes(q) ||
        r.gstin.toLowerCase().includes(q) ||
        r.contact_name.toLowerCase().includes(q)
    )
  }

  async getOrder(shipmentOrOrderId: string): Promise<Order | null> {
    await delay()
    const id = shipmentOrOrderId.toUpperCase().trim()
    return (
      MOCK_ORDERS.find(
        (o) =>
          o.shipment_id.toUpperCase() === id ||
          o.order_id.toUpperCase() === id ||
          o.shipment_id.toUpperCase().includes(id) ||
          o.order_id.toUpperCase().includes(id) ||
          o.sales_order_number.toUpperCase() === id
      ) ?? null
    )
  }

  async searchOrders(filters: Partial<{ business_line: string; status: string; date_from: string; date_to: string; customer_id: string }>): Promise<Order[]> {
    await delay()
    return MOCK_ORDERS.filter((o) => {
      if (filters.business_line && filters.business_line !== 'All' && o.business_line !== filters.business_line) return false
      if (filters.status && o.roms_status !== filters.status) return false
      if (filters.customer_id && o.customer_id !== filters.customer_id) return false
      if (filters.date_from && o.order_date < filters.date_from) return false
      if (filters.date_to && o.order_date > filters.date_to) return false
      return true
    })
  }

  async getTickets(filters: Partial<DashboardFilters & { status: string; priority: string; queue_id: string; customer_id: string; page: number; pageSize: number }>): Promise<{ data: Ticket[]; total: number }> {
    await delay()
    let result = [...this.tickets]

    if (filters.channels && filters.channels.length > 0) {
      result = result.filter((t) => filters.channels!.includes(t.channel))
    }
    if (filters.priorities && filters.priorities.length > 0) {
      result = result.filter((t) => filters.priorities!.includes(t.priority))
    }
    if (filters.status) {
      result = result.filter((t) => t.current_status === filters.status)
    }
    if (filters.priority) {
      result = result.filter((t) => t.priority === filters.priority)
    }
    if (filters.queue_id) {
      result = result.filter((t) => t.current_queue_id === filters.queue_id)
    }
    if (filters.customer_id) {
      result = result.filter((t) => t.customer_id === filters.customer_id)
    }
    if (filters.date_from) {
      result = result.filter((t) => t.created_at >= filters.date_from!)
    }
    if (filters.date_to) {
      result = result.filter((t) => t.created_at <= filters.date_to! + 'T23:59:59Z')
    }

    const page = filters.page ?? 1
    const pageSize = filters.pageSize ?? 25
    const total = result.length
    const start = (page - 1) * pageSize
    const data = result.slice(start, start + pageSize)

    return { data, total }
  }

  async getTicketById(ticketId: string): Promise<Ticket | null> {
    await delay()
    return this.tickets.find((t) => t.ticket_id === ticketId) ?? null
  }

  async getTicketEvents(ticketId: string): Promise<TicketEvent[]> {
    await delay()
    return MOCK_TICKET_EVENTS.filter((e) => e.ticket_id === ticketId)
  }

  async createTicket(payload: Partial<Ticket>): Promise<Ticket> {
    await delay(500)
    const newTicket: Ticket = {
      ticket_id: `TKT-2026-${String(this.tickets.length + 1).padStart(3, '0')}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      channel: payload.channel ?? 'CALL',
      vertical: payload.vertical ?? 'Reliance Digital Online',
      ticket_type: payload.ticket_type ?? 'Enquiry',
      category: payload.category ?? 'General',
      subcategory: payload.subcategory ?? 'General',
      priority: payload.priority ?? 'P4',
      current_queue_id: payload.current_queue_id ?? 'Q001',
      current_queue_name: payload.current_queue_name ?? 'Customer Support resQ',
      current_status: 'Open',
      sla_due_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      sla_breached: false,
      description: payload.description ?? '',
      ...payload,
    }
    this.tickets.unshift(newTicket)
    return newTicket
  }

  async getQueueHealthSnapshot(): Promise<QueueHealthSnapshot[]> {
    await delay(200)
    return MOCK_QUEUE_SNAPSHOTS.map((q) => ({
      ...q,
      total_backlog: applyRandomVariation(q.total_backlog, 0.05),
      unassigned_backlog: applyRandomVariation(q.unassigned_backlog, 0.1),
      sla_breached_open: applyRandomVariation(q.sla_breached_open, 0.05),
    }))
  }

  async getAgentStatusSnapshot(): Promise<AgentStatusSnapshot[]> {
    await delay(200)
    return MOCK_AGENT_STATUS_SNAPSHOTS.map((a) => ({
      ...a,
      status_duration_minutes: a.current_status !== 'Offline' ? applyRandomVariation(a.status_duration_minutes, 0.2) : a.status_duration_minutes,
    }))
  }

  async getQueuePerformance(_filters: DashboardFilters): Promise<QueuePerformanceRow[]> {
    await delay()
    return MOCK_QUEUE_PERFORMANCE
  }

  async getAgentPerformance(_filters: DashboardFilters): Promise<AgentPerformanceRow[]> {
    await delay()
    return MOCK_AGENT_PERFORMANCE
  }

  async getSlaAging(_filters: DashboardFilters): Promise<Record<string, unknown>[]> {
    await delay()
    return SLA_AGING_BUCKETS
  }

  async getBreaksAdherence(_filters: DashboardFilters): Promise<Record<string, unknown>[]> {
    await delay()
    return BREAK_ADHERENCE_DATA
  }

  async getVolumeMix(_filters: DashboardFilters): Promise<VolumeMixData> {
    await delay()
    const totalByChannel = [
      { name: 'CALL', value: 1245, pct: 38.5 },
      { name: 'Chat', value: 678, pct: 21.0 },
      { name: 'Email', value: 543, pct: 16.8 },
      { name: 'Web/App', value: 432, pct: 13.4 },
      { name: 'Social', value: 234, pct: 7.2 },
      { name: 'Walk-in', value: 98, pct: 3.0 },
    ]
    const totalByType = [
      { name: 'Complaint', value: 1245, pct: 38.5 },
      { name: 'Request', value: 987, pct: 30.5 },
      { name: 'Enquiry', value: 768, pct: 23.7 },
      { name: 'Feedback', value: 230, pct: 7.1 },
    ]
    const totalByBL = [
      { name: 'Reliance Digital Online', value: 1234, pct: 38.2 },
      { name: 'Reliance Digital Offline', value: 678, pct: 21.0 },
      { name: 'ASP-B2B2C', value: 456, pct: 14.1 },
      { name: 'JMD-B2B', value: 345, pct: 10.7 },
      { name: 'My Jio Store', value: 289, pct: 8.9 },
      { name: 'Distribution', value: 156, pct: 4.8 },
      { name: 'Jio Signature', value: 72, pct: 2.2 },
    ]
    const totalByPriority = [
      { name: 'P1', value: 234, pct: 7.2 },
      { name: 'P2', value: 876, pct: 27.1 },
      { name: 'P3', value: 1456, pct: 45.1 },
      { name: 'P4', value: 664, pct: 20.5 },
    ]
    return {
      by_channel: totalByChannel,
      by_type: totalByType,
      by_business_line: totalByBL,
      by_priority: totalByPriority,
    }
  }

  async getTrends(filters: DashboardFilters): Promise<TrendDataPoint[]> {
    await delay()
    return TREND_DATA.filter((d) => {
      if (filters.date_from && d.date < filters.date_from) return false
      if (filters.date_to && d.date > filters.date_to) return false
      return true
    })
  }

  async getStoresByPincode(pincode: string): Promise<Store[]> {
    await delay()
    // Find stores in same city area based on pincode prefix
    const prefix = pincode.slice(0, 3)
    const matches = MOCK_STORES.filter((s) => s.pincode.startsWith(prefix) || s.pincode === pincode)
    // Add mock distances
    return matches.map((s, i) => ({
      ...s,
      distance_km: parseFloat((0.5 + i * 1.8 + Math.random() * 2).toFixed(1)),
    })).sort((a, b) => (a.distance_km ?? 0) - (b.distance_km ?? 0))
  }
}

export const dataService = new MockAdapter()
