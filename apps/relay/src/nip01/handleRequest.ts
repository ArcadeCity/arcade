import { Filters } from '@arcadecity/nostr-utils'

/**
 * Upon receiving a REQ message, the relay SHOULD query its internal database and return events that
 * match the filter, then store that filter and send again all future events it receives to that same
 * websocket until the websocket is closed.
 */

export const handleRequest = (subId: string, filters: Filters) => {
  console.log(`Handling request for subId ${subId} and filters:`, filters)
  if (!subId) {
    console.error('No subId provided')
    return
  }
}
