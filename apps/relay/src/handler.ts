import WebSocket from 'ws'
import { NostrEvent } from '@arcadecity/nostr-utils'
import { formatEvent, formatNotice } from './'

export const handler = (ws: WebSocket, message: string) => {
  // const buf = Buffer.from(message)
  // const message = buf.toString()
  console.log(`[RECV]: ${message}`)
  const [type, ...rest] = message.split(' ')
  switch (type) {
    case 'REQ':
      const [subscriptionId, event] = rest
      // ws.send(formatEvent(subscriptionId, event))
      break
    case 'CLOSE':
      ws.close()
      break
    case 'NOTICE':
      ws.send(formatNotice(rest.join(' ')))
      break
    default:
      ws.send(formatNotice('[ERROR]: Unknown message type!'))
  }
}
