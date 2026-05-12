export type StoreType =
  | 'Reliance Digital'
  | 'Jio Mart'
  | 'My Jio Store'
  | 'Jio Signature'
  | 'Reliance Digital Express'

export interface Store {
  store_id: string
  name: string
  store_type: StoreType
  address: string
  city: string
  state: string
  pincode: string
  latitude: number
  longitude: number
  phone: string
  email: string
  timings: string
  distance_km?: number
}
