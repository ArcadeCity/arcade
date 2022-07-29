import * as edgedb from 'edgedb'
import { Filters } from '@arcadecity/nostr-utils'
import e from '../../dbschema/edgeql-js'

const client = edgedb.createClient()

/**
 * Upon receiving a REQ message, the relay SHOULD query its internal database and return events that
 * match the filter, then store that filter and send again all future events it receives to that same
 * websocket until the websocket is closed.
 */

export const handleRequest = async (subId: string, filters: Filters) => {
  console.log(`Handling request for subId ${subId} and filters:`, filters)
  if (!subId) {
    console.error('No subId provided')
    return
  }

  const query = e.select(e.Event, (event) => ({
    ...e.Event['*'],
    filter: filters.kinds ? e.op(event.kind, 'in', e.set(...filters.kinds)) : undefined,
    limit: filters.limit,
  }))

  const result = await query.run(client)
  console.log('result:', result)
  console.log('result.length:', result.length)
}
