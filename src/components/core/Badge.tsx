import React from 'react'
import clsx from 'clsx'

const COLOR_MAP: Record<string, string> = {
  green: 'bg-green-100 text-green-800',
  blue: 'bg-blue-100 text-blue-800',
  red: 'bg-red-100 text-red-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  orange: 'bg-orange-100 text-orange-800',
  gray: 'bg-gray-100 text-gray-700',
  purple: 'bg-purple-100 text-purple-800',
  indigo: 'bg-indigo-100 text-indigo-800',
  cyan: 'bg-cyan-100 text-cyan-800',
  pink: 'bg-pink-100 text-pink-800',
  amber: 'bg-amber-100 text-amber-800',
  slate: 'bg-slate-100 text-slate-700',
}

const STATUS_TO_COLOR: Record<string, string> = {
  DELIVERED: 'green',
  SHIPPED: 'blue',
  'OUT FOR DELIVERY': 'cyan',
  CONFIRMED: 'indigo',
  PLACED: 'purple',
  CANCELLED: 'red',
  RETURNED: 'orange',
  PENDING: 'yellow',
  Open: 'blue',
  'Pending Customer': 'yellow',
  'On Hold': 'orange',
  Resolved: 'green',
  Closed: 'gray',
  Active: 'green',
  Inactive: 'gray',
  Suspended: 'red',
  Bronze: 'amber',
  Silver: 'slate',
  Gold: 'yellow',
  Platinum: 'indigo',
  P1: 'red',
  P2: 'orange',
  P3: 'yellow',
  P4: 'green',
  CALL: 'blue',
  Chat: 'green',
  Email: 'purple',
  'Web/App': 'cyan',
  Social: 'pink',
  'Walk-in': 'orange',
  Complaint: 'red',
  Request: 'blue',
  Enquiry: 'cyan',
  Feedback: 'green',
  Forward: 'blue',
  Return: 'orange',
  'JMD-B2B': 'purple',
  'ASP-B2B2C': 'pink',
  'Reliance Digital Online': 'blue',
  'Reliance Digital Offline': 'indigo',
  'Jio Signature': 'cyan',
  'My Jio Store': 'green',
  Distribution: 'amber',
  B2B: 'purple',
  B2B2C: 'pink',
  Franchisee: 'blue',
  Distributor: 'amber',
  'Reliance Digital': 'blue',
  'Jio Mart': 'green',
  'Reliance Digital Express': 'indigo',
}

interface BadgeProps {
  status: string
  color?: string
  className?: string
}

export function Badge({ status, color, className }: BadgeProps) {
  const resolvedColor = color ?? STATUS_TO_COLOR[status] ?? 'gray'
  const colorClass = COLOR_MAP[resolvedColor] ?? COLOR_MAP.gray

  return (
    <span className={clsx('inline-flex items-center px-2 py-0.5 rounded text-xs font-medium', colorClass, className)}>
      {status}
    </span>
  )
}
