import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import useCachedResources from '../hooks/useCachedResources'
import Navigation from '../navigation'

export default function App() {
  const isLoadingComplete = useCachedResources()
  useEffect(() => {
    // Alert.alert('Test1')
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
