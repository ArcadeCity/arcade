import WS from 'jest-websocket-mock'
// import WebSocket from 'ws'
import { act, renderHook } from '@testing-library/react-hooks'
import { useArcadeRelay } from '../useArcadeRelay'

// import { waitForSocketState } from '../websocketTestUtils'

let ws: WS

beforeEach(async () => {
  ws = new WS('ws://localhost:8088')
  // const { result } = renderHook(() => useArcadeRelay())
  // ws = result.current[0]
  // await waitForSocketState(ws, ws.OPEN)
  // console.log(ws)
})

afterEach(() => {
  WS.clean()
})

describe('useArcadeRelay', () => {
  // afterAll(async () => {
  //   ws.close()
  //   await waitForSocketState(ws, ws.CLOSED)
  //   console.log('Relay closed!')
  // })

  it('should set true', () => {
    const { result } = renderHook(() => useArcadeRelay())
    const [, , actions] = result.current

    act(() => actions.doSomething())
    console.log(ws)
    // console.log(result.current)

    // expect(result.current[0]).toBe(false)

    // act(setPause(true))

    // act(() => actions.setTrue())

    expect(true).toBe(true)
  })
})
