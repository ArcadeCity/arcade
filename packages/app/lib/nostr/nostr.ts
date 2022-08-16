import { Buffer } from 'buffer'
import { handle } from './handle'
import { normalizeRideRequestEvent } from './normalize'
import {
  generateSeedWords,
  getPublicKey,
  privateKeyFromSeed,
  relayPool,
  seedFromWords,
} from './nostr-tools'
import { useStore } from './store'
import { NostrKind } from './types'

let pubkey: string

export const pool = relayPool()

export const createNewAccount = () => {
  const mnemonic = generateSeedWords()
  const seed = seedFromWords(mnemonic)
  const priv = privateKeyFromSeed(seed)
  pubkey = getPublicKey(Buffer.from(priv, 'hex'))
  pool.setPrivateKey(priv)
  console.log(`Authed as ${pubkey}`)
  pool.addRelay('wss://relay.damus.io')
  return { pubkey, priv }
}

export const subscribeToEvents = (kinds: NostrKind[], limit = 50) => {
  const onEvent = (event: any) => {
    handle(event)
  }
  // @ts-ignore
  pool.sub({
    cb: onEvent,
    filter: { kinds, limit },
  })
}

export const subscribeToRides = () => {
  const onEvent = (event: any) => {
    const rideRequest = normalizeRideRequestEvent(event)
    if (
      rideRequest &&
      // riderequest createdat is less than 7 days ago
      rideRequest.created_at > Date.now() / 1000 - 7 * 24 * 60 * 60 &&
      useStore.getState().requests.length < 150
    ) {
      useStore.getState().addRequest(rideRequest)
    }
  }
  // @ts-ignore
  pool.sub({
    cb: onEvent,
    filter: {
      kinds: [60],
    },
  })
}

export const subscribeToUser = async (pubkey: string) => {
  const onEvent = (event: any, relay: any) => {
    console.log(`Received event ${event.id ?? ''}`) // event, relay
  }
  pool.sub({
    cb: onEvent,
    filter: {
      author: pubkey,
    },
    beforeSend: () => {},
  })
  console.log(`Subscribed to: ${pubkey}`)
  return true
}
