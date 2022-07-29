import { getPublicKey } from './keys'
import { generateSeedWords, privateKeyFromSeed, seedFromWords } from './nip06'

export const createNewAccount2 = () => {
  const mnemonic = generateSeedWords()
  const seed = seedFromWords(mnemonic)
  const priv = privateKeyFromSeed(seed)
  const pubkey = getPublicKey(Buffer.from(priv, 'hex'))
  // pool.setPrivateKey(priv)
  // console.log(`Authed as ${pubkey}`)
  // pool.addRelay('wss://relay.damus.io')
  return { pubkey, priv }
}