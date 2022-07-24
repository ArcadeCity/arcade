import { NostrEvent } from 'lib/nostr'
import { normalizeRideRequestEvent } from 'lib/nostr/normalize'
import { RelayStore } from '../relay-store'

export const initRideRequestDemo = async (self: RelayStore) => {
  const cb = (event: NostrEvent) => {
    const normalizedEvent = normalizeRideRequestEvent(event)
    console.log(normalizedEvent)
  }
  self.env.nostr.subscribeToRides(cb, 50)
  return true
}
