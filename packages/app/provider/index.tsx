import React from 'react'
import { Dripsy } from './dripsy'
import { MSTProvider } from './mst/MSTProvider'
import { NavigationProvider } from './navigation'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider>
      <Dripsy>
        <MSTProvider>{children}</MSTProvider>
      </Dripsy>
    </NavigationProvider>
  )
}
