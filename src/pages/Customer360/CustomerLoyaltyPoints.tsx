import React from 'react'
import type { Customer } from '../../types/customer.types'

const TIER_THRESHOLDS = { Bronze: 0, Silver: 5000, Gold: 15000, Platinum: 30000 }
const TIER_COLORS = { Bronze: 'bg-amber-500', Silver: 'bg-slate-400', Gold: 'bg-yellow-400', Platinum: 'bg-indigo-500' }

interface CustomerLoyaltyPointsProps {
  customer: Customer
}

export function CustomerLoyaltyPoints({ customer }: CustomerLoyaltyPointsProps) {
  const tiers = (['Bronze', 'Silver', 'Gold', 'Platinum'] as const)
  const currentIdx = tiers.indexOf(customer.loyalty_tier)
  const nextTier = tiers[currentIdx + 1]
  const nextThreshold = nextTier ? TIER_THRESHOLDS[nextTier] : null
  const progress = nextThreshold ? Math.min(100, (customer.loyalty_points / nextThreshold) * 100) : 100

  return (
    <div className="space-y-5">
      {/* Current tier card */}
      <div className="flex items-center gap-4 bg-gradient-to-r from-brand-900 to-brand-700 rounded-xl p-5 text-white">
        <div>
          <p className="text-brand-200 text-sm">Current Tier</p>
          <p className="text-2xl font-bold">{customer.loyalty_tier}</p>
          <p className="text-brand-200 text-sm mt-1">{customer.loyalty_points.toLocaleString('en-IN')} points</p>
        </div>
        <div className="ml-auto">
          <div className={`w-14 h-14 rounded-full ${TIER_COLORS[customer.loyalty_tier]} flex items-center justify-center text-white font-bold text-lg`}>
            {customer.loyalty_tier[0]}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {nextTier && (
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>{customer.loyalty_tier}</span>
            <span>Next: {nextTier} ({nextThreshold?.toLocaleString('en-IN')} pts)</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-700 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {nextThreshold ? (nextThreshold - customer.loyalty_points).toLocaleString('en-IN') : 0} points to reach {nextTier}
          </p>
        </div>
      )}

      {/* Tier milestones */}
      <div className="grid grid-cols-4 gap-3">
        {tiers.map((tier, i) => (
          <div key={tier} className={`rounded-lg p-3 text-center border ${i <= currentIdx ? 'border-brand-200 bg-brand-50' : 'border-gray-100'}`}>
            <div className={`w-8 h-8 rounded-full ${i <= currentIdx ? TIER_COLORS[tier] : 'bg-gray-200'} mx-auto flex items-center justify-center text-white text-xs font-bold`}>
              {tier[0]}
            </div>
            <p className={`text-xs mt-1 font-medium ${i <= currentIdx ? 'text-brand-800' : 'text-gray-400'}`}>{tier}</p>
            <p className="text-xs text-gray-400">{TIER_THRESHOLDS[tier].toLocaleString('en-IN')}+</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold text-gray-800">{customer.total_orders}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500">Total Spent</p>
          <p className="text-xl font-bold text-gray-800">
            ₹{(customer.total_spent / 1000).toFixed(1)}K
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500">Avg Order Value</p>
          <p className="text-xl font-bold text-gray-800">
            ₹{(customer.total_spent / Math.max(1, customer.total_orders) / 1000).toFixed(1)}K
          </p>
        </div>
      </div>
    </div>
  )
}
