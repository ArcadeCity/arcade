import 'text-encoding-polyfill'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useArcadeRelay } from '@arcadecity/use-arcade'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'

export const App = () => {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()
  const [state, actions] = useArcadeRelay()

  useEffect(() => {
    if (!state.ready) return
    // actions.initialSubscribe()
    // actions.createDemoChatroom()
  }, [state.ready])

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    )
  }
}
