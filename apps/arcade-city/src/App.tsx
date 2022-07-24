import 'text-encoding-polyfill'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import useCachedResources from '../hooks/useCachedResources'
import Navigation from '../navigation'
import { useExpoUpdates } from './lib/hooks/useExpoUpdates'
import { createNewAccount, subscribeToEvents } from './lib/nostr/nostr'
import { NostrKind } from './lib/nostr/types'

export default function App() {
  const isLoadingComplete = useCachedResources()
  useExpoUpdates(3)
  useEffect(() => {
    createNewAccount()
    subscribeToEvents([NostrKind.riderequest], 50)
  }, [])

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <Navigation />
        <StatusBar style='light' />
      </SafeAreaProvider>
    )
  }
}
