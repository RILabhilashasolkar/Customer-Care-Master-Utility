import React, { useState } from 'react'
import { AppShell } from '../../components/layout/AppShell'
import { OrderSearchBar } from './OrderSearchBar'
import { BusinessLineFilter } from './BusinessLineFilter'
import { OrderDetailCard } from './OrderDetailCard'
import { DynamicTable } from '../../components/dynamic/DynamicTable'
import { EmptyState } from '../../components/core/EmptyState'
import { dataService } from '../../services/mockAdapter'
import type { Order } from '../../types/order.types'
import { MOCK_ORDERS } from '../../data/orders.mock'

export function OrderTrackerPage() {
  const [searchResult, setSearchResult] = useState<Order | null | 'not-found'>(null)
  const [loading, setLoading] = useState(false)
  const [selectedBL, setSelectedBL] = useState('All')
  const [direction, setDirection] = useState<'All' | 'Forward' | 'Return'>('All')

  const handleSearch = async (query: string) => {
    setLoading(true)
    setSearchResult(null)
    const result = await dataService.getOrder(query)
    setSearchResult(result ?? 'not-found')
    setLoading(false)
  }

  const filteredOrders = MOCK_ORDERS.filter((o) => {
    if (selectedBL !== 'All' && o.business_line !== selectedBL) return false
    if (direction !== 'All' && o.direction !== direction) return false
    return true
  })

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Order Tracker</h1>
          <p className="text-sm text-gray-500 mt-1">Track shipments across all Reliance business lines</p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
          <OrderSearchBar onSearch={handleSearch} loading={loading} />

          {/* Search result */}
          {searchResult === 'not-found' && (
            <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-sm text-red-600">
              No order found for this ID. Please verify and try again.
            </div>
          )}
          {searchResult && searchResult !== 'not-found' && (
            <OrderDetailCard order={searchResult} />
          )}
        </div>

        {/* All orders table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-5 border-b border-gray-100 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-800">Recent Orders</h2>
              <div className="flex gap-1">
                {(['All', 'Forward', 'Return'] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDirection(d)}
                    className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                      direction === d ? 'bg-brand-900 text-white border-brand-900' : 'border-gray-200 text-gray-600 hover:border-brand-400'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <BusinessLineFilter selected={selectedBL} onChange={setSelectedBL} />
          </div>

          {filteredOrders.length === 0 ? (
            <EmptyState title="No orders found" subtitle="Try changing the filters" />
          ) : (
            <DynamicTable
              configKey="customer.order"
              data={filteredOrders as unknown as Record<string, unknown>[]}
              onRowClick={(row) => handleSearch(String(row.shipment_id))}
              keyField="shipment_id"
            />
          )}
        </div>
      </div>
    </AppShell>
  )
}
