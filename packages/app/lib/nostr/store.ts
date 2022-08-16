import create from 'zustand'
import { NostrEvent, RideRequest } from './types'

interface State {
  events: NostrEvent[]
  requests: RideRequest[]
  addEvent: (event: NostrEvent) => void
  addRequest: (request: RideRequest) => void
}

export const useStore = create<State>((set) => ({
  events: [] as NostrEvent[],
  requests: [] as RideRequest[],
  addRequest: (request: RideRequest) =>
    set((state) => ({ requests: [...state.requests, request] })),
  addEvent: (event: NostrEvent) => set((state) => ({ events: [...state.events, event] })),
}))
