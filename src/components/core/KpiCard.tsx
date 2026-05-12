import React from 'react'
import clsx from 'clsx'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface KpiCardProps {
  title: string
  value: string | number
  subtitle?: string
  delta?: number
  icon?: React.ReactNode
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange'
  className?: string
}

const COLOR_STYLES = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-100' },
  green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-100' },
  red: { bg: 'bg-red-50', icon: 'text-red-600', border: 'border-red-100' },
  yellow: { bg: 'bg-yellow-50', icon: 'text-yellow-600', border: 'border-yellow-100' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-100' },
  orange: { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-100' },
}

export function KpiCard({ title, value, subtitle, delta, icon, color = 'blue', className }: KpiCardProps) {
  const styles = COLOR_STYLES[color]

  return (
    <div className={clsx('bg-white rounded-lg shadow-sm border p-5', styles.border, className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
          {delta !== undefined && (
            <div className={clsx('mt-2 flex items-center text-xs font-medium', delta >= 0 ? 'text-green-600' : 'text-red-600')}>
              {delta >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {Math.abs(delta)}% vs yesterday
            </div>
          )}
        </div>
        {icon && (
          <div className={clsx('p-2 rounded-lg', styles.bg)}>
            <span className={clsx('w-5 h-5', styles.icon)}>{icon}</span>
          </div>
        )}
      </div>
    </div>
  )
}
