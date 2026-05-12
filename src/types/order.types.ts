export type BusinessLine =
  | 'JMD-B2B'
  | 'ASP-B2B2C'
  | 'Reliance Digital Online'
  | 'Reliance Digital Offline'
  | 'Jio Signature'
  | 'My Jio Store'
  | 'Distribution'

export type OrderDirection = 'Forward' | 'Return'

export type RomsStatus =
  | 'DELIVERED'
  | 'SHIPPED'
  | 'OUT FOR DELIVERY'
  | 'CONFIRMED'
  | 'PLACED'
  | 'CANCELLED'
  | 'RETURNED'
  | 'PENDING'

export interface Order {
  shipment_id: string
  order_id: string
  article_id: string
  article_name: string
  order_date: string
  hd_gng: string
  store_dc_fulfilled: string
  store_no: string
  sales_order_number: string
  delivery_number: string
  roms_status: RomsStatus
  awb_no?: string
  edd?: string
  courier_partner?: string
  order_delivered_date?: string
  shipsy_grab_status?: string
  so_shortclose_flag?: string
  brand_type?: string
  refund_status?: string
  refund_date?: string
  utr_number?: string
  refund_amount?: number
  business_line: BusinessLine
  direction: OrderDirection
  customer_id?: string
  customer_name?: string
  retailer_id?: string
  quantity?: number
  unit_price?: number
  total_amount?: number
  pincode?: string
  city?: string
  state?: string
}

export interface OrderTimeline {
  stage: string
  status: 'completed' | 'active' | 'pending'
  timestamp?: string
  note?: string
}
