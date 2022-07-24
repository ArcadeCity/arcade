import { display } from 'lib'
import { Relay } from './Relay'

export class Nostr {
  relays: Relay[] = []
  relayUrls: string[] = []

  constructor() {
    console.log('Nostr constructor')
  }

  setup() {
    this.addRelay('wss://relay.damus.io')
  }

  addRelay(relayUrl: string) {
    if (relayUrl in this.relayUrls) return
    this.relayUrls.push(relayUrl)
    this.relays.push(new Relay(relayUrl))
  }
}
