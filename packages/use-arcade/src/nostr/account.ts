import { getPublicKey } from './keys'
import { generateSeedWords, privateKeyFromSeed, seedFromWords } from './nip06'

export const createNewAccount = () => {
  const mnemonic = generateSeedWords()
  const seed = seedFromWords(mnemonic)
  const privkey = privateKeyFromSeed(seed)
  const pubkey = getPublicKey(Buffer.from(privkey, 'hex'))
  return { pubkey, privkey, mnemonic }
}
