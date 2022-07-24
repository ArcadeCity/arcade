import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@arcadecity/ui'

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text preset='description' text="Isn't this cool?!" />
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
