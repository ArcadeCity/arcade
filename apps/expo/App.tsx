import React from 'react'
import 'text-encoding-polyfill'
import { useCachedResources } from './lib/useCachedResources'
import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'
import { StatusBar } from 'expo-status-bar'
import { useExpoUpdates } from './lib/useExpoUpdates'

export default function App() {
  useExpoUpdates(3)
  useCachedResources()
  return (
    <Provider>
      <StatusBar style='light' />
      <NativeNavigation />
    </Provider>
  )
}
