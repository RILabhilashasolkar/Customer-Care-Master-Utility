import type { RoleId } from './auth.types'

export type FieldType =
  | 'string'
  | 'date'
  | 'datetime'
  | 'currency'
  | 'number'
  | 'badge'
  | 'status'
  | 'pii'
  | 'link'
  | 'duration'
  | 'percent'
  | 'boolean'

export type PiiType = 'phone' | 'email' | 'address' | 'pan' | 'aadhaar'

export interface FieldConfig {
  key: string
  label: string
  type: FieldType
  piiType?: PiiType
  roles?: RoleId[]
  businessLines?: string[]
  sortable?: boolean
  filterable?: boolean
  width?: string
  emptyValue?: string
  badgeColors?: Record<string, string>
}

export interface SubModuleConfig {
  id: string
  label: string
  path: string
  fieldConfigKey?: string
}

export interface ModuleConfig {
  id: string
  label: string
  icon: string
  path: string
  subModules: SubModuleConfig[]
  order: number
}
