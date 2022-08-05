import { Buffer } from 'buffer'
import { getPublicKey } from './keys'
import { generateSeedWords, privateKeyFromSeed, seedFromWords } from './nip06'

export const createNewAccount = () => {
  const mnemonic = generateSeedWords()
  const seed = seedFromWords(mnemonic)
  const privateKey = privateKeyFromSeed(seed)
  const publicKey = getPublicKey(Buffer.from(privateKey, 'hex'))
  return {
    mnemonic,
    privateKey,
    publicKey,
  }
}
