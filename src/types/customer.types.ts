export type LoyaltyTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum'

export interface Customer {
  customer_id: string
  name: string
  phone: string
  email: string
  address: string
  pan?: string
  aadhaar?: string
  dob?: string
  loyalty_tier: LoyaltyTier
  loyalty_points: number
  registered_date: string
  segment?: string
  total_orders: number
  total_spent: number
}

export interface InteractionEvent {
  event_id: string
  event_type: 'call' | 'email' | 'chat' | 'walk-in' | 'social'
  channel: string
  agent_name: string
  timestamp: string
  notes: string
  ticket_id?: string
}
