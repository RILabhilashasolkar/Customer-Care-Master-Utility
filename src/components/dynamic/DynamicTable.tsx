import React from 'react'
import { format } from 'date-fns'
import { FIELDS_CONFIG } from '../../config/fields.config'
import { useAuth } from '../../context/AuthContext'
import { DataTable } from '../core/DataTable'
import { Badge } from '../core/Badge'
import { StatusPill } from '../core/StatusPill'
import { PiiField } from './PiiField'
import type { Column } from '../core/DataTable'
import type { FieldConfig } from '../../types/config.types'
import type { RoleId } from '../../types/auth.types'

interface DynamicTableProps {
  configKey: string
  data: Record<string, unknown>[]
  loading?: boolean
  onRowClick?: (row: Record<string, unknown>) => void
  keyField?: string
}

function renderCell(field: FieldConfig, value: unknown): React.ReactNode {
  if (value === null || value === undefined || value === '') {
    return <span className="text-gray-400">{field.emptyValue ?? '—'}</span>
  }
  switch (field.type) {
    case 'pii':
      return <PiiField value={String(value)} piiType={field.piiType!} label={field.label} />
    case 'currency':
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value))
    case 'date':
      try { return format(new Date(String(value)), 'dd MMM yyyy') } catch { return String(value) }
    case 'datetime':
      try { return format(new Date(String(value)), 'dd MMM yy HH:mm') } catch { return String(value) }
    case 'badge':
      return <Badge status={String(value)} />
    case 'status':
      return <StatusPill status={String(value)} />
    case 'boolean':
      return <span className={value ? 'text-red-600 text-xs font-medium' : 'text-green-600 text-xs font-medium'}>{value ? 'Breached' : 'OK'}</span>
    case 'percent':
      return `${Number(value).toFixed(1)}%`
    case 'duration': {
      const mins = Number(value)
      const h = Math.floor(mins / 60); const m = mins % 60
      return h > 0 ? `${h}h ${m}m` : `${m}m`
    }
    default:
      return <span className="truncate max-w-xs block">{String(value)}</span>
  }
}

export function DynamicTable({ configKey, data, loading, onRowClick, keyField }: DynamicTableProps) {
  const { user } = useAuth()
  const fields = FIELDS_CONFIG[configKey] ?? []
  const role = user?.role as RoleId | undefined

  const visibleFields = fields.filter((f) => {
    if (!f.roles) return true
    if (!role) return false
    return f.roles.includes(role)
  })

  const columns: Column<Record<string, unknown>>[] = visibleFields.map((field) => ({
    id: field.key,
    label: field.label,
    sortable: field.sortable,
    width: field.width,
    render: (row) => renderCell(field, row[field.key]),
  }))

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
      onRowClick={onRowClick}
      keyField={keyField as never}
    />
  )
}
