import React from 'react'
import { RBAC_CONFIG } from '../../config/rbac.config'
import { DUMMY_USERS } from '../../data/users.mock'
import { MODULES_CONFIG } from '../../config/modules.config'
import type { RoleId } from '../../types/auth.types'

const ROLE_INFO: Record<RoleId, { label: string; description: string }> = {
  callCentreAgent: { label: 'Call Centre Agent', description: 'Front-line customer support agents handling inbound and outbound calls' },
  callCentreLead: { label: 'Call Centre Lead', description: 'Team leads managing call centre agents and escalations' },
  nhqCustomerCare: { label: 'NHQ Customer Care', description: 'HQ-level customer care specialists handling complex issues' },
  nhqScm: { label: 'NHQ SCM', description: 'Supply chain management team handling logistics and fulfillment' },
  nhqFinance: { label: 'NHQ Finance', description: 'Finance team handling refunds, payments, and credit notes' },
  ccHead: { label: 'CC Head', description: 'Head of customer care with full access to all CC operations' },
  scmHead: { label: 'SCM Head', description: 'Head of supply chain with logistics and retailer oversight' },
  csProductManager: { label: 'CS Product Manager', description: 'Product manager for customer service tools and processes' },
  financeHead: { label: 'Finance Head', description: 'Head of finance with full financial data access' },
  businessHead: { label: 'Business Head', description: 'Senior business leader with strategic dashboard access' },
  admin: { label: 'System Admin', description: 'Full system access including user management and configuration' },
}

export function RoleManagement() {
  const roles = Object.keys(RBAC_CONFIG) as RoleId[]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {roles.map((role) => {
        const info = ROLE_INFO[role]
        const userCount = DUMMY_USERS.filter((u) => u.role === role).length
        const roleConfig = RBAC_CONFIG[role]
        const accessibleModules = MODULES_CONFIG.filter((m) => {
          const mc = roleConfig[m.id]
          return mc && mc.actions.includes('read')
        })

        return (
          <div key={role} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{info.label}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{info.description}</p>
              </div>
              <span className="text-xs bg-brand-100 text-brand-800 px-2 py-1 rounded-lg font-medium">{userCount} users</span>
            </div>

            <div className="mt-3">
              <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Module Access</p>
              <div className="flex flex-wrap gap-1.5">
                {accessibleModules.map((m) => {
                  const actions = roleConfig[m.id]?.actions ?? []
                  return (
                    <div key={m.id} className="flex items-center gap-1 text-xs bg-gray-50 border border-gray-100 rounded px-2 py-1">
                      <span className="text-gray-700">{m.label}</span>
                      <span className="text-gray-400 text-xs">({actions.join(', ')})</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
