import React from 'react'
import clsx from 'clsx'
import { BUSINESS_LINES } from '../../config/businessLines.config'

interface BusinessLineFilterProps {
  selected: string
  onChange: (bl: string) => void
}

export function BusinessLineFilter({ selected, onChange }: BusinessLineFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('All')}
        className={clsx(
          'px-3 py-1.5 rounded-full text-sm font-medium transition-colors border',
          selected === 'All' ? 'bg-brand-900 text-white border-brand-900' : 'border-gray-200 text-gray-600 hover:border-brand-400'
        )}
      >
        All
      </button>
      {BUSINESS_LINES.map((bl) => (
        <button
          key={bl.id}
          onClick={() => onChange(bl.id)}
          className={clsx(
            'px-3 py-1.5 rounded-full text-sm font-medium transition-colors border',
            selected === bl.id ? 'text-white border-transparent' : 'border-gray-200 text-gray-600 hover:border-brand-400'
          )}
          style={selected === bl.id ? { backgroundColor: bl.color, borderColor: bl.color } : undefined}
        >
          {bl.shortLabel}
        </button>
      ))}
    </div>
  )
}
