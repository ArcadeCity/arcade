import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { greeting } from '@arcadecity/ui'
import { createNewAccount, subscribeToRides } from './nostr'
import { RequestFeed } from './RequestFeed'
import { useStore } from './store'

export default function App() {
  useEffect(() => {
    createNewAccount()
    subscribeToRides()
  }, [])
  const requests = useStore((s) => s.requests)
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
