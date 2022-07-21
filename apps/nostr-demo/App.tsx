import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { greeting } from '@arcadecity/ui'
import { createNewAccount, subscribeToRides } from './nostr'

export default function App() {
  useEffect(() => {
    createNewAccount()
    subscribeToRides()
  }, [])
  return (
    <View style={styles.container}>
      <Text>{greeting}</Text>
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
