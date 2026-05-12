import React from 'react'
import { BarChartWidget } from '../../components/charts/BarChartWidget'
import { MOCK_QUEUE_SNAPSHOTS } from '../../data/queues.mock'

export function D8_TicketAgingByQueue() {
  const data = MOCK_QUEUE_SNAPSHOTS.map((q) => ({
    queue_name: q.queue_name.replace(' Queue', '').replace(' Support', ''),
    oldest_hours: q.oldest_ticket_age_hours,
    avg_hours: Math.round(q.oldest_ticket_age_hours * 0.4),
  }))

  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold text-gray-800">Ticket Aging by Queue</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <BarChartWidget
          data={data as unknown as Record<string, unknown>[]}
          xKey="queue_name"
          bars={[
            { key: 'oldest_hours', label: 'Oldest Ticket (hrs)', color: '#f44336' },
            { key: 'avg_hours', label: 'Avg Age (hrs)', color: '#ff9800' },
          ]}
          title="Ticket Age by Queue (hours)"
          height={300}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Queue</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Oldest (hrs)</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Avg Age (hrs)</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Backlog</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_QUEUE_SNAPSHOTS.map((q) => (
              <tr key={q.queue_id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{q.queue_name}</td>
                <td className={`px-4 py-3 text-center font-semibold ${q.oldest_ticket_age_hours > 48 ? 'text-red-600' : q.oldest_ticket_age_hours > 24 ? 'text-yellow-600' : 'text-green-600'}`}>{q.oldest_ticket_age_hours}h</td>
                <td className="px-4 py-3 text-center">{Math.round(q.oldest_ticket_age_hours * 0.4)}h</td>
                <td className="px-4 py-3 text-center">{q.total_backlog}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
