import React from 'react'
import { ShoppingBag, TrendingUp, RotateCcw, CreditCard } from 'lucide-react'
import { KpiCard } from '../../components/core/KpiCard'
import type { Order } from '../../types/order.types'

interface RetailerPerformanceMetricsProps {
  orders: Order[]
}

export function RetailerPerformanceMetrics({ orders }: RetailerPerformanceMetricsProps) {
  const totalOrders = orders.length
  const delivered = orders.filter((o) => o.roms_status === 'DELIVERED').length
  const returned = orders.filter((o) => o.direction === 'Return').length
  const totalValue = orders.reduce((sum, o) => sum + (o.total_amount ?? 0), 0)
  const avgOrderValue = totalOrders > 0 ? totalValue / totalOrders : 0
  const fulfillmentRate = totalOrders > 0 ? (delivered / totalOrders) * 100 : 0
  const returnRate = totalOrders > 0 ? (returned / totalOrders) * 100 : 0

  return (
    <div className="grid grid-cols-4 gap-4">
      <KpiCard
        title="Total Orders"
        value={totalOrders}
        subtitle="All time"
        icon={<ShoppingBag className="w-5 h-5" />}
        color="blue"
      />
      <KpiCard
        title="Fulfillment Rate"
        value={`${fulfillmentRate.toFixed(1)}%`}
        subtitle="Delivered vs placed"
        icon={<TrendingUp className="w-5 h-5" />}
        color="green"
      />
      <KpiCard
        title="Avg Order Value"
        value={`₹${(avgOrderValue / 1000).toFixed(1)}K`}
        subtitle="Per shipment"
        icon={<CreditCard className="w-5 h-5" />}
        color="purple"
      />
      <KpiCard
        title="Return Rate"
        value={`${returnRate.toFixed(1)}%`}
        subtitle="Returns vs total"
        icon={<RotateCcw className="w-5 h-5" />}
        color={returnRate > 10 ? 'red' : 'yellow'}
      />
    </div>
  )
}
