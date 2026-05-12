import React from 'react'
import clsx from 'clsx'
import { format } from 'date-fns'
import { FIELDS_CONFIG } from '../../config/fields.config'
import { useAuth } from '../../context/AuthContext'
import { Badge } from '../core/Badge'
import { StatusPill } from '../core/StatusPill'
import { PiiField } from './PiiField'
import type { FieldConfig } from '../../types/config.types'
import type { RoleId } from '../../types/auth.types'

type Layout = 'grid-1' | 'grid-2' | 'grid-3' | 'row'

interface DynamicFieldRendererProps {
  configKey: string
  data: Record<string, unknown>
  layout?: Layout
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)
}

function formatDate(value: string): string {
  try {
    return format(new Date(value), 'dd MMM yyyy')
  } catch {
    return value
  }
}

function formatDatetime(value: string): string {
  try {
    return format(new Date(value), 'dd MMM yyyy, HH:mm')
  } catch {
    return value
  }
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m`
  return `${h}h ${m}m`
}

function renderFieldValue(field: FieldConfig, value: unknown): React.ReactNode {
  if (value === null || value === undefined || value === '') {
    return <span className="text-gray-400">{field.emptyValue ?? '—'}</span>
  }

  switch (field.type) {
    case 'pii':
      return <PiiField value={String(value)} piiType={field.piiType!} label={field.label} />
    case 'currency':
      return <span className="font-medium">{formatCurrency(Number(value))}</span>
    case 'date':
      return <span>{formatDate(String(value))}</span>
    case 'datetime':
      return <span>{formatDatetime(String(value))}</span>
    case 'badge':
      return <Badge status={String(value)} />
    case 'status':
      return <StatusPill status={String(value)} />
    case 'boolean':
      return (
        <span className={value ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
          {value ? 'Yes' : 'No'}
        </span>
      )
    case 'percent':
      return <span>{Number(value).toFixed(1)}%</span>
    case 'duration':
      return <span>{formatDuration(Number(value))}</span>
    case 'number':
      return <span>{Number(value).toLocaleString('en-IN')}</span>
    default:
      return <span>{String(value)}</span>
  }
}

const LAYOUT_CLASSES: Record<Layout, string> = {
  'grid-1': 'grid grid-cols-1 gap-4',
  'grid-2': 'grid grid-cols-2 gap-4',
  'grid-3': 'grid grid-cols-3 gap-4',
  row: 'flex flex-wrap gap-6',
}

export function DynamicFieldRenderer({ configKey, data, layout = 'grid-2' }: DynamicFieldRendererProps) {
  const { user } = useAuth()
  const fields = FIELDS_CONFIG[configKey] ?? []
  const role = user?.role as RoleId | undefined

  const visibleFields = fields.filter((f) => {
    if (!f.roles) return true
    if (!role) return false
    return f.roles.includes(role)
  })

  return (
    <div className={LAYOUT_CLASSES[layout]}>
      {visibleFields.map((field) => {
        const value = data[field.key]
        return (
          <div key={field.key} className={clsx('flex flex-col gap-1', layout === 'row' && 'min-w-[180px]')}>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{field.label}</span>
            <div className="text-sm text-gray-800">{renderFieldValue(field, value)}</div>
          </div>
        )
      })}
    </div>
  )
}
