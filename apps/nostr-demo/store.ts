import create from 'zustand'

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
  type: string
}

interface State {
  requests: RideRequest[]
  addRequest: (request: RideRequest) => void
}

export const useStore = create<State>((set) => ({
  requests: [],
  addRequest: (request: RideRequest) =>
    set((state) => ({ requests: [...state.requests, request] })),
}))
