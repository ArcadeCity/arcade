export interface NostrEvent {
  content: string
  created_at: number
  id: string
  kind: NostrKind
  pubkey: string
  sig: string
  tags: string[]
}

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
