import { useRbac } from '../context/RbacContext'

export function usePermission(moduleId: string, action = 'read'): boolean {
  const { hasPermission } = useRbac()
  return hasPermission(moduleId, action)
}
