import React from 'react'
import { DynamicTable } from '../../components/dynamic/DynamicTable'
import type { Order } from '../../types/order.types'

interface CustomerOrderHistoryProps {
  orders: Order[]
  loading?: boolean
}

export function CustomerOrderHistory({ orders, loading }: CustomerOrderHistoryProps) {
  return (
    <DynamicTable
      configKey="customer.order"
      data={orders as unknown as Record<string, unknown>[]}
      loading={loading}
      keyField="shipment_id"
    />
  )
}
