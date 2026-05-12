import React from 'react'
import { DynamicTable } from '../../components/dynamic/DynamicTable'
import type { Order } from '../../types/order.types'

interface RetailerOrderHistoryProps {
  orders: Order[]
  loading?: boolean
}

export function RetailerOrderHistory({ orders, loading }: RetailerOrderHistoryProps) {
  return <DynamicTable configKey="customer.order" data={orders as unknown as Record<string, unknown>[]} loading={loading} keyField="shipment_id" />
}
