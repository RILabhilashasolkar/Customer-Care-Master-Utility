import React from 'react'
import clsx from 'clsx'

const STATUS_COLORS: Record<string, { dot: string; text: string; bg: string }> = {
  Ready: { dot: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-50' },
  Working: { dot: 'bg-blue-500', text: 'text-blue-700', bg: 'bg-blue-50' },
  'Tea Break': { dot: 'bg-yellow-500', text: 'text-yellow-700', bg: 'bg-yellow-50' },
  'Lunch Break': { dot: 'bg-orange-500', text: 'text-orange-700', bg: 'bg-orange-50' },
  'Bio Break': { dot: 'bg-yellow-400', text: 'text-yellow-600', bg: 'bg-yellow-50' },
  'Offline Activity': { dot: 'bg-purple-500', text: 'text-purple-700', bg: 'bg-purple-50' },
  Offline: { dot: 'bg-gray-400', text: 'text-gray-600', bg: 'bg-gray-50' },
  Open: { dot: 'bg-blue-500', text: 'text-blue-700', bg: 'bg-blue-50' },
  'Pending Customer': { dot: 'bg-yellow-500', text: 'text-yellow-700', bg: 'bg-yellow-50' },
  'On Hold': { dot: 'bg-orange-500', text: 'text-orange-700', bg: 'bg-orange-50' },
  Resolved: { dot: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-50' },
  Closed: { dot: 'bg-gray-400', text: 'text-gray-600', bg: 'bg-gray-50' },
  Active: { dot: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-50' },
  Inactive: { dot: 'bg-gray-400', text: 'text-gray-600', bg: 'bg-gray-50' },
  Suspended: { dot: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50' },
}

const DEFAULT_STYLE = { dot: 'bg-gray-400', text: 'text-gray-600', bg: 'bg-gray-50' }

interface StatusPillProps {
  status: string
  className?: string
}

export function StatusPill({ status, className }: StatusPillProps) {
  const style = STATUS_COLORS[status] ?? DEFAULT_STYLE

  return (
    <span className={clsx('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium', style.bg, style.text, className)}>
      <span className={clsx('w-1.5 h-1.5 rounded-full', style.dot)} />
      {status}
    </span>
  )
}
