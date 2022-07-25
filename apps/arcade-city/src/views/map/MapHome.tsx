import * as React from 'react'
import { StyleSheet } from 'react-native'
import { ArcadeMap } from './ArcadeMap'

// import { ArcadeMap } from '@arcadecity/arcade-map'

// import { Text } from '@arcadecity/ui'

export const MapHome = () => {
  return <ArcadeMap />
  // return <WebView style={styles.container} source={{ uri: 'https://blitzmap.vercel.app' }} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
