import 'websocket-polyfill'
import { SetStateAction, useEffect, useRef, useState } from 'react'
import WebSocket from 'ws'

type VoidFunction = () => void

export type UseArcadeRelayActions = {
  setPause: React.Dispatch<SetStateAction<boolean>>
  doSomething: VoidFunction
}

type UseArcadeRelayFunction = () => [any, boolean, UseArcadeRelayActions]

export const useArcadeRelay: UseArcadeRelayFunction = () => {
  const [isPaused, setPause] = useState<boolean>(false)
  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    ws.current = new WebSocket('wss://relay.arcade.city')
    // ws.current.onopen = () => {
    //   console.log('ws opened. attempting subscribe')
    //   ws.current?.send(JSON.stringify(['REQ', Math.random().toString().slice(2), { kind: 60 }]))
    // }
    ws.current.onclose = () => console.log('ws closed')

    const wsCurrent = ws.current

    return () => {
      wsCurrent.close()
    }
  }, [])

  useEffect(() => {
    if (!ws.current) return

    ws.current.onmessage = (e: any) => {
      if (isPaused) return
      const message = JSON.parse(e.data)
      console.log(message)
    }
  }, [isPaused])

  const doSomething = () => {}
  const actions: UseArcadeRelayActions = { setPause, doSomething }

  return [ws, isPaused, actions]
}
