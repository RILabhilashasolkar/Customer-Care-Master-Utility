import React, { useState } from 'react'
import { Modal } from '../../components/core/Modal'
import { dataService } from '../../services/mockAdapter'
import type { Ticket, TicketChannel, TicketType, TicketPriority } from '../../types/ticket.types'
import type { BusinessLine } from '../../types/order.types'

interface CreateTicketModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated: (ticket: Ticket) => void
}

export function CreateTicketModal({ isOpen, onClose, onCreated }: CreateTicketModalProps) {
  const [form, setForm] = useState({
    channel: 'CALL' as TicketChannel,
    vertical: 'Reliance Digital Online' as BusinessLine,
    ticket_type: 'Complaint' as TicketType,
    category: '',
    subcategory: '',
    priority: 'P3' as TicketPriority,
    customer_id: '',
    customer_name: '',
    order_id: '',
    description: '',
  })
  const [loading, setLoading] = useState(false)

  const update = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const ticket = await dataService.createTicket({
      ...form,
      current_queue_id: 'Q001',
      current_queue_name: 'Customer Support resQ',
    })
    setLoading(false)
    onCreated(ticket)
    onClose()
  }

  const labelClass = 'block text-xs font-medium text-gray-600 mb-1'
  const inputClass = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Ticket" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Channel *</label>
            <select value={form.channel} onChange={(e) => update('channel', e.target.value)} className={inputClass} required>
              {['CALL', 'Chat', 'Email', 'Web/App', 'Social', 'Walk-in'].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Business Line *</label>
            <select value={form.vertical} onChange={(e) => update('vertical', e.target.value)} className={inputClass} required>
              {['JMD-B2B', 'ASP-B2B2C', 'Reliance Digital Online', 'Reliance Digital Offline', 'Jio Signature', 'My Jio Store', 'Distribution'].map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Ticket Type *</label>
            <select value={form.ticket_type} onChange={(e) => update('ticket_type', e.target.value)} className={inputClass} required>
              {['Complaint', 'Request', 'Enquiry', 'Feedback'].map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Priority *</label>
            <select value={form.priority} onChange={(e) => update('priority', e.target.value)} className={inputClass} required>
              {['P1', 'P2', 'P3', 'P4'].map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <input value={form.category} onChange={(e) => update('category', e.target.value)} className={inputClass} placeholder="e.g. Delivery Issue" />
          </div>
          <div>
            <label className={labelClass}>Subcategory</label>
            <input value={form.subcategory} onChange={(e) => update('subcategory', e.target.value)} className={inputClass} placeholder="e.g. Delayed Delivery" />
          </div>
          <div>
            <label className={labelClass}>Customer ID</label>
            <input value={form.customer_id} onChange={(e) => update('customer_id', e.target.value)} className={inputClass} placeholder="e.g. CUST001" />
          </div>
          <div>
            <label className={labelClass}>Customer Name</label>
            <input value={form.customer_name} onChange={(e) => update('customer_name', e.target.value)} className={inputClass} placeholder="Customer name" />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>Order ID</label>
            <input value={form.order_id} onChange={(e) => update('order_id', e.target.value)} className={inputClass} placeholder="e.g. RD690288760ED2ED1D21" />
          </div>
        </div>

        <div>
          <label className={labelClass}>Description *</label>
          <textarea
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            required
            rows={4}
            className={inputClass}
            placeholder="Describe the issue in detail..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="px-4 py-2 text-sm bg-brand-900 text-white rounded-lg hover:bg-brand-800 disabled:opacity-60">
            {loading ? 'Creating...' : 'Create Ticket'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
