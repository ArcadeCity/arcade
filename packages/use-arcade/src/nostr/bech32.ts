import { Buffer } from 'buffer'
import { bech32 } from 'bech32'

export const hexToNpub = (hex: string) => {
  return bech32.encode('npub', bech32.toWords(Buffer.from(hex, 'hex')))
}

export const hexToNsec = (hex: string) => {
  return bech32.encode('nsec', bech32.toWords(Buffer.from(hex, 'hex')))
}
