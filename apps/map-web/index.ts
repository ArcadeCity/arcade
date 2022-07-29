import './map'
import { getPublicKey, relayPool } from 'nostr-tools'
import {
  generateSeedWords, privateKeyFromSeed, seedFromWords
} from 'nostr-tools/nip06'
// import { createDemoRideRequest } from '@arcadecity/nostr-utils'
import { GeoCoordinates } from '@here/harp-geoutils'
import { flyTo, stopAnimation } from './flyTo'
import { normalizeRideRequestEvent } from './normalize'
import { store } from './store'
import { NostrEvent, RideRequest } from './types'

console.log('Map initialized. Now connect to nostr...')
const pool = relayPool()

const mapView = store.getState().mapView

// pool.addRelay('wss://relay.damus.io', { read: true, write: false })
pool.addRelay('ws://localhost:8088')

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

export const createNewAccount = () => {
  const mnemonic = generateSeedWords()
  const seed = seedFromWords(mnemonic)
  const priv = privateKeyFromSeed(seed)
  let pubkey = getPublicKey(Buffer.from(priv, 'hex'))
  pool.setPrivateKey(priv)
  console.log(`Authed as ${pubkey}`)
  console.log('so we set priv key maybe to ', priv)
  // pool.addRelay('wss://relay.damus.io')
  return { pubkey, priv }
}

const publishOne = async () => {
  const { pubkey, priv } = createNewAccount()
  const date = new Date()
  const dateTimeInSeconds = Math.floor(date.getTime() / 1000)
  const nostrEventToSerialize = {
    created_at: dateTimeInSeconds,
    kind: 60,
    tags: [],
    content: JSON.stringify({
      from: {
        lat: 30.2672,
        lng: -97.7431,
      },
      to: {
        lat: 30.2632,
        lng: -97.7441,
      },
      name: 'ArcadeTesto1',
      amount: 1337,
      expires: dateTimeInSeconds - 1,
    }),
    pubkey,
  }
  // const { event, priv } = await createDemoRideRequest()
  // pool.setPrivateKey(priv)
  pool.publish(nostrEventToSerialize)
}

// publishOne()

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
