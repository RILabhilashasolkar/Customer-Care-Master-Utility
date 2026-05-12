import React, { useState } from 'react'
import { DUMMY_USERS } from '../../data/users.mock'
import { StatusPill } from '../../components/core/StatusPill'
import { useAuth } from '../../context/AuthContext'
import type { User } from '../../types/auth.types'

const ROLE_LABELS: Record<string, string> = {
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

export function UserManagement() {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState<User[]>(DUMMY_USERS)
  const isAdmin = currentUser?.role === 'admin'

  const toggleActive = (id: string) => {
    if (!isAdmin) return
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, active: !u.active } : u))
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Name</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Username</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Role</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Department</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Email</th>
            <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
            {isAdmin && <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="px-4 py-3 font-medium">{u.name}</td>
              <td className="px-4 py-3 text-gray-500 font-mono text-xs">{u.username}</td>
              <td className="px-4 py-3">
                <span className="text-xs bg-brand-100 text-brand-800 px-2 py-0.5 rounded font-medium">
                  {ROLE_LABELS[u.role] ?? u.role}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500 text-xs">{u.department}</td>
              <td className="px-4 py-3 text-gray-500 text-xs">{u.email}</td>
              <td className="px-4 py-3 text-center">
                <StatusPill status={u.active ? 'Active' : 'Inactive'} />
              </td>
              {isAdmin && (
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => toggleActive(u.id)}
                    className={`text-xs px-3 py-1 rounded-lg font-medium ${u.active ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
                  >
                    {u.active ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
