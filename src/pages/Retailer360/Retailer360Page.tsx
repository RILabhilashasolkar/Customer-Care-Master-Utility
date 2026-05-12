import React, { useState } from 'react'
import { AppShell } from '../../components/layout/AppShell'
import { SearchInput } from '../../components/core/SearchInput'
import { Tabs } from '../../components/core/Tabs'
import { Card } from '../../components/core/Card'
import { EmptyState } from '../../components/core/EmptyState'
import { RetailerProfileCard } from './RetailerProfileCard'
import { RetailerOrderHistory } from './RetailerOrderHistory'
import { RetailerTicketHistory } from './RetailerTicketHistory'
import { RetailerPerformanceMetrics } from './RetailerPerformanceMetrics'
import { dataService } from '../../services/mockAdapter'
import { MOCK_ORDERS } from '../../data/orders.mock'
import { MOCK_TICKETS } from '../../data/tickets.mock'
import type { Retailer } from '../../types/retailer.types'

const TABS = [
  { id: 'profile', label: 'Profile' },
  { id: 'orders', label: 'Orders' },
  { id: 'tickets', label: 'Tickets' },
  { id: 'performance', label: 'Performance' },
]

export function Retailer360Page() {
  const [query, setQuery] = useState('')
  const [retailer, setRetailer] = useState<Retailer | null | 'not-found'>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    setRetailer(null)
    const result = await dataService.getRetailer(query.trim())
    setRetailer(result ?? 'not-found')
    setLoading(false)
  }

  const retailerOrders = retailer && retailer !== 'not-found'
    ? MOCK_ORDERS.filter((o) => o.retailer_id === retailer.retailer_id)
    : []
  const retailerTickets = retailer && retailer !== 'not-found'
    ? MOCK_TICKETS.filter((t) => t.customer_name === retailer.name)
    : []

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Retailer 360</h1>
          <p className="text-sm text-gray-500 mt-1">Complete retailer profile with orders and performance</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex gap-3">
            <SearchInput
              value={query}
              onChange={setQuery}
              onSearch={handleSearch}
              placeholder="Search by Retailer ID, name, or GSTIN..."
              loading={loading}
              className="flex-1"
            />
            <button
              onClick={handleSearch}
              disabled={loading || !query.trim()}
              className="bg-brand-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-brand-800 disabled:opacity-60"
            >
              Search
            </button>
          </div>

          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-2">Quick search:</p>
            <div className="flex flex-wrap gap-2">
              {['RET001', 'RET003', 'RET004', 'RET007'].map((id) => (
                <button
                  key={id}
                  onClick={() => { setQuery(id); setTimeout(handleSearch, 100) }}
                  className="text-xs px-2 py-1 rounded border border-gray-200 hover:border-brand-400 hover:text-brand-700"
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        </div>

        {retailer === 'not-found' && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-red-600">
            No retailer found. Try searching by Retailer ID (e.g., RET001), name, or GSTIN.
          </div>
        )}

        {retailer && retailer !== 'not-found' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-5 pt-5">
              <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
            </div>
            <div className="p-5">
              {activeTab === 'profile' && <RetailerProfileCard retailer={retailer} />}
              {activeTab === 'orders' && (
                <>
                  <p className="text-sm text-gray-500 mb-4">{retailerOrders.length} orders found</p>
                  <RetailerOrderHistory orders={retailerOrders} />
                </>
              )}
              {activeTab === 'tickets' && <RetailerTicketHistory tickets={retailerTickets} />}
              {activeTab === 'performance' && <RetailerPerformanceMetrics orders={retailerOrders} />}
            </div>
          </div>
        )}

        {!retailer && !loading && (
          <Card>
            <EmptyState title="Search for a retailer" subtitle="Enter a retailer ID, name, or GSTIN to view their complete profile" />
          </Card>
        )}
      </div>
    </AppShell>
  )
}
