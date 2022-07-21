import {
  generateSeedWords, getPublicKey, privateKeyFromSeed, relayPool, seedFromWords
} from './nostr-tools'

let pubkey: string

export const pool = relayPool()

export const createNewAccount = () => {
  const mnemonic = generateSeedWords()
  const seed = seedFromWords(mnemonic)
  const priv = privateKeyFromSeed(seed)
  pubkey = getPublicKey(Buffer.from(priv, 'hex'))
  console.log({ mnemonic, seed, priv, pubkey })
  pool.setPrivateKey(priv)
  console.log(`Authed as ${pubkey}`)
  pool.addRelay('wss://relay.damus.io')
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
