import React from 'react'
import { Mail, CheckCircle, Clock, XCircle, TrendingUp, Repeat, FileText, Timer } from 'lucide-react'
import { EMAIL_KPI_SNAPSHOT, AGENT_PERFORMANCE_EMAIL } from '../../data/emailDashboard.mock'
import { BarChartWidget } from '../../components/charts/BarChartWidget'

export function ED1_Overview() {
  const kpi = EMAIL_KPI_SNAPSHOT

  const kpiCards = [
    { label: 'Total Emails',    value: kpi.totalEmails.toLocaleString(),  icon: Mail,        color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Actioned',  value: kpi.totalActioned.toLocaleString(), icon: CheckCircle, color: 'bg-green-50 text-green-600' },
    { label: 'Total Pending',   value: kpi.totalPending.toLocaleString(),  icon: Clock,       color: 'bg-amber-50 text-amber-600' },
    { label: 'Total Resolved',  value: kpi.totalResolved.toLocaleString(), icon: CheckCircle, color: 'bg-indigo-50 text-indigo-600' },
    { label: 'SLA Met',         value: `${kpi.slaMet}%`,                   icon: TrendingUp,  color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Avg AHT (min)',   value: kpi.avgAht.toString(),              icon: Timer,       color: 'bg-purple-50 text-purple-600' },
    { label: 'Fresh Emails',    value: kpi.freshEmails.toLocaleString(),   icon: FileText,    color: 'bg-sky-50 text-sky-600' },
    { label: 'Repeat Emails',   value: kpi.repeatEmails.toLocaleString(),  icon: Repeat,      color: 'bg-rose-50 text-rose-600' },
  ]

  const chartData = AGENT_PERFORMANCE_EMAIL.map(a => ({
    agent: a.agent.split(' ')[0],
    actioned: a.actioned,
    resolved: a.resolved,
  }))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Email Dashboard — Overview</h2>
        <p className="text-sm text-gray-500 mt-0.5">Kapture CRM · Email Channel Summary</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpiCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
              <Icon size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* SLA Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">SLA Performance</h3>
        <div className="grid grid-cols-3 gap-6">
          {[
            { label: 'Within SLA', value: kpi.slaMet, color: 'bg-emerald-500' },
            { label: 'Pending', value: ((kpi.totalPending / kpi.totalEmails) * 100).toFixed(1), color: 'bg-amber-400' },
            { label: 'Out of SLA', value: (100 - kpi.slaMet - Number(((kpi.totalPending / kpi.totalEmails) * 100).toFixed(1))).toFixed(1), color: 'bg-red-400' },
          ].map(({ label, value, color }) => (
            <div key={label}>
              <div className="flex justify-between mb-1.5">
                <span className="text-xs text-gray-500">{label}</span>
                <span className="text-xs font-semibold text-gray-700">{value}%</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full`} style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Productivity per Agent */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <BarChartWidget
          data={chartData}
          xKey="agent"
          title="Productivity per Agent (Actioned vs Resolved)"
          bars={[
            { key: 'actioned', label: 'Actioned',  color: '#1a237e' },
            { key: 'resolved', label: 'Resolved', color: '#4caf50' },
          ]}
          height={260}
        />
      </div>

      {/* Fresh vs Repeat */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Fresh vs Repeat Email Split</h3>
        <div className="flex items-center gap-6">
          <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden flex">
            <div className="bg-[#1a237e] h-full flex items-center justify-center text-white text-xs font-medium" style={{ width: `${Math.round((kpi.freshEmails / kpi.totalEmails) * 100)}%` }}>
              Fresh {Math.round((kpi.freshEmails / kpi.totalEmails) * 100)}%
            </div>
            <div className="bg-rose-400 h-full flex items-center justify-center text-white text-xs font-medium flex-1">
              Repeat {Math.round((kpi.repeatEmails / kpi.totalEmails) * 100)}%
            </div>
          </div>
          <div className="flex gap-4 text-sm">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#1a237e] inline-block" /> Fresh: {kpi.freshEmails}</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-rose-400 inline-block" /> Repeat: {kpi.repeatEmails}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
