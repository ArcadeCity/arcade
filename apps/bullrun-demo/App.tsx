import 'text-encoding-polyfill'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Linking, Pressable, StyleSheet, View } from 'react-native'
import { palette, spacing, Text, typography } from '@arcadecity/ui'
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

  if (!loaded) return <View style={styles.container} />

  return (
    <View style={styles.container}>
      <Text preset='title' text='Bullrun Ride Requests' style={{ marginBottom: spacing[3] }} />
      <Text
        preset='descriptionSlim'
        text='Bullrun is an open protocol for peer-to-peer services powered by Bitcoin & Nostr.'
        style={{ marginBottom: spacing[2] }}
      />
      <Text
        preset='descriptionSlim'
        text='This a list of demo ride requests created with the Bullrun demo app.'
        style={{ marginBottom: spacing[2] }}
      />
      <Pressable onPress={() => Linking.openURL('https://github.com/ArcadeCity/bullrun')}>
        <Text
          preset='title2'
          text='View Bullrun demo and code on GitHub'
          style={{
            textDecorationLine: 'underline',
            color: palette.blueBright,
            fontSize: 16,
            marginTop: spacing[1],
            marginBottom: 0,
          }}
        />
      </Pressable>

      <Pressable
        onPress={() =>
          Linking.openURL('https://github.com/nostr-protocol/nostr/blob/master/README.md')
        }>
        <Text
          preset='title2'
          text='What is Nostr?'
          style={{
            marginTop: spacing[1],
            textDecorationLine: 'underline',
            color: palette.blueBright,
            fontSize: 16,
          }}
        />
      </Pressable>

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
    padding: spacing[6],
  },
})
