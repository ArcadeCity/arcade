import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from '@arcadecity/ui'

export const MapHome = () => {
  return <Text preset='description' text='test' />
  // return <WebView style={styles.container} source={{ uri: 'https://blitzmap.vercel.app' }} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
