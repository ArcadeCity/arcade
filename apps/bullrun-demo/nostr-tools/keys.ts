import * as secp256k1 from '@noble/secp256k1'

export function getPublicKey(privateKey: Buffer) {
  return Buffer.from(secp256k1.schnorr.getPublicKey(privateKey)).toString('hex')
}
