import React from 'react'
import { Building2 } from 'lucide-react'
import { Badge } from '../../components/core/Badge'
import { StatusPill } from '../../components/core/StatusPill'
import { DynamicFieldRenderer } from '../../components/dynamic/DynamicFieldRenderer'
import type { Retailer } from '../../types/retailer.types'

interface RetailerProfileCardProps {
  retailer: Retailer
}

export function RetailerProfileCard({ retailer }: RetailerProfileCardProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-brand-100 flex items-center justify-center">
          <Building2 className="w-7 h-7 text-brand-700" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-900">{retailer.name}</h2>
          <p className="text-sm text-gray-500">{retailer.retailer_id}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <Badge status={retailer.retailer_type} />
            <Badge status={retailer.business_line} />
            <StatusPill status={retailer.status} />
          </div>
        </div>
        <div className="text-right text-sm text-gray-500">
          <p>{retailer.city}, {retailer.state}</p>
          <div className="flex gap-1 flex-wrap justify-end mt-1">
            {retailer.category_tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <DynamicFieldRenderer configKey="retailer.profile" data={retailer as unknown as Record<string, unknown>} layout="grid-3" />
    </div>
  )
}
