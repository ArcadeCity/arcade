import { Relay } from './Relay'

export class Nostr {
  relays: Relay[] = []

  constructor() {
    console.log('Nostr constructor')
  }

  setup() {
    this.addRelay('wss://relay.damus.io')
  }

  addRelay(relayUrl: string) {
    this.relays.push(new Relay(relayUrl))
  }
}
