import 'websocket-polyfill'
import { SetStateAction, useEffect, useRef, useState } from 'react'
import { addEvent } from '../store'
import { NostrEvent } from '../types'

export type UseArcadeRelayState = {
  isPaused: boolean
  ready: boolean
}

export type UseArcadeRelayActions = {
  initialSubscribe: () => void
  setPause: React.Dispatch<SetStateAction<boolean>>
}

type UseArcadeRelayFunction = () => [UseArcadeRelayState, UseArcadeRelayActions]

export const useArcadeRelay: UseArcadeRelayFunction = () => {
  const [isPaused, setPause] = useState<boolean>(false)
  const [ready, setReady] = useState<boolean>(false)
  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    ws.current = new WebSocket('wss://relay.arcade.city')
    ws.current.onopen = () => {
      console.log('ws opened')
      setReady(true)
    }
    ws.current.onclose = () => {
      console.log('ws closed')
      setReady(false)
    }

    const wsCurrent = ws.current

    return () => {
      wsCurrent.close()
    }
  }, [])

  useEffect(() => {
    if (!ws.current) return

    ws.current.onmessage = (e) => {
      if (isPaused) return
      const message = JSON.parse(e.data)
      const event = message[2]
      addEvent(event)
    }
  }, [isPaused])

  const initialSubscribe = () => {
    if (!ws.current) return
    if (ws.current.readyState !== WebSocket.OPEN) {
      console.log('Not ready.')
      setReady(false)
      return
    }
    ws.current.send(JSON.stringify(['REQ', Math.random().toString().slice(2), { kind: 60 }]))
  }

  const state: UseArcadeRelayState = { isPaused, ready }
  const actions: UseArcadeRelayActions = { initialSubscribe, setPause }

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
