import WebSocket from 'ws'
import { handleRequest } from './nip01'

export const handler = (ws: WebSocket, message: string) => {
  console.log(`[Received message]: ${message}`)
  const parsedMessage = JSON.parse(message)

  if (parsedMessage[0] === 'REQ') {
    const subId = parsedMessage[1]
    const filters = parsedMessage[2]
    handleRequest(subId, filters)
  }
}
