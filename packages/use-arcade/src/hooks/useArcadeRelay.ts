import { useEffect, useRef, useState } from 'react'

export const useArcadeRelay = () => {
  const [isPaused, setPause] = useState(false)
  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    ws.current = new WebSocket('wss://relay.arcade.city')
    ws.current.onopen = () => {
      console.log('ws opened. attempting subscribe')
      ws.current?.send(JSON.stringify(['REQ', Math.random().toString().slice(2), { kind: 60 }]))
    }
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

  return [isPaused, setPause]
}
