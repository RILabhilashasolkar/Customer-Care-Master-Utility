import React, { createContext, useContext, useState, useCallback } from 'react'
import { format, subDays } from 'date-fns'
import type { DashboardFilters } from '../types/dashboard.types'

interface DashboardFilterContextValue {
  filters: DashboardFilters
  updateFilters: (partial: Partial<DashboardFilters>) => void
  resetFilters: () => void
}

const defaultFilters: DashboardFilters = {
  date_from: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
  date_to: format(new Date(), 'yyyy-MM-dd'),
  queue_ids: [],
  agent_ids: [],
  channels: [],
  priorities: [],
  business_lines: [],
}

const DashboardFilterContext = createContext<DashboardFilterContextValue | null>(null)

export function DashboardFilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<DashboardFilters>(defaultFilters)

  const updateFilters = useCallback((partial: Partial<DashboardFilters>) => {
    setFilters((prev) => ({ ...prev, ...partial }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters)
  }, [])

  return (
    <DashboardFilterContext.Provider value={{ filters, updateFilters, resetFilters }}>
      {children}
    </DashboardFilterContext.Provider>
  )
}

export function useDashboardFilters(): DashboardFilterContextValue {
  const ctx = useContext(DashboardFilterContext)
  if (!ctx) throw new Error('useDashboardFilters must be used within DashboardFilterProvider')
  return ctx
}
