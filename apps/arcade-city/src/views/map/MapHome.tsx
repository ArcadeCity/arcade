import * as React from 'react'
import { StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { ArcadeMap } from '@arcadecity/arcade-map'

export const MapHome = () => {
  return <ArcadeMap />
  // return <WebView style={styles.container} source={{ uri: 'https://blitzmap.vercel.app' }} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})