import { getPublicKey, relayPool } from 'nostr-tools'
// @ts-ignore
import { generateSeedWords, privateKeyFromSeed, seedFromWords } from 'nostr-tools/nip06'

export const pool = relayPool()

let pubkey: Uint8Array

export const createNewAccount = () => {
  const mnemonic = generateSeedWords()
  const seed = seedFromWords(mnemonic)
  const priv = privateKeyFromSeed(seed)
  pubkey = getPublicKey(priv)
  pool.setPrivateKey(priv)
  console.log(`Authed as ${pubkey}`)
  pool.setPolicy('randomChoice', 3)
  pool.addRelay('wss://relayer.fiatjaf.com')
  pool.addRelay('wss://nostr-pub.wellorder.net')
  pool.addRelay('wss://freedom-relay.herokuapp.com/ws')
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
  })

  console.log(`Subscribed to: ${pubkey}`)
  return true
}
