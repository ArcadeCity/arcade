import WebSocket from 'ws'
import { handleRequest } from './nip01'
import { handleEvent } from './nip01/handleEvent'
import { Filters, formatNotice, NostrEvent } from './nostr-utils'

export const handler = (ws: WebSocket, message: string) => {
  try {
    const parsedMessage = JSON.parse(message)
    console.log(`Parsed message:`, parsedMessage)
    switch (parsedMessage[0]) {
      case 'REQ':
        const subId = parsedMessage[1]
        const filters = parsedMessage[2] as Filters
        handleRequest(ws, subId, filters)
        break
      case 'EVENT':
        const event = parsedMessage[1] as NostrEvent
        handleEvent(event)
        break
      default:
        ws.send(formatNotice(`Unknown message type ${parsedMessage[0]}`))
    }
  } catch (e) {
    const msg = 'Failed to parse message'
    console.log(`${msg}:`, message)
    ws.send(formatNotice(msg))
  }
}
