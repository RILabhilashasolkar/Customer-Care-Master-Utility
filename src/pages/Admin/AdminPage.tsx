import React, { useState } from 'react'
import { AppShell } from '../../components/layout/AppShell'
import { Tabs } from '../../components/core/Tabs'
import { Card } from '../../components/core/Card'
import { ModuleAccessMatrix } from './ModuleAccessMatrix'
import { UserManagement } from './UserManagement'
import { RoleManagement } from './RoleManagement'

const TABS = [
  { id: 'matrix', label: 'Module Access Matrix' },
  { id: 'users', label: 'User Management' },
  { id: 'roles', label: 'Role Management' },
]

export function AdminPage() {
  const [activeTab, setActiveTab] = useState('matrix')

  return (
    <AppShell>
      <div className="space-y-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-sm text-gray-500 mt-1">Manage roles, permissions, and users</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-5 pt-4">
            <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
          </div>
          <div className="p-5">
            {activeTab === 'matrix' && <ModuleAccessMatrix />}
            {activeTab === 'users' && <UserManagement />}
            {activeTab === 'roles' && <RoleManagement />}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
