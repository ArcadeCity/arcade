import 'text-encoding-polyfill'
import { StatusBar } from 'expo-status-bar'
import React, { useMemo } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { LoadSplash } from 'views/loading'
import useCachedResources from '../hooks/useCachedResources'
import Navigation from '../navigation'
import { useExpoUpdates } from './lib/hooks/useExpoUpdates'

export default function App() {
  // const isLoadingComplete = false
  const isLoadingComplete = useCachedResources()
  useExpoUpdates(3)

  const componentToRender = useMemo(() => {
    return !isLoadingComplete ? (
      <LoadSplash ready={false} />
    ) : (
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    )
  }, [isLoadingComplete])

  return (
    <>
      <StatusBar style='light' />
      <LoadSplash ready={isLoadingComplete} />
      {componentToRender}
    </>
  )
}
