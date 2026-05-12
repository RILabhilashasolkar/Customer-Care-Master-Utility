import type { Customer } from '../types/customer.types'
import type { Retailer } from '../types/retailer.types'
import type { Order } from '../types/order.types'
import type { Ticket, TicketEvent } from '../types/ticket.types'
import type { AgentStatusSnapshot } from '../types/agent.types'
import type { QueueHealthSnapshot, QueuePerformanceRow, AgentPerformanceRow, TrendDataPoint, VolumeMixData, DashboardFilters } from '../types/dashboard.types'
import type { Store } from '../types/store.types'

export interface DataService {
  getCustomer(id: string): Promise<Customer | null>
  searchCustomers(query: string): Promise<Customer[]>
  getRetailer(id: string): Promise<Retailer | null>
  searchRetailers(query: string): Promise<Retailer[]>
  getOrder(shipmentOrOrderId: string): Promise<Order | null>
  searchOrders(filters: Partial<{ business_line: string; status: string; date_from: string; date_to: string; customer_id: string }>): Promise<Order[]>
  getTickets(filters: Partial<DashboardFilters & { status: string; priority: string; queue_id: string; customer_id: string; page: number; pageSize: number }>): Promise<{ data: Ticket[]; total: number }>
  getTicketById(ticketId: string): Promise<Ticket | null>
  getTicketEvents(ticketId: string): Promise<TicketEvent[]>
  createTicket(payload: Partial<Ticket>): Promise<Ticket>
  getQueueHealthSnapshot(): Promise<QueueHealthSnapshot[]>
  getAgentStatusSnapshot(): Promise<AgentStatusSnapshot[]>
  getQueuePerformance(filters: DashboardFilters): Promise<QueuePerformanceRow[]>
  getAgentPerformance(filters: DashboardFilters): Promise<AgentPerformanceRow[]>
  getSlaAging(filters: DashboardFilters): Promise<Record<string, unknown>[]>
  getBreaksAdherence(filters: DashboardFilters): Promise<Record<string, unknown>[]>
  getVolumeMix(filters: DashboardFilters): Promise<VolumeMixData>
  getTrends(filters: DashboardFilters): Promise<TrendDataPoint[]>
  getStoresByPincode(pincode: string): Promise<Store[]>
}
