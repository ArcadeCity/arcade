import * as edgedb from 'edgedb'
import { NostrEvent } from '@arcadecity/nostr-utils'

const client = edgedb.createClient()

export const handleEvent = async (event: NostrEvent) => {
  console.log('Handling event:', event.id)
  const res = await client.query('select 2 + 2')
  console.log(res)
}
