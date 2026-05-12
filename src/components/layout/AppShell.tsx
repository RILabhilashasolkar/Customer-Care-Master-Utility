import React from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Fixed sidebar */}
      <Sidebar />
      {/* Right side: topbar + scrollable content */}
      <div className="flex flex-col flex-1 ml-60 min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto pt-16">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
