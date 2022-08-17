import React, { useEffect, useState } from 'react'
import { RootStore, RootStoreProvider, setupRootStore } from '../../stores'

export const MSTProvider = ({ children }: { children: React.ReactNode }) => {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)
  useEffect(() => {
    setupRootStore(null).then(setRootStore)
  }, [])
  if (!rootStore) return <></>
  return <RootStoreProvider value={rootStore}>{children}</RootStoreProvider>
}
