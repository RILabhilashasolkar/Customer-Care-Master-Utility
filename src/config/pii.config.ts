import type { RoleId } from '../types/auth.types'
import type { PiiType } from '../types/config.types'

export const PII_MASKING_RULES: Record<PiiType, (value: string) => string> = {
  phone: (value: string) => {
    if (!value || value.length < 4) return '**********'
    return value.slice(0, 2) + '******' + value.slice(-2)
  },
  email: (value: string) => {
    if (!value) return '****@****.***'
    const parts = value.split('@')
    if (parts.length < 2) return '****@****.***'
    const username = parts[0]
    const domain = parts[1]
    const maskedUsername = username.slice(0, 2) + '****'
    return `${maskedUsername}@${domain}`
  },
  address: (value: string) => {
    if (!value) return 'XXXX, ****'
    const lines = value.split(',')
    if (lines.length <= 1) return 'XXXX, ' + value
    return 'XXXX, ' + lines.slice(1).join(',').trim()
  },
  pan: (value: string) => {
    if (!value || value.length < 5) return '*****XXXXX'
    return value.slice(0, 5) + 'XXXXX'
  },
  aadhaar: (value: string) => {
    if (!value || value.length < 4) return 'XXXX XXXX ****'
    return 'XXXX XXXX ' + value.slice(-4)
  },
}

export const PII_UNMASK_PERMISSIONS: Record<RoleId, PiiType[]> = {
  callCentreAgent: [],
  callCentreLead: ['phone'],
  nhqCustomerCare: ['phone', 'email'],
  nhqScm: [],
  nhqFinance: ['phone', 'email', 'pan'],
  ccHead: ['phone', 'email', 'address', 'pan', 'aadhaar'],
  scmHead: [],
  csProductManager: ['phone', 'email'],
  financeHead: ['phone', 'email', 'address', 'pan', 'aadhaar'],
  businessHead: [],
  admin: ['phone', 'email', 'address', 'pan', 'aadhaar'],
}
