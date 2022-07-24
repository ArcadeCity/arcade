import { normalizeRideRequestEvent } from './normalize'
import { useStore } from './store'
import { NostrEvent } from './tools'
import { NostrKind } from './types'

export const handle = (event: NostrEvent) => {
  switch (event.kind) {
    case NostrKind.riderequest:
      const rideRequest = normalizeRideRequestEvent(event)
      if (rideRequest) {
        useStore.getState().addRequest(rideRequest)
      }
    default:
      useStore.getState().addEvent(event)
      break
  }
}
