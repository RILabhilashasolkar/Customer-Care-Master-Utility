import type { BusinessLine } from './order.types'

export type RetailerType = 'B2B' | 'B2B2C' | 'Franchisee' | 'Distributor'

export interface Retailer {
  retailer_id: string
  name: string
  gstin: string
  pan: string
  retailer_type: RetailerType
  business_line: BusinessLine
  contact_name: string
  contact_phone: string
  contact_email: string
  address: string
  city: string
  state: string
  pincode: string
  credit_limit: number
  outstanding_amount: number
  status: 'Active' | 'Inactive' | 'Suspended'
  onboarding_date: string
  category_tags: string[]
}
