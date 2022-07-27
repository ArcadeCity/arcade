import * as React from 'react'
import { StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'

export const MapHome = () => {
  return <WebView style={styles.container} source={{ uri: 'https://map.arcade.city' }} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
