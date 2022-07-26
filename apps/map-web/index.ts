import './map'
import { relayPool } from 'nostr-tools'
import { GeoCoordinates } from '@here/harp-geoutils'
import { flyTo } from './flyTo'
import { normalizeRideRequestEvent } from './normalize'
import { store } from './store'
import { NostrEvent } from './types'

console.log('Map initialized. Now connect to nostr...')
const pool = relayPool()

const mapView = store.getState().mapView

pool.addRelay('wss://relay.damus.io', { read: true, write: false })

// example callback function for a subscription
function onEvent(event: NostrEvent) {
  const rideRequest = normalizeRideRequestEvent(event)
  if (rideRequest) {
    console.log('New ride request:', rideRequest)
    const to = new GeoCoordinates(rideRequest.to.lat, rideRequest.to.lng)
    const from = new GeoCoordinates(rideRequest.from.lat, rideRequest.from.lng)

    // Update text for text-overlay-container element with the ride request
    const text = `${rideRequest.name} wants a ride`
    document.getElementById('overlay-text')!.innerHTML = text

    mapView.lookAt({
      target: to,
      zoomLevel: 18,
      tilt: 40,
    })

    setTimeout(() => {
      flyTo(from, mapView)
    }, 2000)
  }
}

pool.sub({
  cb: onEvent,
  filter: {
    kinds: [60],
    limit: 10,
  },
})
