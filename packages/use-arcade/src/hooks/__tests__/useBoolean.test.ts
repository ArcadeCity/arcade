import { act, renderHook } from '@testing-library/react-hooks'
import { useBoolean } from '../useBoolean'

describe('useBoolean array', () => {
  it('should set true', () => {
    const { result } = renderHook(() => useBoolean(false))
    const [, actions] = result.current

    expect(result.current[0]).toBe(false)

    act(() => actions.setTrue())

    expect(result.current[0]).toBe(true)
  })

  it('should set false', () => {
    const { result } = renderHook(() => useBoolean(true))
    const [, actions] = result.current

    expect(result.current[0]).toBe(true)

    act(() => actions.setFalse())

    expect(result.current[0]).toBe(false)
  })

  it('should toggle', () => {
    const { result } = renderHook(() => useBoolean(true))
    const [, actions] = result.current
    expect(result.current[0]).toBe(true)

    act(() => actions.toggle())

    expect(result.current[0]).toBe(false)

    act(() => actions.toggle())
    expect(result.current[0]).toBe(true)
  })

  describe('hooks optimizations', () => {
    it('should keep actions reference equality after value change', () => {
      // given
      const { result } = renderHook(() => useBoolean(true))
      const [, originalActionsReference] = result.current
      const { setFalse, setTrue, toggle } = originalActionsReference

      expect(result.current[1]).toBe(originalActionsReference)
      expect(result.current[1].setFalse).toBe(setFalse)
      expect(result.current[1].setTrue).toBe(setTrue)
      expect(result.current[1].toggle).toBe(toggle)
      // when
      act(() => originalActionsReference.setFalse())
      // then
      expect(originalActionsReference).toBe(result.current[1])
      expect(setFalse).toBe(result.current[1].setFalse)
      expect(setTrue).toBe(result.current[1].setTrue)
      expect(toggle).toBe(result.current[1].toggle)
    })
  })
})
