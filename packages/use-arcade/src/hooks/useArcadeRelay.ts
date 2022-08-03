import { SetStateAction, useCallback, useContext, useEffect, useRef, useState } from 'react'
import {
  createNewAccount,
  formatEvent,
  getEventHash,
  NostrEvent,
  NostrEventToSerialize,
  NostrEventToSign,
  NostrKind,
  signEvent,
} from '../nostr'
import { addEvent } from '../store'
import { createDemoChannelEvent } from '../demo/createDemoChannelEvent'
import { ArcadeContext } from '../context'

export type UseArcadeRelayState = {
  isPaused: boolean
  ready: boolean
}

export type UseArcadeRelayActions = {
  createDemoChannel: () => void
  initialSubscribe: () => void
  sendChannelMessage: (channelId: string, message: string) => void
  setPause: React.Dispatch<SetStateAction<boolean>>
}

type UseArcadeRelayFunction = () => [UseArcadeRelayState, UseArcadeRelayActions]

const subId = Math.random().toString().slice(2)

export const useArcadeRelay: UseArcadeRelayFunction = () => {
  const context = useContext(ArcadeContext)
  const [isPaused, setPause] = useState<boolean>(false)
  const [ready, setReady] = useState<boolean>(false)
  const ws = useRef<WebSocket | null>(null)

  const connect = useCallback(() => {
    console.log('Connecting...')
    ws.current = new WebSocket('wss://relay.damus.io')
    // ws.current = new WebSocket('wss://relay.arcade.city')
    ws.current.onopen = () => {
      console.log('ws opened')
      setReady(true)
    }
    ws.current.onclose = () => {
      console.log('ws closed')
      setReady(false)
      setTimeout(() => {
        connect()
      }, 1000)
    }

    const wsCurrent = ws.current
    context.ws = ws.current

    return () => {
      wsCurrent.close()
    }
  }, [context])

  useEffect(() => {
    if (!context) {
      throw new Error('Missing Arcade context')
    }
    connect()
  }, [connect, context])

  useEffect(() => {
    if (!ws.current) return

    ws.current.onmessage = (e) => {
      if (isPaused) return
      const message = JSON.parse(e.data)
      switch (message[0]) {
        case 'EVENT':
          const event = message[2]
          addEvent(event)
          break
        default:
          console.log('Unhandled:', message)
      }
    }
  }, [isPaused])

  const initialSubscribe = () => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      console.log('Not ready.')
      setReady(false)
      return
    }
    ws.current.send(
      JSON.stringify([
        'REQ',
        subId,
        { kinds: [NostrKind.channelcreate, NostrKind.channelmetadata, NostrKind.channelmessage] },
      ]),
    )
  }

  const createDemoChannel = async () => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      console.log('Not ready.')
      setReady(false)
      return
    }
    const event = await createDemoChannelEvent()
    const formattedEvent = formatEvent(event)
    ws.current.send(formattedEvent)
    console.log('Sent')
  }

  const sendChannelMessage = async (channelId: string, message: string) => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      console.log('Not ready.')
      setReady(false)
      return
    }
    const event = await createMessageEvent(channelId, message)
    const formattedEvent = formatEvent(event)
    console.log('trying to send:', formattedEvent)
    ws.current.send(formattedEvent)
  }

  const state: UseArcadeRelayState = { isPaused, ready }
  const actions: UseArcadeRelayActions = { createDemoChannel, initialSubscribe, sendChannelMessage, setPause }
  context.actions = actions

  return [state, actions]
}

export const normalizeEvent = (event: any) =>
  ({
    id: event.nid,
    pubkey: event.pubkey,
    created_at: event.created_at,
    kind: event.kind,
    tags: event.tags ?? [],
    content: event.content,
    sig: event.sig,
  } as NostrEvent)

const createMessageEvent = async (channelId: string, message: string) => {
  const { pubkey, privkey } = createNewAccount()
  const date = new Date()
  const dateTimeInSeconds = Math.floor(date.getTime() / 1000)
  const nostrEventToSerialize: NostrEventToSerialize = {
    created_at: dateTimeInSeconds,
    kind: NostrKind.channelmessage,
    tags: [['#e', channelId]],
    content: JSON.stringify({
      channelId,
      text: message,
      type: 'text',
    }),
    pubkey,
  }
  const id = getEventHash(nostrEventToSerialize)
  const nostrEventToSign: NostrEventToSign = {
    ...nostrEventToSerialize,
    id,
  }
  const sig = await signEvent(nostrEventToSign, privkey)
  const nostrEvent: NostrEvent = {
    ...nostrEventToSerialize,
    id,
    sig,
  }
  return nostrEvent
}
