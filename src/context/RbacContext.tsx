import React, { createContext, useContext, useMemo } from 'react'
import { useAuth } from './AuthContext'
import { RBAC_CONFIG, hasModuleAccess } from '../config/rbac.config'
import { PII_UNMASK_PERMISSIONS } from '../config/pii.config'
import { MODULES_CONFIG } from '../config/modules.config'
import type { RoleId } from '../types/auth.types'
import type { PiiType } from '../types/config.types'
import type { ModuleConfig } from '../types/config.types'

interface RbacContextValue {
  hasPermission: (moduleId: string, action?: string) => boolean
  canUnmaskPii: (piiType: PiiType) => boolean
  getAccessibleModules: () => ModuleConfig[]
  getDashboardSubModules: () => string[]
}

const RbacContext = createContext<RbacContextValue | null>(null)

export function RbacProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()

  const value = useMemo<RbacContextValue>(() => {
    const role = user?.role as RoleId | undefined

    const hasPermission = (moduleId: string, action = 'read'): boolean => {
      if (!role) return false
      return hasModuleAccess(role, moduleId, action as 'read' | 'create' | 'update' | 'delete' | 'export')
    }

    const canUnmaskPii = (piiType: PiiType): boolean => {
      if (!role) return false
      const allowed = PII_UNMASK_PERMISSIONS[role] ?? []
      return allowed.includes(piiType)
    }

    const getAccessibleModules = (): ModuleConfig[] => {
      if (!role) return []
      return MODULES_CONFIG.filter((m) => {
        const roleConfig = RBAC_CONFIG[role]
        const moduleAccess = roleConfig?.[m.id]
        return moduleAccess && moduleAccess.actions.includes('read')
      }).sort((a, b) => a.order - b.order)
    }

    const getDashboardSubModules = (): string[] => {
      if (!role) return []
      const roleConfig = RBAC_CONFIG[role]
      return roleConfig?.dashboard?.subModules ?? []
    }

    return { hasPermission, canUnmaskPii, getAccessibleModules, getDashboardSubModules }
  }, [user])

  return <RbacContext.Provider value={value}>{children}</RbacContext.Provider>
}

export function useRbac(): RbacContextValue {
  const ctx = useContext(RbacContext)
  if (!ctx) throw new Error('useRbac must be used within RbacProvider')
  return ctx
}
