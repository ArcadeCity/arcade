import create from 'zustand/vanilla'
import { MapView } from '@here/harp-mapview'
import { NostrEvent, RideRequest } from './types'

interface State {
  mapView: MapView | undefined
  requests: RideRequest[]
  addRequest: (request: RideRequest) => void
}

export const store = create<State>((set) => ({
  mapView: undefined,
  requests: [] as RideRequest[],
  addRequest: (request: RideRequest) =>
    set((state) => ({ requests: [...state.requests, request] })),
}))
