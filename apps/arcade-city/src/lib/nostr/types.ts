export enum NostrKind {
  metadata = 0,
  text = 1,
  contacts = 3,
  dm = 4,
  delete = 5,
  boost = 6,
  like = 7,
  riderequest = 60,
}

export interface RideRequest {
  amount: number
  created_at: number
  expires: number
  from: {
    lat: number
    lng: number
  }
  id: string
  name: string
  pubkey: string
  sig: string
  tags: string[]
  to: {
    lat: number
    lng: number
  }
  type: string
}
