import WebSocket from 'ws'
import { e, edgedbClient } from '../edgedb'
import { Filters, formatEvent, normalizeEvent, NostrEvent } from '../nostr-utils'

/**
 * Upon receiving a REQ message, the relay SHOULD query its internal database and return events that
 * match the filter, then store that filter and send again all future events it receives to that same
 * websocket until the websocket is closed.
 */

export const handleRequest = async (ws: WebSocket, subId: string, filters: Filters) => {
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

  const result = await query.run(edgedbClient)

  console.log('result.length:', result.length)

  result.forEach((event) => {
    const normalizedEvent: NostrEvent = normalizeEvent(event)
    const formattedEvent = formatEvent(subId, normalizedEvent)
    ws.send(formattedEvent)
    console.log(`Sent to ${subId}`)
  })
}
