import WebSocket from 'ws'
import { formatNotice } from '@arcadecity/nostr-utils'
import { handleRequest } from './nip01'

export const handler = (ws: WebSocket, message: string) => {
  console.log(`[Received message]: ${message}`)
  const parsedMessage = JSON.parse(message)

  switch (parsedMessage[0]) {
    case 'REQ':
      const subId = parsedMessage[1]
      const filters = parsedMessage[2]
      handleRequest(subId, filters)
      break
    default:
      ws.send(formatNotice('Unknown message type'))
  }
}
