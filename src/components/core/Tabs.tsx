import React from 'react'
import clsx from 'clsx'

interface Tab {
  id: string
  label: string
  count?: number
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (id: string) => void
  className?: string
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={clsx('flex gap-1 border-b border-gray-200', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={clsx(
            'px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors relative',
            activeTab === tab.id
              ? 'text-brand-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-900'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={clsx(
              'ml-1.5 text-xs px-1.5 py-0.5 rounded-full',
              activeTab === tab.id ? 'bg-brand-100 text-brand-800' : 'bg-gray-100 text-gray-600'
            )}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
