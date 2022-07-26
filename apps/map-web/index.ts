import './map'
import { relayPool } from 'nostr-tools'
import { GeoCoordinates } from '@here/harp-geoutils'
import { flyTo, stopAnimation } from './flyTo'
import { normalizeRideRequestEvent } from './normalize'
import { store } from './store'
import { NostrEvent, RideRequest } from './types'

console.log('Map initialized. Now connect to nostr...')
const pool = relayPool()

const mapView = store.getState().mapView

pool.addRelay('wss://relay.damus.io', { read: true, write: false })

// example callback function for a subscription
function onEvent(event: NostrEvent) {
  const rideRequest = normalizeRideRequestEvent(event)
  if (rideRequest) {
    store.getState().addRequest(rideRequest)
    console.log('New ride request:', rideRequest)
  }
}

pool.sub({
  cb: onEvent,
  filter: {
    kinds: [60],
    limit: 50,
  },
})

const doit = (rideRequest: RideRequest) => {
  stopAnimation()
  const to = new GeoCoordinates(rideRequest.to.lat, rideRequest.to.lng)
  const from = new GeoCoordinates(rideRequest.from.lat, rideRequest.from.lng)

  // Update text for text-overlay-container element with the ride request
  const text = `<strong style="color: #F459F4">${
    rideRequest.name
  }</strong> wants a ride<br />from ${from.latitude.toFixed(4)}, ${from.longitude.toFixed(
    4
  )}<br />to ${to.latitude.toFixed(4)}, ${to.longitude.toFixed(4)}`
  document.getElementById('overlay-text')!.innerHTML = text

  mapView.lookAt({
    target: to,
    zoomLevel: 18,
    tilt: 40,
  })

  setTimeout(() => {
    flyTo(from, mapView)
  }, 500)
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const checkForEm = async () => {
  document.getElementById('overlay-text')!.innerHTML = 'Loading Bullrun ride requests'
  await delay(2000)
  const requests = store.getState().requests
  document.getElementById('overlay-text')!.innerHTML = `Loaded ${requests.length} ride requests`
  await delay(2000)
  for (const rideRequest of requests) {
    doit(rideRequest)
    await delay(6000)
  }
}

checkForEm()
