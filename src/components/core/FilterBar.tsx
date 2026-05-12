import React from 'react'
import { format, subDays } from 'date-fns'
import { useDashboardFilters } from '../../context/DashboardFilterContext'
import { Filter, RotateCcw } from 'lucide-react'

const DATE_PRESETS = [
  { label: 'Today', days: 0 },
  { label: '7D', days: 7 },
  { label: '30D', days: 30 },
  { label: '90D', days: 90 },
]

const CHANNELS = ['CALL', 'Chat', 'Email', 'Web/App', 'Social', 'Walk-in']
const PRIORITIES = ['P1', 'P2', 'P3', 'P4']

export function FilterBar() {
  const { filters, updateFilters, resetFilters } = useDashboardFilters()
  const today = format(new Date(), 'yyyy-MM-dd')

  const handlePreset = (days: number) => {
    updateFilters({
      date_from: days === 0 ? today : format(subDays(new Date(), days), 'yyyy-MM-dd'),
      date_to: today,
    })
  }

  const toggleChannel = (ch: string) => {
    const next = filters.channels.includes(ch)
      ? filters.channels.filter((c) => c !== ch)
      : [...filters.channels, ch]
    updateFilters({ channels: next })
  }

  const togglePriority = (p: string) => {
    const next = filters.priorities.includes(p)
      ? filters.priorities.filter((x) => x !== p)
      : [...filters.priorities, p]
    updateFilters({ priorities: next })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
        <Filter className="w-4 h-4" />
        <span>Filters:</span>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-xs text-gray-500 mr-1">Date:</span>
        {DATE_PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => handlePreset(p.days)}
            className="px-2 py-1 text-xs rounded border border-gray-200 hover:bg-brand-50 hover:border-brand-300 hover:text-brand-800"
          >
            {p.label}
          </button>
        ))}
        <input
          type="date"
          value={filters.date_from}
          onChange={(e) => updateFilters({ date_from: e.target.value })}
          className="ml-1 text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-brand-400"
        />
        <span className="text-xs text-gray-400">—</span>
        <input
          type="date"
          value={filters.date_to}
          onChange={(e) => updateFilters({ date_to: e.target.value })}
          className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-brand-400"
        />
      </div>

      <div className="flex items-center gap-1">
        <span className="text-xs text-gray-500 mr-1">Channel:</span>
        {CHANNELS.map((ch) => (
          <button
            key={ch}
            onClick={() => toggleChannel(ch)}
            className={`px-2 py-1 text-xs rounded border transition-colors ${
              filters.channels.includes(ch)
                ? 'bg-brand-900 text-white border-brand-900'
                : 'border-gray-200 hover:border-brand-300'
            }`}
          >
            {ch}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1">
        <span className="text-xs text-gray-500 mr-1">Priority:</span>
        {PRIORITIES.map((p) => (
          <button
            key={p}
            onClick={() => togglePriority(p)}
            className={`px-2 py-1 text-xs rounded border transition-colors ${
              filters.priorities.includes(p)
                ? 'bg-brand-900 text-white border-brand-900'
                : 'border-gray-200 hover:border-brand-300'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button onClick={resetFilters} className="ml-auto flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
        <RotateCcw className="w-3 h-3" />
        Reset
      </button>
    </div>
  )
}
