import React from 'react'
import { RBAC_CONFIG } from '../../config/rbac.config'
import { MODULES_CONFIG } from '../../config/modules.config'
import { useAuth } from '../../context/AuthContext'
import type { RoleId } from '../../types/auth.types'

const ROLE_LABELS: Record<RoleId, string> = {
  callCentreAgent: 'CC Agent',
  callCentreLead: 'CC Lead',
  nhqCustomerCare: 'NHQ CC',
  nhqScm: 'NHQ SCM',
  nhqFinance: 'NHQ Finance',
  ccHead: 'CC Head',
  scmHead: 'SCM Head',
  csProductManager: 'CS PM',
  financeHead: 'Finance Head',
  businessHead: 'Biz Head',
  admin: 'Admin',
}

const ACTIONS = ['read', 'create', 'update', 'delete', 'export'] as const

export function ModuleAccessMatrix() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'

  const roles = Object.keys(RBAC_CONFIG) as RoleId[]

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-brand-900 text-white">
            <th className="px-4 py-3 text-left font-semibold sticky left-0 bg-brand-900">Module</th>
            {roles.map((role) => (
              <th key={role} className="px-3 py-3 text-center font-semibold whitespace-nowrap" colSpan={5}>
                {ROLE_LABELS[role]}
              </th>
            ))}
          </tr>
          <tr className="bg-brand-800 text-brand-200">
            <th className="px-4 py-2 sticky left-0 bg-brand-800" />
            {roles.map(() => ACTIONS.map((action) => (
              <th key={action} className="px-1 py-2 text-center font-medium capitalize" title={action}>
                {action[0].toUpperCase()}
              </th>
            )))}
          </tr>
        </thead>
        <tbody>
          {MODULES_CONFIG.map((module, mi) => (
            <tr key={module.id} className={mi % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className={`px-4 py-2 font-medium text-gray-700 sticky left-0 ${mi % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                {module.label}
              </td>
              {roles.map((role) => {
                const moduleConfig = RBAC_CONFIG[role][module.id]
                return ACTIONS.map((action) => {
                  const hasAccess = moduleConfig?.actions.includes(action) ?? false
                  return (
                    <td key={`${role}-${action}`} className="px-1 py-2 text-center">
                      {hasAccess ? (
                        <span className="inline-block w-5 h-5 rounded-full bg-green-100 text-green-600 text-xs flex items-center justify-center">✓</span>
                      ) : (
                        <span className="inline-block w-5 h-5 rounded-full bg-gray-100 text-gray-300 text-xs flex items-center justify-center">—</span>
                      )}
                    </td>
                  )
                })
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {!isAdmin && (
        <p className="text-xs text-gray-400 mt-3">View-only. Admin role required to modify permissions.</p>
      )}
    </div>
  )
}
