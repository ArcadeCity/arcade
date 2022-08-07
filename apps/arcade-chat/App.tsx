import 'text-encoding-polyfill'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useArcadeRelay } from '@arcadecity/use-arcade'
import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'

export const App = () => {
  const isLoadingComplete = useCachedResources()
  useArcadeRelay()

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
