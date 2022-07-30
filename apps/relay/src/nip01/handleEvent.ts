import { e, edgedbClient } from '../edgedb'
import { NostrEvent } from '../nostr-utils'

export const handleEvent = async (event: NostrEvent) => {
  console.log('In handleEvent')
  const query = e.insert(e.Event, {
    nid: event.id,
    pubkey: event.pubkey,
    created_at: event.created_at,
    kind: event.kind,
    tags: undefined,
    content: event.content,
    sig: event.sig,
  })
  const savedEvent = await query.run(edgedbClient)
  console.log(`Saved event with id ${savedEvent.id}`)
}
