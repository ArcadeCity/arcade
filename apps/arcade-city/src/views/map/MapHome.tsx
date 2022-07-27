import * as React from 'react'
import { StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { ServiceOverlay } from './service-overlay'

export const MapHome = () => {
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
