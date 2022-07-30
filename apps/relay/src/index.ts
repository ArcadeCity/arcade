import express from 'express'
import WebSocket from 'ws'
import { handler } from './handler'
import { formatNotice } from './nostr-utils'

const app = express()
const port = process.env.PORT || 3000

const server = app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '!!!!!!!')
})

const wsServer = new WebSocket.Server({ noServer: true })

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (socket) => {
    wsServer.emit('connection', socket, request)
  })
})

// Open socket and pass event to the event handler
wsServer.on('connection', (ws: WebSocket) => {
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
      ws.send(formatNotice('ERROR: Failed to parse message'))
    }
  })
})

app.get('/', function (req, res) {
  res.send('Hello world')
})
