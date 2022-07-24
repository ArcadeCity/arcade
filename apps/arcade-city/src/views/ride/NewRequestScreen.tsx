import {
  getEventHash, NostrEvent, NostrEventToSerialize, NostrEventToSign, signEvent
} from 'lib/nostr'
import { createNewAccount, pool } from 'lib/nostr/nostr'
import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { color } from '@arcadecity/ui'

export const NewRequestScreen = () => {
  const clickedNew = async () => {
    const { pubkey, priv } = createNewAccount()
    const date = new Date()
    const dateTimeInSeconds = Math.floor(date.getTime() / 1000)
    const nostrEventToSerialize: NostrEventToSerialize = {
      created_at: dateTimeInSeconds,
      kind: 1,
      tags: [],
      content: 'My apartment smells of rich mahogany',
      pubkey,
    }
    // const id = getEventHash(nostrEventToSerialize)
    // const nostrEventToSign: NostrEventToSign = {
    //   ...nostrEventToSerialize,
    //   id,
    // }
    // const sig = await signEvent(nostrEventToSign, priv)
    // const nostrEvent: NostrEvent = {
    //   ...nostrEventToSerialize,
    //   id,
    //   sig,
    // }
    // console.log(nostrEvent)

    pool.publish(nostrEventToSerialize)
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
