import React from 'react'

interface EmptyStateProps {
  title: string
  subtitle?: string
}

export function EmptyState({ title, subtitle }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
        <circle cx="40" cy="40" r="40" fill="#F3F4F6" />
        <rect x="22" y="28" width="36" height="28" rx="3" fill="#E5E7EB" />
        <rect x="26" y="33" width="18" height="2" rx="1" fill="#9CA3AF" />
        <rect x="26" y="38" width="12" height="2" rx="1" fill="#9CA3AF" />
        <rect x="26" y="43" width="20" height="2" rx="1" fill="#9CA3AF" />
      </svg>
      <p className="text-sm font-medium text-gray-700">{title}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  )
}
