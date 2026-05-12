import React from 'react'
import { Badge } from '../../components/core/Badge'
import { DynamicFieldRenderer } from '../../components/dynamic/DynamicFieldRenderer'
import type { Customer } from '../../types/customer.types'

interface CustomerProfileCardProps {
  customer: Customer
}

const TIER_COLORS: Record<string, string> = {
  Bronze: 'bg-amber-100 text-amber-700',
  Silver: 'bg-slate-100 text-slate-700',
  Gold: 'bg-yellow-100 text-yellow-700',
  Platinum: 'bg-indigo-100 text-indigo-700',
}

export function CustomerProfileCard({ customer }: CustomerProfileCardProps) {
  const initials = customer.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center text-brand-800 text-xl font-bold">
          {initials}
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">{customer.name}</h2>
          <p className="text-sm text-gray-500">{customer.customer_id}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className={`text-xs px-2 py-0.5 rounded font-medium ${TIER_COLORS[customer.loyalty_tier]}`}>
              {customer.loyalty_tier}
            </span>
            <Badge status={customer.segment ?? 'Regular'} />
          </div>
        </div>
        <div className="ml-auto text-right">
          <p className="text-2xl font-bold text-brand-900">{customer.loyalty_points.toLocaleString('en-IN')}</p>
          <p className="text-xs text-gray-500">Loyalty Points</p>
        </div>
      </div>

      {/* Profile fields */}
      <DynamicFieldRenderer configKey="customer.profile" data={customer as unknown as Record<string, unknown>} layout="grid-3" />
    </div>
  )
}
