import React from 'react'
import { MapPin, Phone, Clock, Navigation } from 'lucide-react'
import { Badge } from '../../components/core/Badge'
import type { Store } from '../../types/store.types'

interface StoreResultCardProps {
  store: Store
}

export function StoreResultCard({ store }: StoreResultCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{store.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge status={store.store_type} />
            {store.distance_km !== undefined && (
              <span className="flex items-center gap-1 text-xs text-brand-700 font-medium">
                <Navigation className="w-3 h-3" />
                {store.distance_km} km
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-1.5 text-xs text-gray-600">
        <div className="flex items-start gap-2">
          <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
          <span>{store.address}, {store.city}, {store.state} — {store.pincode}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span>{store.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span>{store.timings}</span>
        </div>
      </div>
    </div>
  )
}
