import React from 'react'
import clsx from 'clsx'
import { Check } from 'lucide-react'
import type { Order, RomsStatus } from '../../types/order.types'

const FORWARD_STAGES: { key: RomsStatus | string; label: string }[] = [
  { key: 'PLACED', label: 'Placed' },
  { key: 'CONFIRMED', label: 'Confirmed' },
  { key: 'SHIPPED', label: 'Shipped' },
  { key: 'OUT FOR DELIVERY', label: 'Out for Delivery' },
  { key: 'DELIVERED', label: 'Delivered' },
]

const RETURN_STAGES: { key: string; label: string }[] = [
  { key: 'RETURNED', label: 'Return Initiated' },
  { key: 'SHIPPED', label: 'Return Picked Up' },
  { key: 'DELIVERED', label: 'Return Received' },
]

const STATUS_ORDER: Record<string, number> = {
  PLACED: 0,
  CONFIRMED: 1,
  SHIPPED: 2,
  'OUT FOR DELIVERY': 3,
  DELIVERED: 4,
  CANCELLED: -1,
  RETURNED: -1,
}

interface OrderTimelineProps {
  order: Order
}

export function OrderTimeline({ order }: OrderTimelineProps) {
  const isReturn = order.direction === 'Return'
  const stages = isReturn ? RETURN_STAGES : FORWARD_STAGES
  const currentIndex = STATUS_ORDER[order.roms_status] ?? -1
  const isCancelled = order.roms_status === 'CANCELLED'

  if (isCancelled) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <span className="text-red-600 font-medium text-sm">This order has been cancelled</span>
      </div>
    )
  }

  return (
    <div className="relative flex items-start justify-between">
      {stages.map((stage, i) => {
        const completed = i <= currentIndex
        const active = i === currentIndex

        return (
          <div key={stage.key} className="flex flex-col items-center flex-1 relative">
            {/* Connector line */}
            {i < stages.length - 1 && (
              <div className={clsx('absolute top-4 left-1/2 right-0 h-0.5', i < currentIndex ? 'bg-brand-700' : 'bg-gray-200')} style={{ left: '50%', right: '-50%' }} />
            )}

            {/* Step circle */}
            <div
              className={clsx(
                'w-8 h-8 rounded-full flex items-center justify-center z-10 text-xs font-bold',
                completed ? (active ? 'bg-amber-500 text-white ring-4 ring-amber-100' : 'bg-brand-700 text-white') : 'bg-gray-200 text-gray-400'
              )}
            >
              {completed && !active ? <Check className="w-4 h-4" /> : i + 1}
            </div>

            {/* Label */}
            <div className="mt-2 text-center">
              <p className={clsx('text-xs font-medium', active ? 'text-amber-600' : completed ? 'text-brand-800' : 'text-gray-400')}>
                {stage.label}
              </p>
              {active && (
                <p className="text-xs text-gray-400 mt-0.5">Current</p>
              )}
              {stage.key === 'DELIVERED' && order.order_delivered_date && (
                <p className="text-xs text-green-600 mt-0.5">{order.order_delivered_date}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
