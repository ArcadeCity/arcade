import './map'
import { relayPool } from 'nostr-tools'
import { normalizeRideRequestEvent } from './normalize'
import { NostrEvent } from './types'

console.log('Map initialized. Now connect to nostr...')
const pool = relayPool()

pool.addRelay('wss://relay.damus.io', { read: true, write: false })

// example callback function for a subscription
function onEvent(event: NostrEvent) {
  const rideRequest = normalizeRideRequestEvent(event)
  if (rideRequest) {
    console.log('New ride request:', rideRequest)
  }
}

pool.sub({
  cb: onEvent,
  filter: {
    kinds: [60],
    limit: 1,
  },
})
