import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { ArcadeMap } from '@arcadecity/arcade-map'

export const MapHome = () => {
  return <ArcadeMap />
  // return <View style={styles.container} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
