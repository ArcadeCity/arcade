import WebSocket, { WebSocketServer } from 'ws'
import { handler } from './handler'

const wss = new WebSocketServer({ port: 8088 })

const NOSTR = {
  REQ: 'REQ',
  EVENT: 'EVENT',
  CLOSE: 'CLOSE',
  NOTICE: 'NOTICE',
}

export const formatEvent = (subscriptionId: string, event: object) =>
  JSON.stringify([NOSTR.EVENT, subscriptionId, event])

export const formatNotice = (message) => JSON.stringify([NOSTR.NOTICE, message])

// Open socket and pass event to the event handler
wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected')
  ws.on('error', (error) => {
    console.error(`ws error: ${error}`)
  })
  ws.on('message', (data) => {
    try {
      const message = data.toString()
      handler(ws, message)
    } catch (err) {
      console.error(err)
      ws.send(formatNotice('[ERROR]: Failed to parse message as a string!'))
    }
  })
})
