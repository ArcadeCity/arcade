import { Buffer } from 'buffer'
import { display } from '../../lib'
import { delay } from '../../lib/delay'
import {
  generateSeedWords,
  getEventHash,
  getPublicKey,
  NostrEvent,
  NostrEventToSerialize,
  NostrEventToSign,
  NostrKind,
  privateKeyFromSeed,
  seedFromWords,
  signEvent,
} from '../../lib/nostr'
import { Relay } from './Relay'

export class Nostr {
  relays: Relay[] = []
  relayUrls: string[] = []
  pubkey: string | undefined
  priv: string | undefined

  constructor() {}

  async setup() {
    this.addRelay('wss://relay.damus.io')
    this.createNewAccount()
  }

  createNewAccount() {
    const mnemonic = generateSeedWords()
    const seed = seedFromWords(mnemonic)
    const priv = privateKeyFromSeed(seed)
    const pubkey = getPublicKey(Buffer.from(priv, 'hex'))
    this.pubkey = pubkey
    this.priv = priv
    console.log('Pubkey:', pubkey)
    return { pubkey, priv }
  }

  subscribeToRides(cb: (event: NostrEvent, url: string) => void, limit = 50) {
    const filter = { kinds: [60], limit }
    const id = Math.random().toString().slice(2)
    this.relays[0].relay.sub({ cb, filter }, id)
  }

  subscribeToEvents(cb: (event: NostrEvent, url: string) => void, kinds: NostrKind[], limit = 50) {
    const filter = { kinds, limit }
    const id = Math.random().toString().slice(2)
    this.relays[0].relay.sub({ cb, filter }, id)
  }

  addRelay(relayUrl: string) {
    if (relayUrl in this.relayUrls) return
    this.relayUrls.push(relayUrl)
    this.relays.push(new Relay(relayUrl))
  }

  publish(event: NostrEvent) {
    this.relays.forEach((relay) => {
      relay.publish(event)
      console.log(`Published event ${event.id} to relay ${relay.url}`)
    })
  }

  async sendDemoEvent() {
    if (!this.pubkey || !this.priv) return
    const date = new Date()
    const dateTimeInSeconds = Math.floor(date.getTime() / 1000)
    const nostrEventToSerialize: NostrEventToSerialize = {
      created_at: dateTimeInSeconds,
      kind: 60,
      tags: [],
      content: JSON.stringify({
        from: {
          lat: -1,
          lng: -1,
        },
        to: {
          lat: 1,
          lng: 1,
        },
        name: 'ArcadeLambo',
        amount: 1337,
        expires: dateTimeInSeconds - 1,
      }),
      pubkey: this.pubkey,
    }
    const id = getEventHash(nostrEventToSerialize)
    const nostrEventToSign: NostrEventToSign = {
      ...nostrEventToSerialize,
      id,
    }
    const sig = await signEvent(nostrEventToSign, this.priv)
    const nostrEvent: NostrEvent = {
      ...nostrEventToSerialize,
      id,
      sig,
    }
    console.log(nostrEvent)
    this.publish(nostrEvent)
  }
}
