import * as React from 'react'
import { Alert, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { ServiceOverlay } from './service-overlay'

export const MapHome = () => {
  React.useEffect(() => {
    Alert.alert(
      "Help test ride requests! Requests will be sent to the public Nostr network. Don't use your home address :)"
    )
  }, [])

  return (
    <>
      <ServiceOverlay />
      <WebView style={styles.container} source={{ uri: 'https://map-demo.arcade.city' }} />
      {/* <WebView style={styles.container} source={{ uri: 'https://map.arcade.city' }} /> */}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
