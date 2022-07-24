import 'text-encoding-polyfill'
import { StatusBar } from 'expo-status-bar'
import { useCachedResources, useExpoUpdates } from 'lib/hooks'
import React, { useMemo } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { LoadSplash } from 'views/loading'
import Navigation from './navigation'

export default function App() {
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
