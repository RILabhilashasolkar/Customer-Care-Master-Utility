import React, { useState } from 'react'
import { AppShell } from '../../components/layout/AppShell'
import { SearchInput } from '../../components/core/SearchInput'
import { Tabs } from '../../components/core/Tabs'
import { Card } from '../../components/core/Card'
import { EmptyState } from '../../components/core/EmptyState'
import { CustomerProfileCard } from './CustomerProfileCard'
import { CustomerOrderHistory } from './CustomerOrderHistory'
import { CustomerTicketHistory } from './CustomerTicketHistory'
import { CustomerLoyaltyPoints } from './CustomerLoyaltyPoints'
import { CustomerInteractionHistory } from './CustomerInteractionHistory'
import { dataService } from '../../services/mockAdapter'
import { MOCK_ORDERS } from '../../data/orders.mock'
import { MOCK_TICKETS } from '../../data/tickets.mock'
import type { Customer } from '../../types/customer.types'

const TABS = [
  { id: 'profile', label: 'Profile' },
  { id: 'orders', label: 'Orders' },
  { id: 'tickets', label: 'Tickets' },
  { id: 'loyalty', label: 'Loyalty' },
  { id: 'interactions', label: 'Interactions' },
]

export function Customer360Page() {
  const [query, setQuery] = useState('')
  const [customer, setCustomer] = useState<Customer | null | 'not-found'>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    setCustomer(null)
    const result = await dataService.getCustomer(query.trim())
    setCustomer(result ?? 'not-found')
    setLoading(false)
  }

  const customerOrders = customer && customer !== 'not-found'
    ? MOCK_ORDERS.filter((o) => o.customer_id === customer.customer_id)
    : []
  const customerTickets = customer && customer !== 'not-found'
    ? MOCK_TICKETS.filter((t) => t.customer_id === customer.customer_id)
    : []

  const tabs = TABS.map((t) => ({
    ...t,
    count: t.id === 'orders' ? customerOrders.length : t.id === 'tickets' ? customerTickets.length : undefined,
  }))

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Customer 360</h1>
          <p className="text-sm text-gray-500 mt-1">Complete customer profile with order and ticket history</p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex gap-3">
            <SearchInput
              value={query}
              onChange={setQuery}
              onSearch={handleSearch}
              placeholder="Search by Customer ID, phone, or email..."
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

          {/* Quick select */}
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-2">Quick search (click to load):</p>
            <div className="flex flex-wrap gap-2">
              {['CUST001', 'CUST002', 'CUST007', 'CUST013'].map((id) => (
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

        {/* Results */}
        {customer === 'not-found' && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-red-600">
            No customer found. Try searching by Customer ID (e.g., CUST001), phone number, or email.
          </div>
        )}

        {customer && customer !== 'not-found' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-5 pt-5">
              <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
            </div>

            <div className="p-5">
              {activeTab === 'profile' && <CustomerProfileCard customer={customer} />}
              {activeTab === 'orders' && (
                <div>
                  <p className="text-sm text-gray-500 mb-4">{customerOrders.length} orders found</p>
                  {customerOrders.length === 0 ? (
                    <EmptyState title="No orders found" subtitle="This customer has no orders yet" />
                  ) : (
                    <CustomerOrderHistory orders={customerOrders} />
                  )}
                </div>
              )}
              {activeTab === 'tickets' && (
                <div>
                  <p className="text-sm text-gray-500 mb-4">{customerTickets.length} tickets found</p>
                  {customerTickets.length === 0 ? (
                    <EmptyState title="No tickets found" />
                  ) : (
                    <CustomerTicketHistory tickets={customerTickets} />
                  )}
                </div>
              )}
              {activeTab === 'loyalty' && <CustomerLoyaltyPoints customer={customer} />}
              {activeTab === 'interactions' && <CustomerInteractionHistory customerId={customer.customer_id} />}
            </div>
          </div>
        )}

        {!customer && !loading && (
          <Card>
            <EmptyState title="Search for a customer" subtitle="Enter a customer ID, phone number, or email to view their complete profile" />
          </Card>
        )}
      </div>
    </AppShell>
  )
}
