import WebSocket from 'ws'
import { formatNotice } from '@arcadecity/nostr-utils'
import { handleRequest } from './nip01'

export const handler = (ws: WebSocket, message: string) => {
  try {
    const parsedMessage = JSON.parse(message)
    console.log(`Parsed message:`, parsedMessage)
    switch (parsedMessage[0]) {
      case 'REQ':
        const subId = parsedMessage[1]
        const filters = parsedMessage[2]
        handleRequest(subId, filters)
        break
      default:
        ws.send(formatNotice('Unknown message type'))
    }
  } catch (e) {
    const msg = 'Failed to parse message'
    console.log(`${msg}:`, message)
    ws.send(formatNotice(msg))
  }
}
