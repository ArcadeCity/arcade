/**
 * NIP-01: Basic protocol
 * https://github.com/nostr-protocol/nips/blob/master/01.md
 */

import { Buffer } from 'buffer'
import createHash from 'create-hash'
import * as secp256k1 from '@alephium/noble-secp256k1'
import { NostrKind } from '../types'

/**
 * "The only object type that exists is the event, which has the following format on the wire:"
 */
export interface NostrEvent {
  // <32-bytes sha256 of the the serialized event data>
  id: string
  // <32-bytes hex-encoded public key of the event creator>
  pubkey: string
  // <unix timestamp in seconds>
  created_at: number
  // <integer> (representing the kind of event)
  kind: NostrKind
  /**
   * ["e", <32-bytes hex of the id of another event>, <recommended relay URL>],
   * ["p", <32-bytes hex of the key>, <recommended relay URL>],
   * ... // other kinds of tags may be included later
   */
  tags: string[]
  // <arbitrary string>
  content: string
  // <64-bytes signature of the sha256 hash of the serialized event data, which is the same as the "id" field>
  sig: string
}

export interface NostrEventToSerialize {
  content: string
  created_at: number
  kind: NostrKind
  pubkey: string
  tags: string[]
}

export interface NostrEventToSign {
  id: string
  content: string
  created_at: number
  kind: NostrKind
  pubkey: string
  tags: string[]
}

/**
 * "To obtain the event.id, we sha256 the serialized event. The serialization is done over the
 * UTF-8 JSON-serialized string (with no indentation or extra spaces)..."
 */

export const getEventHash = (event: NostrEventToSerialize) => {
  let eventHash = createHash('sha256')
    .update(Buffer.from(serializeEvent(event)))
    .digest()
  return Buffer.from(eventHash).toString('hex')
}

export const serializeEvent = (event: NostrEventToSerialize) => {
  return JSON.stringify([0, event.pubkey, event.created_at, event.kind, event.tags, event.content])
}

export const signEvent = async (event: NostrEventToSign, key: string) => {
  return Buffer.from(await secp256k1.schnorr.sign(getEventHash(event), key)).toString('hex')
}
