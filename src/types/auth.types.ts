export type RoleId =
  | 'callCentreAgent'
  | 'callCentreLead'
  | 'nhqCustomerCare'
  | 'nhqScm'
  | 'nhqFinance'
  | 'ccHead'
  | 'scmHead'
  | 'csProductManager'
  | 'financeHead'
  | 'businessHead'
  | 'admin'

export interface User {
  id: string
  username: string
  password: string
  name: string
  role: RoleId
  email: string
  phone: string
  department: string
  avatar?: string
  active: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

export interface LoginCredentials {
  username: string
  password: string
}
