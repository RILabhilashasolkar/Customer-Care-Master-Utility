import React from 'react'
import { useRbac } from '../../context/RbacContext'

interface PermissionGuardProps {
  moduleId: string
  action?: string
  fallback?: React.ReactNode
  children: React.ReactNode
}

export function PermissionGuard({ moduleId, action = 'read', fallback = null, children }: PermissionGuardProps) {
  const { hasPermission } = useRbac()
  if (!hasPermission(moduleId, action)) return <>{fallback}</>
  return <>{children}</>
}
