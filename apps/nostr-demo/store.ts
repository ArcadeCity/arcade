import create from 'zustand'

interface RideRequest {
  type: string
  from: {
    lat: number
    lng: number
  }
  amount: number
  name: string
  expires: number
}

interface State {
  requests: RideRequest[]
}

export const useStore = create<State>((set) => ({
  requests: [],
  addRequest: (request: RideRequest) =>
    set((state) => ({ requests: [...state.requests, request] })),
}))
