import React, { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'

interface OrderSearchBarProps {
  onSearch: (query: string) => void
  loading: boolean
}

export function OrderSearchBar({ onSearch, loading }: OrderSearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) onSearch(query.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by Shipment ID, Order ID, or Sales Order Number..."
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>
      <button
        type="submit"
        disabled={loading || !query.trim()}
        className="flex items-center gap-2 bg-brand-900 text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-brand-800 disabled:opacity-60 transition-colors"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        Search
      </button>
    </form>
  )
}
