import React from 'react'
import { StyleSheet, View } from 'react-native'

export const AccountHome = () => {
  return (
    <View style={styles.container}>
      {/* <Text preset='title' text='Tab Two' /> */}
      {/* <Text preset='description' text='Hello world' /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
