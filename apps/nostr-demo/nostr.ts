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

export const subscribeToRides = () => {
  const onEvent = (event: any, relay: any) => {
    console.log(`Received EVENT 60 ${event.id ?? ''}`) // event, relay
  }
  // @ts-ignore
  pool.sub({
    cb: onEvent,
    filter: {
      kinds: [60],
    },
  })
  console.log('subscribed?')
}

export const subscribeToUser = async (pubkey: string) => {
  const onEvent = (event: any, relay: any) => {
    console.log(`Received event ${event.id ?? ''}`, event) // event, relay
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
