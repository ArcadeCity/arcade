import 'text-encoding-polyfill'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Button, View } from 'react-native'
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
    actions.initialSubscribe()
  }, [state.ready])

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
        <View
          style={{
            position: 'absolute',
            bottom: 95,
            left: 0,
            right: 0,
            flex: 1,
            justifyContent: 'center',
          }}>
          <Button title='CREATE DEMO CHANNEL' onPress={actions.createDemoChannel} />
        </View>
      </SafeAreaProvider>
    )
  }
}
