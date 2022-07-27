import React from 'react'
import { StyleSheet, View } from 'react-native'
import { spacing, Text } from '@arcadecity/ui'

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text
        preset='description'
        text='Please try out the ride request flow and check that the request shows up in the feed.'
      />
      <Text
        preset='description'
        text='Your requests are sent to the public Nostr network and will be visible to all Nostr clients.'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[4],
  },
})
