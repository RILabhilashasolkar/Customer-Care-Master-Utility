import React from 'react'
import { Package } from 'lucide-react'
import { Badge } from '../../components/core/Badge'
import { StatusPill } from '../../components/core/StatusPill'
import { DynamicFieldRenderer } from '../../components/dynamic/DynamicFieldRenderer'
import { OrderTimeline } from './OrderTimeline'
import { Card } from '../../components/core/Card'
import type { Order } from '../../types/order.types'

interface OrderDetailCardProps {
  order: Order
}

export function OrderDetailCard({ order }: OrderDetailCardProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <Card>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center">
              <Package className="w-6 h-6 text-brand-700" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">{order.article_name}</h2>
              <p className="text-sm text-gray-500 mt-0.5">Article ID: {order.article_id}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge status={order.direction} />
                <Badge status={order.business_line} />
                <StatusPill status={order.roms_status} />
              </div>
            </div>
          </div>
          <div className="text-right text-sm text-gray-500">
            <p>Order: <span className="font-mono font-medium text-gray-800">{order.order_id}</span></p>
            <p className="mt-1">Shipment: <span className="font-mono text-xs text-gray-600">{order.shipment_id}</span></p>
          </div>
        </div>
      </Card>

      {/* Timeline */}
      <Card title="Delivery Timeline">
        <OrderTimeline order={order} />
      </Card>

      {/* Order details */}
      <Card title="Order Details">
        <DynamicFieldRenderer configKey="order.detail" data={order as unknown as Record<string, unknown>} layout="grid-3" />
      </Card>
    </div>
  )
}
