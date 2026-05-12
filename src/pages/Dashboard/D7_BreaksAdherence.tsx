import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { dataService } from '../../services/mockAdapter'
import { useDashboardFilters } from '../../context/DashboardFilterContext'

export function D7_BreaksAdherence() {
  const { filters } = useDashboardFilters()
  const [data, setData] = useState<Record<string, unknown>[]>([])

  useEffect(() => { dataService.getBreaksAdherence(filters).then(setData) }, [filters])

  function pct(taken: number, allowed: number): number {
    return allowed > 0 ? Math.round((taken / allowed) * 100) : 0
  }

  function cellColor(taken: number, allowed: number): string {
    const p = pct(taken, allowed)
    if (p > 110) return 'text-red-600 font-semibold bg-red-50'
    if (p > 95) return 'text-yellow-600 bg-yellow-50'
    return 'text-green-700 bg-green-50'
  }

  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold text-gray-800">Breaks Adherence</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Agent</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Team Lead</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase" colSpan={3}>Tea Break (Taken / Allowed / %)</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase" colSpan={3}>Lunch Break (Taken / Allowed / %)</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase" colSpan={3}>Bio Break (Taken / Allowed / %)</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{String(row.agent_name)}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{String(row.team_lead)}</td>
                <td className={clsx('px-3 py-3 text-center text-xs', cellColor(Number(row.tea_taken_mins), Number(row.tea_allowed_mins)))} colSpan={3}>
                  {Number(row.tea_taken_mins)}m / {Number(row.tea_allowed_mins)}m ({pct(Number(row.tea_taken_mins), Number(row.tea_allowed_mins))}%)
                </td>
                <td className={clsx('px-3 py-3 text-center text-xs', cellColor(Number(row.lunch_taken_mins), Number(row.lunch_allowed_mins)))} colSpan={3}>
                  {Number(row.lunch_taken_mins)}m / {Number(row.lunch_allowed_mins)}m ({pct(Number(row.lunch_taken_mins), Number(row.lunch_allowed_mins))}%)
                </td>
                <td className={clsx('px-3 py-3 text-center text-xs', cellColor(Number(row.bio_taken_mins), Number(row.bio_allowed_mins)))} colSpan={3}>
                  {Number(row.bio_taken_mins)}m / {Number(row.bio_allowed_mins)}m ({pct(Number(row.bio_taken_mins), Number(row.bio_allowed_mins))}%)
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={clsx('text-xs px-2 py-0.5 rounded-full font-medium', row.adherent ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}>
                    {row.adherent ? 'Adherent' : 'Exceeded'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
