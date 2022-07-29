import * as edgedb from 'edgedb'
import { NostrEvent } from '@arcadecity/nostr-utils'

const client = edgedb.createClient()

export const handleEvent = (event: NostrEvent) => {
  console.log('Handling event, got edgedb client:', client)
  // console.log('Handling event:', event)
}
