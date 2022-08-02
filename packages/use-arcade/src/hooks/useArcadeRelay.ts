import 'websocket-polyfill'
import { SetStateAction, useEffect, useRef, useState } from 'react'

export type UseArcadeRelayState = {
  isPaused: boolean
}

export type UseArcadeRelayActions = {
  setPause: React.Dispatch<SetStateAction<boolean>>
}

type UseArcadeRelayFunction = () => [UseArcadeRelayState, UseArcadeRelayActions]

export const useArcadeRelay: UseArcadeRelayFunction = () => {
  const [isPaused, setPause] = useState<boolean>(false)
  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    ws.current = new WebSocket('wss://relay.arcade.city')
    ws.current.onopen = () => console.log('ws opened')
    ws.current.onclose = () => console.log('ws closed')

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
      console.log(message)
    }
  }, [isPaused])

  const state: UseArcadeRelayState = { isPaused }
  const actions: UseArcadeRelayActions = { setPause }

  return [state, actions]
}
