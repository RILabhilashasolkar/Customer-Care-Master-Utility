import type { RoleId } from '../types/auth.types'

type Action = 'read' | 'create' | 'update' | 'delete' | 'export'

interface ModuleAccess {
  actions: Action[]
  subModules?: string[]
}

type RbacConfig = Record<RoleId, Record<string, ModuleAccess>>

export const RBAC_CONFIG: RbacConfig = {
  callCentreAgent: {
    dashboard: { actions: ['read'], subModules: ['d1', 'd2'] },
    emailDashboard: { actions: ['read'], subModules: ['ed1', 'ed2', 'ed3'] },
    customer360: { actions: ['read'] },
    retailer360: { actions: [] },
    orderTracker: { actions: ['read'] },
    ticketManagement: { actions: ['read', 'create', 'update'] },
    storeLocator: { actions: ['read'] },
    admin: { actions: [] },
  },
  callCentreLead: {
    dashboard: { actions: ['read'], subModules: ['d1', 'd2', 'd3', 'd4', 'd7'] },
    emailDashboard: { actions: ['read'], subModules: ['ed1', 'ed2', 'ed3', 'ed4', 'ed5', 'ed8'] },
    customer360: { actions: ['read'] },
    retailer360: { actions: ['read'] },
    orderTracker: { actions: ['read'] },
    ticketManagement: { actions: ['read', 'create', 'update'] },
    storeLocator: { actions: ['read'] },
    admin: { actions: [] },
  },
  nhqCustomerCare: {
    dashboard: { actions: ['read'], subModules: ['d1', 'd2', 'd3', 'd4', 'd5', 'd7', 'd8', 'd9'] },
    emailDashboard: { actions: ['read'], subModules: ['ed1', 'ed2', 'ed3', 'ed4', 'ed5', 'ed6', 'ed7', 'ed8'] },
    customer360: { actions: ['read'] },
    retailer360: { actions: ['read'] },
    orderTracker: { actions: ['read'] },
    ticketManagement: { actions: ['read', 'create', 'update'] },
    storeLocator: { actions: ['read'] },
    admin: { actions: [] },
  },
  nhqScm: {
    dashboard: { actions: ['read'], subModules: ['d1', 'd3', 'd8', 'd9'] },
    emailDashboard: { actions: ['read'], subModules: ['ed1', 'ed6', 'ed7'] },
    customer360: { actions: ['read'] },
    retailer360: { actions: ['read'] },
    orderTracker: { actions: ['read'] },
    ticketManagement: { actions: ['read'] },
    storeLocator: { actions: ['read'] },
    admin: { actions: [] },
  },
  nhqFinance: {
    dashboard: { actions: ['read'], subModules: ['d1', 'd3', 'd9'] },
    emailDashboard: { actions: ['read'], subModules: ['ed1', 'ed7'] },
    customer360: { actions: ['read'] },
    retailer360: { actions: ['read'] },
    orderTracker: { actions: ['read'] },
    ticketManagement: { actions: ['read'] },
    storeLocator: { actions: ['read'] },
    admin: { actions: [] },
  },
  ccHead: {
    dashboard: { actions: ['read', 'export'], subModules: ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'daily'] },
    emailDashboard: { actions: ['read', 'export'], subModules: ['ed1', 'ed2', 'ed3', 'ed4', 'ed5', 'ed6', 'ed7', 'ed8'] },
    customer360: { actions: ['read', 'export'] },
    retailer360: { actions: ['read', 'export'] },
    orderTracker: { actions: ['read', 'export'] },
    ticketManagement: { actions: ['read', 'create', 'update', 'delete', 'export'] },
    storeLocator: { actions: ['read'] },
    admin: { actions: [] },
  },
  scmHead: {
    dashboard: { actions: ['read', 'export'], subModules: ['d1', 'd3', 'd5', 'd8', 'd9', 'd10'] },
    emailDashboard: { actions: ['read'], subModules: ['ed1', 'ed6', 'ed7'] },
    customer360: { actions: ['read'] },
    retailer360: { actions: ['read', 'export'] },
    orderTracker: { actions: ['read', 'export'] },
    ticketManagement: { actions: ['read', 'export'] },
    storeLocator: { actions: ['read'] },
    admin: { actions: [] },
  },
  csProductManager: {
    dashboard: { actions: ['read', 'export'], subModules: ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'daily'] },
    emailDashboard: { actions: ['read', 'export'], subModules: ['ed1', 'ed2', 'ed3', 'ed4', 'ed5', 'ed6', 'ed7', 'ed8'] },
    customer360: { actions: ['read', 'export'] },
    retailer360: { actions: ['read', 'export'] },
    orderTracker: { actions: ['read', 'export'] },
    ticketManagement: { actions: ['read', 'create', 'update', 'export'] },
    storeLocator: { actions: ['read'] },
    admin: { actions: ['read'] },
  },
  financeHead: {
    dashboard: { actions: ['read', 'export'], subModules: ['d1', 'd3', 'd9', 'd10'] },
    emailDashboard: { actions: ['read'], subModules: ['ed1', 'ed7'] },
    customer360: { actions: ['read', 'export'] },
    retailer360: { actions: ['read', 'export'] },
    orderTracker: { actions: ['read', 'export'] },
    ticketManagement: { actions: ['read', 'export'] },
    storeLocator: { actions: ['read'] },
    admin: { actions: [] },
  },
  businessHead: {
    dashboard: { actions: ['read', 'export'], subModules: ['d1', 'd3', 'd4', 'd9', 'd10', 'daily'] },
    emailDashboard: { actions: ['read', 'export'], subModules: ['ed1', 'ed4', 'ed5', 'ed6', 'ed7'] },
    customer360: { actions: ['read'] },
    retailer360: { actions: ['read'] },
    orderTracker: { actions: ['read'] },
    ticketManagement: { actions: ['read', 'export'] },
    storeLocator: { actions: ['read'] },
    admin: { actions: [] },
  },
  admin: {
    dashboard: { actions: ['read', 'create', 'update', 'delete', 'export'], subModules: ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'daily'] },
    emailDashboard: { actions: ['read', 'create', 'update', 'delete', 'export'], subModules: ['ed1', 'ed2', 'ed3', 'ed4', 'ed5', 'ed6', 'ed7', 'ed8'] },
    customer360: { actions: ['read', 'create', 'update', 'delete', 'export'] },
    retailer360: { actions: ['read', 'create', 'update', 'delete', 'export'] },
    orderTracker: { actions: ['read', 'create', 'update', 'delete', 'export'] },
    ticketManagement: { actions: ['read', 'create', 'update', 'delete', 'export'] },
    storeLocator: { actions: ['read', 'create', 'update', 'delete'] },
    admin: { actions: ['read', 'create', 'update', 'delete', 'export'] },
  },
}

export function getModuleActions(role: RoleId, moduleId: string): string[] {
  const roleConfig = RBAC_CONFIG[role]
  if (!roleConfig) return []
  const moduleConfig = roleConfig[moduleId]
  if (!moduleConfig) return []
  return moduleConfig.actions
}

export function hasModuleAccess(role: RoleId, moduleId: string, action: Action = 'read'): boolean {
  const actions = getModuleActions(role, moduleId)
  return actions.includes(action)
}
