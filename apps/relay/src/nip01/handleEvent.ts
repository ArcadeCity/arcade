import * as edgedb from 'edgedb'
import { NostrEvent } from '@arcadecity/nostr-utils'
import e from '../../dbschema/edgeql-js'

const client = edgedb.createClient()

export const handleEvent = async (event: NostrEvent) => {
  const query = e.insert(e.Event, {
    nid: event.id,
    pubkey: event.pubkey,
    created_at: event.created_at,
    kind: event.kind,
    tags: undefined,
    content: event.content,
    sig: event.sig,
  })
  const savedEvent = await query.run(client)
  console.log(`Saved event with id ${savedEvent.id}`)
}
