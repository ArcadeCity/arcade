import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { palette } from '@arcadecity/ui'
import {
  Inter_400Regular, Inter_700Bold, useFonts
} from '@expo-google-fonts/inter'
import { Lexend_400Regular, Lexend_700Bold } from '@expo-google-fonts/lexend'
import { createNewAccount, subscribeToRides } from './nostr'
import { RequestFeed } from './RequestFeed'
import { useStore } from './store'

export default function App() {
  useEffect(() => {
    createNewAccount()
    subscribeToRides()
  }, [])

  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Lexend_400Regular,
    Lexend_700Bold,
  })

  const requests = useStore((s) => s.requests)

  if (!loaded) return <></>

  return (
    <View style={styles.container}>
      <RequestFeed requests={requests} />
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.haiti,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
