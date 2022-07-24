import { getEventHash, NostrEventToSerialize } from 'lib/nostr'
import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { color } from '@arcadecity/ui'

export const NewRequestScreen = () => {
  const clickedNew = () => {
    const nostrEvent: NostrEventToSerialize = {
      created_at: Date.now(),
      kind: 1,
      tags: [],
      content: 'blah',
      pubkey: 'mine',
    }
    console.log(nostrEvent)
    const eventId = getEventHash(nostrEvent)
    console.log(eventId)
  }
  return (
    <View style={styles.container}>
      <Button onPress={clickedNew} title='Create' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.background,
  },
})
