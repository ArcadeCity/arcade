import { default as React, SetStateAction, useCallback, useMemo, useState } from 'react'

type UseBooleanFunction = (initial: boolean) => [boolean, UseBooleanActions]

type VoidFunction = () => void

export type UseBooleanActions = {
  setValue: React.Dispatch<SetStateAction<boolean>>
  toggle: VoidFunction
  setTrue: VoidFunction
  setFalse: VoidFunction
}

export type UseBoolean = [boolean, UseBooleanActions]

export const useBoolean: UseBooleanFunction = (initial) => {
  const [value, setValue] = useState<boolean>(initial)
  const toggle = useCallback(() => setValue((v) => !v), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  const actions = useMemo(() => ({ setValue, toggle, setTrue, setFalse }), [setFalse, setTrue, toggle])
  return [value, actions]
}

export default useBoolean
