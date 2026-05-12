import React, { useState } from 'react'
import { MapPin, Search } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { StoreResultCard } from './StoreResultCard'
import { LoadingSpinner } from '../../components/core/LoadingSpinner'
import { EmptyState } from '../../components/core/EmptyState'
import { dataService } from '../../services/mockAdapter'
import type { Store } from '../../types/store.types'

const SAMPLE_PINCODES = ['400050', '110001', '560034', '600017', '500034', '302001']

export function StoreLocatorPage() {
  const [pincode, setPincode] = useState('')
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (pin?: string) => {
    const searchPin = pin ?? pincode
    if (!searchPin.trim() || searchPin.length < 3) return
    setPincode(searchPin)
    setLoading(true)
    const result = await dataService.getStoresByPincode(searchPin.trim())
    setStores(result)
    setLoading(false)
    setSearched(true)
  }

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-100 mb-3">
            <MapPin className="w-6 h-6 text-brand-700" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Store Locator</h1>
          <p className="text-sm text-gray-500 mt-1">Find nearest Reliance Digital and Jio stores</p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter 6-digit pincode..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                maxLength={6}
              />
            </div>
            <button
              onClick={() => handleSearch()}
              disabled={loading || pincode.length < 3}
              className="flex items-center gap-2 bg-brand-900 text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-brand-800 disabled:opacity-60"
            >
              <Search className="w-4 h-4" />
              Find Stores
            </button>
          </div>

          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-2">Quick search by city:</p>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_PINCODES.map((pin) => (
                <button
                  key={pin}
                  onClick={() => handleSearch(pin)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:border-brand-400 hover:text-brand-700 transition-colors"
                >
                  {pin}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {loading && <LoadingSpinner message="Searching stores nearby..." />}

        {!loading && searched && stores.length === 0 && (
          <EmptyState title="No stores found" subtitle="Try a nearby pincode or search in a different city" />
        )}

        {!loading && stores.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-3">{stores.length} stores found near {pincode}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stores.map((store) => (
                <StoreResultCard key={store.store_id} store={store} />
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}
